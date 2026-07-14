# DreamLoop: Capsule Genealogist Review

## loop_id
`dreamloop.capsule.genealogist-review`

## title
Capsule Lineage Review

## version
1.1.0

## status
draft

## owner
Genealogist

## stewards
- Genealogist steward
- Capsule steward

## permission_tier
artifact_draft_write

## trigger
A new capsule, parent change, mutation, or major version is proposed.

## inputs
- `capsule_id`
- `manifest`
- `parent_receipts`

## context_sources
- Capsule manifest and declared parents.
- Living Family Tree references.

## allowed_actions
- Validate lineage and provenance.
- Stage a lineage assessment and proposed manifest patch.

## blocked_actions
- Do not authorize deployment, publication, spending, or activation.
- Do not alter parent records without evidence.

## loop_body
1. Validate the manifest and parent references.
2. Recalculate lineage inputs and compare hashes.
3. Identify unsupported inheritance claims.
4. Produce a lineage assessment without applying it.

## checks
- Parent references resolve.
- DNA and content hashes are reproducible.
- No circular lineage exists.

## evidence_outputs
- Lineage assessment.
- Hash verification report.

## receipt_outputs
- Lineage review receipt marked verified, rejected, or pending evidence.

## knowledge_state_outputs
- Proposed Living Family Tree update.

## execution_trace_outputs
- Validation and comparison trace.

## memory_routes
- Route verified lineage summaries through the Memory Governor.

## iteration_rules
- Maximum two evidence corrections.
- Exit on verified lineage, rejection, or pending-evidence status.

## cooldown
None for a new manifest hash.

## failure_modes
- Missing parent receipt.
- Hash mismatch.
- Circular lineage.

## promotion_path
proposal -> reviewed -> verified implementation

## last_reviewed
2026-07-13
