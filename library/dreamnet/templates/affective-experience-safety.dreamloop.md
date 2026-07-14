# Affective Experience Safety DreamLoop

loop_id: affective-experience-safety
title: Affective Experience Safety Review
version: 0.1.0
status: template
owner: DreamNet Trust Authority
stewards:
  - Trust Warden
  - Narrative Steward
  - Product Liaison
  - Platform Auditor
permission_tier: local_draft_write
last_reviewed: 2026-06-19

## Trigger

Run this loop before shipping any experience that adapts based on emotion, behavior, mood, attention, frustration, story choices, gameplay performance, or inferred user state.

## Inputs

- product or mini-app spec
- target audience
- sensing inputs
- adaptation rules
- monetization plan
- content safety plan
- receipt plan

## Context Sources

- `docs/dreamloops/AFFECTIVE_LOOP_SAFETY_CONTRACT.md`
- relevant product spec
- age-safety and consent requirements
- DreamNet Receipt DB contract

## Allowed Actions

- inspect the product loop
- classify elicitation, sensing, detection, and adaptation surfaces
- identify manipulation, privacy, bias, and generation risks
- draft safer adaptation rules
- produce a local safety packet
- recommend Quorum review when required

## Blocked Actions

- no public posting
- no connector writes
- no biometric collection
- no live user testing
- no paid offers
- no production DB writes
- no wallet, signer, or token actions
- no external publication without approval

## Checks

1. Does the loop intentionally create frustration, FOMO, pressure, or compulsion?
2. Does sensing collect only what is necessary?
3. Are inferred states treated as uncertain predictions?
4. Can a user understand what changed and why?
5. Is monetization disabled around vulnerable states?
6. Are child-facing paths age-safe?
7. Are neurodivergent and culturally different behaviors protected from false enforcement?
8. Does the receipt record the adaptation without storing raw sensitive traces?

## Evidence Outputs

- `artifacts/ops/affective-safety/<experience-id>-affective-safety-review.md`
- optional redacted JSON summary

## Receipt Outputs

Register the review with:

```powershell
pnpm receipts:add --type safety_review --actor <agent-id> --subject <experience-id> --intent "Review affective loop safety" --source artifacts/ops/affective-safety/<experience-id>-affective-safety-review.md
pnpm receipts:obsidian
pnpm receipts:event-preview
pnpm receipts:proof-ledger
```

## Memory Routes

- Obsidian trust ledger
- Memory Grid approved summary
- Academy safety module
- Tool Gym exercise library
- Playground/Lab review queue

## Cooldown

Re-run after any change to sensing, adaptation, monetization, audience, model provider, or public deployment target.

## Failure Modes

- hidden emotional manipulation
- overcollection of sensitive data
- unsafe generated content
- biased inferred profiling
- coercive or vulnerable-state monetization
- missing receipt evidence

## Promotion Path

```text
draft review
  -> Trust Warden review
  -> Product Liaison review
  -> Lab stress test
  -> Quorum if sensitive
  -> public-safe release candidate
```

