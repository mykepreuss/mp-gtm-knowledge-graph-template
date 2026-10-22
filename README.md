# GTM Knowledge Graph Template

A GitHub template repo for building a **GTM Knowledge Graph**: versioned truth in `kg/` plus routing, templates, workflows, rubrics, and upgrade loops.

This is meant to be runnable infrastructure, not a docs dump.

## Agent-owned operation

Describe the requested work normally. `AGENTS.md` and the portable `.agents/skills/gtm-writing/SKILL.md` select relevant catalogs, approved context, actual sources, examples and workflow checks. Small edits stay small. You provide direction and feedback; the agent handles discovery, record maintenance and verification.

Read `kg/schema/knowledge-graph-schema.md` for authority, conditional freshness and structural contracts. Source evidence, approved guidance, proposals and history have different roles. Status, publication and model scores do not confer approval. Follow current approved pointers and preserve exact scoped corrections. Placeholder business canon and sample evidence remain `status: template` until replaced and reviewed.

For template maintenance continuity, read `docs/UPGRADE-HANDOFF.md`.

## Start here (non-technical friendly)

If you’re in GTM and you just want to get to a usable v1 fast:

1) Use AI to generate your first canon:
- `docs/V1-INTAKE-FLOW.md`
2) Run your first asset draft using copy/paste prompts:
- `docs/READ-WITH.md`
3) If you don’t want to use the terminal:
- `docs/NO-TERMINAL.md`

Bonus: prebuilt context packs you can paste into an LLM:
- `packs/README.md`

## Copy/paste prompts (quick)

- Setup interview: `docs/V1-INTAKE-FLOW.md`
- First run wrapper: `docs/FIRST-RUN-PROMPT-WRAPPER.md`
- “Read with…” prompt pack: `docs/READ-WITH.md`
- Prebuilt context packs (no terminal): `packs/README.md`

## Repo model

Two working layers:

- Knowledge graph (durable truth): `kg/`
- Context routing layer (views): `context/`

Routable nodes use Markdown with YAML frontmatter and typed edges (`links:`). Plain support documents may remain without frontmatter.

## What success looks like

If this repo is set up correctly for your org:

- A new teammate can generate a decent GTM asset without a 30 minute briefing.
- When something drifts, you can point to one file to upgrade (canon/view/template/rubric), not a long Slack thread.
- “We don’t know” becomes `TBD`, not an invented claim.

## Docs map

- Getting started (terminal): `docs/START-HERE.md`
- Getting started (no terminal): `docs/NO-TERMINAL.md`
- Setup interview (FAST/STRICT): `docs/V1-INTAKE-FLOW.md`
- Prompt pack (“read with an agent”): `docs/READ-WITH.md`
- First-run wrapper (strict output contract): `docs/FIRST-RUN-PROMPT-WRAPPER.md`
- Spec/essay: `docs/you-dont-need-better-prompts-you-need-a-knowledge-graph.md`
- Agent handoff rules: `AGENTS.md`

## What to edit first (v1 build)

Start by replacing the placeholder content in:

- `kg/canon/product-truth.md`
- `kg/canon/trust-boundaries.md`
- `kg/canon/icp.md`
- `kg/canon/category-pov.md`
- `kg/canon/positioning.md`
- `kg/canon/proof-map.md`
- `kg/canon/voice.md`
- `kg/canon/nomenclature.md`

Then iterate:

- add entities under `kg/entities/`
- add proof artifacts under `kg/sources/`
- tighten views under `context/`
- tighten templates/workflows/rubrics under `kg/`

## Repo map (where things go)

- `kg/canon/`: durable truth and boundaries
- `kg/sources/`: proof artifacts that back claims
- `kg/entities/`: reusable “things” (capabilities, terms, metrics, competitors)
- `kg/frameworks/`: reusable frameworks (AEO, JTBD, capabilities→benefits)
- `context/`: views (routing seed sets)
- `kg/templates/`: generation interfaces (structure)
- `kg/workflows/`: task interfaces (view + template + validations)
- `kg/rubrics/`: gates and scoring (checks)
- `kg/loops/`: evidence-triggered, scoped correction handling
- `kg/examples/`: source-linked approved writing references (empty until your organization adds them)
- `kg/surfaces/`: channel constraints
- `scripts/`: lint/export/bundling tools

## Optional: tooling (for people who use the terminal)

If you’re comfortable with a terminal, the scripts make this repo behave like infrastructure:

```bash
npm ci
npm run lint:graph
npm run bundle:view -- --view context/landing-page-hero-v1.md --out dist/context-pack.md
```

## Commands

- Lint graph: `npm run lint:graph`
- Export graph JSON: `npm run export:graph`
- Graph health report: `npm run report:graph`
- Bundle a complete task: `npm run bundle:view -- --view <path> --out dist/context-pack.md`
- Find related output versions: `npm run prior:outputs -- --source <node> --surface <surface>`
- Run positive/negative fixtures: `npm test`
- Regenerate/check all task packs: `npm run packs:build`, `npm run packs:check`
- Completion check: `npm run check`

## Verification limits

The agent runs graph checks after node/link edits and fixtures after tooling changes, then regenerates affected packs. CI runs the same completion check. Catalog coverage warnings are advisory and follow nested indexes. Validated receipts keep assessment, owner review and publication independent; they do not verify the evidence itself. Numeric scoring is optional. A successful run can finish without a system upgrade.

Graph consistency, fixture success and synchronized source snapshots do not establish factual truth, approval, improved writing, or live outcomes. Required-check branch protection is a separate setting, not established by this repository's CI file.

## Notes

- This repo is compatible with Obsidian. Open the repo root as a vault.
- The lint/export scripts only scan `kg/` and `context/`.
- On GitHub, mark this as a Template Repository in repo settings if you want the “Use this template” button.
