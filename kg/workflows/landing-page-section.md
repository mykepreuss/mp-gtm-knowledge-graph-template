---
id: kcg:workflow:landing-page-section:v1
type: workflow
title: Workflow: Landing page section (v1)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - workflow
  - gtm
links:
  - rel: DEPENDS_ON
    href: "[[context/landing-page-section-v1]]"
  - rel: DEPENDS_ON
    href: "[[kg/templates/landing-page-section]]"
  - rel: DEPENDS_ON
    href: "[[kg/rubrics/landing-page-section]]"
---

# Workflow: Landing page section (v1)

## Routing (view)
Use: `context/landing-page-section-v1.md`

## Inputs (provide in the task prompt)
- Target page + section (e.g. hero, problem, “how it works”)
- Audience (ICP segment)
- One primary struggling moment
- Proof artifacts to cite (links or `kg/sources/*`)
- Claims that must be avoided (trust boundaries)

## Output contract
Return:
- 3 headline options
- 1 section draft (Markdown)
- Claims checklist with each claim labeled: Grounded | Hypothesis | TBD

## Validations (must pass)
- No unbounded claims without evidence.
- ICP fit signals are explicit.
- Voice constraints pass (no hype, no filler).

## Upgrade points (when it fails twice)
- Missing structure -> tighten the template.
- Risky claims -> tighten `kg/canon/trust-boundaries.md`.
- ICP drift -> tighten `kg/canon/icp.md`.

