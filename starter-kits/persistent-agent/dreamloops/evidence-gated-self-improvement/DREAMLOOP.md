# Evidence-Gated Self-Improvement

- Loop ID: `evidence-gated-self-improvement-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: approved local improvement proposal

## Steps

1. `proposal.local.read` with permission `proposal.local.read`.
2. `experiment.local.run` with permission `experiment.local.run`.
3. `experiment.result.evaluate` with permission `experiment.result.evaluate`.
4. `proposal.local.write` with permission `proposal.local.write`.
5. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
