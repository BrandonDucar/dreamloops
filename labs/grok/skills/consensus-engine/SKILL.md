# SKILL - Consensus Engine Contract

**Status:** Design specification only; no runtime implementation is included in this directory.

**Purpose:** Defines evidence, threshold, signature, and receipt requirements for
high-impact Capsule and DreamLoop decisions.

**Owner:** Quorum Governance. The Genealogist is consulted only for lineage and provenance.

## Expected Interfaces

- Accept a typed proposal, evidence bundle, signer policy, and threshold.
- Return signed votes, threshold calculation, counter-evidence, and a decision receipt.
- Distinguish approval, rejection, timeout, and invalid-evidence outcomes.
- Preserve the separation between a decision receipt and later action handling.

## Boundaries

- Consensus does not perform the requested external action.
- Genealogist review cannot substitute for the required Quorum threshold.
- No approval may be inferred from missing, stale, or unverifiable signatures.

## Integration Contracts

- Capsule Steward: proposal source.
- Fish Swarm Orchestrator: bounded reviewer routing.
- Proof Ledger: signature and receipt validation.
