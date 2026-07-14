# Goose Recipe Executor DreamLoop

loop_id: goose-recipe-executor
title: Goose Recipe Executor P.O.C.
version: 0.1.0
status: template
owner: DreamNet Workforce
stewards:
  - Platform Auditor
  - Operations Regent
  - Trust Warden
permission_tier: local_draft_write
last_reviewed: 2026-06-19

## Trigger

Run this loop when DreamNet wants Goose to execute a repeatable local workflow.

## Inputs

- approved `.dreamloop.md` source
- Goose recipe draft
- allowed command list
- target evidence path
- receipt type

## Context Sources

- `docs/dreamloops/GOOSE_INTEGRATION_CONTRACT.md`
- `docs/dreamloops/DREAMLOOP_PROTOCOL.md`
- `docs/RECEIPT_DB_CONTRACT.md`

## Allowed Actions

- read scoped local files
- execute approved local commands
- write local evidence artifacts
- create local receipts
- refresh local proof/event indexes

## Blocked Actions

- no public posting
- no git push or merge
- no deploys
- no production DB writes
- no wallet signing
- no secret changes
- no external connector writes without explicit promotion

## Checks

1. Does the recipe map to an approved DreamLoop?
2. Are allowed commands explicit?
3. Are blocked actions explicit?
4. Did Goose write a local evidence artifact?
5. Did the run emit a receipt?
6. Did the proof ledger index the result?
7. Were any permissions widened during execution?

## Evidence Outputs

- `artifacts/ops/goose/<loop-id>-<timestamp>.md`

## Receipt Outputs

```powershell
pnpm receipts:add --type tool_gym_run --actor goose --subject <loop-id> --intent "Run bounded Goose recipe executor loop" --source artifacts/ops/goose/<loop-id>-<timestamp>.md
pnpm receipts:obsidian
pnpm receipts:event-preview
pnpm receipts:proof-ledger
```

## Memory Routes

- Obsidian trust ledger
- proof ledger
- Tool Gym exercise library
- Agent Passport P.O.C. evidence

## Cooldown

Re-run only after recipe changes or permission-tier changes.

## Failure Modes

- recipe runs outside scoped commands
- evidence missing
- receipt missing
- permission widening
- hidden connector write
- command output not captured

## Promotion Path

```text
template
  -> local Goose dry run
  -> Tool Gym P.O.C.
  -> Trust Warden review
  -> Platform Auditor review
  -> scoped recipe runner promotion
```

