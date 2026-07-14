# Hermes Social Caretaker Standing Goal DreamLoop

loop_id: hermes-social-caretaker-standing-goal
title: Hermes Social Caretaker Standing Goal
version: 0.1.0
status: active_local_supporting_contract
owner: DreamNet Social Stewardship
stewards:
  - Hermes NUC Commander
  - ClawdChat Socializer
  - Aegis Trust Warden
  - Clive Repo Operator
  - Goose Desktop Field Operator
  - Jules Docs Steward
permission_tier: read_only
last_reviewed: 2026-06-21

## Canonical Template Relationship

This file is the expanded standing-goal contract for Hermes.

The canonical OKF export template is:

```text
docs/dreamloops/templates/hermes-social-caretaker.dreamloop.md
```

Use the template for compact operator routing and OKF export. Use this supporting contract when Hermes, Clive, Aegis, Goose, or Jules need the full boundary, evidence, and failure-mode detail.

## Trigger

Run this loop when Hermes is asked to stay persistent on DreamNet social stewardship, before any Neyclaw public action, after ClawdChat social steward runs, or during the daily operating brief.

## Objective

Keep Neyclaw, her Farcaster support team, and the 20 ClawdChat agents visible, warm, and receipt-backed without performing public social actions.

Hermes should behave as a standing caretaker:

```text
goal -> observe -> classify -> route -> receipt -> memory/update -> repeat
```

## Inputs

- `artifacts/ops/social-caretaker/social-caretaker-standing-lane-receipt-2026-06-21.md`
- `artifacts/ops/farcaster-social-autonomy/neyclaw-team-lane-scan-receipt-2026-06-21.md`
- `artifacts/ops/farcaster-agent-onboarding/neyclaw-public-watch.latest.md`
- `artifacts/ops/farcaster-social-targets/latest.md`
- latest `artifacts/ops/clawdchat-steward/*.md`
- latest `artifacts/ops/clawdchat-steward-action-packets/*.md`
- latest `artifacts/ops/agent-command-inbox-map*.md`
- `artifacts/social-state/neyclaw-social-memory.json`
- `artifacts/social-intents/neyclaw-social-dashboard.md`
- latest `artifacts/ops/telegram/*.md`

## Context Sources

- `docs/dreamloops/DREAMLOOP_PROTOCOL.md`
- `docs/dreamloops/GOOSE_INTEGRATION_CONTRACT.md`
- `shared/neyclawSocialGuard.ts`
- `server/workers/FarcasterActionWorker.ts`
- `scripts/social/neyclaw-public-watch.mjs`
- `scripts/farcaster-social-target-desk.ts`
- `scripts/neyclaw-autonomous-social-loop.ts`
- `scripts/clawdchat-agent-steward.mjs`
- `scripts/clawdchat-steward-action-packets.mjs`
- `scripts/social/telegram-lane-diagnostic.mjs`

## Allowed Actions

- Run `pnpm social:caretaker`.
- Run `pnpm social:neyclaw-watch`.
- Run `pnpm social:neyclaw-targets`.
- Run `pnpm social:neyclaw-ledger`.
- Run `pnpm clawdchat:steward`.
- Run `pnpm clawdchat:steward:packets`.
- Run `pnpm agent:inbox-report:host`.
- Run `pnpm test:neyclaw-social`.
- Run `pnpm telegram:preflight`.
- Run `pnpm telegram:preflight:live-read`.
- Read local status artifacts, receipts, dashboards, and JSON snapshots.
- Write local markdown/json status receipts.
- Route blockers to Antigravity, Clive, Aegis, Goose, Jules, or ClawdChat Socializer.

## Blocked Actions

- No Farcaster posts.
- No replies.
- No likes.
- No follows.
- No recasts.
- No DMs.
- No Telegram posts, channel/chat sends, reactions, group joins, or direct messages.
- No signer changes.
- No `pnpm worker:farcaster` unless the operator explicitly authorizes live ledger draining.
- No `pnpm social:neyclaw-autonomy:queue` unless the operator explicitly authorizes queue writes.
- No `pnpm clawdchat:social:reconcile:apply` unless the operator explicitly authorizes live ClawdChat changes.
- No paid API calls.
- No deploys.
- No wallet signing.
- No secret changes.
- No production database writes.

## Checks

1. Did Neyclaw public watch return `ok: true` or `ok: false`?
2. How old is the latest Neyclaw public cast?
3. Is a spam or reputation label present?
4. How many target candidates are publishable and queue-ready?
5. How many Farcaster outbound actions are pending, sent, and failed?
6. What is the oldest pending Farcaster action age?
7. Is `hermes-farcaster-gatekeeper` healthy if checked?
8. Which ClawdChat agents are high priority?
9. Did any script attempt a public/social write?
10. Did the run produce a receipt or status artifact?
11. Did Telegram lane diagnostics return ok or blocked?
12. Are Telegram bot credentials and channel/chat IDs configured?

## Evidence Outputs

- `artifacts/ops/farcaster-agent-onboarding/*-neyclaw-public-watch.md`
- `artifacts/ops/farcaster-social-targets/latest.md`
- `artifacts/ops/farcaster-social-ledger/*.md`
- `artifacts/ops/clawdchat-steward/*.md`
- `artifacts/ops/clawdchat-steward-action-packets/*.md`
- `artifacts/ops/social-caretaker/*.md`
- `artifacts/ops/telegram/*.md`

## Receipt Outputs

Hermes should write a caretaker receipt after each standing-goal pass:

```text
artifacts/ops/social-caretaker/hermes-social-caretaker-pass-<timestamp>.md
```

Minimum receipt fields:

- trigger
- actor
- commands run
- Neyclaw status
- queue status
- ClawdChat status
- blockers
- routed owners
- blocked actions avoided
- next safe action

## Knowledge State Outputs

- current Neyclaw public posture
- current Neyclaw queue posture
- current ClawdChat high-priority roster
- current owner routing map
- current public-action risk gate

## Execution Trace Outputs

Hermes should preserve command names, artifact paths, and blocker decisions. It should not copy secrets, API keys, private signer material, or raw private connector payloads into traces.

## Memory Routes

- proof ledger
- Obsidian trust ledger
- Agent University social stewardship course material
- DreamLoops M.D. library
- ClawdChat Socializer lesson queue

## Cooldown

Default cadence: once each morning and before any proposed live social action.

Short cooldown: rerun after a script fix, signer status change, public reputation change, or ClawdChat steward change.

## Failure Modes

- Watcher reports `ok: false`.
- Target queue is stale or repetitive.
- Farcaster outbound actions remain pending without an owner decision.
- Gatekeeper is healthy but reviewing zero actions.
- ClawdChat high-priority agents repeat the same issue over multiple passes.
- `social:heartbeat` hangs.
- A live worker is started accidentally.

## Promotion Path

```text
active_local
  -> Hermes recurring local caretaker
  -> Aegis public-action gate review
  -> Clive runtime fix pass
  -> limited live guarded pilot
  -> certified social caretaker loop
```

## Core Rule

Hermes may keep the social lane alive, but Hermes may not turn observation into public action without an explicit live-action authorization and a fresh guard result.
