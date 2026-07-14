# Persistent Agent Heartbeat

- Loop ID: `persistent-agent-heartbeat-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: scheduled health pulse

## Steps

1. `runtime.health.read` with permission `runtime.health.read`.
2. `state.local.write` with permission `state.local.write`.
3. `receipt.local.write` with permission `receipt.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
