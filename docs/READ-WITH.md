# Read with an agent

Describe the work normally to a repository-connected agent. `AGENTS.md` selects context, and `.agents/skills/gtm-writing/SKILL.md` routes organization writing. Simple questions and small edits do not require formal workflows.

## Setup

```text
Help me set up this GTM knowledge graph using docs/V1-INTAKE-FLOW.md. Inspect relevant available sources first. Ask at most three material questions at a time. Keep unknowns as TBD, proposed interpretations separate from approval, and source-backed claims bounded by their evidence.
```

## First asset

```text
Use this repository to draft a landing page hero and problem section for our documented audience. Follow AGENTS.md, select the landing-page-hero view/workflow, and use the actual product and evidence records. Preserve relevant prior feedback. Return complete copy with concise source limits and actual check results. Do not publish it.
```

For a chat without repository access, attach a fresh complete pack and use `docs/FIRST-RUN-PROMPT-WRAPPER.md`. Prebuilt packs in `packs/` contain scaffolds. Regenerate from your own reviewed sources after setup:

```bash
npm ci
npm run bundle:view -- --view context/landing-page-hero-v1.md --out dist/context-pack.md
```

## Learn from feedback

```text
Review this output, my edits, and the exact earlier feedback. Use kg/loops/reflection-prompt.md. Correct the output and identify whether an authorized durable rule change is justified. If so, apply the smallest scoped change at its point of use and record its evidence in the existing output/handoff. A clean result or one-off preference needs no system upgrade.
```

A standalone chat can propose file patches but cannot claim they were applied or tested without tool evidence. Preserve source permission and external-action boundaries.
