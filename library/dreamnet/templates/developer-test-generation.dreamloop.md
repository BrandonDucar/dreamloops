# Developer Test Generation DreamLoop

loop_id: developer-test-generation
title: Developer Test Generation
version: 0.1.0
status: template
owner: DreamNet Developer Swarm
stewards:
  - Antigravity
  - Test Lead
  - Quality Assurance
permission_tier: local_draft_write
last_reviewed: 2026-06-23

## Trigger

Run this loop when a new feature, service, or component is added, or when existing test coverage is below target thresholds.

## Inputs

- target implementation file path
- existing test config (e.g. vitest.config.ts or jest.config.js)
- boundary requirements (limits, null states, timeouts)

## Context Sources

- target implementation code
- existing test scripts and configuration
- mock requirements for external systems (NATS, Kafka, Postgres, Redis)

## Allowed Actions

- read implementation source files and directory structure
- mock network adapters, database clients, and messaging handlers
- generate unit and integration test specs matching implementation interfaces
- execute the test runner locally (`npm test` or `vitest run`)
- write new test files directly to disk (e.g., `src/*.test.ts`)

## Blocked Actions

- do not use real database credentials or connect to live production endpoints
- do not change implementation logic to make tests pass
- do not bypass compiler validation or type checkers
- do not push code modifications without verification

## Checks

1. Does the test suite run completely locally without hitting external networks?
2. Are all boundary conditions (nulls, timeouts, exceptions, overrides) explicitly tested?
3. Does test coverage reach the target threshold?
4. Are mock adapters clean and fully isolated?
5. Are assertions specific and deterministic?

## Evidence Outputs

- Test execution logs (success count, execution time).
- Test coverage reports.

## Receipt Outputs

```bash
pnpm receipts:add --type test_generation --actor antigravity --subject <file_basename> --intent "Generate 100% boundary-coverage unit test suite with mock adapters" --source <test_file_path>
pnpm receipts:proof-ledger
```

## Memory Routes

- Local git index
- Swarm proof ledger
- Test coverage dashboard

## Cooldown

Re-run when implementation logic changes or test configurations are updated.

## Failure Modes

- flaky / non-deterministic tests
- testing live endpoints (risks credential leaks)
- compilation errors on typescript types inside test code
- low coverage metrics

## Promotion Path

```text
analyze implementation
  -> draft mock interfaces
  -> write unit test blocks
  -> run local test suite
  -> verify coverage
  -> receipt creation
  -> register in CI pipeline
```
