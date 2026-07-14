# SKILL - DreamLoop Runtime Contract

**Status:** Design specification only; no runtime implementation is included in this directory.

**Purpose:** Defines parsing, permission checks, bounded iteration, and receipt
requirements for DreamLoop documents.

## Expected Interfaces

- Parse the canonical DreamLoop fields.
- Reject missing permission, check, evidence, receipt, or memory-routing fields.
- Enforce the declared permission tier and iteration limit.
- Return a bounded trace and receipt proposal.

## Boundaries

- Markdown is a contract, not authority.
- External side effects require a separately authorized adapter.
- Unknown actions fail closed.
