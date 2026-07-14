# DreamLoop: Hybridization Proposal

## loop_id
`dreamloop.capsule.hybridization`

## title
Capsule Hybridization Proposal

## version
1.1.0

## status
draft

## owner
Evolution Engine

## stewards
- Genealogist steward
- Quorum steward

## permission_tier
artifact_draft_write

## trigger
An authorized caller proposes two verified parent capsules.

## inputs
- `parent_a`
- `parent_b`
- `inheritance_plan`
- `evidence_bundle`

## context_sources
- Verified parent manifests and receipts.
- Applicable inheritance and safety policies.

## allowed_actions
- Calculate a proposed DNA hash.
- Stage a child manifest and Quorum request locally.

## blocked_actions
- Do not activate, deploy, or register the child capsule.
- Do not claim Genealogist or Quorum approval without verified receipts.

## loop_body
1. Validate parent manifests and provenance.
2. Ask the Genealogist for a lineage assessment.
3. Stage inherited traits, conflicts, and a proposed DNA hash.
4. Package the proposal for required policy and Quorum review.
5. Record the result without performing activation.

## checks
- Both parents are verified and non-revoked.
- Inherited permissions cannot exceed parent or policy limits.
- DNA calculation is deterministic.

## evidence_outputs
- Parent comparison and inheritance report.
- Proposed child manifest.

## receipt_outputs
- Proposal receipt and any separately verified review receipts.

## knowledge_state_outputs
- Proposed Living Family Tree entry.

## execution_trace_outputs
- Hash and policy-check trace.

## memory_routes
- Route approved lineage summaries through the Memory Governor.

## iteration_rules
- Maximum three proposal revisions.
- Exit on approval, rejection, or pending-evidence status.

## cooldown
No automatic retry after rejection unless evidence changes.

## failure_modes
- Parent not verified.
- Permission escalation.
- Conflicting lineage.
- Quorum threshold not met.

## promotion_path
proposal -> reviewed -> verified implementation

## last_reviewed
2026-07-13
