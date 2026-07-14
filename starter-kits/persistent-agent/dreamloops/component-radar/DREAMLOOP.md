# Component Radar

- Loop ID: `component-radar-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: scheduled ecosystem review or observed limitation

## Steps

1. `source.public.read` with permission `source.public.read`.
2. `component.catalog.read` with permission `component.catalog.read`.
3. `proposal.local.write` with permission `proposal.local.write`.
4. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
