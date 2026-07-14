# DreamLoop: Tartarian Knowledge Review

## loop_id
`dreamloop.knowledge.tartarian-review`

## title
Tartarian Knowledge Review

## version
1.1.0

## status
draft

## owner
Knowledge Governance

## stewards
- Evidence steward
- Quorum steward

## permission_tier
artifact_draft_write

## trigger
A capsule proposes adding a Tartarian-labeled knowledge fragment or capability claim.

## inputs
- `capsule_id`
- `knowledge_fragment`
- `evidence_bundle`

## context_sources
- Cited source artifacts.
- Capsule manifest and applicable knowledge policy.

## allowed_actions
- Classify the fragment as observed, inferred, speculative, or rejected.
- Stage a knowledge proposal and Quorum request.

## blocked_actions
- Do not activate capabilities.
- Do not publish unsupported claims as facts.
- Do not treat lineage review as action authorization.

## loop_body
1. Validate source provenance and classify each claim.
2. Ask the Genealogist only about inheritance implications.
3. Run policy checks and package any required Quorum request.
4. Stage the accepted knowledge proposal with uncertainty labels.

## checks
- Every factual claim has a resolvable source.
- Speculation remains explicitly labeled.
- Any required threshold and signatures verify.

## evidence_outputs
- Claim classification report.
- Source and counter-evidence bundle.

## receipt_outputs
- Knowledge review receipt or rejection receipt.

## knowledge_state_outputs
- Proposed capsule knowledge patch.

## execution_trace_outputs
- Classification, policy, and consensus trace.

## memory_routes
- Route approved summaries through the Memory Governor.

## iteration_rules
- Maximum three evidence revisions.
- Exit on accepted proposal, rejection, or pending-evidence status.

## cooldown
No automatic retry unless the evidence bundle changes.

## failure_modes
- Missing source.
- Unsupported factual claim.
- Invalid signature.
- Threshold not met.

## promotion_path
proposal -> reviewed -> verified implementation

## last_reviewed
2026-07-13
