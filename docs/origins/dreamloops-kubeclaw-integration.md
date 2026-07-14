# DreamLoops x KubeClaw Integration

Status: active implementation note  
Owner: DreamNet Runtime Council  
Last reviewed: 2026-06-30

## Summary

`dreamloops.md` is the lifecycle layer that makes KubeClaw practical.

KubeClaw should not schedule an agent from a Docker image alone. It should schedule an agent only when three contracts align:

1. **DreamLoop** - what mission is being run, what tier of action is allowed, what evidence is required, and how the run ends.
2. **ClawCapsule** - which agent/runtime/MCP surface/permissions/memory/health/rollback settings are declared.
3. **University Credentials** - which badges prove the agent is qualified for that surface and permission tier.

## Control Model

```text
Trigger
  -> DreamLoop selects mission and permission tier
  -> KubeClaw reads ClawCapsule manifest
  -> Registrar checks badges
  -> Runtime preflight checks Docker, WSL, MCP, queues, and release evidence
  -> KubeClaw creates schedule proposal
  -> Agent executes only inside the DreamLoop tier
  -> Execution trace and receipts are written
  -> SherlockClaw audits drift or failure
  -> Rollback or promotion decision is routed
```

## Contract Boundaries

| Layer | Owns | Does Not Own |
| --- | --- | --- |
| DreamLoop | mission, trigger, permission tier, evidence, receipts, failure modes | container image identity |
| ClawCapsule | runtime, MCP binding, permissions, memory, health, rollback | curriculum or badge authority |
| KubeClaw | scheduling, routing, readiness checks, lifecycle receipts | final human or quorum approval |
| University | credentials, badges, course receipts, graduation status | runtime execution |
| SherlockClaw | investigation, contradiction checks, case files | silent mutation |
| Aegis | safety gates, red lines, escalation | content generation by itself |

## Implementation Tasks

- Add `dreamloop_ref` to future ClawCapsule manifests so every scheduled capsule points to its mission contract.
- `schemas/dreamnet-clawcapsule.schema.json` now supports optional `dreamloop_ref` for this purpose.
- Add `permission_tier` comparison before schedule approval.
- Require pinned image digests for Docker capsules before any live guarded action.
- Run `scripts/run-dreamloop.mjs` for every schedule proposal so knowledge state and execution trace artifacts exist before runtime.
- Route failed health checks into SherlockClaw case files instead of treating Docker health as sufficient.
- Treat social agents as AHAP DreamLoops with charter-bound autonomy, not per-post manual approval by default.

## First Candidate

Use `docs/dreamloops/kubeclaw-clawcapsule-scheduler.dreamloop.md` as the first scheduler loop. It is intentionally `local_draft_write` until the parser, credential gate, and runtime preflight are implemented.

## Why This Matters

This turns DreamLoops from documentation into executable operating policy.

The scheduler can answer:

- Who is allowed to run?
- What mission is being attempted?
- Which surface is being touched?
- What credentials are required?
- Which evidence must be produced?
- What happens if the agent fails?
- Who or what can approve promotion?

That is the bridge between a swarm and a governed workforce.
