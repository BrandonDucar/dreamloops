import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const patterns = [
  ["private key block", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["GitHub personal token", /\bgh[pousr]_[A-Za-z0-9_]{30,}\b/],
  ["OpenAI-style secret", /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
];
const findings = [];

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(target);
    else {
      const stat = await fs.stat(target);
      if (stat.size > 1_000_000) continue;
      const body = await fs.readFile(target, "utf8").catch(() => "");
      for (const [name, pattern] of patterns) if (pattern.test(body)) findings.push(`${name}: ${path.relative(process.cwd(), target)}`);
    }
  }
}

await walk(process.cwd());
if (findings.length) {
  console.error(findings.join("\n"));
  process.exit(1);
}
console.log("secret scan passed");
