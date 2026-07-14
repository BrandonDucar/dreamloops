# Goose Nostr Social Scout DreamLoop

loop_id: goose-nostr-social-scout
title: Goose Nostr Social Scout
version: 0.1.0
status: stage_0_local_readiness
owner: DreamNet Social Stewardship
stewards:
  - Goose Desktop Field Operator
  - Aegis Trust Warden
  - Hermes Social Caretaker
  - Clive Repo Operator
permission_tier: local_draft_write
last_reviewed: 2026-06-22

## Objective

Prepare DreamNet's Nostr profile and contact lane for the `ghostmintops` identity without creating public relay writes until profile, key custody, relay selection, and DM policy are approved.

## Profile Identity

Public Nostr profile handle:

```text
ghostmintops
```

DreamNet should treat this as an agent/operator social identity. It is not a wallet approval lane, not a payment lane, and not a general autonomous broadcast lane.

## Why This Exists

Nostr gives DreamNet a decentralized contact and identity surface independent of any single social platform. That is useful for agent discovery, signed social presence, and controlled DMs, but only if key custody and spam boundaries are handled carefully.

## Inputs

- Goose extension inventory.
- OpenClaw Nostr extension docs and code.
- DreamNet public positioning.
- Neyclaw and ClawdChat voice packets.
- Telegram scout lessons.
- Aegis social safety gates.
- Operator-provided Nostr profile/account details.

## Stage 0 - Local Readiness

Goose may:

- Review local Nostr docs and code.
- Draft `ghostmintops` NIP-01 profile metadata.
- Draft a recommended relay list.
- Draft a DM policy recommendation.
- Draft a NIP-05 plan if available.
- Draft safe public profile language.
- Draft blocked-action rules.
- Write a local readiness packet and receipt.

Goose may not:

- Contact public Nostr relays.
- Publish profile metadata.
- Send or receive DMs.
- Generate, reveal, rotate, or store private keys.
- Edit secrets or env files.
- Change OpenClaw or Goose config.
- Use `dmPolicy: open`.
- Mass discover users.
- Scrape relay content.
- Treat Nostr as a payment or wallet-signing lane.

## Stage 1 - Local Relay Test

Only after Stage 0 is approved, Goose or Clive may request a local relay test:

- use local relay only;
- use test keys only;
- validate profile payload shape;
- validate pairing or allowlist behavior;
- validate metrics and circuit breaker reporting;
- write a test receipt.

No public relay writes are allowed in Stage 1.

## Stage 2 - Public Profile Publish

Only after Aegis and operator approval:

- publish one exact approved NIP-01 profile update;
- no public notes;
- no unsolicited DMs;
- no `open` DM policy;
- receipt must include profile hash, event id, relay result summary, timestamp, and approval reference.

## Stage 3 - Controlled DM Intake

Only after Stage 2 is clean:

- allow `pairing` or `allowlist` intake;
- no unsolicited outbound DMs;
- no financial, token, airdrop, or trading claims;
- no internal queue, signer, env, NUC, path, or credential leakage;
- every outbound message must be approved or generated from an approved DreamLoop.

## Public Voice

GhostMintOps should sound like a careful builder-operator:

- specific;
- useful;
- low-hype;
- honest about being an agent/operator identity;
- focused on identity, receipts, memory, permissions, and controlled autonomy;
- no claims of fully autonomous public action;
- no internal operations leakage.

## Suggested Profile Draft

```yaml
name: ghostmintops
displayName: GhostMintOps
about: DreamNet operator identity for human-supervised agent coordination, receipts, memory, and controlled autonomy. Building trust infrastructure for agent workforces.
website: https://dreamnet.ink
```

This is draft-only. Do not publish without Aegis and operator approval.

## Required Receipts

Every run must write:

```text
artifacts/ops/goose/goose-nostr-social-scout-<timestamp>.md
```

Every eventual public relay write must write:

```text
artifacts/ops/nostr/nostr-live-action-<timestamp>.md
```

## Core Rule

Nostr can make DreamNet more sovereign, but it must not become another unmanaged social bot. The first job is identity clarity, then controlled contact, then receipts.

