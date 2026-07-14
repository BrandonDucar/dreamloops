# Communication Draft and Approval

- Loop ID: `communication-draft-and-approval-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: communication needed

## Steps

1. `memory.read` with permission `memory.read`.
2. `communication.draft` with permission `communication.draft`.
3. `approval.request` with permission `approval.request`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
