# Warper Keeper Connection Kit

Versioned JavaScript client contracts for connecting ZOL or another external agent to the Warper Keeper agent gateway. The kit is client-only and does not create assignments, issue keys, or implement a server.

## ZOL integration

Give ZOL one assignment-bound key from the Warper Keeper operator flow, then create the client with an explicit mode:

```js
import { createWarperKeeperClient } from "@dreamloops/warper-keeper";

const keeper = createWarperKeeperClient({
  mode: process.env.WARPER_KEEPER_MODE ?? "disabled",
  baseUrl: process.env.WARPER_KEEPER_URL,
  assignmentKey: process.env.WARPER_KEEPER_ASSIGNMENT_KEY,
  timeoutMs: 8_000,
});

const capabilities = await keeper.discoverCapabilities({
  correlationId: "zol-run-42",
});
const { assignment } = await keeper.getAssignment({
  correlationId: "zol-run-42",
});

await keeper.openTrapper({}, { correlationId: "zol-run-42" });
const { receipt } = await keeper.appendContext(
  { kind: "summary", text: "Bounded context from ZOL" },
  { correlationId: "zol-run-42", idempotencyKey: "zol-run-42-context-1" },
);
await keeper.submitArtifact(
  { uri: "urn:zol:artifact:42", mediaType: "application/json" },
  { correlationId: "zol-run-42", idempotencyKey: "zol-run-42-artifact-1" },
);
await keeper.requestApproval(
  { action: "publish-artifact", artifactReceiptId: receipt.id },
  { correlationId: "zol-run-42", idempotencyKey: "zol-run-42-approval-1" },
);

const proof = await keeper.verifyProof(receipt.id, { correlationId: "zol-run-42" });
await keeper.closeTrapper(
  { reason: "zol-run-complete" },
  { correlationId: "zol-run-42", idempotencyKey: "zol-run-42-close" },
);
```

`closeTrapper` is the completed-work terminal action. For an unfinished handback, call `releaseAssignment(...)` instead; releasing revokes the assignment key.

`requestId`, `correlationId`, and write `idempotencyKey` values are generated when omitted. Supplying stable correlation and idempotency values is recommended for real ZOL runs.

## Modes

- `disabled` is the default. Every operation rejects without network activity.
- `mock` calls only explicitly supplied handlers, for example `mock: { appendContext: async (payload, context) => response }`. Missing handlers reject.
- `remote` calls the v1 HTTP gateway over HTTPS; loopback HTTP is allowed for local tests. Assignment operations require `assignmentKey` and send it only as `Authorization: Bearer ...`.

Remote errors, timeouts, invalid JSON, contract drift, incomplete capability documents, and unverified proofs reject without falling back to mock or disabled responses.

The dated contract is available from the package root or the `@dreamloops/warper-keeper/contracts/v1` export.

## Test

```powershell
pnpm test
```
