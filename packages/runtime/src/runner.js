import crypto from "node:crypto";
import { performance } from "node:perf_hooks";
import { validateCapsule, validateDreamLoop } from "./validate.js";
import { createPermissionPolicy } from "./permission-policy.js";

export class DreamLoopRunner {
  constructor({ handlers = {}, grantedPermissions = [], stateStore, permissionTiers = {}, handlerPermissions = {}, limits = {} } = {}) {
    this.handlers = new Map(Object.entries(handlers));
    this.grantedPermissions = new Set(grantedPermissions);
    this.stateStore = stateStore;
    this.checkTier = createPermissionPolicy(permissionTiers);
    this.handlerPermissions = new Map(Object.keys(handlers).map(name => [name, handlerPermissions[name] ?? name]));
    this.limits = { max_wall_time_ms: 86_400_000, max_steps: 1000, max_retries_per_step: 10, ...limits };
    for (const [key, maximum] of Object.entries({ max_wall_time_ms: 86_400_000, max_steps: 1000, max_retries_per_step: 10 })) {
      const value = this.limits[key];
      if (!Number.isInteger(value) || value < (key === 'max_retries_per_step' ? 0 : 1) || value > maximum) throw new Error(`invalid host limit: ${key}`);
    }
  }

  async run({ capsule, loop, input = {}, executionMode = "mock", stateKey } = {}) {
    // Freeze the caller's data before any await so concurrent mutation cannot broaden a run.
    capsule = structuredClone(capsule);
    loop = structuredClone(loop);
    validateCapsule(capsule);
    validateDreamLoop(loop);
    const capsuleAllowed = new Set(capsule.permissions.allowed);
    const capsuleBlocked = new Set(capsule.permissions.blocked);
    const startedAt = new Date().toISOString();
    const startedMs = performance.now();
    const limits = Object.fromEntries(Object.keys(this.limits).map(key => [key,
      Math.min(this.limits[key], capsule.resource_limits[key], loop.limits[key])]));
    const runId = `dlrun_${crypto.randomUUID()}`;
    const stepReceipts = [];
    const storedState = stateKey && this.stateStore ? await this.stateStore.get(stateKey) : undefined;
    let state = { ...(storedState && typeof storedState === "object" ? storedState : {}), ...structuredClone(input) };

    const finishReceipt = async (status, error) => {
      const receipt = {
        receiptId: `dlrcpt_${crypto.randomUUID()}`,
        runId,
        loopId: loop.loop_id,
        loopVersion: loop.version,
        capsuleId: capsule.capsule_id,
        capsuleVersion: capsule.version,
        executionMode,
        effectiveLimits: limits,
        status,
        startedAt,
        finishedAt: new Date().toISOString(),
        steps: stepReceipts,
        blockedActions: loop.blocked_actions,
        ...(error ? { error: error.message } : {}),
        state,
      };
      if (stateKey && this.stateStore && status === "completed") await this.stateStore.put(stateKey, state);
      if (this.stateStore?.appendReceipt) await this.stateStore.appendReceipt(receipt);
      return receipt;
    };

    try {
      if (loop.steps.length > limits.max_steps) throw new Error('capsule/host step ceiling exceeded');
      // Validate the complete plan before any handler can have effects.
      for (const step of loop.steps) {
        if (capsuleBlocked.has(step.permission)) throw new Error(`capsule blocks permission: ${step.permission}`);
        if (!capsuleAllowed.has(step.permission)) throw new Error(`capsule does not allow permission: ${step.permission}`);
        if (!this.grantedPermissions.has(step.permission)) throw new Error(`runner was not granted permission: ${step.permission}`);
        if (!this.handlers.has(step.handler)) throw new Error(`unregistered handler: ${step.handler}`);
        if (this.handlerPermissions.get(step.handler) !== step.permission) throw new Error(`handler permission mismatch: ${step.handler}`);
        this.checkTier(step.permission, loop.permission_tier);
      }
      for (const step of loop.steps) {
      if (performance.now() - startedMs >= limits.max_wall_time_ms) throw new Error("dreamloop wall-time ceiling reached");
      if (capsuleBlocked.has(step.permission)) throw new Error(`capsule blocks permission: ${step.permission}`);
      if (!capsuleAllowed.has(step.permission)) throw new Error(`capsule does not allow permission: ${step.permission}`);
      if (!this.grantedPermissions.has(step.permission)) throw new Error(`runner was not granted permission: ${step.permission}`);

      const handler = this.handlers.get(step.handler);
      if (!handler) throw new Error(`unregistered handler: ${step.handler}`);
      const maximumAttempts = Math.min(step.retry?.max_attempts || 1, limits.max_retries_per_step + 1);
      let result;
      let lastError;

      for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
        let timedOut = false;
        try {
          const remaining = limits.max_wall_time_ms - (performance.now() - startedMs);
          if (remaining <= 0) throw new Error('dreamloop wall-time ceiling reached');
          const controller = new AbortController();
          const timer = setTimeout(() => { timedOut = true; controller.abort(new Error(`${step.id} timed out`)); }, remaining);
          try {
            result = await Promise.race([
              Promise.resolve().then(() => handler({ input: structuredClone(step.with || {}), state: structuredClone(state), executionMode, signal: controller.signal })),
              new Promise((_, reject) => controller.signal.addEventListener("abort", () => reject(controller.signal.reason), { once: true })),
            ]);
          } finally {
            clearTimeout(timer);
          }
          if (performance.now() - startedMs >= limits.max_wall_time_ms) throw new Error('dreamloop wall-time ceiling reached');
          lastError = undefined;
          stepReceipts.push({ stepId: step.id, handler: step.handler, permission: step.permission, attempt, status: "completed" });
          break;
        } catch (error) {
          lastError = error;
          stepReceipts.push({ stepId: step.id, handler: step.handler, permission: step.permission, attempt, status: "failed", error: error.message });
          if (timedOut || performance.now() - startedMs >= limits.max_wall_time_ms) break;
        }
      }

      if (lastError) throw lastError;
      state = result && typeof result === "object" ? { ...state, ...structuredClone(result) } : state;
      }
      return await finishReceipt("completed");
    } catch (error) {
      error.receipt = await finishReceipt("failed", error);
      throw error;
    }
  }
}
