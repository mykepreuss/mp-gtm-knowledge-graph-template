import { ALLOWED_STATUSES, ALLOWED_TYPES, CATALOGS, GRAPH_INCLUDE_DIRS, ID_REGEX, REQUIRED_FIELDS } from "./graph-config.mjs";
import { bodyWikilinks, isExternalHref, isWikilink, mapping, parseFrontmatter, readUtf8, relativeTarget, stringList, text, validDate, walkMarkdownFiles } from "./graph-utils.mjs";
import { validateReceipt } from "./output-receipt.mjs";

export function inspectGraph(rootDir, { exclude = [] } = {}) {
  const errors = [], warnings = [], skipped = [], support = [], nodes = new Map(), ids = new Map();
  const files = walkMarkdownFiles({ rootDir, includeDirs: GRAPH_INCLUDE_DIRS, exclude, skipped });
  const issue = (file, message) => errors.push(`${file}: ${message}`);
  for (const file of files) {
    try {
      const parsed = parseFrontmatter(readUtf8(`${rootDir}/${file}`));
      if (!parsed) { support.push(file); continue; }
      const node = { ...parsed.data, file, body: parsed.body };
      nodes.set(file, node);
      if (text(node.id)) {
        if (ids.has(node.id)) issue(file, `duplicate id ${node.id} (also ${ids.get(node.id).file})`);
        else ids.set(node.id, node);
      }
    } catch (error) { issue(file, error.message); }
  }
  if (!nodes.size) errors.push("No graph nodes found; run from the repository root with kg/ and context/ present.");
  function target(file, href, report = true) {
    try {
      if (!isWikilink(href)) throw new Error(`expected a wikilink: ${String(href)}`);
      const resolved = relativeTarget(rootDir, file, href);
      if (exclude.some((prefix) => resolved === prefix || resolved.startsWith(`${prefix}/`))) return undefined;
      if (!nodes.has(resolved)) throw new Error(`target is not a graph node: ${href}`);
      return nodes.get(resolved);
    } catch (error) { if (report) issue(file, error.message); return undefined; }
  }
  const seedFiles = new Map();
  for (const [file, node] of nodes) {
    const error = (message) => issue(file, message);
    for (const key of REQUIRED_FIELDS) if (!(key in node)) error(`missing required field ${key}`);
    for (const key of ["id", "type", "title", "owner", "status"]) if (!text(node[key])) error(`${key} must be a nonempty string`);
    if ("scope" in node && !text(node.scope)) error("scope must be a nonempty string when supplied");
    if (text(node.id) && !ID_REGEX.test(node.id)) error("invalid id format");
    if (text(node.type) && !ALLOWED_TYPES.has(node.type)) error(`unknown node type ${node.type}`);
    if (text(node.status) && !ALLOWED_STATUSES.has(node.status)) error(`unknown status ${node.status}`);
    if (!validDate(node.last_reviewed) && !(node.status === "template" && typeof node.last_reviewed === "string" && /^(YYYY-MM-DD|\{\{.+\}\})$/.test(node.last_reviewed))) error("last_reviewed must be a real ISO date");
    if (!stringList(node.tags)) error("tags must be a list of nonempty strings");
    if (!Array.isArray(node.links)) error("links must be a list");
    const edges = new Set();
    for (const link of Array.isArray(node.links) ? node.links : []) {
      if (!mapping(link)) { error("links entries must be mappings"); continue; }
      if (!text(link.rel) || !/^[A-Z][A-Z0-9_]*$/.test(link.rel)) error("link relation must be uppercase");
      if (!text(link.href)) { error("link href must be a nonempty string"); continue; }
      const dest = isExternalHref(link.href) ? link.href : target(file, link.href)?.file;
      const key = `${link.rel}:${dest ?? link.href}`;
      if (edges.has(key)) error(`duplicate edge ${key}`);
      edges.add(key);
    }
    for (const href of bodyWikilinks(node.body)) target(file, href);
    if (node.type === "view") {
      if (!text(node.task)) error("view task must be a nonempty string");
      const sets = [];
      for (const key of ["seed_ids", "seed_nodes", "seed_paths"]) {
        if (!(key in node)) continue;
        if (!stringList(node[key]) || !node[key].length) { error(`${key} must be a nonempty string list`); continue; }
        const resolved = node[key].map((value) => {
          const result = key === "seed_ids" ? ids.get(value) : target(file, value);
          if (!result) error(`unresolved ${key} entry ${value}`);
          return result?.file;
        }).filter(Boolean);
        if (new Set(resolved).size !== resolved.length) error(`duplicate ${key} entry`);
        sets.push([...new Set(resolved)].sort());
      }
      if (!sets.length) error("view needs seed_ids, seed_nodes, or seed_paths");
      if (sets.some((set) => JSON.stringify(set) !== JSON.stringify(sets[0]))) error("view seed representations must identify the same nodes");
      seedFiles.set(file, sets[0] ?? []);
    }
    if (node.type === "workflow") {
      const dependencies = (Array.isArray(node.links) ? node.links : []).filter((link) => link?.rel === "DEPENDS_ON").map((link) => target(file, link.href, false)).filter(Boolean);
      if (!dependencies.some((dependency) => dependency.type === "view")) error("workflow needs a DEPENDS_ON edge to a view");
      if ("view" in node) {
        if (!stringList(node.view) || !node.view.length) error("workflow view must be a nonempty list");
        else for (const href of node.view) {
          const view = target(file, href);
          if (view?.type !== "view" || !dependencies.includes(view)) error("declared view needs a matching DEPENDS_ON view edge");
        }
      }
    }
    validateReceipt(node, (href) => target(file, href, false), error);
  }
  for (const [prefix, catalog] of Object.entries(CATALOGS)) {
    if (!nodes.has(catalog)) {
      if ([...nodes.keys()].some((file) => file.startsWith(`${prefix}/`))) warnings.push(`missing catalog ${catalog}`);
      continue;
    }
    const visited = new Set();
    function visit(file) {
      if (visited.has(file)) return;
      visited.add(file);
      const node = nodes.get(file);
      if (node?.type !== "index") return;
      for (const link of Array.isArray(node.links) ? node.links : []) {
        const next = target(file, link?.href, false);
        if (next?.file.startsWith(`${prefix}/`)) visit(next.file);
      }
    }
    visit(catalog);
    for (const [file, node] of nodes) if (file.startsWith(`${prefix}/`) && node.status !== "archived" && !visited.has(file)) warnings.push(`${file}: not discoverable from ${catalog}`);
  }
  for (const file of skipped) warnings.push(`${file}: skipped symlink`);
  return { rootDir, files, nodes, ids, seedFiles, errors, warnings, support, skipped };
}

export function requireValidGraph(rootDir, options) {
  const graph = inspectGraph(rootDir, options);
  if (graph.errors.length) throw new Error(`Graph invalid:\n- ${graph.errors.join("\n- ")}`);
  return graph;
}
