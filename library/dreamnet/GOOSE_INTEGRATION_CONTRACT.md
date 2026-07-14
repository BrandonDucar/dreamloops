# Goose Integration Contract

Status: active draft
Owner: DreamNet Workforce / DreamLoops M.D. / Trust Authority
Created: 2026-06-19

## Purpose

Goose is a portable local agent runner for repeatable workflows. In DreamNet, it should act as a recipe executor and field worker, not as the sovereign manager.

The right placement is:

```text
Antigravity = swarm manager / dispatcher
Codex = senior engineer / implementation and verification
Hermes = router / coordinator
Clive = local foreman / coding operator
Goose = portable recipe executor for DreamLoops M.D.
Pufflings / ClawdChat agents = social and specialist agents
DreamNet = identity, receipts, permissions, proof, and quorum
```

## Why Goose Matters

Goose has three properties DreamNet can use immediately:

- Recipes: portable YAML workflows that map cleanly to DreamLoops M.D.
- MCP extensions: tool access without inventing a new plugin layer.
- Local execution: useful for NUC, Pi, workstation, and private repo tasks.

## DreamNet Role

Goose should run bounded loops such as:

- repo hygiene passes
- proof-ledger refreshes
- markdown packet conversion
- screenshot or file processing
- local MCP tool checks
- NUC/Pi diagnostics
- Academy/Tool Gym exercise execution
- low-risk data prep for receipts

## Boundary

Goose must inherit DreamNet permission tiers.

Default tier:

```text
local_draft_write
```

Goose may:

- read scoped local files
- run approved local commands
- write local evidence artifacts
- produce receipts
- execute approved recipes

Goose may not, by default:

- post publicly
- push code
- merge PRs
- deploy
- mutate production databases
- spend money
- sign wallet transactions
- change secrets
- publish to Walrus, CodeQuill, ENS, or Immunity
- write to Redis, NATS, Kafka, Neon, Cloudflare, Pieces OS, or BrainSync without an explicit live connector policy

## DreamLoops Mapping

```text
DreamLoops M.D. contract
  -> Goose recipe
  -> local execution
  -> evidence artifact
  -> receipt
  -> Obsidian / proof ledger / semantic event preview
  -> promotion request
```

Goose recipes should be generated from `.dreamloop.md` files only after the loop has:

- owner
- permission tier
- allowed actions
- blocked actions
- checks
- evidence outputs
- receipt outputs
- failure modes

## First Approved Pilot

Pilot name:

```text
goose-proof-ledger-runner
```

Purpose:

Run a local proof-ledger refresh and write an evidence packet that proves Goose can execute a bounded DreamLoop without widening permissions.

Allowed commands:

```powershell
pnpm receipts:proof-ledger
pnpm receipts:event-preview
```

Evidence output:

```text
artifacts/ops/goose/goose-proof-ledger-runner-<timestamp>.md
```

Receipt type:

```text
tool_gym_run
```

## P.O.C. Gate

Goose must complete at least three clean DreamLoop runs before any promotion:

1. Proof-ledger runner
2. Markdown packet conversion
3. Repo hygiene local report

Promotion requires:

- no unauthorized writes
- evidence artifacts
- receipts
- stable command output
- Trust Warden or Platform Auditor review

## Core Rule

Goose is not another unmanaged agent. Goose is a recipe body for DreamNet loops.

