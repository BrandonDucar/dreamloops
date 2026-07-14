# Memory Consolidation and Forgetting

- Loop ID: `memory-consolidation-and-forgetting-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: nightly or storage-pressure review

## Steps

1. `memory.read` with permission `memory.read`.
2. `memory.consolidate` with permission `memory.consolidate`.
3. `memory.expire` with permission `memory.expire`.
4. `memory.write` with permission `memory.write`.
5. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
