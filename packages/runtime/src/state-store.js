import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

function clone(value) {
  return value === undefined ? undefined : structuredClone(value);
}

function safeName(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

function encodedBytes(value) {
  return Buffer.byteLength(JSON.stringify(value), "utf8");
}

export class MemoryStateStore {
  constructor() {
    this.values = new Map();
    this.receipts = [];
  }

  async get(key) {
    return clone(this.values.get(key));
  }

  async put(key, value) {
    this.values.set(key, clone(value));
  }

  async delete(key) {
    return this.values.delete(key);
  }

  async list() {
    return [...this.values.keys()].sort();
  }

  async appendReceipt(receipt) {
    this.receipts.push(clone(receipt));
  }
}

export class FileStateStore {
  constructor({ directory, maxBytes = 1_048_576 } = {}) {
    if (!directory) throw new Error("FileStateStore requires a directory");
    this.directory = path.resolve(directory);
    this.maxBytes = maxBytes;
  }

  async initialize() {
    await fs.mkdir(path.join(this.directory, "state"), { recursive: true });
    await fs.mkdir(path.join(this.directory, "receipts"), { recursive: true });
  }

  statePath(key) {
    return path.join(this.directory, "state", `${safeName(key)}.json`);
  }

  async get(key) {
    await this.initialize();
    try {
      const envelope = JSON.parse(await fs.readFile(this.statePath(key), "utf8"));
      if (envelope.key !== key) throw new Error("state key integrity check failed");
      return clone(envelope.value);
    } catch (error) {
      if (error.code === "ENOENT") return undefined;
      throw error;
    }
  }

  async put(key, value) {
    await this.initialize();
    const envelope = { key, updatedAt: new Date().toISOString(), value: clone(value) };
    if (encodedBytes(envelope) > this.maxBytes) throw new Error(`state exceeds ${this.maxBytes} byte ceiling`);
    const target = this.statePath(key);
    const temporary = `${target}.${process.pid}.${crypto.randomUUID()}.tmp`;
    await fs.writeFile(temporary, `${JSON.stringify(envelope, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await fs.rename(temporary, target);
  }

  async delete(key) {
    await this.initialize();
    try {
      await fs.unlink(this.statePath(key));
      return true;
    } catch (error) {
      if (error.code === "ENOENT") return false;
      throw error;
    }
  }

  async list() {
    await this.initialize();
    const names = (await fs.readdir(path.join(this.directory, "state"))).filter((name) => name.endsWith(".json"));
    const keys = [];
    for (const name of names) {
      const envelope = JSON.parse(await fs.readFile(path.join(this.directory, "state", name), "utf8"));
      keys.push(envelope.key);
    }
    return keys.sort();
  }

  async appendReceipt(receipt) {
    await this.initialize();
    const redacted = { ...clone(receipt) };
    delete redacted.state;
    const date = new Date().toISOString().slice(0, 10);
    await fs.appendFile(path.join(this.directory, "receipts", `${date}.jsonl`), `${JSON.stringify(redacted)}\n`, { encoding: "utf8", mode: 0o600 });
  }
}
