# SKILL - Fish Swarm Orchestrator Contract

**Status:** Design specification only; no runtime implementation is included in this directory.

**Purpose:** Defines species discovery, health-evidence handling, bounded work
routing, and escalation contracts.

## Expected Interfaces

- Read a registry that separates definitions from runtime health.
- Route proposed work by declared capability and policy.
- Treat absent or stale health evidence as unknown, never healthy.
- Escalate failures without inventing recovery success.

## Boundaries

- The orchestrator is not the DreamNet Super Spine and does not replace it.
- Species assessments are advisory evidence.
- All external side effects remain behind authorized adapters and receipts.
