# DreamLoop: Knowledge Maintenance

## loop_id

`dreamloop.knowledge-maintenance.v1`

## title

Knowledge Maintenance

## version

`v1.0.0`

## status

`pilot`

## owner

DreamNet Memory Fabric

## stewards

- Memory Governor
- Genealogist
- AetherSafe

## permission_tier

`local_artifact_only`

## trigger

An operator supplies a bounded `KnowledgeBundle`, or schedules a lint pass over an existing local workspace.

## inputs

- Knowledge bundle
- Query text or proof request
- Explicit workspace path

## context_sources

- Immutable local source bundles
- Source state records
- Existing proof receipts
- DreamLoop and Capsule schemas

## allowed_actions

- Write beneath the selected local knowledge workspace
- Hash and index supplied documents
- Produce lint reports and verification receipts
- Draft a memory capsule from verified sources

## blocked_actions

- Network crawling
- LLM calls
- Public posting
- Database or cloud writes
- Obsidian promotion
- Capsule activation
- Signer or wallet use

## checks

- Reject unsafe document paths
- Preserve existing raw bundles
- Recompute evidence hashes from disk
- Require verified receipts for promotion
- Require verified sources for capsule creation

## evidence_outputs

- Content-addressed raw documents
- Source manifest and SHA-256 hashes
- Grounded query citations
- Lint findings

## receipt_outputs

- Knowledge proof receipt
- Promotion receipt
- Append-only activity records

## knowledge_state_outputs

- Source stage
- Source revision history
- Draft memory capsule manifest

## execution_trace_outputs

- `ledger/ingest.jsonl`
- `ledger/proof.jsonl`
- `ledger/promotion.jsonl`
- `reports/lint/latest.json`

## memory_routes

- Raw evidence remains local and immutable.
- Verified references may be proposed to Memory Governor.
- Obsidian and Graphiti are disabled projections until reviewed.

## cooldown

No recurring execution is enabled in Phase 1.

## failure_modes

- Duplicate bundle: return `duplicate` without rewriting evidence.
- Hash mismatch: reject proof.
- Missing receipt: block promotion.
- Unverified source: block capsule creation.

## promotion_path

Local acceptance test -> Aegis review -> adapter pilot -> Quorum approval -> bounded production activation.

## last_reviewed

2026-07-13
