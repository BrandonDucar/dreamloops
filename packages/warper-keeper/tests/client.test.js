import assert from "node:assert/strict";
import test from "node:test";

import * as kit from "../src/index.js";

const methodNames = [
  "discoverCapabilities",
  "getAssignment",
  "openTrapper",
  "appendContext",
  "submitArtifact",
  "requestApproval",
  "closeTrapper",
  "releaseAssignment",
  "verifyProof",
];

test("exports a complete Warper Keeper client surface", () => {
  assert.equal(typeof kit.createWarperKeeperClient, "function");
  for (const ErrorType of [
    kit.WarperKeeperError,
    kit.WarperKeeperConfigurationError,
    kit.WarperKeeperDisabledError,
    kit.WarperKeeperProtocolError,
    kit.WarperKeeperRemoteError,
    kit.WarperKeeperTimeoutError,
  ]) {
    assert.equal(typeof ErrorType, "function");
  }

  const client = kit.createWarperKeeperClient();
  assert.equal(client.mode, "disabled");
  for (const name of methodNames) assert.equal(typeof client[name], "function", name);
});

function capabilityDocument(overrides = {}) {
  return {
    name: "Warper Keeper Agent Gateway",
    version: "0.1.0",
    contractVersion: kit.CONTRACT_VERSION,
    transports: { http: "/v1", mcp: "/mcp" },
    scopes: Object.values(kit.OPERATIONS).map((operation) => operation.scope).filter(Boolean),
    tools: kit.REQUIRED_TOOLS.map((name) => ({ name })),
    ...overrides,
  };
}

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status || 200,
    headers: { "content-type": "application/json" },
  });
}

test("disabled mode fails closed without touching the network", async () => {
  let calls = 0;
  const client = kit.createWarperKeeperClient({
    mode: "disabled",
    fetch: async () => {
      calls += 1;
      return jsonResponse({ ok: true });
    },
  });

  await assert.rejects(
    client.getAssignment(),
    (error) => error instanceof kit.WarperKeeperDisabledError && error.code === "warper_keeper_disabled",
  );
  assert.equal(calls, 0);
});

test("rejects unknown modes and insecure non-loopback remote URLs", () => {
  assert.throws(
    () => kit.createWarperKeeperClient({ mode: "fallback" }),
    kit.WarperKeeperConfigurationError,
  );
  assert.throws(
    () => kit.createWarperKeeperClient({ mode: "remote" }),
    kit.WarperKeeperConfigurationError,
  );
  assert.throws(
    () => kit.createWarperKeeperClient({ mode: "remote", baseUrl: "http://keeper.example" }),
    kit.WarperKeeperConfigurationError,
  );
  assert.doesNotThrow(() =>
    kit.createWarperKeeperClient({
      mode: "remote",
      baseUrl: "http://127.0.0.1:3217",
      assignmentKey: "wk_local_test",
      fetch: async () => jsonResponse(capabilityDocument()),
    }),
  );
});

test("remote assignment operations require a key before making a request", async () => {
  let calls = 0;
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    fetch: async () => {
      calls += 1;
      return jsonResponse({ ok: true });
    },
  });

  await assert.rejects(client.getAssignment(), kit.WarperKeeperConfigurationError);
  assert.equal(calls, 0);
});

test("discovers and validates capabilities without sending the assignment key", async () => {
  const requests = [];
  const document = capabilityDocument();
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example/",
    assignmentKey: "wk_live_do_not_leak",
    fetch: async (url, options) => {
      requests.push({ url, options });
      return jsonResponse(document);
    },
  });

  const result = await client.discoverCapabilities({
    requestId: "req-discovery",
    correlationId: "corr-zol",
  });

  assert.deepEqual(result, document);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "https://keeper.example/.well-known/agent.json");
  assert.equal(requests[0].options.method, "GET");
  const headers = new Headers(requests[0].options.headers);
  assert.equal(headers.get("x-request-id"), "req-discovery");
  assert.equal(headers.get("x-correlation-id"), "corr-zol");
  assert.equal(headers.has("authorization"), false);
  assert.equal(headers.has("x-idempotency-key"), false);
});

test("gets the bearer-key assignment with caller-supplied trace IDs", async () => {
  let captured;
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async (url, options) => {
      captured = { url, options };
      return jsonResponse({ ok: true, assignment: { id: "assign_123" } });
    },
  });

  const result = await client.getAssignment({ requestId: "req-1", correlationId: "corr-1" });

  assert.equal(result.assignment.id, "assign_123");
  assert.equal(captured.url, "https://keeper.example/v1/assignment");
  assert.equal(captured.options.method, "GET");
  const headers = new Headers(captured.options.headers);
  assert.equal(headers.get("authorization"), "Bearer wk_live_assignment_key");
  assert.equal(headers.get("x-request-id"), "req-1");
  assert.equal(headers.get("x-correlation-id"), "corr-1");
});

test("sends every write operation with payload and idempotent trace metadata", async () => {
  const requests = [];
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async (url, options) => {
      requests.push({ url, options });
      return jsonResponse({ ok: true, receipt: { id: `receipt_${requests.length}` } });
    },
  });
  const writes = [
    ["openTrapper", "/v1/trapper/open"],
    ["appendContext", "/v1/trapper/context"],
    ["submitArtifact", "/v1/trapper/artifacts"],
    ["requestApproval", "/v1/trapper/approvals"],
    ["closeTrapper", "/v1/trapper/close"],
    ["releaseAssignment", "/v1/assignment/release"],
  ];

  for (const [index, [method, path]] of writes.entries()) {
    const response = await client[method](
      { sequence: index },
      {
        requestId: `req-${index}`,
        correlationId: "corr-workflow",
        idempotencyKey: `idem-${index}`,
      },
    );
    assert.equal(response.receipt.id, `receipt_${index + 1}`);
    const request = requests[index];
    assert.equal(request.url, `https://keeper.example${path}`);
    assert.equal(request.options.method, "POST");
    assert.deepEqual(JSON.parse(request.options.body), { payload: { sequence: index } });
    const headers = new Headers(request.options.headers);
    assert.equal(headers.get("authorization"), "Bearer wk_live_assignment_key");
    assert.equal(headers.get("content-type"), "application/json");
    assert.equal(headers.get("x-request-id"), `req-${index}`);
    assert.equal(headers.get("x-correlation-id"), "corr-workflow");
    assert.equal(headers.get("x-idempotency-key"), `idem-${index}`);
  }
});

test("generates request, correlation, and idempotency IDs when omitted", async () => {
  let captured;
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async (_url, options) => {
      captured = options;
      return jsonResponse({ ok: true, receipt: { id: "receipt_generated" } });
    },
  });

  await client.appendContext({ text: "bounded context" });

  const headers = new Headers(captured.headers);
  assert.match(headers.get("x-request-id"), /^wkreq_[0-9a-f-]{36}$/);
  assert.equal(headers.get("x-correlation-id"), headers.get("x-request-id"));
  assert.match(headers.get("x-idempotency-key"), /^wkidem_[0-9a-f-]{36}$/);
});

test("verifies only an affirmative assignment-owned proof", async () => {
  let captured;
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async (url, options) => {
      captured = { url, options };
      return jsonResponse({ ok: true, verified: true, receipt: { id: "receipt/one" } });
    },
  });

  const result = await client.verifyProof("receipt/one", { requestId: "req-proof" });

  assert.equal(result.verified, true);
  assert.equal(captured.url, "https://keeper.example/v1/receipts/receipt%2Fone");
  const headers = new Headers(captured.options.headers);
  assert.equal(headers.get("authorization"), "Bearer wk_live_assignment_key");
  assert.equal(headers.has("x-idempotency-key"), false);
});

test("fails closed on contract drift and incomplete successful responses", async () => {
  const documents = [
    capabilityDocument({ contractVersion: "2026-07-13" }),
    capabilityDocument({ tools: [{ name: "get_assignment" }] }),
    capabilityDocument({ scopes: ["assignment:read"] }),
  ];

  for (const document of documents) {
    const client = kit.createWarperKeeperClient({
      mode: "remote",
      baseUrl: "https://keeper.example",
      fetch: async () => jsonResponse(document),
    });
    await assert.rejects(client.discoverCapabilities(), kit.WarperKeeperProtocolError);
  }

  const missingAssignment = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async () => jsonResponse({ ok: true }),
  });
  await assert.rejects(missingAssignment.getAssignment(), kit.WarperKeeperProtocolError);

  const unverifiedProof = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async () => jsonResponse({ ok: true, verified: false, receipt: { id: "receipt_1" } }),
  });
  await assert.rejects(unverifiedProof.verifyProof("receipt_1"), kit.WarperKeeperProtocolError);
});

test("surfaces remote rejection without leaking the assignment key", async () => {
  const assignmentKey = "wk_live_super_secret_assignment_key";
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey,
    fetch: async () => jsonResponse({ ok: false, error: "scope_denied" }, { status: 403 }),
  });

  await assert.rejects(client.getAssignment(), (error) => {
    assert.ok(error instanceof kit.WarperKeeperRemoteError);
    assert.equal(error.status, 403);
    assert.equal(error.remoteCode, "scope_denied");
    assert.equal(error.message.includes(assignmentKey), false);
    return true;
  });
});

test("does not fall back when remote transport or JSON parsing fails", async () => {
  const networkFailure = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async () => {
      throw new Error("network unavailable");
    },
  });
  await assert.rejects(
    networkFailure.getAssignment(),
    (error) => error instanceof kit.WarperKeeperRemoteError && error.code === "remote_transport_failed",
  );

  const invalidJson = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    fetch: async () => new Response("not-json", { status: 200 }),
  });
  await assert.rejects(invalidJson.getAssignment(), kit.WarperKeeperProtocolError);
});

test("aborts a remote request at the configured timeout", async () => {
  const client = kit.createWarperKeeperClient({
    mode: "remote",
    baseUrl: "https://keeper.example",
    assignmentKey: "wk_live_assignment_key",
    timeoutMs: 10,
    fetch: async (_url, { signal }) =>
      new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(signal.reason), { once: true });
      }),
  });

  await assert.rejects(
    client.getAssignment(),
    (error) => error instanceof kit.WarperKeeperTimeoutError && error.timeoutMs === 10,
  );
});

test("mock mode delegates explicitly and keeps request metadata", async () => {
  let received;
  const client = kit.createWarperKeeperClient({
    mode: "mock",
    mock: {
      appendContext: async (payload, context) => {
        received = { payload, context };
        return { ok: true, receipt: { id: "mock_receipt" } };
      },
    },
  });

  const result = await client.appendContext(
    { text: "mock context" },
    { requestId: "req-mock", correlationId: "corr-mock", idempotencyKey: "idem-mock" },
  );

  assert.equal(client.mode, "mock");
  assert.equal(result.receipt.id, "mock_receipt");
  assert.deepEqual(received.payload, { text: "mock context" });
  assert.deepEqual(received.context, {
    operation: "appendContext",
    requestId: "req-mock",
    correlationId: "corr-mock",
    idempotencyKey: "idem-mock",
    contractVersion: kit.CONTRACT_VERSION,
  });

  await assert.rejects(client.closeTrapper(), kit.WarperKeeperConfigurationError);
});

test("validates write payloads and proof IDs before invoking a mock", async () => {
  let calls = 0;
  const client = kit.createWarperKeeperClient({
    mode: "mock",
    mock: {
      appendContext: async () => {
        calls += 1;
        return { ok: true, receipt: { id: "unexpected" } };
      },
      verifyProof: async () => {
        calls += 1;
        return { ok: true, verified: true, receipt: { id: "unexpected" } };
      },
    },
  });

  await assert.rejects(client.appendContext([]), kit.WarperKeeperConfigurationError);
  await assert.rejects(client.verifyProof(""), kit.WarperKeeperConfigurationError);
  assert.equal(calls, 0);
});
