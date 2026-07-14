# DreamLoop: Capsule Telemetry Sync

## loop_id
`dreamloop.capsule.telemetry-sync`

## title
Capsule Telemetry Comparison

## version
1.1.0

## status
draft

## owner
Swarm Observability

## stewards
- Telemetry steward
- Capsule steward

## permission_tier
local_draft_write

## trigger
A capsule steward requests comparison with a bounded telemetry window.

## inputs
- `capsule_id`
- `telemetry_window`

## context_sources
- Read-only telemetry adapter.
- Capsule manifest.

## allowed_actions
- Read declared telemetry.
- Produce a local comparison and metadata proposal.

## blocked_actions
- Do not change capsule traits or metadata.
- Do not send alerts or write to external telemetry systems.

## loop_body
1. Validate the telemetry source and time window.
2. Compare observed readings with declared capsule expectations.
3. Classify missing, stale, and anomalous readings.
4. Stage a metadata proposal with evidence links.

## checks
- Telemetry timestamps are fresh enough for the claim.
- No absent reading is interpreted as healthy.
- Every proposed change cites evidence.

## evidence_outputs
- Telemetry comparison report.

## receipt_outputs
- Read-only sync receipt.

## knowledge_state_outputs
- Proposed capsule metadata patch.

## execution_trace_outputs
- Source, window, and comparison trace.

## memory_routes
- Route verified anomaly summaries through the Memory Governor.

## iteration_rules
- One pass per requested window.

## cooldown
Defined by the telemetry source rate limit.

## failure_modes
- Source unavailable.
- Stale data.
- Capsule manifest missing.

## promotion_path
proposal -> reviewed -> verified implementation

## last_reviewed
2026-07-13
