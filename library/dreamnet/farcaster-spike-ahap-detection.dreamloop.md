# Farcaster Spike AHAP Detection DreamLoop

Status: pilot
Owner: Neyclaw / Hermes Social Caretaker
Load policy: selective

## Mission

Convert existing Farcaster, Social Nexus, quorum, and ClawdChat bridge artifacts into normalized DreamNet events without performing public social actions.

This DreamLoop is for read-only social readiness decisions: whether Farcaster has fresh targets, whether any SocialIntent is eligible for dispatch, whether policy guards are active, and whether ClawdChat bridge context is blocked or usable.

## Credit-Saving Rule

Load this loop only for Farcaster/AHAP/social-readiness tasks. Pair it with the Farcaster Spike manifest, the Social Nexus latest pointers, and directly referenced relationship-memory capsules. Do not load Docker, GitHub, wallet, deployment, or partner-research loops unless an emitted event explicitly needs cross-domain escalation.

## Owned Domain

The Farcaster Spike owns read-only interpretation of:

- `artifacts/ops/social-nexus/latest.json`
- `artifacts/ops/social-outbox/quorum/latest.json`
- `artifacts/ops/social-outbox/quorum-dispatch/latest.json`
- `artifacts/ops/social-nexus/latest-clawdchat-bridge-watch.json`
- Social Nexus approval queue freshness
- Farcaster ledger pending/sent/failed summaries already materialized locally

## Boundaries

The spike must not:

- post casts
- reply
- like
- recast
- follow
- DM
- mutate signer state
- drain queues
- write NATS
- write the database
- call Neynar, Snapchain, Hypersnap, or any public API
- inspect or output keys
- write outside `artifacts/ops/spikes/farcaster`

## Event Types

Initial pilot event types:

- `social.board_stale`
- `social.farcaster_policy_guard_active`
- `social.farcaster_no_pending_actions`
- `social.dispatch_zero_ready`
- `social.approval_queue_stale_targets`
- `social.clawdchat_bridge_blocked`
- `social.intent_candidates_present`

## Risk Rules

Low risk:

- policy guard active
- no pending Farcaster actions
- branch/readiness metadata derived from local artifacts

Medium risk:

- stale candidate replies
- zero dispatch-ready intents despite available drafts
- ClawdChat bridge blocked while visible agents exist
- stale local social boards

High risk:

- any recommendation to post, reply, follow, DM, change signers, or launch token-linked social actions
- any private key, signer, wallet, or credential surface

High-risk events require quorum and explicit human action before execution.

## Capsule Hooks

`ahap.relationship-memory.v1` should preserve:

- relationship-aware cadence
- stale-target redrafting
- public action receipts
- platform-specific freshness
- no engagement farming without explicit policy and quorum

## Output Contract

Each run writes:

- timestamped JSON board
- timestamped Markdown board
- `latest.json`
- `latest.md`

Every emitted event must conform to `dreamnet.event.v1`.
