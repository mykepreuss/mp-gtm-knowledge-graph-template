---
id: kcg:workflow:inbound-outline:v1
type: workflow
title: Workflow: Inbound outline (v1)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - workflow
  - gtm
  - inbound
links:
  - rel: DEPENDS_ON
    href: "[[context/inbound-outline-v1]]"
  - rel: DEPENDS_ON
    href: "[[kg/templates/inbound-outline]]"
---

# Workflow: Inbound outline (v1)

## Routing (view)
Use: `context/inbound-outline-v1.md`

## Inputs (provide in the task prompt)
- Audience (ICP segment)
- Primary struggling moment
- POV thesis
- Proof artifacts to cite
- Intended CTA (demo, trial, waitlist, consult)

## Output contract
Return:
- 3 outline options (headings only)
- 1 recommended outline (with 1-line intent per section)
- Claims checklist (Grounded | Hypothesis | TBD)

## Validations (must pass)
- Mechanism appears in the outline (not just claims).
- Proof callouts exist where claims are risky.
- No hype language.

