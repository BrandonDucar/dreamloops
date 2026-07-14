# Morning Plan

- Loop ID: `morning-plan-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: start of operator day

## Steps

1. `calendar.read` with permission `calendar.read`.
2. `task.read` with permission `task.read`.
3. `priority.plan` with permission `priority.plan`.
4. `state.local.write` with permission `state.local.write`.
5. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
