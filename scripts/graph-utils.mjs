import fs from "node:fs";
import path from "node:path";
import { parseDocument } from "yaml";

export const text = (value) => typeof value === "string" && value.trim().length > 0;
export const mapping = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
export const stringList = (value) => Array.isArray(value) && value.every(text);
export function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function walkMarkdownFiles({ rootDir, includeDirs, exclude = [], skipped = [] }) {
  const results = [];
  function walk(relative) {
    const full = path.resolve(rootDir, relative);
    if (exclude.some((prefix) => relative === prefix || relative.startsWith(`${prefix}/`))) return;
    if (!fs.existsSync(full)) return;
    if (fs.lstatSync(full).isSymbolicLink()) { skipped.push(relative); return; }
    if (fs.statSync(full).isDirectory()) {
      for (const entry of fs.readdirSync(full).sort()) {
        if (!entry.startsWith(".")) walk(`${relative}/${entry}`);
      }
    } else if (relative.endsWith(".md")) results.push(relative);
  }
  includeDirs.forEach(walk);
  return results.sort();
}

export function readUtf8(file) {
  return new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(file));
}

export function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return null;
  const endIndex = lines.findIndex((line, i) => i > 0 && line.trim() === "---");
  if (endIndex === -1) throw new Error("frontmatter is not closed");
  const doc = parseDocument(lines.slice(1, endIndex).join("\n"), { uniqueKeys: true });
  if (doc.errors.length || doc.warnings.length) throw new Error([...doc.errors, ...doc.warnings].map((e) => e.message).join("; "));
  const data = doc.toJS({ maxAliasCount: 100 });
  if (!mapping(data)) throw new Error("frontmatter must be a mapping");
  return { data, frontmatterEndLine: endIndex + 1, body: lines.slice(endIndex + 1).join("\n") };
}

export const isExternalHref = (href) => typeof href === "string" && /^(https?:|mailto:)/.test(href);
export const isWikilink = (href) => typeof href === "string" && /^\[\[[^\[\]\n]+\]\]$/.test(href);

export function resolveHref({ fromFile, href, rootDir }) {
  if (!text(href)) throw new Error("href must be a nonempty string");
  const raw = isWikilink(href) ? href.slice(2, -2).split("|")[0] : href;
  const target = raw.split("#")[0].trim();
  const withExtension = target && !path.extname(target) ? `${target}.md` : target;
  const resolved = !target ? path.resolve(rootDir, fromFile) : path.resolve(rootDir, target.startsWith(".") ? path.dirname(fromFile) : "", withExtension);
  const relative = path.relative(rootDir, resolved);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error("target must remain inside the repository");
  // Never allow a linked file to escape the graph through a symlink.
  let current = rootDir;
  for (const part of relative.split(path.sep)) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error("symlink targets are not allowed");
  }
  return resolved;
}

export function relativeTarget(rootDir, fromFile, href) {
  return path.relative(rootDir, resolveHref({ rootDir, fromFile, href })).replaceAll(path.sep, "/");
}

export function bodyWikilinks(body) {
  // Examples in fences and inline code are scaffolds, not graph edges.
  const prose = body.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, "").replace(/`[^`\n]*`/g, "");
  return [...prose.matchAll(/\[\[[^\[\]\n]+\]\]/g)].map((match) => match[0]);
}
