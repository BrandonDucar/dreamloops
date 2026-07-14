import crypto from "node:crypto";
import { validateCapsule, validateDreamLoop } from "./validate.js";

export class DreamLoopRunner {
  constructor({ handlers = {}, grantedPermissions = [], stateStore } = {}) {
    this.handlers = new Map(Object.entries(handlers));
    this.grantedPermissions = new Set(grantedPermissions);
    this.stateStore = stateStore;
  }

  async run({ capsule, loop, input = {}, executionMode = "mock", stateKey } = {}) {
    validateCapsule(capsule);
    validateDreamLoop(loop);
    const capsuleAllowed = new Set(capsule.permissions.allowed);
    const capsuleBlocked = new Set(capsule.permissions.blocked);
    const startedAt = new Date().toISOString();
    const startedMs = Date.now();
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
      for (const step of loop.steps) {
      if (Date.now() - startedMs >= loop.limits.max_wall_time_ms) throw new Error("dreamloop wall-time ceiling reached");
      if (capsuleBlocked.has(step.permission)) throw new Error(`capsule blocks permission: ${step.permission}`);
      if (!capsuleAllowed.has(step.permission)) throw new Error(`capsule does not allow permission: ${step.permission}`);
      if (!this.grantedPermissions.has(step.permission)) throw new Error(`runner was not granted permission: ${step.permission}`);

      const handler = this.handlers.get(step.handler);
      if (!handler) throw new Error(`unregistered handler: ${step.handler}`);
      const maximumAttempts = Math.min(step.retry?.max_attempts || 1, loop.limits.max_retries_per_step + 1);
      let result;
      let lastError;

      for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
        try {
          const remaining = Math.max(1, loop.limits.max_wall_time_ms - (Date.now() - startedMs));
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(new Error(`${step.id} timed out`)), remaining);
          timer.unref?.();
          try {
            result = await Promise.race([
              handler({ input: structuredClone(step.with || {}), state: structuredClone(state), executionMode, signal: controller.signal }),
              new Promise((_, reject) => controller.signal.addEventListener("abort", () => reject(controller.signal.reason), { once: true })),
            ]);
          } finally {
            clearTimeout(timer);
          }
          lastError = undefined;
          stepReceipts.push({ stepId: step.id, handler: step.handler, permission: step.permission, attempt, status: "completed" });
          break;
        } catch (error) {
          lastError = error;
          stepReceipts.push({ stepId: step.id, handler: step.handler, permission: step.permission, attempt, status: "failed", error: error.message });
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
