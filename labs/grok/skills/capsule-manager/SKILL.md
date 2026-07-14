# SKILL - Capsule Steward Contract

**Status:** Design specification only; no runtime implementation is included in this directory.

**Purpose:** Defines validation, versioning, inheritance, packaging, and receipt
requirements for DreamNet Capsules.

## Expected Interfaces

- Validate `capsule.md` and `manifest.json` against the Capsule specification.
- Stage new capsule proposals from templates or verified lineage events.
- Ask the Genealogist for lineage and provenance review.
- Ask Quorum for action authorization when policy requires it.
- Produce local receipt proposals for significant state transitions.

## Boundaries

- A capsule is inert until an authorized runtime loads it.
- This contract grants no publication, spending, infrastructure, or external-write authority.
- Missing evidence keeps capsule activation blocked.

## Integration Contracts

- Fish Swarm Orchestrator: bounded routing proposal.
- Genealogist: lineage and provenance only.
- Quorum: policy and action authorization.
- Proof Ledger: receipt validation and indexing.
