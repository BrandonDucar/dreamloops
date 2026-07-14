# KubeClaw ClawCapsule Scheduler DreamLoop

loop_id: kubeclaw-clawcapsule-scheduler
title: KubeClaw ClawCapsule Scheduler
version: 0.1.0
status: active_local_candidate
owner: DreamNet Runtime Council
stewards:
  - KubeClaw
  - SherlockClaw
  - Aegis Trust Warden
  - Hermes Registrar
  - Clive Repo Operator
permission_tier: local_draft_write
last_reviewed: 2026-06-30

## Objective

Turn a ClawCapsule manifest into a bounded, credential-gated, receipt-producing agent work cycle without granting unlimited runtime authority.

DreamLoops define the mission lifecycle. ClawCapsules define the agent, surface, runtime, permissions, memory, health, rollback, and receipt requirements. KubeClaw schedules only when both agree.

## Trigger

Run this loop when:

- a new ClawCapsule is proposed,
- an existing agent needs to bind to an MCP surface,
- a social or operations lane goes stale,
- a university badge should unlock a new runtime capability,
- a release candidate needs evidence gating before promotion.

## Context Sources

- `dreamloops.md`
- `docs/dreamloops/DREAMLOOP_PROTOCOL.md`
- `docs/architecture/dreamnet-implementation-board.md`
- `schemas/dreamnet-clawcapsule.schema.json`
- `scripts/run-dreamloop.mjs`
- `scripts/docker-model-runner-readiness.mjs`
- `docs/dreamloops/clawdchat-high-availability-lane.dreamloop.md`
- `docs/dreamloops/templates/neyclaw-autonomous-social.dreamloop.md`

## Inputs

- ClawCapsule manifest path.
- Agent identity and passport.
- Required university badges.
- MCP surface binding.
- Runtime kind and image digest.
- Permission tier.
- Memory scope.
- Required receipt types.
- Health signal list.
- Rollback strategy.

## Allowed Actions

- Read the ClawCapsule manifest.
- Validate the manifest against `schemas/dreamnet-clawcapsule.schema.json`.
- Read agent badge and registrar artifacts.
- Run read-only Docker, WSL, NATS, Temporal, and MCP diagnostics.
- Write local scheduler proposals, evidence artifacts, and receipts.
- Route blockers to SherlockClaw, Aegis, Hermes, Clive, or the human operator.

## Blocked Actions

- Do not start containers automatically.
- Do not resume public social workers.
- Do not send public posts, replies, DMs, reactions, or follows.
- Do not mutate production databases.
- Do not rotate secrets or alter signer configuration.
- Do not deploy to cloud providers.
- Do not bypass missing university credentials.

## Scheduling Checks

1. Manifest parses as valid JSON or YAML.
2. Manifest satisfies `dreamnet.clawcapsule.v1`.
3. Runtime image uses a pinned digest when `runtime.kind` is `docker`.
4. Agent has every `university.required_badges` entry.
5. MCP endpoint and whitelisted tools are reachable or marked blocked.
6. Requested permissions fit the DreamLoop permission tier.
7. Memory store exists and matches the declared scope.
8. Required receipt types include `observation` and `verification`.
9. Health signals include at least one process/runtime check and one receipt freshness check for long-lived agents.
10. Rollback strategy is explicit.

## Execution Circuit

```text
trigger
  -> load knowledge state
  -> parse ClawCapsule
  -> validate schema
  -> verify university credentials
  -> inspect runtime readiness
  -> inspect MCP surface
  -> compare permission tier
  -> create schedule proposal
  -> write evidence
  -> write receipt
  -> route next action
```

## Outputs

- Scheduler readiness report.
- Knowledge state artifact.
- Execution trace artifact.
- Manifest validation receipt.
- Blocker routing packet.
- Next safe action.

## Receipt Outputs

- `artifacts/ops/agent-state/kubeclaw-clawcapsule-scheduler/*-knowledge-state.md`
- `artifacts/ops/agent-state/kubeclaw-clawcapsule-scheduler/*-execution-trace.md`
- `artifacts/ops/kubeclaw/*-schedule-proposal.md`

## Promotion Path

```text
draft
  -> rehearsed with local receipts
  -> active_local scheduler
  -> live_guarded scheduler
  -> certified KubeClaw runtime route
```

## Core Rule

KubeClaw can recommend a schedule when the DreamLoop and ClawCapsule agree. It cannot promote the agent into live public action unless the target DreamLoop explicitly permits that action and the required approval or quorum condition is satisfied.
