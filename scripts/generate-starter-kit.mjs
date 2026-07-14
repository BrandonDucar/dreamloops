import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { capsuleContentHash } from "../packages/runtime/src/index.js";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const checkOnly = process.argv.includes("--check");
const outputRoots = [
  path.join(root, "starter-kits", "persistent-agent"),
  path.join(root, "packages", "cli", "templates", "persistent-agent"),
];

const COMMON_BLOCKED = [
  "cloud.mutate",
  "component.install",
  "connector.unbounded.write",
  "deployment.production.write",
  "package.install",
  "public.publish",
  "secret.value.read",
  "self.modify.live",
  "signer.change",
  "wallet.sign",
];

function capsule({ id, name, type = "capability_profile", purpose, allowed, blocked = [], payload }) {
  const manifest = {
    schema: "dreamnet.synergy_capsule.v1",
    capsule_id: id,
    name,
    version: "1.0.0",
    capsule_type: type,
    status: "rehearsed",
    purpose,
    payload,
    permissions: {
      allowed: [...new Set(allowed)].sort(),
      blocked: [...new Set([...COMMON_BLOCKED, ...blocked])].sort(),
    },
    resource_limits: { max_wall_time_ms: 600000, max_steps: 40, max_retries_per_step: 2 },
    activation: { mode: "manual_review", rollback_version: "disabled" },
    provenance: {
      source: "https://github.com/BrandonDucar/dreamloops",
      content_hash: "sha256:" + "0".repeat(64),
    },
  };
  manifest.provenance.content_hash = capsuleContentHash(manifest);
  return manifest;
}

const CAPSULES = [
  capsule({
    id: "persistent-agent-base-v1",
    name: "Persistent Agent Base",
    type: "runtime_profile",
    purpose: "Provide durable identity, local state, memory, scheduling, health, budgets, evidence, receipts, recovery, and approval boundaries for a general persistent agent.",
    allowed: [
      "approval.request", "artifact.local.write", "budget.read", "calendar.read", "checkpoint.local.read",
      "checkpoint.local.write", "inbox.read", "memory.consolidate", "memory.expire", "memory.read", "memory.write",
      "message.classify", "model.usage.read", "priority.plan", "project.read", "project.write", "receipt.local.write",
      "relationship.read", "relationship.write", "runtime.health.read", "state.local.read", "state.local.write",
      "task.capture", "task.plan", "task.read",
    ],
    payload: {
      components: ["identity-policy-kernel", "durable-local-state", "bounded-memory", "scheduler", "runtime-supervisor", "budget-governor", "receipt-ledger", "backup-and-restore"],
      memory_policy: { provenance_required: true, consolidation: "daily", forgetting: "policy_driven", secret_values: "forbidden" },
      operating_modes: ["disabled", "dry_run", "local", "live_guarded"],
    },
  }),
  capsule({
    id: "daily-life-v1",
    name: "Daily Life",
    purpose: "Organize ordinary daily work, reminders, inboxes, relationships, projects, and reflective review without autonomous public action.",
    allowed: ["calendar.read", "inbox.read", "message.classify", "priority.plan", "task.capture", "task.plan", "task.read", "relationship.read", "relationship.write", "project.read", "project.write"],
    payload: { preferences: { plan_horizon: "one_day", interruptions: "triaged", reminders: "bounded", review: "evening" } },
  }),
  capsule({
    id: "knowledge-and-research-v1",
    name: "Knowledge and Research",
    purpose: "Collect, compare, synthesize, and cite local or public information while separating evidence from inference.",
    allowed: ["citation.write", "research.synthesize", "source.local.read", "source.public.read", "artifact.local.write"],
    payload: { evidence_policy: { citations_required: true, inference_labeled: true, private_sources: "explicit_permission_only" } },
  }),
  capsule({
    id: "communication-and-approval-v1",
    name: "Communication and Approval",
    purpose: "Draft audience-appropriate communication and request approval without publishing automatically.",
    allowed: ["approval.request", "communication.draft", "inbox.read", "memory.read", "receipt.local.write"],
    payload: { delivery_policy: { default: "draft_only", public_publish: "external_gate", irreversible_send: "external_gate" } },
  }),
  capsule({
    id: "creative-practice-v1",
    name: "Creative Practice",
    purpose: "Support iterative writing, music, visual, design, and conceptual work while preserving authorship and versions.",
    allowed: ["artifact.local.write", "creative.draft", "creative.review", "project.read", "project.write", "receipt.local.write"],
    payload: { practice: { preserve_versions: true, critique_before_promotion: true, attribution_required: true } },
  }),
  capsule({
    id: "evidence-gated-self-improvement-v1",
    name: "Evidence-Gated Self-Improvement",
    purpose: "Discover useful components and propose bounded improvements without self-installation, live self-modification, or silent promotion.",
    allowed: ["component.catalog.read", "experiment.local.run", "experiment.result.evaluate", "proposal.local.read", "proposal.local.write", "source.public.read"],
    payload: {
      lifecycle: ["observed", "proposed", "approved_for_sandbox", "tested", "reviewed", "approved_for_canary", "canary", "accepted_or_rejected"],
      automatic_installation: false,
    },
  }),
  capsule({
    id: "warper-keeper-connector-v1",
    name: "Warper Keeper Connector",
    type: "connector_profile",
    purpose: "Add assignment-bound portable work context, artifacts, approvals, and proof verification as an optional connector.",
    allowed: [
      "warper.assignment.read", "warper.assignment.release", "warper.trapper.open", "warper.context.append",
      "warper.artifact.submit", "warper.approval.request", "warper.trapper.close", "warper.receipt.read",
    ],
    payload: { default_mode: "disabled", authentication: "assignment_bound_bearer", idempotency_required: true, operation_scopes_required: true },
  }),
];

function step(id, handler, permission, input = {}) {
  return { id, handler, permission, with: input, retry: { max_attempts: 2 } };
}

function loop({ id, title, trigger, steps, tier = "local_draft_write", context = [], checks = [] }) {
  return {
    schema: "dreamnet.dreamloop.v1",
    loop_id: `${id}-v1`,
    title,
    version: "1.0.0",
    status: "rehearsed",
    owner: "persistent-agent-base-v1",
    stewards: ["agent_operator"],
    permission_tier: tier,
    trigger,
    inputs: ["agent identity", "current objective", "current time", "operator policy"],
    context_sources: context,
    allowed_actions: [...new Set(steps.map((item) => item.permission))].sort(),
    blocked_actions: COMMON_BLOCKED,
    checks: ["permissions granted", "resource ceilings intact", "receipt produced", ...checks],
    evidence_outputs: [`${id} evidence`],
    receipt_outputs: [`${id} receipt`],
    knowledge_state_outputs: [`${id} knowledge-state update`],
    execution_trace_outputs: [`${id} bounded execution trace`],
    memory_routes: ["local episodic memory", "promote only verified durable facts"],
    cooldown: "host policy",
    failure_modes: ["permission denied", "unregistered handler", "timeout", "invalid state", "dependency unavailable"],
    promotion_path: "rehearsed -> active_local -> live_guarded",
    last_reviewed: "2026-07-14",
    limits: { max_wall_time_ms: 120000, max_steps: Math.max(steps.length + 2, 6), max_retries_per_step: 1 },
    steps,
  };
}

const LOOPS = [
  loop({ id: "bootstrap-agent-state", title: "Bootstrap Agent State", trigger: "process start or operator request", context: ["identity profile", "latest checkpoint", "open tasks", "recent memories"], steps: [step("load-state", "state.local.read", "state.local.read"), step("recall-memory", "memory.read", "memory.read"), step("load-tasks", "task.read", "task.read"), step("record-bootstrap", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "persistent-agent-heartbeat", title: "Persistent Agent Heartbeat", trigger: "scheduled health pulse", context: ["runtime", "state store", "scheduler", "budget"], steps: [step("inspect-runtime", "runtime.health.read", "runtime.health.read"), step("write-state", "state.local.write", "state.local.write"), step("write-receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "ground-before-acting", title: "Ground Before Acting", trigger: "before a consequential response or task", context: ["relevant memories", "relationship history", "project state"], steps: [step("recall", "memory.read", "memory.read"), step("load-relationship", "relationship.read", "relationship.read"), step("load-project", "project.read", "project.read"), step("record-grounding", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "morning-plan", title: "Morning Plan", trigger: "start of operator day", context: ["calendar", "open tasks", "deadlines", "energy and budget constraints"], steps: [step("read-calendar", "calendar.read", "calendar.read"), step("read-tasks", "task.read", "task.read"), step("plan-priorities", "priority.plan", "priority.plan"), step("save-plan", "state.local.write", "state.local.write"), step("write-receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "inbox-triage", title: "Inbox Triage", trigger: "new messages or scheduled inbox review", context: ["authorized inboxes", "relationship context", "current priorities"], steps: [step("read-inbox", "inbox.read", "inbox.read"), step("classify", "message.classify", "message.classify"), step("capture-actions", "task.capture", "task.capture"), step("save-triage", "state.local.write", "state.local.write")] }),
  loop({ id: "relationship-memory-sync", title: "Relationship Memory Sync", trigger: "after a meaningful interaction", context: ["interaction summary", "existing relationship memory", "privacy policy"], steps: [step("read-relationship", "relationship.read", "relationship.read"), step("write-update", "relationship.write", "relationship.write"), step("save-state", "state.local.write", "state.local.write"), step("receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "project-continuity-resume", title: "Project Continuity Resume", trigger: "project resumed after interruption or restart", context: ["project checkpoint", "open tasks", "latest decisions", "known blockers"], steps: [step("read-project", "project.read", "project.read"), step("read-tasks", "task.read", "task.read"), step("update-project", "project.write", "project.write"), step("save-checkpoint", "checkpoint.local.write", "checkpoint.local.write")] }),
  loop({ id: "task-capture-and-plan", title: "Task Capture and Plan", trigger: "new commitment, request, or idea", context: ["request", "current projects", "deadlines"], steps: [step("capture", "task.capture", "task.capture"), step("plan", "task.plan", "task.plan"), step("save", "state.local.write", "state.local.write"), step("receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "research-and-citation", title: "Research and Citation", trigger: "question requiring external or local evidence", context: ["local knowledge", "authorized public sources", "source quality policy"], steps: [step("read-local", "source.local.read", "source.local.read"), step("read-public", "source.public.read", "source.public.read"), step("synthesize", "research.synthesize", "research.synthesize"), step("cite", "citation.write", "citation.write"), step("write-artifact", "artifact.local.write", "artifact.local.write")] }),
  loop({ id: "creative-work-session", title: "Creative Work Session", trigger: "creative brief or scheduled practice", context: ["brief", "prior versions", "references", "attribution policy"], steps: [step("load-project", "project.read", "project.read"), step("draft", "creative.draft", "creative.draft"), step("review", "creative.review", "creative.review"), step("write-artifact", "artifact.local.write", "artifact.local.write"), step("checkpoint", "project.write", "project.write")] }),
  loop({ id: "communication-draft-and-approval", title: "Communication Draft and Approval", trigger: "communication needed", context: ["audience", "relationship memory", "channel rules", "operator voice"], steps: [step("ground", "memory.read", "memory.read"), step("draft", "communication.draft", "communication.draft"), step("request-approval", "approval.request", "approval.request"), step("receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "memory-consolidation-and-forgetting", title: "Memory Consolidation and Forgetting", trigger: "nightly or storage-pressure review", context: ["episodic memory", "retention policy", "provenance", "sensitivity"], steps: [step("read-memory", "memory.read", "memory.read"), step("consolidate", "memory.consolidate", "memory.consolidate"), step("expire", "memory.expire", "memory.expire"), step("save", "memory.write", "memory.write"), step("receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "budget-and-model-review", title: "Budget and Model Review", trigger: "daily or threshold-based usage review", context: ["budget", "model usage", "task outcomes"], steps: [step("read-budget", "budget.read", "budget.read"), step("read-usage", "model.usage.read", "model.usage.read"), step("propose", "proposal.local.write", "proposal.local.write"), step("receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "component-radar", title: "Component Radar", trigger: "scheduled ecosystem review or observed limitation", context: ["current component catalog", "public release notes", "known gaps"], steps: [step("scan-public", "source.public.read", "source.public.read"), step("read-catalog", "component.catalog.read", "component.catalog.read"), step("write-proposal", "proposal.local.write", "proposal.local.write"), step("receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "evidence-gated-self-improvement", title: "Evidence-Gated Self-Improvement", trigger: "approved local improvement proposal", context: ["proposal", "sandbox policy", "test plan", "rollback"], steps: [step("read-proposal", "proposal.local.read", "proposal.local.read"), step("run-sandbox", "experiment.local.run", "experiment.local.run"), step("evaluate", "experiment.result.evaluate", "experiment.result.evaluate"), step("update-proposal", "proposal.local.write", "proposal.local.write"), step("receipt", "receipt.local.write", "receipt.local.write")], checks: ["no self-installation", "no live self-modification", "rollback documented"] }),
  loop({ id: "recovery-and-rollback", title: "Recovery and Rollback", trigger: "failed heartbeat, corrupt state, or operator request", context: ["latest healthy checkpoint", "failure receipt", "rollback policy"], steps: [step("inspect", "runtime.health.read", "runtime.health.read"), step("read-checkpoint", "checkpoint.local.read", "checkpoint.local.read"), step("restore-state", "state.local.write", "state.local.write"), step("record", "receipt.local.write", "receipt.local.write")], checks: ["restore target verified", "failed state retained for diagnosis"] }),
  loop({ id: "evening-review", title: "Evening Review", trigger: "end of operator day", context: ["completed tasks", "open work", "important interactions", "new knowledge"], steps: [step("read-tasks", "task.read", "task.read"), step("write-memory", "memory.write", "memory.write"), step("checkpoint", "checkpoint.local.write", "checkpoint.local.write"), step("plan", "task.plan", "task.plan"), step("receipt", "receipt.local.write", "receipt.local.write")] }),
  loop({ id: "warper-keeper-work-cycle", title: "Warper Keeper Work Cycle", trigger: "assignment-bound key and explicit work assignment available", tier: "live_guarded_action", context: ["gateway capability document", "assignment", "Trapper context", "operator policy"], steps: [step("get-assignment", "warper.assignment.read", "warper.assignment.read"), step("open-trapper", "warper.trapper.open", "warper.trapper.open"), step("append-context", "warper.context.append", "warper.context.append"), step("submit-artifact", "warper.artifact.submit", "warper.artifact.submit"), step("request-approval", "warper.approval.request", "warper.approval.request"), step("close-trapper", "warper.trapper.close", "warper.trapper.close"), step("verify-proof", "warper.receipt.read", "warper.receipt.read")], checks: ["assignment key remains secret", "idempotency keys supplied", "proof verified"] }),
];

function humanLoop(manifest) {
  const steps = manifest.steps.map((item, index) => `${index + 1}. \`${item.handler}\` with permission \`${item.permission}\`.`).join("\n");
  return `# ${manifest.title}\n\n- Loop ID: \`${manifest.loop_id}\`\n- Version: \`${manifest.version}\`\n- Status: \`${manifest.status}\`\n- Permission tier: \`${manifest.permission_tier}\`\n- Trigger: ${manifest.trigger}\n\n## Steps\n\n${steps}\n\n## Boundaries\n\nBlocked actions: ${manifest.blocked_actions.map((item) => `\`${item}\``).join(", ")}.\n\nThis Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.\n`;
}

function kitReadme() {
  return `# Persistent Agent Starter Kit\n\nThis kit contains ${CAPSULES.length} composable Capsules and ${LOOPS.length} bounded DreamLoops for ordinary persistent-agent operation. Start with \`persistent-agent-base-v1\`, then add only the overlays the agent needs. Warper Keeper is optional and disabled unless the host supplies an assignment-bound client and explicit permissions.\n\n## Capsules\n\n${CAPSULES.map((item) => `- \`${item.capsule_id}\`: ${item.purpose}`).join("\n")}\n\n## DreamLoops\n\n${LOOPS.map((item) => `- \`${item.loop_id}\`: ${item.trigger}`).join("\n")}\n`;
}

async function emit(rootPath, relative, content) {
  const target = path.join(rootPath, relative);
  if (checkOnly) {
    const current = await fs.readFile(target, "utf8").catch(() => null);
    if (current !== content) throw new Error(`generated file is stale: ${path.relative(root, target)}`);
    return;
  }
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, "utf8");
}

for (const outputRoot of outputRoots) {
  await emit(outputRoot, "README.md", kitReadme());
  for (const manifest of CAPSULES) {
    await emit(outputRoot, path.join("capsules", manifest.capsule_id.replace(/-v1$/, ""), "capsule.manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  }
  for (const manifest of LOOPS) {
    const folder = manifest.loop_id.replace(/-v1$/, "");
    await emit(outputRoot, path.join("dreamloops", folder, "dreamloop.manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    await emit(outputRoot, path.join("dreamloops", folder, "DREAMLOOP.md"), humanLoop(manifest));
  }
}

console.log(`${checkOnly ? "verified" : "generated"} ${CAPSULES.length} Capsules and ${LOOPS.length} DreamLoops`);
