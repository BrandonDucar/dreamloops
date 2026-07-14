# Shielded Cells and Synergy Capsules

Status: active architecture bridge  
Owner: DreamNet Runtime Council  
Last reviewed: 2026-06-30

## Summary

DreamNet already has the beginning of a cellular immune layer:

- `packages/shield-core/src/logic/cellularShield.ts` defines cellular shields for agents, services, components, packs, cores, and nodes.
- `packages/shield-core/src/logic/shieldLearner.ts` learns recurring threat patterns from observed events.
- `packages/shield-core/src/logic/threatDetector.ts` classifies runtime threats, including prompt injection.
- `server/routes/shield.ts` exposes shield, cellular, threat, spike, and rotation status routes.
- `LAB_SAFETY_MANIFEST.md` defines Dreamthrax as defensive lab vocabulary for isolating and repairing agent-system risks.
- `obsidian/policies/Agent Quarantine Policy.md` defines quarantine triggers and containment actions.

The missing product layer is a safe way for beneficial capabilities to spread across agents without becoming uncontrolled code propagation.

That layer is the **Synergy Capsule**.

## Definitions

### Shielded Cell

A Shielded Cell is any agent, service, capsule, or component wrapped with:

- identity
- permissions
- health signals
- threat counters
- memory scope
- quarantine rules
- receipts
- capability allowlist

In code terms, it maps to `CellularShield` plus the agent or service runtime it protects.

### Dreamthrax

Dreamthrax is the defensive lab lane. It simulates, detects, isolates, and repairs risk.

Dreamthrax should never mean malware, unauthorized access, public retaliation, or uncontrolled propagation. It means defensive drills, quarantine, evidence capture, and repair.

### Synergy Capsule

A Synergy Capsule is a portable, signed, receipt-backed capability packet.

It can carry:

- a prompt patch
- a social playbook
- an AHAP relationship pattern
- a ToolGym skill
- a University lesson
- a safety rule
- a model-router preference
- a workflow recipe
- a UI/UX pattern
- a memory update proposal

It must not carry:

- secrets
- raw private user data
- executable malware
- destructive commands
- signer authority
- wallet authority
- cloud mutation authority
- public posting authority by itself

### Beneficial Infector Cell

This is useful as a metaphor, but the runtime name should stay safer:

```text
Beneficial infector cell -> Synergy Capsule running inside a Shielded Cell
```

The point is not uncontrolled infection. The point is guided capability diffusion:

```text
One agent learns a useful pattern.
  -> Hermes records the learning.
  -> Aegis checks it.
  -> University grades it.
  -> KubeClaw schedules eligible agents.
  -> Shielded Cells receive the capsule.
  -> Receipts prove who adopted it and whether it helped.
```

## Control Flow

```text
Learning event
  -> Proof of Learning receipt
  -> Synergy Capsule proposal
  -> Aegis safety scan
  -> University / ToolGym validation
  -> KubeClaw eligibility check
  -> Shielded Cell adoption
  -> Runtime observation
  -> Dreamthrax quarantine if behavior drifts
  -> Memory Grid stores outcomes
```

## How This Applies To Social Agents

AHAP is a perfect first capsule family.

Example capsule:

```yaml
capsule: ahap.relationship-memory.v1
purpose: Improve human-aware social continuity.
payload:
  listen_before_reply: true
  max_actions_per_user_per_day: 1
  prefer_specific_replies: true
  avoid_template_engagement: true
  remember_public_relationships: true
blocked:
  - private_scraping
  - deceptive_impersonation
  - bulk_engagement
  - token_hype
  - signer_escalation
receipts:
  - social_action
  - social_learning
  - no_action_decision
  - quarantine_if_flagged
```

Neyclaw can inherit relationship patterns from Ghostmintops without copying Ghostmintops' identity. That means:

- use Ghostmintops as a graph and taste template
- let Neyclaw build its own friendships
- avoid bulk follow/like/reply loops
- keep one-action-per-user/day limits
- study who reciprocates naturally
- feed outcomes into Hermes and the morning brief

## Runtime Roles

| Layer | Role |
| --- | --- |
| Hermes | Stores learning events and proposes capsules from repeated wins. |
| GhostGooseOps | Acts as social publicist and AHAP evaluator. |
| Aegis | Scans capsule payloads for red lines and leak risk. |
| University | Grades whether the capsule is valid training material. |
| KubeClaw | Schedules only eligible Shielded Cells to receive the capsule. |
| Shield Core | Enforces integrity, threat counters, quarantine, and signal propagation. |
| Dreamthrax | Runs defensive lab simulations and repairs risky behavior. |
| Memory Grid | Stores adoption outcomes and social learning receipts. |

## Quarantine Triggers

A Shielded Cell receiving a Synergy Capsule should be quarantined or downgraded when it shows:

- unauthorized external action attempt
- repeated failed verification
- prompt-injection susceptibility
- cost runaway
- social safety violation
- repetitive template engagement
- private data boundary failure
- public post outside charter
- signer or wallet escalation attempt

## Minimal Implementation Plan

1. Define `dreamnet.synergy_capsule.v1` as a JSON schema.
2. Add capsule fields to future ClawCapsule manifests:
   - `capsules.allowed`
   - `capsules.blocked`
   - `capsules.last_adopted_at`
   - `capsules.required_receipts`
3. Add an AHAP capsule prototype for Farcaster and ClawdChat relationship-building.
4. Wire Hermes learning events into capsule proposal artifacts, not direct runtime mutation.
5. Add a KubeClaw preflight gate that checks:
   - badge eligibility
   - capsule safety scan
   - shield integrity
   - recent quarantine status
6. Add a Shield Core receipt for adoption, rejection, quarantine, and rollback.

## Product Meaning

This is DreamNet's safe emergence layer.

Instead of saying "34,000 agents all update themselves somehow," DreamNet can say:

```text
Every useful behavior becomes a signed capability capsule.
Every agent is a shielded cell.
Every adoption is gated, observed, and receipted.
Every failure teaches the immune system.
```

That turns emergence into infrastructure.
