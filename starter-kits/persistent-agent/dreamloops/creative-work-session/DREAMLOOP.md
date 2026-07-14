# Creative Work Session

- Loop ID: `creative-work-session-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: creative brief or scheduled practice

## Steps

1. `project.read` with permission `project.read`.
2. `creative.draft` with permission `creative.draft`.
3. `creative.review` with permission `creative.review`.
4. `artifact.local.write` with permission `artifact.local.write`.
5. `project.write` with permission `project.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
