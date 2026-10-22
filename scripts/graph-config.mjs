export const GRAPH_INCLUDE_DIRS = ["kg", "context"];

export const REQUIRED_FIELDS = ["id", "type", "title", "owner", "status", "last_reviewed", "tags", "links"];

export const ALLOWED_TYPES = new Set([
  "canon",
  "example",
  "surface",
  "entity",
  "framework",
  "dataset",
  "source",
  "output",
  "view",
  "workflow",
  "rubric",
  "template",
  "index",
  "schema",
  "decision",
  "decision-trace",
]);

export const ALLOWED_STATUSES = new Set([
  "active",
  "draft",
  "planned",
  "historical",
  "template",
  "archived",
]);

export const RECOMMENDED_RELS = new Set([
  "LINKS_TO",
  "RELATED_TO",
  "DEPENDS_ON",
  "DEFINES_TERM",
  "USES_TERM",
  "EVIDENCED_BY",
  "DERIVED_FROM",
  "CONTRADICTS",
  "SUPERSEDES",
  "APPLIES_TO",
  "EXCEPTION_TO",
  "SETS_PRECEDENT_FOR",
  "USED_BY",
  "TARGETS_SURFACE",
  "EVALUATED_BY",
]);

export const ID_REGEX = /^[a-z][a-z0-9-]*:[a-z0-9-]+(?::[a-z0-9-]+)*$/;

// Advisory discovery coverage, independent of task view membership.
export const CATALOGS = {
  "kg/canon": "kg/canon/canon.md",
  "context": "context/context-pack.md",
  "kg/entities": "kg/entities/index.md",
  "kg/frameworks": "kg/frameworks/index.md",
  "kg/workflows": "kg/workflows/index.md",
  "kg/templates": "kg/templates/index.md",
  "kg/rubrics": "kg/rubrics/index.md",
  "kg/loops": "kg/loops/index.md",
  "kg/examples": "kg/examples/index.md",
  "kg/surfaces": "kg/surfaces/index.md",
};
