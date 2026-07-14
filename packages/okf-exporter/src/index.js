import fs from "node:fs/promises";
import path from "node:path";

function slugify(value) {
  return value.toLowerCase().replace(/\\/g, "/").replace(/\.(dreamloop\.md|mdloop|md)$/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
}

function metadata(text, fallback) {
  const field = (name) => text.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1]?.trim();
  const heading = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const paragraph = text.split(/\n\s*\n/).map((part) => part.trim()).find((part) => part && !part.startsWith("#") && !part.startsWith("---") && !part.startsWith("```"));
  return {
    loopId: field("loop_id") || slugify(fallback),
    title: field("title") || heading || slugify(fallback),
    status: field("status") || "source",
    permissionTier: field("permission_tier") || "unspecified",
    description: (paragraph || "DreamLoop operating contract.").replace(/\s+/g, " ").slice(0, 240),
  };
}

async function sourceFiles(directory) {
  const files = [];
  async function walk(current) {
    for (const entry of await fs.readdir(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(target);
      else if (/\.(mdloop|dreamloop\.md|md)$/i.test(entry.name)) files.push(target);
    }
  }
  await walk(directory);
  return files.sort();
}

export async function exportDreamLoops({ sourceDirectory, outputDirectory, generatedAt = new Date().toISOString() }) {
  if (!sourceDirectory || !outputDirectory) throw new Error("sourceDirectory and outputDirectory are required");
  const source = path.resolve(sourceDirectory);
  const output = path.resolve(outputDirectory);
  await fs.mkdir(output, { recursive: true });
  const generated = [];

  for (const file of await sourceFiles(source)) {
    const text = await fs.readFile(file, "utf8");
    const relative = path.relative(source, file).replaceAll(path.sep, "/");
    const info = metadata(text, relative);
    const name = `${slugify(info.loopId)}.md`;
    const content = `---\ntype: DreamLoop Playbook\ntitle: ${JSON.stringify(info.title)}\ndescription: ${JSON.stringify(info.description)}\nresource: ${JSON.stringify(relative)}\ntags: [dreamloops, okf, mission-directive]\ntimestamp: ${JSON.stringify(generatedAt)}\ndreamloop_id: ${JSON.stringify(info.loopId)}\ndreamloop_status: ${JSON.stringify(info.status)}\ndreamloop_permission_tier: ${JSON.stringify(info.permissionTier)}\n---\n\n# ${info.title}\n\n## Source\n\n\`${relative}\`\n\n## Summary\n\n${info.description}\n\n## Original DreamLoop\n\n${text.trim()}\n`;
    await fs.writeFile(path.join(output, name), content, "utf8");
    generated.push({ ...info, file: name });
  }

  const index = `# DreamLoops OKF Index\n\nGenerated: ${generatedAt}\n\n${generated.map((item) => `- [${item.title}](${item.file}) - ${item.description}`).join("\n")}\n`;
  await fs.writeFile(path.join(output, "index.md"), index, "utf8");
  return { generatedAt, sourceDirectory: source, outputDirectory: output, count: generated.length, files: generated };
}
