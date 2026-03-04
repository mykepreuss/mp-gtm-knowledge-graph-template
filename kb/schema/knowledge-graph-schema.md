---
id: kcg:schema:knowledge-graph
type: schema
title: Knowledge + Context Graph Schema
owner: repo
status: active
last_reviewed: 2026-03-04
tags:
  - schema
  - knowledge-graph
links:
  - rel: LINKS_TO
    href: "[[kb/schema/node-types]]"
  - rel: LINKS_TO
    href: "[[kb/schema/relation-types]]"
  - rel: LINKS_TO
    href: "[[kb/knowledge-graph]]"
---

# Knowledge + Context Graph schema

This repo is intentionally treated like infrastructure:

- Nodes are Markdown files with stable `id`s and required metadata.
- Edges are typed links in frontmatter (`links[]`).
- Views are curated seed sets for routing a task (`context/*.md`).
- Frameworks/datasets are reusable structures for repeatable output (`kb/frameworks/`).

Contract:

- Canon wins. If outputs disagree, upgrade canon, not the draft.
- Claims should be grounded or explicitly labeled Hypothesis/TBD.
- Risky domains (pricing, security, privacy) require current evidence, or must be labeled TBD.
