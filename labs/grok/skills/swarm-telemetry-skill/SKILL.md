# SKILL - Swarm Telemetry Contract

**Status:** Design specification only; no runtime implementation is included in this directory.

**Purpose:** Defines normalized, timestamped observability records for swarm components.

## Expected Output

```json
{
  "observed_at": "2026-07-13T00:00:00Z",
  "source": "runtime-probe-reference",
  "swarm_health": "unknown",
  "species_online": {"verified": 0, "declared": 7},
  "consensus": {"pending": 0},
  "receipts": {"valid": 0, "invalid": 0, "unverifiable": 0}
}
```

## Boundaries

- No green status without a fresh probe and receipt.
- Missing data remains `unknown`.
- This contract does not send alerts or write to external systems.
