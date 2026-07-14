# DreamLoop: Capsule Consensus Request

## loop_id
`dreamloop.capsule.consensus-request`

## title
Capsule Consensus Request

## version
1.1.0

## status
draft

## owner
Quorum Governance

## stewards
- Consensus Engine steward
- Capsule steward

## permission_tier
artifact_draft_write

## trigger
A validated capsule action is classified as requiring Quorum review.

## inputs
- `capsule_id`
- `proposed_action`
- `evidence_bundle`

## context_sources
- Capsule manifest.
- Applicable policy and prior receipt references.

## allowed_actions
- Validate and package a local consensus request.
- Record signed decisions returned by an authorized Quorum runtime.

## blocked_actions
- Do not execute the proposed action.
- Do not invent signatures, approval, or receipt references.

## loop_body
1. Validate the capsule manifest and proposed action.
2. Package evidence and the required threshold.
3. Submit only through an authorized consensus adapter.
4. Verify returned signatures and threshold calculation.
5. Record the decision without performing the requested action.

## checks
- Manifest schema passes.
- Evidence references resolve.
- Required signers and threshold are satisfied.

## evidence_outputs
- Consensus request bundle.
- Signature verification report.

## receipt_outputs
- Consensus decision receipt or explicit rejection receipt.

## knowledge_state_outputs
- Proposed capsule governance-state update.

## execution_trace_outputs
- Request, response, and verification timestamps.

## memory_routes
- Route verified decision summaries through the Memory Governor.

## iteration_rules
- Maximum three evidence revisions.
- Exit on a verified decision or explicit rejection.

## cooldown
No automatic retry after rejection.

## failure_modes
- Missing evidence.
- Invalid signature.
- Threshold not met.

## promotion_path
proposal -> reviewed -> verified implementation

## last_reviewed
2026-07-13
