import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../src/cli.js", import.meta.url));

test("validate-all checks the public repository manifests", () => {
  const result = spawnSync(process.execPath, [cli, "validate-all"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /validated \d+ manifests/);
});

test("init copies a complete persistent-agent starter", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "dreamloops-cli-"));
  const target = path.join(root, "agent");
  const result = spawnSync(process.execPath, [cli, "init", target], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.ok((await fs.stat(path.join(target, "capsules", "persistent-agent-base", "capsule.manifest.json"))).isFile());
  assert.ok((await fs.stat(path.join(target, "dreamloops", "morning-plan", "dreamloop.manifest.json"))).isFile());
});
