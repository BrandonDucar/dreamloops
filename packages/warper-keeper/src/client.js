import { randomUUID } from "node:crypto";

import {
  CONTRACT_VERSION,
  OPERATIONS,
  REQUIRED_TOOLS,
  TRANSPORT_CONTRACT,
} from "./contracts/v1.js";
import {
  WarperKeeperConfigurationError,
  WarperKeeperDisabledError,
  WarperKeeperError,
  WarperKeeperProtocolError,
  WarperKeeperRemoteError,
  WarperKeeperTimeoutError,
} from "./errors.js";

const DEFAULT_TIMEOUT_MS = 8_000;
const MAX_TIMEOUT_MS = 120_000;
const MAX_PAYLOAD_BYTES = 128 * 1024;
const modeSet = new Set(TRANSPORT_CONTRACT.modes);

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function configurationError(message, code = "invalid_configuration") {
  return new WarperKeeperConfigurationError(message, { code });
}

function normalizeTimeout(value) {
  const timeoutMs = value === undefined ? DEFAULT_TIMEOUT_MS : Number(value);
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > MAX_TIMEOUT_MS) {
    throw configurationError(`timeoutMs must be an integer between 1 and ${MAX_TIMEOUT_MS}`);
  }
  return timeoutMs;
}

function normalizeBaseUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    throw configurationError("baseUrl is required in remote mode", "remote_base_url_required");
  }

  let url;
  try {
    url = new URL(value);
  } catch (cause) {
    throw new WarperKeeperConfigurationError("baseUrl must be an absolute HTTP URL", {
      code: "invalid_remote_base_url",
      cause,
    });
  }

  if (!new Set(["http:", "https:"]).has(url.protocol)) {
    throw configurationError("baseUrl must use HTTP or HTTPS", "invalid_remote_base_url");
  }
  if (url.username || url.password || url.search || url.hash) {
    throw configurationError("baseUrl must not include credentials, query parameters, or a fragment", "invalid_remote_base_url");
  }

  const loopbackHosts = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);
  if (url.protocol !== "https:" && !loopbackHosts.has(url.hostname)) {
    throw configurationError("remote mode requires HTTPS except for loopback addresses", "insecure_remote_base_url");
  }

  return url.href.replace(/\/+$/, "");
}

function normalizeAssignmentKey(value) {
  if (value === undefined) return null;
  if (typeof value !== "string" || !value.trim() || /[\r\n]/.test(value)) {
    throw configurationError("assignmentKey must be a non-empty header-safe string", "invalid_assignment_key");
  }
  return value.trim();
}

function identifier(value, name, fallback) {
  const result = value === undefined ? fallback : value;
  if (typeof result !== "string" || !result.trim() || result.length > 240 || /[\r\n]/.test(result)) {
    throw configurationError(`${name} must be a non-empty header-safe string of at most 240 characters`);
  }
  return result;
}

function requestMetadata(options, write) {
  if (options === undefined) options = {};
  if (!isRecord(options)) throw configurationError("request options must be an object");

  const requestId = identifier(options.requestId, "requestId", `wkreq_${randomUUID()}`);
  const correlationId = identifier(options.correlationId, "correlationId", requestId);
  const idempotencyKey = write
    ? identifier(options.idempotencyKey, "idempotencyKey", `wkidem_${randomUUID()}`)
    : undefined;

  if (options.signal !== undefined) {
    const signal = options.signal;
    if (!signal || typeof signal.aborted !== "boolean" || typeof signal.addEventListener !== "function") {
      throw configurationError("signal must be an AbortSignal");
    }
  }

  return { requestId, correlationId, idempotencyKey, signal: options.signal };
}

function serializePayload(payload) {
  if (payload === undefined) payload = {};
  if (!isRecord(payload)) throw configurationError("payload must be an object", "invalid_payload");

  let body;
  try {
    body = JSON.stringify({ payload });
  } catch (cause) {
    throw new WarperKeeperConfigurationError("payload must be JSON serializable", {
      code: "invalid_payload",
      cause,
    });
  }
  if (new TextEncoder().encode(body).byteLength > MAX_PAYLOAD_BYTES) {
    throw configurationError(`payload exceeds ${MAX_PAYLOAD_BYTES} bytes`, "payload_too_large");
  }
  return body;
}

function validateCapabilities(body, metadata) {
  if (body.contractVersion !== CONTRACT_VERSION) {
    throw new WarperKeeperProtocolError("Warper Keeper contract version mismatch", {
      code: "contract_version_mismatch",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
    });
  }
  if (body.transports?.http !== "/v1" || !Array.isArray(body.tools) || !Array.isArray(body.scopes)) {
    throw new WarperKeeperProtocolError("Warper Keeper capability document is incomplete", {
      code: "invalid_capability_document",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
    });
  }

  const advertisedTools = new Set(
    body.tools.map((tool) => (typeof tool === "string" ? tool : tool?.name)).filter(Boolean),
  );
  const missingTools = REQUIRED_TOOLS.filter((tool) => !advertisedTools.has(tool));
  if (missingTools.length) {
    throw new WarperKeeperProtocolError("Warper Keeper capability document omits required tools", {
      code: "missing_required_capability",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
    });
  }

  const advertisedScopes = new Set(body.scopes);
  const missingScopes = Object.values(OPERATIONS)
    .map((operation) => operation.scope)
    .filter((scope) => scope && !advertisedScopes.has(scope));
  if (missingScopes.length) {
    throw new WarperKeeperProtocolError("Warper Keeper capability document omits required scopes", {
      code: "missing_required_scope",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
    });
  }
  return body;
}

function validateOperationResponse(name, body, metadata) {
  if (!isRecord(body)) {
    throw new WarperKeeperProtocolError("Warper Keeper returned a non-object response", {
      code: "invalid_remote_response",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
    });
  }
  if (name === "discoverCapabilities") return validateCapabilities(body, metadata);

  const valid = name === "getAssignment"
    ? body.ok === true && isRecord(body.assignment)
    : name === "verifyProof"
      ? body.ok === true && body.verified === true && isRecord(body.receipt)
      : body.ok === true && isRecord(body.receipt);

  if (!valid) {
    throw new WarperKeeperProtocolError(`Warper Keeper returned an invalid ${name} response`, {
      code: "invalid_remote_response",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
    });
  }
  return body;
}

function timeoutController(timeoutMs, externalSignal) {
  const controller = new AbortController();
  let timedOut = false;
  const abortFromCaller = () => controller.abort(externalSignal.reason);

  if (externalSignal?.aborted) abortFromCaller();
  else externalSignal?.addEventListener("abort", abortFromCaller, { once: true });

  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort(new Error("Warper Keeper request timed out"));
  }, timeoutMs);

  return {
    signal: controller.signal,
    didTimeOut: () => timedOut,
    cleanup() {
      clearTimeout(timer);
      externalSignal?.removeEventListener("abort", abortFromCaller);
    },
  };
}

async function readJsonResponse(response, metadata) {
  if (!response || typeof response.status !== "number" || typeof response.text !== "function") {
    throw new WarperKeeperProtocolError("fetch returned an invalid response object", {
      code: "invalid_fetch_response",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
    });
  }

  let text;
  try {
    text = await response.text();
    return JSON.parse(text);
  } catch (cause) {
    throw new WarperKeeperProtocolError("Warper Keeper returned invalid JSON", {
      code: "invalid_remote_json",
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
      cause,
    });
  }
}

function remoteRejection(name, response, body, metadata) {
  if (response.ok && body?.ok !== false) return;
  throw new WarperKeeperRemoteError(`Warper Keeper rejected ${name}`, {
    code: "remote_rejected",
    status: response.status,
    remoteCode: typeof body?.error === "string" ? body.error : undefined,
    requestId: metadata.requestId,
    correlationId: metadata.correlationId,
  });
}

function remotePath(name, input) {
  if (name !== "verifyProof") return OPERATIONS[name].path;
  return OPERATIONS.verifyProof.path.replace("{receiptId}", encodeURIComponent(input));
}

function validateReceiptId(value) {
  if (typeof value !== "string" || !value.trim() || value.length > 240 || /[\r\n]/.test(value)) {
    throw configurationError("receiptId must be a non-empty string of at most 240 characters", "receipt_id_required");
  }
}

export function createWarperKeeperClient(options = {}) {
  if (!isRecord(options)) throw configurationError("client options must be an object");

  const mode = options.mode === undefined ? "disabled" : options.mode;
  if (!modeSet.has(mode)) throw configurationError(`unsupported Warper Keeper mode: ${String(mode)}`, "unsupported_mode");

  const timeoutMs = normalizeTimeout(options.timeoutMs);
  const baseUrl = mode === "remote" ? normalizeBaseUrl(options.baseUrl) : null;
  const assignmentKey = normalizeAssignmentKey(options.assignmentKey);
  const fetchImplementation = options.fetch || globalThis.fetch;
  if (mode === "remote" && typeof fetchImplementation !== "function") {
    throw configurationError("fetch is required in remote mode", "fetch_required");
  }
  if (mode === "mock" && !isRecord(options.mock)) {
    throw configurationError("mock handlers are required in mock mode", "mock_handlers_required");
  }

  async function callRemote(name, input, metadata, serializedBody) {
    const operation = OPERATIONS[name];
    if (operation.scope && !assignmentKey) {
      throw configurationError("assignmentKey is required for assignment operations", "assignment_key_required");
    }

    const headers = {
      accept: "application/json",
      [TRANSPORT_CONTRACT.headers.requestId]: metadata.requestId,
      [TRANSPORT_CONTRACT.headers.correlationId]: metadata.correlationId,
    };
    if (operation.scope) headers.authorization = `Bearer ${assignmentKey}`;
    if (operation.write) {
      headers["content-type"] = "application/json";
      headers[TRANSPORT_CONTRACT.headers.idempotencyKey] = metadata.idempotencyKey;
    }

    const abort = timeoutController(timeoutMs, metadata.signal);
    try {
      const response = await fetchImplementation(`${baseUrl}${remotePath(name, input)}`, {
        method: operation.method,
        headers,
        body: serializedBody,
        signal: abort.signal,
      });
      const body = await readJsonResponse(response, metadata);
      remoteRejection(name, response, body, metadata);
      return validateOperationResponse(name, body, metadata);
    } catch (error) {
      if (abort.didTimeOut()) {
        throw new WarperKeeperTimeoutError(`Warper Keeper ${name} timed out after ${timeoutMs}ms`, {
          code: "remote_timeout",
          timeoutMs,
          requestId: metadata.requestId,
          correlationId: metadata.correlationId,
          cause: error,
        });
      }
      if (error instanceof WarperKeeperError) throw error;
      throw new WarperKeeperRemoteError(`Warper Keeper ${name} transport failed`, {
        code: metadata.signal?.aborted ? "request_aborted" : "remote_transport_failed",
        requestId: metadata.requestId,
        correlationId: metadata.correlationId,
        cause: error,
      });
    } finally {
      abort.cleanup();
    }
  }

  async function invoke(name, input, requestOptions) {
    if (mode === "disabled") {
      throw new WarperKeeperDisabledError("Warper Keeper is disabled", {
        code: "warper_keeper_disabled",
      });
    }

    const operation = OPERATIONS[name];
    const serializedBody = operation.write ? serializePayload(input) : undefined;
    if (name === "verifyProof") validateReceiptId(input);
    const metadata = requestMetadata(requestOptions, operation.write);
    if (mode === "remote") return callRemote(name, input, metadata, serializedBody);

    const handler = options.mock[name];
    if (typeof handler !== "function") {
      throw configurationError(`mock handler is required for ${name}`, "mock_handler_required");
    }
    const context = {
      operation: name,
      requestId: metadata.requestId,
      correlationId: metadata.correlationId,
      ...(operation.write ? { idempotencyKey: metadata.idempotencyKey } : {}),
      contractVersion: CONTRACT_VERSION,
    };
    const result = await handler(input, context);
    return validateOperationResponse(name, result, metadata);
  }

  return Object.freeze({
    mode,
    discoverCapabilities: (requestOptions) => invoke("discoverCapabilities", undefined, requestOptions),
    getAssignment: (requestOptions) => invoke("getAssignment", undefined, requestOptions),
    openTrapper: (payload, requestOptions) => invoke("openTrapper", payload ?? {}, requestOptions),
    appendContext: (payload, requestOptions) => invoke("appendContext", payload ?? {}, requestOptions),
    submitArtifact: (payload, requestOptions) => invoke("submitArtifact", payload ?? {}, requestOptions),
    requestApproval: (payload, requestOptions) => invoke("requestApproval", payload ?? {}, requestOptions),
    closeTrapper: (payload, requestOptions) => invoke("closeTrapper", payload ?? {}, requestOptions),
    releaseAssignment: (payload, requestOptions) => invoke("releaseAssignment", payload ?? {}, requestOptions),
    verifyProof: (receiptId, requestOptions) => invoke("verifyProof", receiptId, requestOptions),
  });
}
