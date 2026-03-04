#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { GRAPH_INCLUDE_DIRS } from "./graph-config.mjs";
import { isExternalHref, parseFrontmatter, resolveHref, walkMarkdownFiles } from "./graph-utils.mjs";

const rootDir = process.cwd();
const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const pretty = args.has("--pretty");

function getArgValue(flag) {
  const idx = rawArgs.indexOf(flag);
  if (idx === -1) return null;
  const value = rawArgs[idx + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
}

const outFile = getArgValue("--out");

process.stdout.on("error", (error) => {
  if (error && error.code === "EPIPE") process.exit(0);
  throw error;
});

const files = walkMarkdownFiles({ rootDir, includeDirs: GRAPH_INCLUDE_DIRS });

const nodes = [];
const fileToId = new Map();

for (const file of files) {
  const abs = path.resolve(rootDir, file);
  const content = fs.readFileSync(abs, "utf8");
  const parsed = parseFrontmatter(content);
  if (!parsed) continue;
  const node = { file, ...parsed.data };
  nodes.push(node);
  if (node.id) fileToId.set(file, node.id);
}

const edges = [];
for (const node of nodes) {
  const links = node.links;
  if (!Array.isArray(links)) continue;

  for (const link of links) {
    if (!link || typeof link !== "object") continue;
    if (!link.rel || !link.href) continue;
    const href = link.href;
    const resolved = isExternalHref(href)
      ? null
      : path
          .relative(rootDir, resolveHref({ fromFile: node.file, href, rootDir }))
          .replaceAll(path.sep, "/");
    const toId = resolved ? fileToId.get(resolved) ?? null : null;

    edges.push({
      from: node.id ?? null,
      fromFile: node.file,
      rel: link.rel,
      href: link.href,
      to: toId,
      toFile: resolved,
      notes: link.notes ?? null,
    });
  }
}

const graph = {
  root: rootDir,
  generated_at: new Date().toISOString(),
  nodes,
  edges,
};

const json = JSON.stringify(graph, null, pretty ? 2 : 0) + "\n";

if (outFile) {
  const outAbs = path.resolve(rootDir, outFile);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, json, "utf8");
  console.log(`✅ Wrote ${outFile}`);
} else {
  process.stdout.write(json);
}
