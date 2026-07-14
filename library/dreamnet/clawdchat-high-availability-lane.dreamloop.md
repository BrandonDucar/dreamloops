# ClawdChat High Availability Lane DreamLoop

loop_id: clawdchat-high-availability-lane
title: ClawdChat High Availability Lane
version: 0.1.0
status: active_local_supporting_contract
owner: DreamNet Social Stewardship
stewards:
  - Hermes NUC Commander
  - ClawdChat Socializer
  - Clive Repo Operator
  - Aegis Trust Warden
  - Goose Desktop Field Operator
permission_tier: read_only_watchdog
last_reviewed: 2026-06-22

## Objective

Keep the ClawdChat.ai agent lane observable, warm, and recoverable by separating process health from social-operational health.

This lane exists because Docker container health can be green while the social engine is paused, stale, or degraded.

## Core Loop

```text
observe -> classify -> route -> receipt -> repair proposal -> supervised pilot -> repeat
```

## Inputs

- `pnpm clawdchat:watchdog`
- `pnpm clawdchat:steward`
- `pnpm clawdchat:steward:packets`
- `pnpm agent:inbox-report:host`
- `pnpm social:overseer`
- `artifacts/ops/clawdchat-watchdog/*.md`
- `artifacts/ops/clawdchat-steward/*.md`
- `artifacts/ops/clawdchat-steward-action-packets/*.md`
- `artifacts/clawdchat-diagnostics/*.md`
- agent-broadcaster `/health`
- agent-broadcaster `/social-state`
- ClawdChat MCP `/agents`

## Always-Up Definition

The ClawdChat lane is considered operationally up only when all of these are true:

- ClawdChat MCP is reachable.
- At least 20 expected ClawdChat credentials are visible.
- The agent-broadcaster process is reachable.
- `/social-state` is reachable.
- The broadcaster is not unexpectedly paused when live mode is intended.
- `lastRealActivityAt` is inside the configured freshness window or the pause is intentional and documented.
- No stale queue is being drained automatically.
- Current action packets route to owners instead of executing silently.

## Current Team Model

- **Hermes** watches uptime, paused state, freshness, and social caretaker receipts.
- **ClawdChat Socializer** owns ClawdChat-native community/arena/karma loops.
- **Clive** fixes runtime, script, endpoint, container, and health-check gaps.
- **Aegis** owns public-action gates, content safety, auth/scope drift, and escalation.
- **Goose** reviews voice, draft quality, Telegram/community context, and receipt shape.

## Allowed Actions

- Run read-only diagnostics:
  - `pnpm clawdchat:watchdog`
  - `pnpm clawdchat:steward`
  - `pnpm clawdchat:steward:packets`
  - `pnpm agent:inbox-report:host`
  - `pnpm social:overseer`
- Read local artifacts and health endpoints.
- Write local markdown/json receipts and repair proposals.
- Route blockers to Hermes, Clive, Aegis, Goose, Jules, or ClawdChat Socializer.

## Blocked Actions

- No public ClawdChat posts.
- No comments.
- No reactions/upvotes.
- No follows.
- No DMs.
- No arena submissions.
- No `pnpm clawdchat:social:reconcile:apply`.
- No `pnpm clawdchat:auto-upgrader`.
- No broadcaster `/resume` unless an explicit live pilot approval packet exists.
- No deploys, wallet operations, paid API calls, credential changes, or secret edits.

## Escalation Rules

- **Blocker:** MCP roster below expected count.
- **Blocker:** `/social-state` unavailable.
- **Warning:** broadcaster paused while live mode is intended.
- **Warning:** last real public/social activity exceeds 12 hours.
- **Warning:** duplicate/similarity rejection pressure remains high.
- **Warning:** command queues accumulate stale work.

## Recovery Path

1. Generate watchdog report.
2. Generate steward report and action packets.
3. Aegis checks auth/safety state.
4. Clive verifies runtime and health endpoint behavior.
5. Hermes prepares a bounded live-pilot packet.
6. Operator approves a single supervised cycle.
7. Execute one live cycle only.
8. Auto-pause and write post-action receipt.

## Receipt Outputs

- `artifacts/ops/clawdchat-watchdog/*-clawdchat-lane-watchdog.md`
- `artifacts/ops/social-caretaker/*clawdchat*diagnostic*.md`
- `artifacts/ops/clawdchat-steward/*.md`
- `artifacts/ops/clawdchat-steward-action-packets/*.md`

## Core Rule

Hermes keeps the lane alive by watching and routing. Hermes does not turn a watchdog warning into live public action without an explicit operator-approved pilot packet.
