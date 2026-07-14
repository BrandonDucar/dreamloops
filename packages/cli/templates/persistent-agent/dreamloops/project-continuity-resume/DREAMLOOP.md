# Project Continuity Resume

- Loop ID: `project-continuity-resume-v1`
- Version: `1.0.0`
- Status: `rehearsed`
- Permission tier: `local_draft_write`
- Trigger: project resumed after interruption or restart

## Steps

1. `project.read` with permission `project.read`.
2. `task.read` with permission `task.read`.
3. `project.write` with permission `project.write`.
4. `checkpoint.local.write` with permission `checkpoint.local.write`.

## Boundaries

Blocked actions: `cloud.mutate`, `component.install`, `connector.unbounded.write`, `deployment.production.write`, `package.install`, `public.publish`, `secret.value.read`, `self.modify.live`, `signer.change`, `wallet.sign`.

This Markdown explains the contract. The adjacent JSON manifest is the machine-readable authority.
