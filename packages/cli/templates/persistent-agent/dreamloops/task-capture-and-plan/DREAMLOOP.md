# Task Capture and Plan

- Loop ID: `task-capture-and-plan-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: new commitment, request, or idea

## Steps

1. `task.capture` with permission `task.capture`.
2. `task.plan` with permission `task.plan`.
3. `state.local.write` with permission `state.local.write`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
