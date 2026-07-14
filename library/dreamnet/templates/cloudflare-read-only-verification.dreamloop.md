# Cloudflare Read-Only Verification DreamLoop

loop_id: cloudflare-read-only-verification
title: Cloudflare Read-Only Verification
version: 0.1.0
status: active-candidate
owner: DreamNet Cloud Steward
stewards:
  - DreamOps Runtime
  - Platform Auditor
  - Trust Warden
  - Goose Desktop Field Operator
permission_tier: read_only
last_reviewed: 2026-06-21

## Trigger

Run this loop when DreamNet needs to understand Cloudflare status, tool availability, or receipt coherence without mutating Cloudflare resources.

Common triggers:

- Wrangler authentication was refreshed.
- Cloudflare docs MCP configuration changed.
- Memory Grid L3 bridge health needs a read-only status check.
- A Cloudflare receipt or proof-ledger artifact changed.
- Antigravity, Goose, Codex, or Hermes needs a common Cloudflare status vocabulary.

## Inputs

- `artifacts/ops/cloudflare/*.md`
- `artifacts/ops/proof-ledger/dreamnet-receipt-proof-ledger.latest.md`
- `artifacts/ops/proof-ledger/dreamnet-receipt-proof-ledger.latest.json`
- `.mcp.json`
- `docs/okf/systems/cloudflare-lanes-guide.md`
- `docs/dreamloops/GOOSE_INTEGRATION_CONTRACT.md`
- optional explicitly approved read-only command output

## Context Sources

- `docs/dreamloops/DREAMLOOP_PROTOCOL.md`
- `docs/okf/index.md`
- `docs/okf/systems/cloudflare-lanes-guide.md`
- `artifacts/ops/cloudflare/cloudflare-agent-setup-prompt-2026-06-21.md`
- `artifacts/ops/cloudflare/cloudflare-docs-mcp-config-receipt-2026-06-21.md`
- `artifacts/ops/cloudflare/cloudflare-wrangler-read-check-closure-2026-06-21.md`
- `artifacts/ops/goose/goose-cloudflare-docs-mcp-state-reconciliation-20260621-124701.md`
- `artifacts/ops/goose/goose-cloudflare-docs-reference-knowledge-recipe-20260621-124701.md`
- `artifacts/ops/goose/goose-cloudflare-docs-stop-rules-20260621-124701.md`

## Reference Knowledge Rule

`cloudflare-docs` is an OKF/reference-knowledge surface only. It may explain Cloudflare concepts, products, configuration fields, troubleshooting paths, limits, and best practices, but it does not authorize deploys, mutations, Wrangler commands, secret changes, NUC control, connector writes, or public actions.

If a `cloudflare-docs` answer implies an action, create a local handoff, proposal, or separate DreamLoop instead of acting inside this loop.

## Allowed Actions

- Read local Cloudflare receipts and setup prompt artifacts.
- Read `.mcp.json` and report configured Cloudflare MCP surfaces.
- Read latest proof-ledger Markdown and JSON.
- Run exactly approved read-only commands when operator scope explicitly allows them, such as:
  - `pnpm exec wrangler whoami`
  - `pnpm exec wrangler vectorize list`
  - `pnpm receipts:validate-links -- --summary`
- Draft local reports, execution traces, and receipts.
- Recommend handoff to Codex, Antigravity, Goose, Hermes, Aegis, or the operator.

## Blocked Actions

- no Cloudflare deploys
- no Worker deploys
- no Pages deploys
- no DNS edits
- no KV writes
- no R2 writes
- no D1 writes
- no Queue writes
- no Durable Object writes
- no Worker binding edits
- no secret creation, deletion, rotation, or printing
- no build triggers
- no rollbacks
- no connector writes
- no database writes
- no Docker changes
- no wallet signing
- no NUC control unless handed to Hermes under a separate runtime loop
- no public posts
- no automatic execution of vendor setup prompts

## Checks

1. Did the run identify the exact Cloudflare lane being checked?
2. Are Cloudflare Plugin/MCP, Wrangler CLI, and Worker Bridge status kept separate?
3. Does the run distinguish configured docs MCP from write-capable MCPs?
4. Were commands read-only and explicitly allowed?
5. Were deploys, resource mutations, secrets, and connector writes avoided?
6. Did the run write a local receipt?
7. Did the proof ledger index the result?
8. Did receipt-link validation pass?
9. Were docs MCP answers labeled as reference knowledge rather than execution authority?

## Evidence Outputs

- `artifacts/ops/cloudflare/<timestamp>-cloudflare-read-only-verification.md`
- `artifacts/ops/goose/<timestamp>-cloudflare-read-only-verification-report.md`
- `artifacts/ops/goose/<timestamp>-cloudflare-read-only-verification-execution-trace.md`

## Receipt Outputs

- `artifacts/ops/cloudflare/<timestamp>-cloudflare-read-only-verification-receipt.md`
- `artifacts/ops/goose/<timestamp>-cloudflare-read-only-verification-run-receipt.md`
- `artifacts/ops/goose/<timestamp>-cloudflare-read-only-verification-run-receipt.json`

## Knowledge State Outputs

- agent-specific knowledge state when Goose, Hermes, Clive, or Codex runs this loop
- source path and hash list for all Cloudflare receipts read

## Execution Trace Outputs

- commands requested
- commands executed
- commands skipped
- local files read
- local files written
- blocked actions avoided
- final handoff owner

## Memory Routes

- proof ledger
- Obsidian trust ledger when receipt export is active
- Google Drive DreamNet Vault when operator mirroring is active
- DreamNet Academy / Tool Gym Cloudflare lane curriculum

## Cooldown

Do not re-run more often than once per Cloudflare lane change unless an operator requests an immediate verification.

## Failure Modes

- vendor prompt treated as execution authority
- Wrangler auth healthy but MCP surface missing
- docs MCP present but not loaded until agent restart
- docs MCP answer interpreted as verified account state without a separate read-only check
- docs MCP answer interpreted as permission to act
- Markdown proof ledger preview mistaken for canonical full index
- command output includes secret-like material
- read-only check silently widens into deploy or mutation

## Promotion Path

```text
active-candidate
  -> Goose local recipe run
  -> Codex receipt-link validation
  -> Aegis boundary review
  -> Antigravity workspace integration
  -> certified read-only Cloudflare status loop
```
