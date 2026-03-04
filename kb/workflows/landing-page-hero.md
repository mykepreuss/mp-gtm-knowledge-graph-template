---
id: kcg:workflow:landing-page-hero:v1
type: workflow
title: Workflow: Landing page hero + problem section (v1)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - workflow
  - gtm
links:
  - rel: DEPENDS_ON
    href: "[[context/landing-page-hero-v1]]"
  - rel: DEPENDS_ON
    href: "[[kb/templates/landing-page-hero]]"
  - rel: DEPENDS_ON
    href: "[[kb/rubrics/gtm-asset-review]]"
---

# Workflow: Landing page hero + problem section (v1)

## Routing (view)
Use: `context/landing-page-hero-v1.md`

## Inputs (provide in the task prompt)
- Audience (ICP segment)
- Enemy (what the buyer is replacing, in concrete terms)
- Proof artifacts to cite (links or `kb/sources/*`)
- Trust boundaries to respect (privacy/security/pricing)
- CTA (demo, trial, waitlist, consult)

## Output contract
Return:
- 3 headline options
- 2 subhead options
- 1 full hero + problem draft (Markdown)
- Claims checklist: 5 to 10 key claims labeled Grounded | Hypothesis | TBD

## Validations (must pass)
- ICP fit signals are explicit and non-fit is implicitly disqualified.
- Enemy is concrete (not vague “manual work”).
- No unbounded claims without evidence labels.
- Ends with one next action (CTA).

## Upgrade points (when it fails twice)
- If headlines are generic: tighten the template to require one concrete noun + enemy.
- If risky claims keep appearing: tighten `kb/canon/trust-boundaries.md`.
- If it’s not ICP-specific: tighten `kb/canon/icp.md`.

