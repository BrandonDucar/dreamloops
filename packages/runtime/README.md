# `@dreamloops/runtime`

Dependency-free Capsule validation, canonical hashing, composition, durable local state, and bounded DreamLoop execution for Node.js 18.17 or newer.

## Guarantees

- Manifests remain inert data.
- Unknown handlers fail closed.
- Capsule, Loop, and host grants must agree on every permission.
- The loop permission tier is an additional ceiling. Unmapped permissions fail closed.
- Blocked permissions override allowed permissions.
- Steps, retries, wall time, and durable state size are bounded.
- Failed executions produce failure receipts.
- Durable receipt logs exclude full working state.
- Capsule composition preserves parent hashes and chooses the lowest shared resource ceiling.

## Example

```js
import {
  DreamLoopRunner,
  FileStateStore,
  composeCapsules,
} from "@dreamloops/runtime";

const capsule = composeCapsules(baseCapsule, [dailyLifeCapsule]);
const store = new FileStateStore({ directory: ".dreamloops-state" });
const runner = new DreamLoopRunner({
  stateStore: store,
  grantedPermissions: ["runtime.health.read", "receipt.local.write"],
  handlers: {
    "runtime.health.read": async () => ({ healthy: true }),
    "receipt.local.write": async () => ({ evidenceWritten: true }),
  },
});

const receipt = await runner.run({
  capsule,
  loop: heartbeatLoop,
  stateKey: "agent:heartbeat",
  executionMode: "local",
});
```

The host application owns handler implementations, connector credentials, scheduling, and every live authority decision.

## Hardened Execution Contract

Resource limits are the minimum of host `limits`, Capsule `resource_limits`, and loop
`limits`. The entire plan is checked before any handler runs. The receipt records the
effective limits. Runtime data is cloned before awaits to prevent manifest mutation.

Built-in tier mappings cover the starter kit. New permission names require a host-owned
`permissionTiers: { "custom.inspect": "read_only" }` mapping. A host may strengthen but
not weaken built-in minimum tiers. Local mappings such as `project.write` mean local
draft changes only; register external effects under separate appropriately tiered names.
Neither tiers nor grants replace a current AuthorityLease for live actions.

By default a handler's required permission is its registered name. Aliases require an
explicit host-owned `handlerPermissions: { "inspect": "runtime.health.read" }` binding.
An untrusted loop cannot relabel a privileged handler with a read permission.

Timeouts stop this runner's progress and retries and request cooperative cancellation.
They cannot forcibly stop arbitrary JavaScript or undo external effects. Untrusted or
non-cooperative handlers must run in a separately bounded process/container. Host state
stores must also bound their I/O. Mock/dry-run labels alone do not sandbox a handler.
