# SKILL - Proof Ledger Contract

**Status:** Design specification only; no runtime implementation is included in this directory.

**Purpose:** Defines canonical receipt creation, verification, indexing, and
evidence-chain requirements for significant actions.

## Expected Interfaces

- Canonicalize payloads before hashing.
- Verify hashes, signatures, timestamps, provenance, and referenced evidence.
- Return explicit valid, invalid, or unverifiable states.
- Preserve receipt lineage without storing credentials or private reasoning.

## Boundaries

- A receipt proves only the claims supported by its evidence.
- A self-authored note is not independent verification.
- Failed verification cannot be silently downgraded to success.
