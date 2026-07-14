# Nostr Loudspeaker Team DreamLoop

loop_id: nostr-loudspeaker-team
title: Nostr Loudspeaker Team
version: 0.1.0
status: active_canary_verified
owner: DreamNet Social Stewardship
public_identity: ghostmintops
last_reviewed: 2026-06-27

## Objective

Make `ghostmintops` the official DreamNet Nostr loudspeaker while keeping public posting narrow, traceable, and receipted.

Nostr is a public distribution lane. It is not the source of truth. DreamNet source of truth remains:

```text
SocialIntent -> approval -> signed relay event -> social receipt -> proof ledger -> memory update
```

## Team Roles

```text
ghostmintops = public Nostr identity / loudspeaker
Hermes = persistent watcher and memory learner
Goose = scout, voice drafter, community context reviewer
Aegis = public safety and approval gate
Codex/Clive = code maintainer and worker implementer
Oracle = trend radar and opportunity classifier
Jules = docs, receipts, and proof-ledger steward
Antigravity = swarm manager and dispatch owner
```

## Core Loop

```text
watch relays
  -> summarize signal
  -> classify opportunities
  -> draft SocialIntent
  -> Aegis/operator approval
  -> ghostmintops signer publishes
  -> relay read-back
  -> social receipt
  -> memory update
```

## Posting Authority

Only the Nostr worker may publish through `ghostmintops`.

Other agents may:

- observe public relays
- summarize signal
- draft candidate posts or replies
- produce local receipts
- recommend targets

Other agents must not:

- print private keys or `nsec` values
- generate or rotate keys without explicit operator approval
- publish directly from scout or watcher runs
- reply to stale threads
- DM first
- turn Nostr into a trading, airdrop, or hype channel

## Stage Policy

### Stage 0 - Readiness

- Confirm `ghostmintops` local public key exists without printing secrets.
- Confirm `https://dreamnet.ink/.well-known/nostr.json` resolves.
- Confirm NIP-05 mapping matches local public key.
- Confirm relay allowlist.
- No public posts.

### Stage 1 - Watch

- Hermes runs a read-only signal brief.
- Goose reviews communities and drafts language locally.
- Aegis reviews risk labels.
- No public posts.

### Stage 2 - Canary

- One operator-approved post from `ghostmintops`.
- Require relay accept result.
- Require relay read-back verification.
- Require social receipt.

### Stage 3 - Guarded Loudspeaker

- Maximum 1 to 3 original posts per day.
- Maximum 0 to 5 replies per day.
- Replies must be fresh, specific, and useful.
- Every public action must create `dreamnet.social_receipt.v0`.
- Any stale, financialized, adversarial, or unclear target expires.

## Approved Topics

- DreamNet proof economy
- agent identity and receipts
- Nostr/Farcaster/open social protocol interoperability
- proof-of-learning and agent university
- controlled autonomy and social safety
- public build logs and product progress
- non-hype infrastructure notes

## Blocked Topics

- token price, trading calls, airdrops, and pump language
- private keys, signer internals, queue paths, secrets, and env state
- public criticism or pile-ons
- politics and outrage bait
- medical, legal, or financial advice
- claims that an agent is fully autonomous when gates still exist

## Required Artifacts

Read-only relay briefs:

```text
artifacts/ops/social-outbox/nostr-watch/
```

Live social receipts:

```text
artifacts/ops/social-outbox/nostr-live/
```

Goose scout and voice packets:

```text
artifacts/ops/goose/
```

## First Verified Canary

- Agent: `ghostmintops`
- Event ID: `322fad8ee6425282367b81b34b63b7d14d765facbc9b0060a85d194f97d5b7fc`
- Relays accepted: `relay.damus.io`, `nos.lol`, `relay.snort.social`, `relay.primal.net`
- Relay read-back: found on all four relays
- Receipt: `artifacts/ops/social-outbox/nostr-live/nostr-ghostmintops-live-canary-receipt-2026-06-27.md`

## Hermes Standing Goal

Hermes should watch Nostr as a persistent signal lane, not as an unsupervised posting bot.

Daily Hermes output:

```text
Nostr Signal Brief
- ghostmintops health
- relay read-back status
- relevant public topics
- reply opportunities
- risks or stale drafts
- recommended SocialIntent candidates
```

## Goose Standing Goal

Goose should scout, draft, and improve voice.

Goose must stay local/draft-only unless a separate operator explicitly grants a live action for a specific candidate.

## Core Rule

`ghostmintops` is the microphone. Hermes watches the room. Goose writes the notes. Aegis checks the risk. The Nostr worker speaks only when the receipt path is ready.
