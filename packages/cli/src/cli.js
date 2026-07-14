#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  CAPSULE_SCHEMA,
  DREAMLOOP_SCHEMA,
  DreamLoopRunner,
  capsuleContentHash,
  validateCapsule,
  validateDreamLoop,
} from "@dreamloops/runtime";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const repositoryRoot = path.resolve(packageRoot, "../..");

async function readJson(file) {
  return JSON.parse(await fs.readFile(path.resolve(file), "utf8"));
}

async function jsonFiles(directory) {
  const output = [];
  async function walk(current) {
    for (const entry of await fs.readdir(current, { withFileTypes: true })) {
      if ([".git", "node_modules"].includes(entry.name)) continue;
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(target);
      else if (entry.name.endsWith(".json")) output.push(target);
    }
  }
  await walk(directory);
  return output.sort();
}

function validateKnownManifest(value) {
  if (value?.schema === CAPSULE_SCHEMA) return validateCapsule(value);
  if (value?.schema === DREAMLOOP_SCHEMA) return validateDreamLoop(value);
  return null;
}

async function validateFile(file, { enforceContract = true } = {}) {
  const value = await readJson(file);
  let validated = null;
  if (enforceContract) {
    try {
      validated = validateKnownManifest(value);
    } catch (error) {
      throw new Error(`${path.resolve(file)}: ${error.message}`);
    }
  }
  return { file: path.resolve(file), kind: validated ? value.schema : "json" };
}

async function validateAll(root = repositoryRoot) {
  const results = [];
  const stableRoots = [
    path.join(repositoryRoot, "starter-kits"),
    path.join(repositoryRoot, "packages", "runtime", "examples"),
    path.join(repositoryRoot, "packages", "cli", "templates"),
  ];
  for (const file of await jsonFiles(root)) {
    const enforceContract = stableRoots.some((stableRoot) => path.resolve(file).startsWith(`${path.resolve(stableRoot)}${path.sep}`));
    results.push(await validateFile(file, { enforceContract }));
  }
  const manifests = results.filter((item) => item.kind !== "json");
  return { jsonFiles: results.length, manifests: manifests.length, results };
}

async function initialize(target) {
  if (!target) throw new Error("init requires a target directory");
  const source = path.join(packageRoot, "templates", "persistent-agent");
  const destination = path.resolve(target);
  await fs.mkdir(destination, { recursive: true });
  await fs.cp(source, destination, { recursive: true, errorOnExist: false, force: false });
  return destination;
}

async function seal(file) {
  const target = path.resolve(file);
  const manifest = await readJson(target);
  if (manifest.schema !== CAPSULE_SCHEMA) throw new Error("seal accepts only a Capsule manifest");
  manifest.provenance ||= {};
  manifest.provenance.content_hash = capsuleContentHash(manifest);
  validateCapsule(manifest);
  await fs.writeFile(target, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifest.provenance.content_hash;
}

async function dryRun(capsuleFile, loopFile) {
  const capsule = await readJson(capsuleFile);
  const loop = await readJson(loopFile);
  validateCapsule(capsule);
  validateDreamLoop(loop);
  const handlers = Object.fromEntries(loop.steps.map((step) => [step.handler, async ({ state }) => ({ ...state, [`simulated:${step.id}`]: true })]));
  const runner = new DreamLoopRunner({ handlers, grantedPermissions: loop.allowed_actions });
  return runner.run({ capsule, loop, executionMode: "dry_run" });
}

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

export async function main(args = process.argv.slice(2)) {
  const [command, ...rest] = args;
  if (command === "init") {
    console.log(await initialize(rest[0]));
    return;
  }
  if (command === "validate") {
    console.log(JSON.stringify(await validateFile(rest[0]), null, 2));
    return;
  }
  if (command === "validate-all") {
    const result = await validateAll(rest[0] ? path.resolve(rest[0]) : repositoryRoot);
    console.log(`validated ${result.manifests} manifests across ${result.jsonFiles} JSON files`);
    return;
  }
  if (command === "seal") {
    console.log(await seal(rest[0]));
    return;
  }
  if (command === "run") {
    const receipt = await dryRun(valueAfter(rest, "--capsule"), valueAfter(rest, "--loop"));
    console.log(JSON.stringify(receipt, null, 2));
    return;
  }
  if (command === "list") {
    const root = path.join(repositoryRoot, "starter-kits", "persistent-agent");
    const result = await validateAll(root);
    for (const item of result.results.filter((entry) => entry.kind !== "json")) console.log(path.relative(repositoryRoot, item.file));
    return;
  }
  throw new Error("usage: dreamloops <init|validate|validate-all|seal|run|list>");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
