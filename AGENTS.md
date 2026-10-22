# Agent instructions: GTM Knowledge Graph Template

Treat this repo as runnable infrastructure for source-grounded GTM work. Follow the user's explicit task and carry its authorization within scope. Read `docs/UPGRADE-HANDOFF.md` when continuing template maintenance; use the relevant existing output/handoff for organization work.

## Match the work

Small edits and questions stay small. Preserve supplied meaning and voice unless asked to rewrite. For substantive work, select the relevant view, workflow, template, and rubric. Infer inputs from available records before asking up to three material questions. The agent maintains records and runs checks; do not ask the user to assemble a file list or fill in scores.

For drafting, revising, or reviewing the organization's writing, use `.agents/skills/gtm-writing/SKILL.md`. It routes to this repository's approved voice, sources and examples. It does not install personal preferences or grant external-action authority.

## Discovery and authority

Start with `kg/knowledge-graph.md` and the relevant catalog's when-to-open guidance. Read actual selected passages, not just index descriptions. Keep task context small:

- `kg/canon/canon.md`: product, audience, positioning, voice, claim rules, proof and trust boundaries.
- `context/context-pack.md`: views, the source seeds allowed to speak for a task.
- `kg/workflows/index.md`: task contract and validations.
- `kg/rubrics/index.md`: checks; return a fix list before revised output if a gate fails.
- `kg/examples/index.md`, `kg/surfaces/index.md`, `kg/frameworks/index.md`: relevant approved references, channel constraints and supporting structures.
- `kg/outputs/index.md`: prior work, review evidence and continuity.

Apply `kg/schema/knowledge-graph-schema.md`. Separate source evidence, owner-approved guidance, proposals and history. Follow current approved pointers and explicit corrections. Status, a newer filename, view membership, publication or a model score does not confer approval. Recheck changing facts only when they materially affect the task. Placeholders are never facts. Label unsupported claims `TBD` or `Hypothesis` and preserve what would resolve them; do not turn those labels into permission to publish a claim.

## Produce, review, and learn

Use the selected workflow's Inputs, Output contract, Validations, and Upgrade points. Check concrete meaning, reader value, source fidelity, and the organization's voice. Compare actual earlier copy and feedback when revising or deriving work. Intentional reuse is allowed when useful; no novelty quota or mandatory scoring.

For source-derived outputs, run `npm run prior:outputs -- --source NODE --surface SURFACE` and inspect relevant candidates. Empty or incomplete records are coverage limits, not proof of no prior use. Record assessment, owner review, and publication separately using `kg/templates/output-artifact.md`. Preserve rejected versions, exact feedback and meaningful failures; do not copy approval into substantive revisions. Small edits need no new receipt.

Upgrade the relevant rule only for an explicit durable correction, material failure, or repeated pattern, within existing authority. Use `kg/loops/reflection-prompt.md`; a clean run can finish without an upgrade. Keep dated evidence in the existing output/handoff and reusable guidance at the point of use. At a substantial completion or interruption, record changed files, verification, actual state and next action in that same handoff.

Drafting does not authorize sending, publishing, scheduling, external export of private content, or changes to live systems. Continue already-authorized actions without repeated confirmation. A workflow or skill file does not activate a schedule. Preserve retired workflows as history; do not execute a stale invocation.

## Placement and verification

Durable facts: `kg/canon/`; proof: `kg/sources/`; entities: `kg/entities/`; routing: `context/`; contracts: `kg/workflows/`; structures: `kg/templates/`; checks: `kg/rubrics/`; generated work: `kg/outputs/`; approved references: `kg/examples/`.

- Install dependencies: `npm ci`.
- Validate nodes/links: `npm run lint:graph`.
- After changing tooling, run fixtures: `npm test`.
- After changing bundled sources/contracts, regenerate: `npm run packs:build`.
- Completion check: `npm run check`.
- Bundle a task: `npm run bundle:view -- --view context/landing-page-hero-v1.md --out dist/context-pack.md`.
- Export/report: `npm run export:graph`, `npm run report:graph`.

Inspect advisory catalog warnings and repair relevant omissions. Do not describe graph consistency or CI configuration as verified truth, owner acceptance, live behavior, or enforced merge protection.
