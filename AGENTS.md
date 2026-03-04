# Agent instructions — Knowledge + Context Graph Template

This repo is meant to be handed to an agent. The agent’s job is to produce GTM output with low drift by following the graph contract, not by guessing.

## Non-negotiables

- Do not invent facts. If something is missing, label it `TBD` or `Hypothesis`.
- Risky claims (pricing, security, privacy, guarantees): require current evidence or must be labeled `TBD`.
- When making factual claims, cite the file path (and heading) from the graph.
- Prefer small, reviewable edits. Upgrade the system (canon/views/templates/rubrics), not just the draft.

## How to run work (the contract)

Always work through the same pipeline:

1) Pick a view (routing)
- A view freezes what context is allowed to speak for this task.
- Views live in `context/`.

2) Use the workflow + template (interface)
- Workflows live in `kb/workflows/`.
- Templates live in `kb/templates/`.

3) Label claims and check gates (validations)
- Rubrics live in `kb/rubrics/`.
- Claim labeling rules live in `kb/canon/claim-labels.md`.

4) Upgrade loop (make next run better)
- Reflection prompt lives in `kb/loops/reflection-prompt.md`.

## Where to put changes

- Durable truth: `kb/canon/`
- Proof artifacts: `kb/sources/`
- Entities (capabilities, terms, metrics): `kb/entities/`
- Routing: `context/`
- Structure: `kb/templates/`
- Task interface: `kb/workflows/`
- Checks: `kb/rubrics/`
- Upgrade loops: `kb/loops/`

## Tooling commands (run after edits)

- Install: `npm ci`
- Lint graph: `npm run lint:graph`
- Bundle a view: `npm run bundle:view -- --view context/<view>.md --out dist/context-pack.md`
- Export graph JSON: `npm run export:graph`

## Default “first task” suggestion

If the user does not specify a task, suggest starting with:

- view: `context/landing-page-hero-v1.md`
- workflow: `kb/workflows/landing-page-hero.md`
- template: `kb/templates/landing-page-hero.md`
- rubric: `kb/rubrics/gtm-asset-review.md`

## Handoff prompt for agent runners (if needed)

If your environment requires a single instruction block, use:

- `docs/FIRST-RUN-PROMPT-WRAPPER.md`
