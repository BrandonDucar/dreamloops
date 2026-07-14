# Contributing

DreamLoops accepts specifications, Capsules, bounded loops, runtime improvements, adapters, examples, and research experiments.

## Lanes

1. Open an issue or RFC for contract changes.
2. Put unproven work under `labs/`.
3. Keep stable manifests machine-readable and human-documented.
4. Add tests for runtime behavior and validation changes.
5. Run `npm run verify` before opening a pull request.

## Capsule Rules

- Declare origin, version, content hash, permissions, blocked actions, limits, activation, and rollback.
- Reference secrets by name or secret-manager locator only. Never include values.
- Do not embed raw private user data or hidden reasoning.
- Do not claim lineage, certification, or receipts that do not exist.

## DreamLoop Rules

- Use typed handler names.
- Bound steps, retries, and wall time.
- Name allowed and blocked actions explicitly.
- Define evidence, receipts, memory routing, and failure behavior.
- Keep public or irreversible actions behind an external approval gate.

Contributions are accepted under the Apache License 2.0.
