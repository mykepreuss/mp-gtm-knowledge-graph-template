# Knowledge + Context Graph Template

A GitHub template repo for building a **versioned, AI-routable knowledge graph** (truth) plus a **context graph** (routing, templates, workflows, rubrics, and upgrade loops).

This is meant to be runnable infrastructure, not a docs dump.

## Repo model

Two layers:

- Knowledge graph (durable truth): `kb/`
- Context graph (routing/views): `context/`

Everything in those folders is Markdown with YAML frontmatter and typed edges (`links:`).

## Spec

- Essay/spec: `docs/you-dont-need-better-prompts-you-need-a-knowledge-graph.md`
- Getting started: `docs/START-HERE.md`
- First run prompt wrapper: `docs/FIRST-RUN-PROMPT-WRAPPER.md`
- V1 intake flow (LLM interview): `docs/V1-INTAKE-FLOW.md`
- Agent handoff rules: `AGENTS.md`

## Quick start

1) Install Node (20+).
2) Install deps:

```bash
npm ci
```

3) Run graph lint:

```bash
npm run lint:graph
```

4) Bundle one view into a single context pack for an AI run:

```bash
npm run bundle:view -- --view context/landing-page-section-v1.md --out dist/context-pack.md
```

5) Export graph JSON (nodes + edges):

```bash
npm run export:graph
```

## What success looks like

If this repo is set up correctly for your org:

- A new teammate can generate a decent GTM asset without a 30 minute briefing.
- When something drifts, you can point to one file to upgrade (canon/view/template/rubric), not a long Slack thread.
- “We don’t know” becomes `TBD`, not an invented claim.

## What to edit first (v1 build)

Start by replacing the placeholder content in:

- `kb/canon/product-truth.md`
- `kb/canon/trust-boundaries.md`
- `kb/canon/icp.md`
- `kb/canon/category-pov.md`
- `kb/canon/positioning.md`
- `kb/canon/proof-map.md`
- `kb/canon/voice.md`
- `kb/canon/nomenclature.md`

Then iterate:

- add entities under `kb/entities/`
- add proof artifacts under `kb/sources/`
- tighten views under `context/`
- tighten templates/workflows/rubrics under `kb/`

## Repo map (where things go)

- `kb/canon/`: durable truth and boundaries
- `kb/sources/`: proof artifacts that back claims
- `kb/entities/`: reusable “things” (capabilities, terms, metrics, competitors)
- `kb/frameworks/`: reusable frameworks (AEO, JTBD, capabilities→benefits)
- `context/`: views (routing seed sets)
- `kb/templates/`: generation interfaces (structure)
- `kb/workflows/`: task interfaces (view + template + validations)
- `kb/rubrics/`: gates and scoring (checks)
- `kb/loops/`: “correct twice, encode once” upgrade loops
- `scripts/`: lint/export/bundling tools

## Commands

- Lint graph: `npm run lint:graph`
- Export graph JSON: `npm run export:graph`
- Graph health report: `npm run report:graph`
- Bundle a view: `npm run bundle:view -- --view <path> --out dist/context-pack.md`

## Notes

- This repo is compatible with Obsidian. Open the repo root as a vault.
- The lint/export scripts only scan `kb/` and `context/`.
- On GitHub, mark this as a Template Repository in repo settings if you want the “Use this template” button.
