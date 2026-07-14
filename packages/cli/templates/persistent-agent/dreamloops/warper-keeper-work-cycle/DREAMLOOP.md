# Warper Keeper Work Cycle

- Loop ID: `warper-keeper-work-cycle-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `live_guarded_action`
- Trigger: assignment-bound key and explicit work assignment available

## Steps

1. `warper.assignment.read` with permission `warper.assignment.read`.
2. `warper.trapper.open` with permission `warper.trapper.open`.
3. `warper.context.append` with permission `warper.context.append`.
4. `warper.artifact.submit` with permission `warper.artifact.submit`.
5. `warper.approval.request` with permission `warper.approval.request`.
6. `warper.trapper.close` with permission `warper.trapper.close`.
7. `warper.receipt.read` with permission `warper.receipt.read`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
