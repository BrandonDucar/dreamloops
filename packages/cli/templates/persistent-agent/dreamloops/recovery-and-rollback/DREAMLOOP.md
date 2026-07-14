# Recovery and Rollback

- Loop ID: `recovery-and-rollback-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: failed heartbeat, corrupt state, or operator request

## Steps

1. `runtime.health.read` with permission `runtime.health.read`.
2. `checkpoint.local.read` with permission `checkpoint.local.read`.
3. `state.local.write` with permission `state.local.write`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
