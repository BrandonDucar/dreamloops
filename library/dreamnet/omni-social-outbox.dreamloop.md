# Omni-Social Outbox DreamLoop

loop_id: omni-social-outbox
title: Omni-Social Outbox
version: 0.1.0
status: draft_local_contract
owner: DreamNet Social Stewardship
stewards:
  - Antigravity Swarm Manager
  - Hermes Social Caretaker
  - Clive Repo Operator
  - Aegis Trust Warden
  - Goose Desktop Field Operator
  - ClawdChat Socializer
permission_tier: local_draft_write
last_reviewed: 2026-06-26

## Objective

Create one durable social-intent contract for Farcaster, ClawdChat, Telegram, and Nostr so DreamNet agents can observe, draft, review, approve, and receipt social work without each platform inventing its own memory, queue, and approval model.

This DreamLoop does not grant public posting authority. It defines the shape of the queue and the gates required before any platform worker may act.

## Core Loop

```text
observe -> draft SocialIntent -> classify risk -> Aegis review -> operator/quorum approval -> platform worker -> receipt -> memory update -> repeat
```

## Inputs

- `docs/dreamloops/clawdchat-high-availability-lane.dreamloop.md`
- `docs/dreamloops/goose-nostr-social-scout.dreamloop.md`
- `docs/dreamloops/hermes-social-caretaker-standing-goal.dreamloop.md`
- `scripts/clawdchat-lane-watchdog.mjs`
- `scripts/report-clawdchat-agent-socialization.mjs`
- `scripts/reconcile-clawdchat-social-graph.mjs`
- `scripts/social/nostr-broadcast.mjs`
- `server/services/NatsService.ts`
- `packages/gooseclaw-daemon/src/workflows.ts`
- `packages/gooseclaw-daemon/src/activities.ts`

## SocialIntent Envelope

Every proposed outbound social action should first become a platform-neutral `SocialIntent`.

```yaml
schema: dreamnet.social_intent.v0
intent_id: string
created_at: iso_datetime
created_by:
  identity: string
  lane: goose | hermes | clawdchat-socializer | neyclaw | other
  source_receipt: string | null
platform:
  target: farcaster | clawdchat | telegram | nostr
  channel_or_context: string | null
  target_user: string | null
action:
  type: post | reply | reaction | follow | recast | dm | profile_update
  draft_text: string | null
  target_ref: string | null
  media_refs: []
reasoning:
  objective: string
  evidence_refs: []
  freshness_expires_at: iso_datetime
  target_fit: low | medium | high
risk:
  tier: low | medium | high | blocked
  labels: []
  blocked_reason: string | null
approval:
  status: draft | pending_aegis | pending_operator | approved_once | rejected | expired | sent | failed
  approved_by: []
  approval_receipt: string | null
execution:
  worker: farcaster-worker | clawdchat-worker | telegram-worker | nostr-worker | none
  max_attempts: number
  retry_after: iso_datetime | null
  result_receipt: string | null
```

## Queue Subjects

Preferred NATS JetStream subjects:

```text
dreamnet.social.outbox.draft
dreamnet.social.outbox.pending_aegis
dreamnet.social.outbox.pending_operator
dreamnet.social.outbox.approved
dreamnet.social.outbox.sent
dreamnet.social.outbox.failed
dreamnet.social.outbox.expired
```

No worker should consume directly from `draft` or `pending_*` subjects for public action. Platform workers may only consume an approved queue with a valid approval receipt and a non-expired freshness window.

## Platform Workers

### Farcaster Worker

- Applies Farcaster character/context rules.
- Requires Neyclaw/Farcaster signer gate.
- Must write cast/reply/reaction receipts.
- Must not drain stale queues.

### ClawdChat Worker

- Uses the ClawdChat MCP surface rather than raw credentials where possible.
- Respects per-agent cooldowns and `retry-after` behavior.
- Must run public-safety filtering before approval and immediately before send.
- Must not upvote, comment, follow, or post from old harmonization scripts without an explicit approved SocialIntent.

### Telegram Worker

- Starts as read-only scout and approved reply pilot.
- Must not join groups, scrape private chats, export members, or DM first.
- Uses community rules and operator-provided links as required context.

### Nostr Worker

- Treats `ghostmintops` as a public identity lane, not a payment lane.
- Starts with profile/readiness drafts only.
- Public relay writes require Stage 2 approval from the Nostr scout DreamLoop.
- No private key generation, reveal, storage, or rotation inside social worker runs.

## Persistence Model

Nostr is a sovereign relay surface, not the source of truth.

DreamNet source of truth:

```text
SocialIntent + approval receipt + execution receipt + proof-ledger hash + memory update
```

Nostr, Farcaster, ClawdChat, and Telegram are publication and interaction channels attached to that record.

## Always-Up Definition

The omni-social lane is healthy when:

- Hermes can run social caretaker diagnostics.
- ClawdChat watchdog can observe MCP roster and broadcaster state.
- Farcaster queue state is visible without draining.
- Telegram diagnostic can run without writing.
- Nostr remains in approved stage boundaries.
- Aegis can classify new SocialIntents.
- No stale pending intent is eligible for live execution.
- Proof ledger indexes the latest receipts.

## Blocked Actions

- No public posts from this DreamLoop alone.
- No replies, likes, follows, recasts, comments, DMs, or profile updates without platform-specific approval.
- No wallet signing, paid APIs, secret edits, or signer rotation.
- No raw secret or key output in reports.
- No automatic stale queue drain.
- No platform worker bypassing Aegis.

## Recovery Path

1. Hermes runs social caretaker diagnostics.
2. Clive checks endpoint/config drift.
3. Goose drafts voice and target-quality packets.
4. Aegis classifies SocialIntents.
5. Antigravity routes approved work to the correct owner.
6. Operator approves one bounded pilot if live action is desired.
7. Platform worker executes once.
8. Receipt and proof ledger update are written.

## Required Receipts

Architecture and readiness receipts:

```text
artifacts/ops/social-outbox/*
```

Live action receipts, if later approved:

```text
artifacts/ops/social-live/*
```

## Core Rule

The outbox makes DreamNet faster by standardizing social work, not by removing judgment. Freshness, target fit, public safety, and receipts are part of the action, not paperwork after the action.
