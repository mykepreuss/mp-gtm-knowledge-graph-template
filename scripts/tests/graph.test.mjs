import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { stringify } from "yaml";
import { inspectGraph } from "../graph-validation.mjs";
import { buildContextPack } from "../context-bundle.mjs";
import { priorOutputs } from "../prior-outputs.mjs";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const base = (id, type = "canon", extra = {}) => ({ id: `test:${id}`, type, title: "Fixture", owner: "fixture", status: "active", last_reviewed: "2026-10-22", tags: [], links: [], ...extra });
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "gtm-graph-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const put = (file, data, body = "") => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), typeof data === "string" ? data : `---\n${stringify(data)}---\n\n${body}`);
  };
  put("kg/canon/source.md", base("source"));
  put("context/view.md", base("view", "view", { task: "Fixture task", seed_ids: ["test:source"], seed_nodes: ["[[kg/canon/source]]"] }));
  put("kg/workflows/task.md", base("task", "workflow", { links: [{ rel: "DEPENDS_ON", href: "[[context/view]]" }] }));
  return { root, put, graph: () => inspectGraph(root) };
}
const view = (extra) => base("view", "view", { task: "Task", seed_ids: ["test:source"], ...extra });
const edge = (rel, href) => ({ rel, href: `[[${href}]]` });
function receipt(extra = {}) {
  return base("output", "output", {
    tags: ["website"], links: [edge("DERIVED_FROM", "kg/canon/source"), edge("TARGETS_SURFACE", "kg/surfaces/website"), edge("EVALUATED_BY", "kg/rubrics/review")],
    evaluation: { rubric: "[[kg/rubrics/review]]", rubric_version: null, assessed_at: null, assessor: null, gates: "not_assessed", score: null, failure_modes: [] },
    user_review: { decision: "pending", feedback: null, evidence: null }, publication_status: "local_draft", publication_evidence: null, ...extra,
  });
}
function outputFixture(t) {
  const f = fixture(t);
  f.put("kg/surfaces/website.md", base("website", "surface"));
  f.put("kg/surfaces/content.md", base("content", "surface"));
  f.put("kg/rubrics/review.md", base("review", "rubric"));
  return f;
}
function invalid(name, change, diagnostic) {
  test(name, (t) => {
    const f = outputFixture(t); change(f);
    assert.match(f.graph().errors.join("\n"), diagnostic);
  });
}

test("valid graph supports nested receipts, UTF-8, empty lists, support documents and custom uppercase relations", (t) => {
  const f = outputFixture(t);
  f.put("kg/README.md", "# Support\nNo graph frontmatter required.");
  f.put("kg/outputs/draft.md", receipt({ title: "Résumé: café", links: [...receipt().links, edge("EXPLAINS", "kg/canon/source")] }), "```yaml\nhref: '[[missing/example]]'\n```\n`[[inline/example]]`");
  assert.deepEqual(f.graph().errors, []);
  assert.equal(f.graph().support.length, 1);
});
for (const [name, data, match] of [
  ["malformed YAML", "---\ntitle: Broken: title\n---\n", /YAML|mapping|Nested/],
  ["duplicate YAML keys", "---\nid: test:x\nid: test:y\n---\n", /unique|unique keys/i],
  ["unclosed frontmatter", "---\nid: test:x\n", /not closed/],
  ["nonmapping frontmatter", "---\n- value\n---\n", /mapping/],
]) invalid(name, (f) => f.put("kg/broken.md", data), match);
for (const [name, extra, diagnostic] of [
  ["empty owner", { owner: " " }, /owner must/],
  ["numeric title", { title: 13 }, /title must/],
  ["invalid calendar date", { last_reviewed: "2026-02-30" }, /real ISO date/],
  ["nonleap February", { last_reviewed: "2025-02-29" }, /real ISO date/],
  ["date placeholder outside scaffold", { last_reviewed: "YYYY-MM-DD" }, /real ISO date/],
  ["scalar tags", { tags: "tag" }, /tags must/],
  ["blank tag", { tags: [""] }, /tags must/],
  ["scalar links", { links: "bad" }, /links must/],
  ["unknown type", { type: "unregistered" }, /unknown node type/],
  ["unknown status", { status: "published" }, /unknown status/],
  ["empty optional scope", { scope: "" }, /scope must/],
  ["nonmapping link", { links: ["bad"] }, /entries must/],
  ["lowercase relation", { links: [edge("depends_on", "kg/canon/source")] }, /uppercase/],
  ["nonstring href", { links: [{ rel: "LINKS_TO", href: 12 }] }, /href must/],
  ["broken edge", { links: [edge("LINKS_TO", "missing")] }, /not a graph node/],
  ["duplicate normalized edge", { links: [edge("LINKS_TO", "kg/canon/source"), edge("LINKS_TO", "kg/canon/source.md")] }, /duplicate edge/],
  ["outside target", { links: [edge("LINKS_TO", "../../outside")] }, /inside the repository/],
]) invalid(name, (f) => f.put("kg/test.md", base("extra", "canon", extra)), diagnostic);
invalid("missing required links", (f) => { const n = base("extra"); delete n.links; f.put("kg/test.md", n); }, /missing required field links/);
invalid("duplicate IDs", (f) => f.put("kg/duplicate.md", base("source")), /duplicate id/);
invalid("body wikilinks resolve", (f) => f.put("kg/body.md", base("body"), "See [[missing]]."), /not a graph node/);
invalid("support docs cannot satisfy graph edges", (f) => { f.put("kg/support.md", "# Support"); f.put("kg/link.md", base("link", "canon", { links: [edge("LINKS_TO", "kg/support")] })); }, /not a graph node/);
invalid("invalid UTF-8", (f) => fs.writeFileSync(path.join(f.root, "kg/invalid.md"), Buffer.from([0xff, 0xfe])), /encoded data|encoding/i);
for (const [name, extra, diagnostic] of [
  ["missing seed ID", { seed_ids: ["test:missing"] }, /unresolved seed_ids/],
  ["duplicate seed", { seed_ids: ["test:source", "test:source"] }, /duplicate seed_ids/],
  ["mismatched representations", { seed_nodes: ["[[kg/rubrics/review]]"] }, /same nodes/],
  ["bad seed shape", { seed_ids: "test:source" }, /seed_ids must/],
  ["blank task", { task: "" }, /view task/],
  ["no seeds", { seed_ids: [] }, /nonempty string list/],
]) invalid(name, (f) => f.put("context/view.md", view(extra)), diagnostic);
invalid("workflow without view dependency", (f) => f.put("kg/workflows/task.md", base("task", "workflow")), /DEPENDS_ON edge to a view/);
invalid("workflow declared view mismatch", (f) => f.put("kg/workflows/task.md", base("task", "workflow", { view: ["[[kg/canon/source]]"], links: [edge("DEPENDS_ON", "context/view")] })), /matching DEPENDS_ON/);
invalid("workflow view scalar", (f) => f.put("kg/workflows/task.md", base("task", "workflow", { view: "[[context/view]]", links: [edge("DEPENDS_ON", "context/view")] })), /view must/);

test("valid leap date, template date, and seed_paths alias", (t) => {
  const f = fixture(t);
  f.put("kg/leap.md", base("leap", "canon", { last_reviewed: "2024-02-29" }));
  f.put("kg/scaffold.md", base("scaffold", "template", { status: "template", last_reviewed: "YYYY-MM-DD" }));
  f.put("context/view.md", view({ seed_paths: ["[[kg/canon/source.md]]"] }));
  assert.deepEqual(f.graph().errors, []);
});
test("catalog warnings follow nested indexes and exclude archived nodes and support docs", (t) => {
  const f = fixture(t);
  f.put("kg/canon/canon.md", base("canon-index", "index", { links: [edge("LINKS_TO", "kg/canon/nested/index")] }));
  f.put("kg/canon/nested/index.md", base("nested-index", "index", { links: [edge("LINKS_TO", "kg/canon/source")] }));
  f.put("kg/canon/archived.md", base("archived", "canon", { status: "archived" }));
  f.put("kg/canon/README.md", "Support");
  assert.equal(f.graph().warnings.filter((line) => line.includes("not discoverable")).length, 0);
  f.put("kg/canon/orphan.md", base("orphan"));
  assert.match(f.graph().warnings.join("\n"), /orphan.md: not discoverable/);
  assert.deepEqual(f.graph().errors, []);
});
test("symlinks are skipped and link traversal is rejected", (t) => {
  const f = fixture(t);
  fs.symlinkSync(path.join(f.root, "kg/canon/source.md"), path.join(f.root, "kg/alias.md"));
  assert.deepEqual(f.graph().skipped, ["kg/alias.md"]);
  f.put("kg/link.md", base("link", "canon", { links: [edge("LINKS_TO", "kg/alias")] }));
  assert.match(f.graph().errors.join("\n"), /symlink/);
});

for (const [name, mutate, diagnostic] of [
  ["assessment without date", (n) => { n.evaluation.gates = "pass"; }, /real date and assessor/],
  ["unassessed receipt with score", (n) => { n.evaluation.score = 8; }, /unassessed evaluation/],
  ["score out of range", (n) => { n.evaluation.score = 11; }, /0 to 10/],
  ["missing rubric edge", (n) => { n.links = n.links.filter((l) => l.rel !== "EVALUATED_BY"); }, /EVALUATED_BY rubric/],
  ["failure without evidence", (n) => { n.evaluation.gates = "fail"; n.evaluation.assessed_at = "2026-10-22"; n.evaluation.assessor = "fixture"; }, /require failure_modes/],
  ["owner approval without evidence", (n) => { n.user_review.decision = "approved"; }, /require user_review.evidence/],
  ["feedback without evidence", (n) => { n.user_review.feedback = "Revise the claim"; }, /require user_review.evidence/],
  ["publication without evidence", (n) => { n.publication_status = "published"; }, /require publication_evidence/],
  ["publication-only incomplete receipt", (n) => { delete n.evaluation; }, /evaluation must be a mapping/],
  ["missing user-review field", (n) => { delete n.user_review.feedback; }, /feedback must/],
]) invalid(name, (f) => { const n = receipt(); mutate(n); f.put("kg/outputs/draft.md", n); }, diagnostic);

test("qualitative assessment allows no score and keeps rejection independent of publication", (t) => {
  const f = outputFixture(t), n = receipt();
  Object.assign(n.evaluation, { gates: "pass", assessed_at: "2026-10-22", assessor: "fixture" });
  n.user_review = { decision: "rejected", feedback: "Do not reuse", evidence: "Fixture owner decision, 2026-10-22" };
  n.publication_status = "published"; n.publication_evidence = "Fixture reported publication, 2026-10-21";
  f.put("kg/outputs/draft.md", n);
  assert.deepEqual(f.graph().errors, []);
});

test("prior discovery follows revisions, honors explicit surfaces and reports missing history", (t) => {
  const f = outputFixture(t);
  f.put("kg/outputs/first.md", receipt());
  f.put("kg/outputs/revision.md", receipt({ id: "test:revision", links: [edge("DERIVED_FROM", "kg/outputs/first"), edge("EVALUATED_BY", "kg/rubrics/review")]}));
  f.put("kg/outputs/other-surface.md", base("other", "output", { tags: ["website"], links: [edge("DERIVED_FROM", "kg/canon/source"), edge("TARGETS_SURFACE", "kg/surfaces/content")] }));
  f.put("kg/outputs/unlinked.md", base("unlinked", "output", { tags: ["website"] }));
  const result = priorOutputs(f.root, { source: "test:source", surface: "website", limit: 1 });
  assert.equal(result.coverage.matched, 2); assert.equal(result.coverage.omitted, 1);
  assert.deepEqual(result.coverage.surface_outputs_without_provenance, ["kg/outputs/unlinked.md"]);
  const full = priorOutputs(f.root, { source: "kg/outputs/revision.md", surface: "test:website", limit: 0 });
  assert.equal(full.results[0].path, "kg/outputs/first.md");
  assert.equal(full.results[0].user_review.decision, "pending");
});
test("exclusions happen before parsing and never read private directories", (t) => {
  const f = outputFixture(t);
  f.put("kg/outputs/excluded/broken.md", "---\n: [invalid");
  f.put("private/broken.md", "---\n: [invalid");
  assert.throws(() => priorOutputs(f.root, { source: "test:source", surface: "website" }), /Graph invalid/);
  const result = priorOutputs(f.root, { source: "test:source", surface: "website", exclude: ["kg/outputs/excluded"] });
  assert.equal(result.coverage.matched, 0);
  assert.throws(() => priorOutputs(f.root, { source: "test:source", surface: "website", exclude: ["../outside"] }), /exclusions/);
});
test("prior discovery validates source, surface and limit", (t) => {
  const f = outputFixture(t);
  assert.throws(() => priorOutputs(f.root, { source: "missing", surface: "website" }), /unknown graph node/);
  assert.throws(() => priorOutputs(f.root, { source: "test:source", surface: "test:source" }), /surface node/);
  assert.throws(() => priorOutputs(f.root, { source: "test:source", surface: "website", limit: -1 }), /nonnegative/);
});

test("all distributed packs include task contracts and deterministic manifests", () => {
  const pairs = [["landing-page-hero", "landing-page-hero"], ["landing-page-section", "landing-page-section"], ["category-pov-doc", "category-pov"], ["inbound-outline", "inbound-outline"]];
  for (const [view, pack] of pairs) {
    const output = buildContextPack(repo, `context/${view}-v1.md`);
    for (const required of [`kg/workflows/${view}.md`, `kg/templates/${view}.md`, "kg/schema/knowledge-graph-schema.md", "kg/templates/output-artifact.md"]) assert.ok(output.includes(`## ${required}\n`));
    assert.match(output, /## kg\/rubrics\//);
    assert.match(output, /[a-f0-9]{64}  kg\//);
    assert.equal(output, fs.readFileSync(path.join(repo, `packs/${pack}-context-pack.md`), "utf8"));
  }
});
test("bundler rejects incomplete or ambiguous task routing and tracks changes", (t) => {
  const f = fixture(t);
  for (const dir of ["kg", "context"]) fs.cpSync(path.join(repo, dir), path.join(f.root, dir), { recursive: true });
  // Remove fixture nodes, leaving an isolated copy of the actual template.
  for (const file of ["kg/canon/source.md", "context/view.md", "kg/workflows/task.md"]) fs.rmSync(path.join(f.root, file));
  const viewPath = "context/landing-page-hero-v1.md";
  const initial = buildContextPack(f.root, viewPath);
  fs.appendFileSync(path.join(f.root, "kg/canon/product-truth.md"), "\nChanged fixture source.\n");
  assert.notEqual(buildContextPack(f.root, viewPath), initial);
  f.put("kg/workflows/other.md", base("other", "workflow", { links: [edge("DEPENDS_ON", "context/landing-page-hero-v1")] }));
  assert.throws(() => buildContextPack(f.root, viewPath), /select a workflow/);
  assert.ok(buildContextPack(f.root, viewPath, "kg/workflows/landing-page-hero.md"));
  fs.rmSync(path.join(f.root, "kg/templates/landing-page-hero.md"));
  assert.throws(() => buildContextPack(f.root, viewPath, "kg/workflows/landing-page-hero.md"), /Graph invalid/);
});
test("lint CLI returns nonzero on defects under ASCII locale", (t) => {
  const f = fixture(t);
  f.put("kg/unicode.md", base("unicode", "canon", { title: "Résumé café" }));
  const run = () => spawnSync(process.execPath, [path.join(repo, "scripts/graph-lint.mjs")], { cwd: f.root, encoding: "utf8", env: { ...process.env, LC_ALL: "C" } });
  assert.equal(run().status, 0);
  f.put("kg/broken.md", base("bad", "canon", { last_reviewed: "2026-02-30" }));
  const result = run(); assert.equal(result.status, 1); assert.match(result.stderr, /real ISO date/);
});

test("an empty or wrong working directory cannot report a clean graph", (t) => {
  const f = fixture(t);
  fs.rmSync(path.join(f.root, "kg"), { recursive: true });
  fs.rmSync(path.join(f.root, "context"), { recursive: true });
  assert.match(f.graph().errors.join("\n"), /No graph nodes found/);
});
