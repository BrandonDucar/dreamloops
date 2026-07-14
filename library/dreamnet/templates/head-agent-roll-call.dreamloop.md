---
loop_id: "head-agent-roll-call-template"
title: "Head Agent Roll Call DreamLoops M.D."
version: "0.1.0"
status: "template"
owner: "DreamNet University Registrar"
stewards: ["Genealogist", "Hermes", "Clive", "Codex", "Antigravity"]
permission_tier: "read_only"
trigger: "Operator requests real agent availability, role, and readiness state."
last_reviewed: "2026-06-19"
---

# Head Agent Roll Call DreamLoops M.D.

## Mission

Confirm which head agents, departments, company leaders, guild heads, and specialist crews are actually present, reachable, and assigned before dispatching work to the broader 34,012-agent census.

## Inputs

- agent registry
- genealogist metrics
- passport registry
- workforce operating board
- heartbeat conductor state
- memory grid health
- NUC or local worker health

## Allowed Actions

- read registries and health endpoints
- classify agents by role and availability
- identify missing passports or stale owners
- draft dispatch recommendations
- write a local roll-call receipt

## Blocked Actions

- spawning new live agents
- changing permissions
- granting write access
- publishing social content
- writing production databases
- editing wallet or signer state

## Steps

1. Count the full census and active heads separately.
2. Check local services for Genealogist, Memory Grid, Hermes, Clive, and ClawdChat.
3. Group agents by college, department, company, guild, and mission lane.
4. Identify which heads can receive DreamLoops today.
5. Write a roll-call packet with blockers and next owners.

## Checks

- Are root agents and child agents separated?
- Are live checks separated from static file inventory?
- Are missing credentials treated as blockers, not failures?
- Are only verified lanes recommended for work?

## Evidence Outputs

- `artifacts/ops/agent-university/<date>-head-agent-roll-call.md`

## Receipt Outputs

- `artifacts/ops/agent-university/<date>-head-agent-roll-call.dreamloop.receipt.md`

## Memory Routes

- Registrar index
- Agent Passport queue
- Academy faculty map
- Workforce operating board
