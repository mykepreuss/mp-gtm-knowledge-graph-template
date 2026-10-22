---
id: kcg:index:outputs
type: index
title: Outputs (Index)
owner: repo
status: active
last_reviewed: 2026-10-22
tags:
  - index
  - output
  - artifacts
links:
  - rel: LINKS_TO
    href: "[[kg/templates/output-artifact]]"
---

# Outputs

Retain substantive reusable drafts with provenance and actual review/publication state, using [[kg/templates/output-artifact]]. Keep the current pointer and next action in the existing output/handoff. Preserve rejected versions and meaningful exact feedback.

Before deriving from an existing node, the agent runs:

```bash
npm run prior:outputs -- --source kg/canon/product-truth.md --surface website
```

Discovery follows explicit DERIVED_FROM ancestry and descendants; TARGETS_SURFACE edges take precedence over tag fallback. Read candidate copy and feedback before deciding whether reuse is useful. Empty results mean no matching recorded provenance, not no prior use. Inspect omitted results with `--limit 0`. Metadata errors stop discovery; report coverage limits. `--exclude kg/outputs/PATH` applies before reading only when the task explicitly excludes that material; never hide rejection history to bypass a correction. Private directories and external queues are outside this tool's coverage.
