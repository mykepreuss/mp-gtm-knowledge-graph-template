export const GRAPH_INCLUDE_DIRS = ["kb", "context"];

export const REQUIRED_FIELDS = ["id", "type", "title", "owner", "status", "last_reviewed", "tags"];

export const ALLOWED_TYPES = new Set([
  "canon",
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

export const ALLOWED_RELS = new Set([
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
