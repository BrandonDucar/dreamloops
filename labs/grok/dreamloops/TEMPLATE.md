# DreamLoop Template

## loop_id
`dreamloop.example`

## title
Example DreamLoop

## version
0.1.0

## status
draft

## owner
[Owning DreamNet organ or team]

## stewards
- [Named steward]

## permission_tier
read_only

## trigger
[Explicit event, command, or schedule]

## inputs
- `input_1`

## context_sources
- [Bounded source]

## allowed_actions
- Read declared inputs.
- Produce local proposal artifacts.

## blocked_actions
- No public sends, spending, deployment, credential access, or external-state mutation.

## loop_body
1. Validate inputs.
2. Perform the bounded transformation.
3. Run checks.
4. Write evidence and receipt outputs.

## checks
- Schema validation.
- Permission validation.
- Provenance validation.

## evidence_outputs
- [Evidence artifact]

## receipt_outputs
- [Receipt artifact]

## knowledge_state_outputs
- [Proposed knowledge update]

## execution_trace_outputs
- [Bounded trace]

## memory_routes
- Route approved summaries through the Memory Governor.

## iteration_rules
- Maximum iterations: [number]
- Exit when checks pass or the loop reaches a declared failure state.

## cooldown
[Duration or none]

## failure_modes
- Invalid input.
- Missing authority.
- Failed check.

## promotion_path
draft -> reviewed -> verified

## last_reviewed
2026-07-13
