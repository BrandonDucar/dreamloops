# Developer Code Refactor DreamLoop

loop_id: developer-code-refactor
title: Developer Code Refactor
version: 0.1.0
status: template
owner: DreamNet Developer Swarm
stewards:
  - Antigravity
  - Lead Architect
  - Code Auditor
permission_tier: private_branch_write_candidate
last_reviewed: 2026-06-23

## Trigger

Run this loop when a source file contains high complexity, deep nested conditionals, redundancy, or needs to align with clean coding standards (e.g. AGENTS.md).

## Inputs

- target file path
- specific refactoring requirements (e.g., complexity reduction, memory leak audit)
- active rules (such as AGENTS.md guidelines)

## Context Sources

- target source file
- `AGENTS.md` (project boundaries)
- existing compiler configuration (`tsconfig.json`)

## Allowed Actions

- read target source code and type signatures
- refactor conditionals into guard clauses
- split monolithic logic into small, modular helper functions
- write local modified drafts to target files
- run compiler checks (`tsc` or `check` scripts)

## Blocked Actions

- do not change the public API surface or function signatures unless approved
- do not delete JSDocs, inline comments, or existing TS type annotations
- do not introduce external dependencies without approval
- do not push changes directly to main branch
- do not deploy to production

## Checks

1. Does the code compile without errors?
2. Are all existing tests passing after the refactor?
3. Were nested blocks successfully reduced to guard clauses?
4. Are JSDoc descriptions and type safety preserved?
5. Does the refactored code introduce any memory leak risks?
6. Has all redundant/duplicate code been removed?

## Evidence Outputs

- Code diff of target files.
- Compilation log output (`npm run check`).

## Receipt Outputs

```bash
pnpm receipts:add --type code_refactor --actor antigravity --subject <file_basename> --intent "Reduce file complexity and simplify conditional branches" --source <diff_file_path>
pnpm receipts:proof-ledger
```

## Memory Routes

- Local git changes index
- Swarm proof ledger
- Code governance log

## Cooldown

Re-run when target source file undergoes significant updates or when performance drift is detected.

## Failure Modes

- compilation failure
- regression in unit tests
- loss of type definitions
- changing public API contract without authorization
- introducing undocumented dependencies

## Promotion Path

```text
analyze file
  -> run refactor loop
  -> local compilation check
  -> local unit test verification
  -> git diff approval
  -> commit to private branch
  -> merge PR to main
```
