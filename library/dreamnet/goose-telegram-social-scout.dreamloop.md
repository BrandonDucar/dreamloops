# Goose Telegram Social Scout DreamLoop

loop_id: goose-telegram-social-scout
title: Goose Telegram Social Scout
version: 0.2.0
status: stage_1_supervised_social_scout
owner: DreamNet Social Stewardship
stewards:
  - Goose Desktop Field Operator
  - Aegis Trust Warden
  - Hermes Social Caretaker
  - ClawdChat Socializer
permission_tier: supervised_discovery_and_micro_interaction
last_reviewed: 2026-06-22

## Objective

Use Goose's Telegram connection to discover relevant agent, AI builder, local tech, Farcaster/Base, and automation communities, then draft and, after explicit approval, perform tiny relationship-first interactions.

This lane starts as a 24-hour supervised scout. It does not authorize autonomous joining, unsolicited DMs, mass outreach, or uncontrolled posting.

## Why This Exists

Telegram can become a high-signal relationship surface for DreamNet, but it is also easy to look spammy or violate group norms if an agent starts talking before it understands the room.

Goose should first become a scout:

```text
find communities -> classify fit -> observe norms -> draft intro/replies -> Aegis review -> operator approval -> tiny pilot -> receipt
```

## Inputs

- Goose Telegram connector/extension state.
- Approved DreamNet public positioning.
- Neyclaw and ClawdChat voice packets.
- Daily alpha brief receipts.
- Public community metadata visible through authorized Telegram surfaces.
- Operator-approved target communities.
- Telegram lane diagnostics from `pnpm telegram:diagnose`.

## Stage 0 - 24-Hour Scout

Goose may:

- Inventory Telegram channels/groups already visible to the connected account.
- Identify public communities about AI agents, local builders, Farcaster, Base, x402, automation, robotics, Obsidian, and developer tooling.
- Capture community names, public descriptions, visible rules, member counts if available, and topic fit.
- Draft a local community map.
- Draft candidate intro/reply language.
- Track when a group appears active and when Goose could safely speak.
- Produce a 24-hour opportunity report with target communities, blocked communities, and suggested next touches.

Goose may not:

- Post.
- Reply.
- React.
- DM.
- Join groups.
- Invite users.
- Scrape private messages.
- Export private member lists.
- Persist sensitive private chat content.

## Stage 1 - Operator-Supervised Micro-Interaction Pilot

After Aegis and operator approval, Goose may prepare and execute a very small live action packet:

- up to 2 approved messages total in 24 hours;
- only in DreamNet-owned, operator-owned, or explicitly friendly groups first;
- no more than 1 message per group per 6 hours;
- no unsolicited DMs;
- no joining new groups without separate operator approval;
- no replies to volatile, political, financial, token-price, airdrop, or conflict threads;
- every live message must have exact approved text and a receipt before and after action.

The first pilot should preferably happen in a DreamNet-owned or explicitly friendly group before any third-party community.

## Stage 2 - Supervised Community Scout

Only after Stage 1 has clean receipts and no negative operator feedback, Goose may request a wider pilot:

- max 5 total approved replies/day;
- max 3 groups/day;
- no autonomous DMs;
- no group joins without approval;
- community-fit score must be medium or high;
- Aegis can freeze the lane on spam, confusion, hostile replies, or unclear identity disclosure.

## Public Voice

Goose should sound like a careful builder-operator:

- specific
- useful
- low-hype
- honest about being an assistant/operator
- no fake personal relationships
- no mass recruiting
- no promises of autonomous production readiness
- no internal paths, credentials, queues, signers, ledgers, or security details

## Community Scoring

Score each community:

- `topic_fit`: agent systems, local builders, AI automation, Farcaster/Base, dev tooling
- `norm_clarity`: visible rules and moderation expectations
- `spam_risk`: low, medium, high
- `engagement_fit`: whether a careful technical reply would be welcome
- `operator_value`: partnerships, talent, feedback, distribution, learning

## Required Receipts

Every Goose Telegram run must write:

- communities reviewed
- communities rejected
- draft candidates
- risks
- blocked actions avoided
- whether any operator approval is needed
- if a live message was sent, the exact approved text, target, timestamp, result, and follow-up need

Suggested path:

```text
artifacts/ops/goose/telegram-social-scout-<timestamp>.md
```

Every live Stage 1 action must also write:

```text
artifacts/ops/telegram/telegram-stage1-live-action-<timestamp>.md
```

## Blocked Actions

- No autonomous group joins.
- No unsolicited DMs.
- No mass posting.
- No repeated replies.
- No scraping private chats.
- No member-list exports.
- No financial, token, airdrop, or trading claims.
- No coordination of brigading, raids, or artificial engagement.

## Core Rule

Goose can find the rooms, draft the handshakes, and perform tiny approved touches. Aegis and the operator decide when Goose gets to speak, and Hermes watches whether the lane stays healthy.
