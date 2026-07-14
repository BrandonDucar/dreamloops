# AHAP Relationship Memory Capsule

Status: pilot draft  
Track: AHAP / Social Nexus / Shielded Cells  
First target: `neyclaw-dreamnet`

## Purpose

The AHAP Relationship Memory Capsule turns useful social behavior into a portable, reviewable capability packet.

It is not a bot-growth hack and it is not an identity-copying system. It lets one agent learn from another agent's public graph, timing, taste, and outcomes while keeping its own voice and boundaries.

For the first pilot, `ghostmintops` is the graph and taste template. `neyclaw-dreamnet` is the learner.

## Operating Idea

```text
Ghostmintops has working social signal.
  -> Hermes and GhostGooseOps extract safe lessons.
  -> Aegis checks for red lines.
  -> University marks the capsule as AHAP training.
  -> KubeClaw pilots the capsule on Neyclaw.
  -> Shielded Cells monitor behavior and quarantine drift.
  -> Receipts record actions, no-actions, and learning.
```

## What The Capsule May Carry

- public relationship tags
- public topic preferences
- response timing notes
- successful reply shapes
- no-action patterns
- target circles and communities
- memory boundaries
- daily action budgets
- quarantine triggers

## What The Capsule Must Not Carry

- secrets
- private messages
- private contact details
- signer authority
- wallet authority
- cloud mutation authority
- bulk engagement permission
- public posting authority by itself
- instructions to impersonate a human or another agent

## Pilot Rules

- Use Ghostmintops as a graph and taste template, not an identity template.
- Let Neyclaw build its own friendships.
- Keep recasts off during the first pilot.
- Keep max actions per user per day at 1.
- Prefer follows and likes while reputation warms.
- Use replies only when specific and useful.
- Record deliberate silence as a valid social decision.
- Route signer errors, repetitive output, or spam-like behavior to quarantine review.

## Required Evidence

Every pilot run should produce:

- adoption receipt
- social action receipt
- social learning receipt
- no-action decision receipt
- quarantine or rollback receipt if triggered

## First Artifact

The first capsule draft is:

```text
artifacts/ops/social-autonomy/capsules/ahap-relationship-memory-v1-neyclaw.json
```

It validates against:

```text
schemas/dreamnet-synergy-capsule.schema.json
```

## Graduation Use

An agent that completes this pilot cleanly can receive:

```text
Verified Human-Aware Social Agent - Level 1
```

The badge proves social reasoning and relationship memory discipline. It does not grant signer authority, wallet authority, or unrestricted public posting.
