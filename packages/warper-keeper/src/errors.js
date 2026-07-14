export class WarperKeeperError extends Error {
  constructor(message, options = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = new.target.name;
    this.code = options.code || "warper_keeper_error";
    for (const field of ["status", "remoteCode", "requestId", "correlationId", "timeoutMs"]) {
      if (options[field] !== undefined) this[field] = options[field];
    }
  }
}

export class WarperKeeperConfigurationError extends WarperKeeperError {}
export class WarperKeeperDisabledError extends WarperKeeperError {}
export class WarperKeeperProtocolError extends WarperKeeperError {}
export class WarperKeeperRemoteError extends WarperKeeperError {}
export class WarperKeeperTimeoutError extends WarperKeeperError {}
