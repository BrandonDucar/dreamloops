# Architecture

## Layers

```text
Human-readable specification
        |
Machine-readable Capsule and DreamLoop manifests
        |
Validation and canonical hashing
        |
Capsule composition
        |
Host-registered typed handlers and explicit permission grants
        |
Bounded runner
        |
Durable state, evidence, receipts, and rollback
```

## Capsule Overlays

An agent normally starts with `persistent-agent-base-v1`, then adds identity, domain, and connector overlays. Composition unions declared capabilities, but any blocked permission remains blocked. The host still decides which permissions are granted for a run.

## DreamLoop Execution

Markdown explains intent. JSON is the executable contract. A step names a typed handler and permission. The runtime executes only a handler registered by the host and only when the Capsule, DreamLoop, and host grant all agree.

## State And Receipts

The dependency-free file store uses atomic replacement for state snapshots and append-only JSONL for durable receipts. Applications may implement SQLite, Postgres, D1, or another adapter behind the same interface. Full working state is not copied into durable receipt logs.

## Connectors

Connectors are optional overlays. Warper Keeper defaults to disabled mode and uses assignment-bound keys, explicit operation scopes, correlation IDs, and idempotency keys. A persistent agent remains useful when no connector is configured.
