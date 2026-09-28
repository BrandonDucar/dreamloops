# Runtime security hardening: 0.1.1

This release fixes reproduced enforcement gaps; it does not grant operational authority.

- Enforce permission tiers using a host-owned, exact-name capability map. Unknown capabilities fail closed. Built-in tiers cannot be weakened.
- Bind handlers to permissions so a manifest cannot relabel a privileged handler as read-only. Host-defined aliases require an explicit binding.
- Preflight the entire plan before calling any handler.
- Intersect host, Capsule, and DreamLoop limits for steps, retries, and wall time.
- Use a monotonic execution clock, abort timed-out handlers, and stop retries after timeout.
- Snapshot Capsule and loop data before asynchronous state access to prevent caller mutation from changing the accepted plan.

## Verification

Run `npm ci --ignore-scripts` and `npm run verify` from the repository root. The suite includes 10 new adversarial runtime tests and 28 existing workspace tests, plus generated-manifest validation and secret scanning.

## Migration and limits

Custom handler names previously accepted without permission binding now need a host-owned `handlerPermissions` mapping. Custom capabilities need `permissionTiers`. See the runtime README for examples. Do not weaken production permissions to preserve old manifests.

`executionMode: mock` is a receipt label, not a security sandbox. A real action still requires host authorization and any external AuthorityLease. JavaScript cannot forcibly terminate an arbitrary handler that ignores AbortSignal or blocks the event loop; such handlers require process isolation. State-store I/O must be bounded by the host. This release does not deploy or restart existing consumers automatically.

## Rollback

Pause affected consumers before reverting the runtime. Version 0.1.0 is the prior source version, but reverting restores the enforcement gaps. Keep external mutations disabled until a compatible, verified policy is restored.
