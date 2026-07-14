# Ground Before Acting

- Loop ID: `ground-before-acting-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: before a consequential response or task

## Steps

1. `memory.read` with permission `memory.read`.
2. `relationship.read` with permission `relationship.read`.
3. `project.read` with permission `project.read`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
