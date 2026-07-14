# Bootstrap Agent State

- Loop ID: `bootstrap-agent-state-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: process start or operator request

## Steps

1. `state.local.read` with permission `state.local.read`.
2. `memory.read` with permission `memory.read`.
3. `task.read` with permission `task.read`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
