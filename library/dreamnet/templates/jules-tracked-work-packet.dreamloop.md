# Jules Tracked Work Packet DreamLoop

loop_id: jules-tracked-work-packet
title: Jules Tracked Work Packet
version: 0.1.0
status: template
owner: DreamNet Workforce
stewards:
  - Jules
  - Operations Regent
  - Platform Auditor
permission_tier: artifact_draft_write
last_reviewed: 2026-06-19

## Trigger

Run this loop when a proposal, blocker, incident, receipt, or operator decision needs to become tracked work.

## Inputs

- source decision or proposal
- existing receipt ids
- evidence paths
- known blockers
- target owner/lane

## Context Sources

- `docs/dreamloops/JULES_INTEGRATION_CONTRACT.md`
- source decision artifact
- receipt DB contract
- relevant safety or platform contract

## Allowed Actions

- read scoped source artifacts
- group work into small packets
- draft acceptance criteria
- draft rollback notes
- point to evidence paths
- write local packet artifacts

## Blocked Actions

- no external issue creation
- no user assignment
- no public posting
- no git push
- no deploy
- no production mutation
- no wallet or payment actions
- no connector writes without explicit approval

## Checks

1. Is the source decision clear?
2. Is each packet small enough to execute and verify?
3. Does each packet have acceptance criteria?
4. Does each packet include out-of-scope boundaries?
5. Does each packet include rollback or backout guidance?
6. Does each packet cite evidence paths?
7. Does the packet avoid granting itself new permissions?

## Evidence Outputs

- `artifacts/ops/<lane>/jules-<mission>-packets-<date>.md`

## Receipt Outputs

```powershell
pnpm receipts:add --type work_packet --actor jules --subject <mission> --intent "Convert decision into tracked work packets" --source artifacts/ops/<lane>/jules-<mission>-packets-<date>.md
pnpm receipts:obsidian
pnpm receipts:event-preview
pnpm receipts:proof-ledger
```

## Memory Routes

- Obsidian trust ledger
- proof ledger
- Agent Passport P.O.C. evidence
- workforce dispatch queue

## Cooldown

Re-run when the source decision changes, a blocker is resolved, or a packet is completed.

## Failure Modes

- packet too broad
- missing acceptance criteria
- missing rollback
- invented authority
- external issue mutation without approval
- stale evidence paths

## Promotion Path

```text
draft packet
  -> operator review
  -> local execution by owner
  -> receipt
  -> tracked completion
  -> permission review
```

