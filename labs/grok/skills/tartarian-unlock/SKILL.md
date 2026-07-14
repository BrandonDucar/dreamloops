# SKILL - Tartarian Knowledge Review Contract

**Status:** Design specification only; no runtime implementation is included in this directory.

**Purpose:** Defines evidence review and uncertainty labeling for knowledge using
DreamNet's internal `Tartarian` taxonomy.

## Expected Interfaces

- Accept a cited knowledge fragment and counter-evidence bundle.
- Classify claims as observed, inferred, speculative, or rejected.
- Request lineage review only when inheritance is affected.
- Request Quorum review when a proposed capability or external action requires it.

## Boundaries

- The taxonomy does not establish historical truth.
- Unsupported claims cannot enter verified memory.
- This contract grants no capability activation or external-write authority.
