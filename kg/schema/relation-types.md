---
id: kcg:schema:relation-types
type: schema
title: Relation (Edge) Types
owner: repo
status: active
last_reviewed: 2026-03-04
tags:
  - schema
  - edges
  - links
links:
  - rel: DEPENDS_ON
    href: "[[kg/schema/knowledge-graph-schema]]"
---

# Relation (edge) types

Edges live in node frontmatter under `links:`.

Recommended set for v1:

- `DEPENDS_ON`: hard dependency for correctness
- `EVIDENCED_BY`: claim supported by a proof artifact
- `EVALUATED_BY`: output scored by a rubric
- `TARGETS_SURFACE`: output intended for a surface (optional)
- `DEFINES_TERM` / `USES_TERM`: terminology and definitions
- `CONTRADICTS`: explicit conflict that must be resolved
- `DERIVED_FROM`: derivation from a source
- `APPLIES_TO`: policy/decision applies to a scope target
- `LINKS_TO`: generic fallback link
