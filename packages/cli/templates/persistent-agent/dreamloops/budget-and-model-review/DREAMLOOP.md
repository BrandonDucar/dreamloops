# Budget and Model Review

- Loop ID: `budget-and-model-review-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: daily or threshold-based usage review

## Steps

1. `budget.read` with permission `budget.read`.
2. `model.usage.read` with permission `model.usage.read`.
3. `proposal.local.write` with permission `proposal.local.write`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
