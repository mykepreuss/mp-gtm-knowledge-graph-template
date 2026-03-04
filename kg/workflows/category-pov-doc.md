---
id: kcg:workflow:category-pov-doc:v1
type: workflow
title: Workflow: Category POV doc (v1)
owner: gtm
status: active
last_reviewed: 2026-03-04
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

## Inputs (provide in the task prompt)
- Target audience (ICP segment)
- What changed (the shift)
- What is now broken (the old way)
- Our wedge + tradeoffs
- Proof artifacts to cite

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

## Upgrade points (when it fails twice)
- Missing structure -> tighten the template.
- Missing proof -> upgrade the proof map and add sources.
- Narrative drift -> tighten `kg/canon/category-pov.md`.

