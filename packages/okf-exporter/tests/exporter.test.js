import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { exportDreamLoops } from "../src/index.js";

test("exports DreamLoop Markdown as indexed OKF playbooks", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "dreamloops-okf-"));
  const source = path.join(root, "source");
  const output = path.join(root, "output");
  await fs.mkdir(source);
  await fs.writeFile(path.join(source, "daily.dreamloop.md"), "loop_id: daily\ntitle: Daily Loop\npermission_tier: read_only\n\n# Daily\n\nA bounded daily loop.\n", "utf8");
  const result = await exportDreamLoops({ sourceDirectory: source, outputDirectory: output, generatedAt: "2026-07-14T00:00:00.000Z" });
  assert.equal(result.count, 1);
  assert.match(await fs.readFile(path.join(output, "daily.md"), "utf8"), /type: DreamLoop Playbook/);
  assert.match(await fs.readFile(path.join(output, "index.md"), "utf8"), /Daily Loop/);
});
