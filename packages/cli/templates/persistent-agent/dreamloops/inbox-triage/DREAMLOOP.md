# Inbox Triage

- Loop ID: `inbox-triage-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: new messages or scheduled inbox review

## Steps

1. `inbox.read` with permission `inbox.read`.
2. `message.classify` with permission `message.classify`.
3. `task.capture` with permission `task.capture`.
4. `state.local.write` with permission `state.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
