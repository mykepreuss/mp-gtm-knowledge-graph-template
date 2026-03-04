import fs from "node:fs";
import path from "node:path";

export function walkMarkdownFiles({ rootDir, includeDirs }) {
  const results = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = path.join(currentPath, entry.name);
      const entryRel = path.relative(rootDir, fullPath).replaceAll(path.sep, "/");

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!entry.name.endsWith(".md")) continue;
      results.push(entryRel);
    }
  }

  for (const dir of includeDirs) {
    walk(path.join(rootDir, dir));
  }

  results.sort();
  return results;
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseInlineArray(value) {
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  if (trimmed.startsWith('"') || trimmed.startsWith("'")) return null;

  const inner = trimmed.slice(1, -1).trim();
  if (!inner) return [];

  const items = [];
  let current = "";
  let quote = null;

  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (quote) {
      current += ch;
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }

    if (ch === ",") {
      const piece = current.trim();
      if (piece) items.push(stripQuotes(piece));
      else items.push("");
      current = "";
      continue;
    }

    current += ch;
  }

  const last = current.trim();
  if (last) items.push(stripQuotes(last));
  else if (current.length) items.push("");

  return items.filter((item) => typeof item === "string" && item.trim());
}

export function parseFrontmatter(content) {
  if (!content.startsWith("---")) return null;
  const lines = content.split(/\r?\n/);
  if (lines.length < 3 || lines[0].trim() !== "---") return null;

  const endIndex = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (endIndex === -1) return null;

  const fmLines = lines.slice(1, endIndex);
  const data = {};

  let currentKey = null;
  let currentObject = null;

  for (const rawLine of fmLines) {
    if (!rawLine.trim()) continue;

    const rootMatch = rawLine.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (rootMatch && !rawLine.startsWith(" ")) {
      const [, key, rawValue] = rootMatch;
      currentKey = key;
      currentObject = null;

      const value = rawValue.trim();
      if (!value) {
        data[key] = [];
        continue;
      }

      const inlineArray = parseInlineArray(value);
      data[key] = inlineArray ?? stripQuotes(value);
      continue;
    }

    const listItemMatch = rawLine.match(/^\s+-\s+(.*)$/);
    if (listItemMatch && currentKey) {
      const item = listItemMatch[1];
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }

      const isObjectListKey = currentKey === "links";
      if (isObjectListKey) {
        const objectInlineMatch = item.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
        if (objectInlineMatch) {
          const [, objectKey, objectValue] = objectInlineMatch;
          currentObject = { [objectKey]: stripQuotes(objectValue) };
          data[currentKey].push(currentObject);
          continue;
        }
      }

      currentObject = null;
      data[currentKey].push(stripQuotes(item));
      continue;
    }

    const objectPropMatch = rawLine.match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
    if (objectPropMatch && currentObject) {
      const [, objectKey, objectValue] = objectPropMatch;
      currentObject[objectKey] = stripQuotes(objectValue);
    }
  }

  return { data, frontmatterEndLine: endIndex + 1 };
}

export function isExternalHref(href) {
  return /^(https?:|mailto:)/.test(href);
}

function unwrapWikilink(rawHref) {
  const trimmed = rawHref.trim();
  const match = trimmed.match(/^\[\[(.+)\]\]$/);
  if (!match) return null;

  const inner = match[1];
  const withoutAlias = inner.split("|")[0]?.trim() ?? "";
  return withoutAlias;
}

export function resolveHref({ fromFile, href, rootDir }) {
  const unwrapped = unwrapWikilink(href);
  const rawHref = (unwrapped ?? href).trim();

  const rawPath = rawHref.split("#")[0]?.trim() ?? "";
  if (!rawPath) return path.resolve(rootDir, fromFile);

  const isRelative = rawPath.startsWith("./") || rawPath.startsWith("../");

  const shouldAddMdExtension =
    !rawPath.endsWith("/") && !path.extname(rawPath) && (unwrapped ?? "").length > 0;

  const normalizedPath = shouldAddMdExtension ? `${rawPath}.md` : rawPath;

  if (isRelative) {
    const fromDir = path.dirname(fromFile);
    return path.resolve(rootDir, fromDir, normalizedPath);
  }

  const withoutLeadingSlash = normalizedPath.replace(/^\/+/, "");
  return path.resolve(rootDir, withoutLeadingSlash);
}
