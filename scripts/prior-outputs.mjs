#!/usr/bin/env node
// Explicit provenance candidates, never a semantic duplicate detector.
import path from "node:path";
import { pathToFileURL } from "node:url";
import { requireValidGraph } from "./graph-validation.mjs";
import { relativeTarget } from "./graph-utils.mjs";

export function priorOutputs(rootDir, { source, surface, exclude = [], limit = 20 }) {
  if (!Number.isInteger(limit) || limit < 0) throw new Error("--limit must be a nonnegative integer");
  const exclusions = exclude.map((value) => {
    const normalized = path.posix.normalize(value.replace(/\/$/, ""));
    if (!normalized.startsWith("kg/outputs/") || normalized !== value.replace(/\/$/, "")) throw new Error("exclusions must be explicit files or folders inside kg/outputs/");
    return normalized;
  });
  const graph = requireValidGraph(rootDir, { exclude: exclusions });
  function resolve(value) {
    const node = graph.ids.get(value) ?? graph.nodes.get(relativeTarget(rootDir, "kg/outputs/index.md", value.startsWith("[[") ? value : `[[${value}]]`));
    if (!node) throw new Error(`unknown graph node: ${value}`);
    return node;
  }
  const sourceNode = resolve(source), surfaceNode = resolve(surface.includes(":") || surface.includes("/") || surface.startsWith("[[") ? surface : `kg/surfaces/${surface}`);
  if (surfaceNode.type !== "surface") throw new Error("--surface must identify a surface node");
  const targets = (node, relation) => node.links.filter((edge) => edge.rel === relation && edge.href.startsWith("[[")).map((edge) => relativeTarget(rootDir, node.file, edge.href)).filter((file) => graph.nodes.has(file));
  const parents = new Map(), children = new Map();
  for (const node of graph.nodes.values()) {
    const sources = targets(node, "DERIVED_FROM");
    parents.set(node.file, sources);
    for (const parent of sources) children.set(parent, [...(children.get(parent) ?? []), node.file]);
  }
  function closure(seeds, edges) {
    const seen = new Set(), todo = [...seeds];
    while (todo.length) { const file = todo.pop(); if (seen.has(file)) continue; seen.add(file); todo.push(...(edges.get(file) ?? [])); }
    return seen;
  }
  const family = closure(closure([sourceNode.file], parents), children);
  const surfaceTag = path.basename(surfaceNode.file, ".md");
  const outputs = [...graph.nodes.values()].filter((node) => node.type === "output" && node.status !== "template");
  function surfaceMatch(node) {
    const explicit = targets(node, "TARGETS_SURFACE");
    return explicit.length ? explicit.includes(surfaceNode.file) ? "edge" : null : node.tags.includes(surfaceTag) ? "tag" : null;
  }
  const matches = outputs.filter((node) => node.file !== sourceNode.file && family.has(node.file) && surfaceMatch(node));
  const selected = limit === 0 ? matches : matches.slice(0, limit);
  return {
    source: sourceNode.file, surface: surfaceNode.file,
    coverage: {
      matched: matches.length, returned: selected.length, omitted: matches.length - selected.length,
      scanned_outputs: outputs.length, excluded: exclusions, skipped_symlinks: graph.skipped,
      surface_outputs_without_provenance: outputs.filter((node) => surfaceMatch(node) && !parents.get(node.file).length).map((node) => node.file),
      scope: "Shared graph metadata and graph links only; no private directories, external queues, or semantic comparison of output copy. Read relevant candidates and feedback before drafting. Missing records do not establish no prior use, review, or publication.",
    },
    results: selected.map((node) => ({ path: node.file, title: node.title, sources: parents.get(node.file), surface_match: surfaceMatch(node), evaluation: node.evaluation ?? "unrecorded", user_review: node.user_review ?? "unrecorded", publication_status: node.publication_status ?? "unrecorded", publication_evidence: node.publication_evidence ?? "unrecorded" })),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const options = { exclude: [] };
    for (let i = 2; i < process.argv.length; i += 2) {
      const key = process.argv[i]?.slice(2), value = process.argv[i + 1];
      if (!["source", "surface", "exclude", "limit"].includes(key) || !value || value.startsWith("--")) throw new Error("Usage: --source NODE --surface NODE [--exclude kg/outputs/PATH] [--limit N]");
      if (key === "exclude") options.exclude.push(value);
      else options[key] = key === "limit" ? Number(value) : value;
    }
    if (!options.source || !options.surface) throw new Error("--source and --surface are required");
    console.log(JSON.stringify(priorOutputs(process.cwd(), options), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
