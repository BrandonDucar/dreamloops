# Evening Review

- Loop ID: `evening-review-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: end of operator day

## Steps

1. `task.read` with permission `task.read`.
2. `memory.write` with permission `memory.write`.
3. `checkpoint.local.write` with permission `checkpoint.local.write`.
4. `task.plan` with permission `task.plan`.
5. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
