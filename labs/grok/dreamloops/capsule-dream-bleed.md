# DreamLoop: Capsule Dream Bleed

## loop_id
`dreamloop.capsule.dream-bleed`

## title
Capsule Dream Insight Review

## version
1.1.0

## status
draft

## owner
Memory Fabric

## stewards
- Capsule steward
- Memory Governor steward

## permission_tier
local_draft_write

## trigger
A persistent-dream session closes with candidate insights.

## inputs
- `capsule_id`
- `dream_session_id`
- `candidate_insights`

## context_sources
- Session artifacts explicitly named by the caller.
- Target capsule manifest.

## allowed_actions
- Filter, cite, and stage candidate insights locally.
- Propose capsule memory references.

## blocked_actions
- Do not promote speculation as verified memory.
- Do not write to live memory stores or mutate the capsule manifest.

## loop_body
1. Validate source references.
2. Separate observations, inferences, and speculative material.
3. Deduplicate against declared capsule memory references.
4. Stage eligible insight proposals with provenance.

## checks
- Every proposal cites a source artifact.
- Sensitivity and authority metadata are present.
- Speculative claims remain labeled.

## evidence_outputs
- Dream insight review report.

## receipt_outputs
- Local review receipt with accepted and rejected candidates.

## knowledge_state_outputs
- Proposed memory-envelope records.

## execution_trace_outputs
- Source and classification trace.

## memory_routes
- Route accepted proposals to the Memory Governor for separate approval.

## iteration_rules
- One revision after failed checks.
- Exit with staged proposals or an empty-result receipt.

## cooldown
One run per closed session unless explicitly reopened.

## failure_modes
- Missing source.
- Sensitive content without policy metadata.
- Unresolvable provenance.

## promotion_path
proposal -> reviewed -> verified implementation

## last_reviewed
2026-07-13
