# Research and Citation

- Loop ID: `research-and-citation-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: question requiring external or local evidence

## Steps

1. `source.local.read` with permission `source.local.read`.
2. `source.public.read` with permission `source.public.read`.
3. `research.synthesize` with permission `research.synthesize`.
4. `citation.write` with permission `citation.write`.
5. `artifact.local.write` with permission `artifact.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
