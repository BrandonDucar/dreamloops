import assert from "node:assert/strict";
import test from "node:test";

const contract = await import("../src/index.js").catch(() => ({}));

test("exports the dated v1 Warper Keeper contract", () => {
  assert.equal(contract.API_VERSION, "v1");
  assert.equal(contract.CONTRACT_VERSION, "2026-07-14");
  assert.equal(contract.CAPABILITY_ID, "warper-keeper");
});

test("describes every ZOL operation with its gateway route and scope", () => {
  assert.deepEqual(contract.OPERATIONS, {
    discoverCapabilities: {
      tool: null,
      method: "GET",
      path: "/.well-known/agent.json",
      scope: null,
      write: false,
    },
    getAssignment: {
      tool: "get_assignment",
      method: "GET",
      path: "/v1/assignment",
      scope: "assignment:read",
      write: false,
    },
    openTrapper: {
      tool: "open_trapper",
      method: "POST",
      path: "/v1/trapper/open",
      scope: "trapper:read",
      write: true,
    },
    appendContext: {
      tool: "append_context",
      method: "POST",
      path: "/v1/trapper/context",
      scope: "context:append",
      write: true,
    },
    submitArtifact: {
      tool: "submit_artifact",
      method: "POST",
      path: "/v1/trapper/artifacts",
      scope: "artifact:submit",
      write: true,
    },
    requestApproval: {
      tool: "request_approval",
      method: "POST",
      path: "/v1/trapper/approvals",
      scope: "approval:request",
      write: true,
    },
    closeTrapper: {
      tool: "close_trapper",
      method: "POST",
      path: "/v1/trapper/close",
      scope: "trapper:close",
      write: true,
    },
    releaseAssignment: {
      tool: "release_assignment",
      method: "POST",
      path: "/v1/assignment/release",
      scope: "assignment:release",
      write: true,
    },
    verifyProof: {
      tool: "verify_proof",
      method: "GET",
      path: "/v1/receipts/{receiptId}",
      scope: "receipt:read",
      write: false,
    },
  });
});

test("publishes assignment-bound auth and tracing headers", () => {
  assert.deepEqual(contract.TRANSPORT_CONTRACT, {
    authentication: {
      scheme: "bearer",
      binding: "assignment",
      header: "authorization",
    },
    headers: {
      requestId: "x-request-id",
      correlationId: "x-correlation-id",
      idempotencyKey: "x-idempotency-key",
    },
    modes: ["disabled", "mock", "remote"],
  });
});
