---
id: kcg:workflow:category-pov-doc:v1
type: workflow
title: "Workflow: Category POV doc (v1)"
owner: gtm
status: active
last_reviewed: 2026-10-22
tags:
  - workflow
  - gtm
  - narrative
links:
  - rel: DEPENDS_ON
    href: "[[context/category-pov-doc-v1]]"
  - rel: DEPENDS_ON
    href: "[[kg/templates/category-pov-doc]]"
  - rel: DEPENDS_ON
    href: "[[kg/rubrics/category-pov-doc]]"
---

# Workflow: Category POV doc (v1)

## Routing (view)
Use: `context/category-pov-doc-v1.md`

## Inputs (infer from available sources before asking)
- Target audience (ICP segment)
- What changed (the shift)
- What is now broken (the old way)
- Our wedge + tradeoffs
- Proof artifacts to cite

## Preparation and continuity

Follow [[kg/schema/knowledge-graph-schema]] and the relevant organization voice and surface. For a new substantive draft, use a fitting approved example from [[kg/examples/index]] when available. For source-derived work, run `npm run prior:outputs -- --source NODE --surface SURFACE`, then read the relevant earlier copy and exact feedback. Missing records are a coverage limit; intentional reuse can be useful without a new finding. Small edits skip this preflight.

Infer the owner's actual thought and the reader's purpose from sources. Topic relevance alone does not establish the owner's viewpoint. Preserve source-supported confidence and detail. Use the user's requested number of alternatives; defaults below are not quotas.

## Output contract
Return:
- 1 POV doc draft (Markdown)
- 5 to 10 key claims with labels: Grounded | Hypothesis | TBD
- A fix list if any rubric gate fails

## Validations (must pass)
- Shift sentence exists (old way used to work, now it breaks because X).
- Mechanism exists (causal chain, not vibes).
- One explicit tradeoff is stated.
- No risky claims without evidence labels.

## Upgrade points

Apply an explicit durable correction, material failure, or repeated pattern at its proper scope and within existing authorization. Link evidence in the current output/handoff. Clean runs need no system upgrade; a saved rule does not prove future learning.
- Missing structure -> tighten the template.
- Missing proof -> upgrade the proof map and add sources.
- Narrative drift -> tighten `kg/canon/category-pov.md`.


## Review and handoff

Check concrete meaning, reader value, truth/permission and voice. Distinguish material errors from optional editorial preferences. If a gate fails, return a fix list before the revised output. Numeric scoring is optional only when requested. Use [[kg/templates/output-artifact]] for substantive work, with independent assessment, owner review and publication evidence. Continue the existing artifact/handoff; preserve earlier meaningful failures and feedback. A draft does not authorize publication or scheduling.
