#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  ALLOWED_RELS,
  ALLOWED_STATUSES,
  ALLOWED_TYPES,
  GRAPH_INCLUDE_DIRS,
  ID_REGEX,
  REQUIRED_FIELDS,
} from "./graph-config.mjs";
import { isExternalHref, parseFrontmatter, resolveHref, walkMarkdownFiles } from "./graph-utils.mjs";

const rootDir = process.cwd();
const files = walkMarkdownFiles({ rootDir, includeDirs: GRAPH_INCLUDE_DIRS });

const errors = [];
const idToFile = new Map();

function addError(file, message) {
  errors.push({ file, message });
}

function validateTags(file, tags) {
  if (!Array.isArray(tags)) {
    addError(file, "`tags` must be a YAML list (one `- tag` per line).");
    return;
  }
  if (tags.length === 0) {
    addError(file, "`tags` must be a non-empty list.");
    return;
  }
  for (const tag of tags) {
    if (typeof tag !== "string" || !tag.trim()) {
      addError(file, "All `tags` items must be non-empty strings.");
      return;
    }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(tag)) {
      addError(file, `Invalid tag: \`${tag}\` (use lowercase kebab-case).`);
      return;
    }
  }
}

function validateViewSeeds(file, data, idIndex) {
  const seedNodes = data.seed_nodes;
  const seedIds = data.seed_ids;

  if ((!Array.isArray(seedNodes) || seedNodes.length === 0) && (!Array.isArray(seedIds) || seedIds.length === 0)) {
    addError(file, "View nodes must declare a non-empty `seed_nodes:` (wikilinks) or `seed_ids:` (node ids) list.");
    return;
  }

  if (Array.isArray(seedNodes)) {
    for (const seed of seedNodes) {
      if (typeof seed !== "string" || !seed.trim()) {
        addError(file, "seed_nodes items must be non-empty strings.");
        continue;
      }
      const resolved = resolveHref({ fromFile: file, href: seed, rootDir });
      if (!fs.existsSync(resolved)) {
        addError(file, `Missing seed node target: \`${seed}\` (resolved to \`${resolved}\`).`);
      }
    }
  }

  if (Array.isArray(seedIds)) {
    for (const seedId of seedIds) {
      if (typeof seedId !== "string" || !seedId.trim()) {
        addError(file, "seed_ids items must be non-empty strings.");
        continue;
      }
      if (!idIndex.has(seedId)) {
        addError(file, `Missing seed id target: \`${seedId}\` (no node with that id).`);
      }
    }
  }
}

function validateLinks(file, links) {
  if (!links) return;
  if (!Array.isArray(links)) {
    addError(file, "`links` must be an array.");
    return;
  }

  for (const link of links) {
    if (!link || typeof link !== "object") {
      addError(file, "Each links[] item must be an object with `rel` + `href`.");
      continue;
    }
    const rel = link.rel;
    const href = link.href;
    if (!rel) addError(file, "links[] is missing `rel`.");
    if (!href) addError(file, "links[] is missing `href`.");

    if (rel && !ALLOWED_RELS.has(rel)) {
      addError(file, `Unknown link rel: \`${rel}\` (update schema or fix rel).`);
    }

    if (!href || typeof href !== "string") continue;
    if (isExternalHref(href)) continue;

    const resolved = resolveHref({ fromFile: file, href, rootDir });
    if (!fs.existsSync(resolved)) {
      addError(file, `Missing href target: \`${href}\` (resolved to \`${resolved}\`).`);
    }
  }
}

// Pre-pass: build id index for seed_ids validation.
for (const file of files) {
  const abs = path.resolve(rootDir, file);
  const content = fs.readFileSync(abs, "utf8");
  const parsed = parseFrontmatter(content);
  if (!parsed) continue;
  const id = parsed.data?.id;
  if (!id) continue;
  if (idToFile.has(id)) {
    addError(file, `Duplicate id \`${id}\` (also in \`${idToFile.get(id)}\`).`);
  } else {
    idToFile.set(id, file);
  }
}

function validateFile(file) {
  const abs = path.resolve(rootDir, file);
  const content = fs.readFileSync(abs, "utf8");
  const parsed = parseFrontmatter(content);
  if (!parsed) {
    addError(file, "Missing or invalid YAML frontmatter (expected `---` blocks).");
    return;
  }

  const { data } = parsed;

  for (const key of REQUIRED_FIELDS) {
    if (!data[key]) addError(file, `Missing required field: \`${key}\`.`);
  }

  const { id, type, status, last_reviewed: lastReviewed, tags } = data;

  if (id && !ID_REGEX.test(id)) {
    addError(file, `Invalid id format: \`${id}\` (expected e.g. \`gtm:canon:product-truth\`).`);
  }

  if (type && !ALLOWED_TYPES.has(type)) {
    addError(file, `Unknown node type: \`${type}\` (update schema or fix type).`);
  }

  if (status && typeof status !== "string") {
    addError(file, "`status` must be a string.");
  } else if (status && !ALLOWED_STATUSES.has(status)) {
    addError(
      file,
      `Unknown status: \`${status}\` (expected one of: ${[...ALLOWED_STATUSES]
        .sort()
        .map((s) => `\`${s}\``)
        .join(", ")}).`,
    );
  }

  if (lastReviewed && typeof lastReviewed !== "string") {
    addError(file, "`last_reviewed` must be a string (YYYY-MM-DD).");
  } else if (lastReviewed && !/^\d{4}-\d{2}-\d{2}$/.test(lastReviewed)) {
    addError(file, `Invalid last_reviewed: \`${lastReviewed}\` (expected YYYY-MM-DD).`);
  }

  if (tags) validateTags(file, tags);

  if (type === "view") {
    validateViewSeeds(file, data, idToFile);
  }

  validateLinks(file, data.links);
}

for (const file of files) validateFile(file);

if (errors.length === 0) {
  console.log(`✅ Graph lint OK (${files.length} nodes checked).`);
  process.exit(0);
}

console.error(`Graph lint found ${errors.length} issue(s):`);
for (const err of errors) {
  console.error(`- ${err.file}: ${err.message}`);
}
process.exit(1);

