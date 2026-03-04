#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { GRAPH_INCLUDE_DIRS, REQUIRED_FIELDS } from "./graph-config.mjs";
import { isExternalHref, parseFrontmatter, resolveHref, walkMarkdownFiles } from "./graph-utils.mjs";

const rootDir = process.cwd();
const files = walkMarkdownFiles({ rootDir, includeDirs: GRAPH_INCLUDE_DIRS });

const nodes = [];
const fileToId = new Map();
const idToFiles = new Map();
const missingRequired = Object.fromEntries(REQUIRED_FIELDS.map((k) => [k, 0]));

for (const file of files) {
  const abs = path.resolve(rootDir, file);
  const content = fs.readFileSync(abs, "utf8");
  const parsed = parseFrontmatter(content);
  if (!parsed) continue;

  const data = parsed.data;
  nodes.push({ file, ...data });

  for (const key of REQUIRED_FIELDS) {
    if (!data[key]) missingRequired[key] += 1;
  }

  if (data.id) {
    fileToId.set(file, data.id);
    const existing = idToFiles.get(data.id) ?? [];
    existing.push(file);
    idToFiles.set(data.id, existing);
  }
}

const edges = [];
let unresolvedInternalEdges = 0;

for (const node of nodes) {
  const links = Array.isArray(node.links) ? node.links : [];
  for (const link of links) {
    if (!link || typeof link !== "object" || !link.rel || !link.href) continue;

    const href = String(link.href);
    const external = isExternalHref(href);
    let toFile = null;
    let toId = null;

    if (!external) {
      const resolved = resolveHref({ fromFile: node.file, href, rootDir });
      toFile = path.relative(rootDir, resolved).replaceAll(path.sep, "/");
      if (fs.existsSync(resolved)) {
        toId = fileToId.get(toFile) ?? null;
      } else {
        unresolvedInternalEdges += 1;
      }
    }

    edges.push({
      from: node.id ?? null,
      fromFile: node.file,
      rel: String(link.rel),
      href,
      to: toId,
      toFile,
      external,
    });
  }
}

const duplicateIds = [...idToFiles.entries()].filter(([, list]) => list.length > 1);

const nodesByType = new Map();
for (const node of nodes) {
  const type = node.type ?? "(missing)";
  nodesByType.set(type, (nodesByType.get(type) ?? 0) + 1);
}

const edgesByRel = new Map();
for (const edge of edges) {
  edgesByRel.set(edge.rel, (edgesByRel.get(edge.rel) ?? 0) + 1);
}

const nodesWithoutLinks = new Map();
for (const node of nodes) {
  if (Array.isArray(node.links) && node.links.length > 0) continue;
  const type = node.type ?? "(missing)";
  nodesWithoutLinks.set(type, (nodesWithoutLinks.get(type) ?? 0) + 1);
}

const inDegree = new Map();
const outDegree = new Map();
for (const node of nodes) {
  if (!node.id) continue;
  inDegree.set(node.id, 0);
  outDegree.set(node.id, 0);
}

for (const edge of edges) {
  if (edge.from && outDegree.has(edge.from)) {
    outDegree.set(edge.from, outDegree.get(edge.from) + 1);
  }
  if (edge.to && inDegree.has(edge.to)) {
    inDegree.set(edge.to, inDegree.get(edge.to) + 1);
  }
}

let isolatedNodes = 0;
for (const node of nodes) {
  if (!node.id) continue;
  if ((inDegree.get(node.id) ?? 0) === 0 && (outDegree.get(node.id) ?? 0) === 0) {
    isolatedNodes += 1;
  }
}

const now = new Date();
const reviewAgeBuckets = {
  "0-30": 0,
  "31-90": 0,
  "91-180": 0,
  "181+": 0,
  missing: 0,
};

for (const node of nodes) {
  const value = node.last_reviewed;
  if (!value || typeof value !== "string") {
    reviewAgeBuckets.missing += 1;
    continue;
  }
  const ts = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(ts)) {
    reviewAgeBuckets.missing += 1;
    continue;
  }
  const days = Math.floor((now.getTime() - ts) / (1000 * 60 * 60 * 24));
  if (days <= 30) reviewAgeBuckets["0-30"] += 1;
  else if (days <= 90) reviewAgeBuckets["31-90"] += 1;
  else if (days <= 180) reviewAgeBuckets["91-180"] += 1;
  else reviewAgeBuckets["181+"] += 1;
}

const sortEntries = (map) =>
  [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

console.log("# Graph Health Report");
console.log("");
console.log(`Generated: ${now.toISOString()}`);
console.log(`Root: ${rootDir}`);
console.log("");
console.log("## Summary");
console.log("");
console.log(`- Nodes: ${nodes.length}`);
console.log(`- Edges: ${edges.length}`);
console.log(`- Duplicate IDs: ${duplicateIds.length}`);
console.log(`- Unresolved internal edges: ${unresolvedInternalEdges}`);
console.log(`- Isolated nodes: ${isolatedNodes}`);
console.log("");
console.log("## Missing Required Fields");
console.log("");
for (const [field, count] of Object.entries(missingRequired)) {
  console.log(`- ${field}: ${count}`);
}
console.log("");
console.log("## Nodes by Type");
console.log("");
for (const [type, count] of sortEntries(nodesByType)) {
  console.log(`- ${type}: ${count}`);
}
console.log("");
console.log("## Edge Mix");
console.log("");
const totalEdges = edges.length || 1;
for (const [rel, count] of sortEntries(edgesByRel)) {
  const pct = ((count / totalEdges) * 100).toFixed(1);
  console.log(`- ${rel}: ${count} (${pct}%)`);
}
console.log("");
console.log("## Nodes Without Links");
console.log("");
for (const [type, count] of sortEntries(nodesWithoutLinks)) {
  console.log(`- ${type}: ${count}`);
}
console.log("");
console.log("## last_reviewed Age Buckets (days)");
console.log("");
for (const key of ["0-30", "31-90", "91-180", "181+", "missing"]) {
  console.log(`- ${key}: ${reviewAgeBuckets[key]}`);
}

if (duplicateIds.length > 0) {
  console.log("");
  console.log("## Duplicate IDs");
  console.log("");
  for (const [id, filesForId] of duplicateIds) {
    console.log(`- ${id}`);
    for (const file of filesForId) {
      console.log(`  - ${file}`);
    }
  }
}

