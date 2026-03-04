#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { GRAPH_INCLUDE_DIRS } from "./graph-config.mjs";
import { parseFrontmatter, resolveHref, walkMarkdownFiles } from "./graph-utils.mjs";

function parseArgs(argv) {
  const args = new Map();
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    args.set(key, value);
  }
  return args;
}

const rootDir = process.cwd();
const args = parseArgs(process.argv.slice(2));
const viewPath = args.get("view");
const outPath = args.get("out") ?? "dist/context-pack.md";

if (!viewPath) {
  console.error("Missing required arg: --view <path to a context view markdown file>.");
  process.exit(1);
}

const viewAbs = path.resolve(rootDir, viewPath);
if (!fs.existsSync(viewAbs)) {
  console.error(`View file not found: ${viewPath}`);
  process.exit(1);
}

const allFiles = walkMarkdownFiles({ rootDir, includeDirs: GRAPH_INCLUDE_DIRS });
const idToFile = new Map();

for (const file of allFiles) {
  const abs = path.resolve(rootDir, file);
  const content = fs.readFileSync(abs, "utf8");
  const parsed = parseFrontmatter(content);
  if (!parsed?.data?.id) continue;
  if (!idToFile.has(parsed.data.id)) idToFile.set(parsed.data.id, file);
}

const viewContent = fs.readFileSync(viewAbs, "utf8");
const viewParsed = parseFrontmatter(viewContent);
if (!viewParsed) {
  console.error(`View file is missing YAML frontmatter: ${viewPath}`);
  process.exit(1);
}

const viewData = viewParsed.data;
const seedNodes = Array.isArray(viewData.seed_nodes) ? viewData.seed_nodes : [];
const seedIds = Array.isArray(viewData.seed_ids) ? viewData.seed_ids : [];

const resolvedFiles = new Set();

for (const seed of seedNodes) {
  if (typeof seed !== "string" || !seed.trim()) continue;
  const resolved = resolveHref({ fromFile: viewPath, href: seed, rootDir });
  const rel = path.relative(rootDir, resolved).replaceAll(path.sep, "/");
  resolvedFiles.add(rel);
}

for (const seedId of seedIds) {
  if (typeof seedId !== "string" || !seedId.trim()) continue;
  const file = idToFile.get(seedId);
  if (file) resolvedFiles.add(file);
}

resolvedFiles.add(viewPath.replaceAll(path.sep, "/"));

const ordered = [...resolvedFiles].sort((a, b) => a.localeCompare(b));

fs.mkdirSync(path.dirname(path.resolve(rootDir, outPath)), { recursive: true });

const header = [
  "# Context Pack",
  "",
  "This file is generated from a view. Treat it as the frozen context for a run.",
  "",
  "Rules:",
  "- Canon wins. If outputs disagree, upgrade canon, not the draft.",
  "- Do not invent facts. If something is missing, label it TBD or Hypothesis.",
  "- When making factual claims, cite the file path (and heading) from this pack.",
  "",
  "---",
  "",
].join("\n");

let out = header;

for (const file of ordered) {
  const abs = path.resolve(rootDir, file);
  if (!fs.existsSync(abs)) continue;
  const content = fs.readFileSync(abs, "utf8").trimEnd();
  out += `## ${file}\n\n`;
  out += "```markdown\n";
  out += `${content}\n`;
  out += "```\n\n";
}

fs.writeFileSync(path.resolve(rootDir, outPath), out, "utf8");
console.log(`✅ Wrote ${outPath} (${ordered.length} files).`);

