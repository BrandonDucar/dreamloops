export const API_VERSION = "v1";
export const CONTRACT_VERSION = "2026-07-14";
export const CAPABILITY_ID = "warper-keeper";

function operation(tool, method, path, scope, write) {
  return Object.freeze({ tool, method, path, scope, write });
}

export const OPERATIONS = Object.freeze({
  discoverCapabilities: operation(null, "GET", "/.well-known/agent.json", null, false),
  getAssignment: operation("get_assignment", "GET", "/v1/assignment", "assignment:read", false),
  openTrapper: operation("open_trapper", "POST", "/v1/trapper/open", "trapper:read", true),
  appendContext: operation("append_context", "POST", "/v1/trapper/context", "context:append", true),
  submitArtifact: operation("submit_artifact", "POST", "/v1/trapper/artifacts", "artifact:submit", true),
  requestApproval: operation("request_approval", "POST", "/v1/trapper/approvals", "approval:request", true),
  closeTrapper: operation("close_trapper", "POST", "/v1/trapper/close", "trapper:close", true),
  releaseAssignment: operation("release_assignment", "POST", "/v1/assignment/release", "assignment:release", true),
  verifyProof: operation("verify_proof", "GET", "/v1/receipts/{receiptId}", "receipt:read", false),
});

export const TRANSPORT_CONTRACT = Object.freeze({
  authentication: Object.freeze({
    scheme: "bearer",
    binding: "assignment",
    header: "authorization",
  }),
  headers: Object.freeze({
    requestId: "x-request-id",
    correlationId: "x-correlation-id",
    idempotencyKey: "x-idempotency-key",
  }),
  modes: Object.freeze(["disabled", "mock", "remote"]),
});

export const REQUIRED_TOOLS = Object.freeze(
  Object.values(OPERATIONS)
    .map((entry) => entry.tool)
    .filter(Boolean),
);
