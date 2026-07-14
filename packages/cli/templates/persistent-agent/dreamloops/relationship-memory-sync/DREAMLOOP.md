# Relationship Memory Sync

- Loop ID: `relationship-memory-sync-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: after a meaningful interaction

## Steps

1. `relationship.read` with permission `relationship.read`.
2. `relationship.write` with permission `relationship.write`.
3. `state.local.write` with permission `state.local.write`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
