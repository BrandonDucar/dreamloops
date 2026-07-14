import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");

async function files(directory, predicate) {
  const results = [];
  async function walk(current) {
    for (const entry of await fs.readdir(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(target);
      else if (predicate(entry.name)) results.push(path.relative(root, target).replaceAll(path.sep, "/"));
    }
  }
  await walk(path.join(root, directory));
  return results.sort();
}

const stableCapsules = await files("starter-kits/persistent-agent/capsules", (name) => name === "capsule.manifest.json");
const stableLoops = await files("starter-kits/persistent-agent/dreamloops", (name) => name === "dreamloop.manifest.json");
const dreamnetLibrary = await files("library/dreamnet", (name) => /\.(mdloop|dreamloop\.md|md)$/i.test(name));
const capsuleLibrary = await files("library/capsules", (name) => name.endsWith(".json"));
const grokCapsules = await files("labs/grok/capsules", (name) => name === "manifest.json" || name === "capsule.md");
const grokLoops = await files("labs/grok/dreamloops", (name) => name.endsWith(".md"));
const grokSystems = await files("labs/grok", (name) => name === "SKILL.md" || /GENEALOGIST|DNA_ENGINE|FAMILY_TREE|PERSISTENT_DREAM|FISH_SWARM/.test(name));

function section(title, entries) {
  return `## ${title} (${entries.length})\n\n${entries.map((entry) => `- [\`${entry}\`](${entry})`).join("\n")}\n`;
}

const content = `# Catalog\n\nThis deterministic catalog distinguishes executable stable contracts from preserved library and experimental material. Stable counts are enforced by generation checks and automated tests.\n\n${section("Stable Capsules", stableCapsules)}\n${section("Stable DreamLoops", stableLoops)}\n${section("DreamNet Human-Readable Loop Library", dreamnetLibrary)}\n${section("DreamNet Capsule Library", capsuleLibrary)}\n${section("Grok Labs Capsules", grokCapsules)}\n${section("Grok Labs DreamLoops", grokLoops)}\n${section("Grok Labs Systems And Skills", grokSystems)}\n`;

const target = path.join(root, "CATALOG.md");
if (checkOnly) {
  const current = await fs.readFile(target, "utf8").catch(() => null);
  if (current !== content) throw new Error("CATALOG.md is stale; run npm run generate");
  console.log("catalog is current");
} else {
  await fs.writeFile(target, content, "utf8");
  console.log("catalog generated");
}
