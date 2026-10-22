---
id: kcg:workflow:inbound-outline:v1
type: workflow
title: "Workflow: Inbound outline (v1)"
owner: gtm
status: active
last_reviewed: 2026-10-22
tags:
  - workflow
  - gtm
  - inbound
links:
  - rel: DEPENDS_ON
    href: "[[context/inbound-outline-v1]]"
  - rel: DEPENDS_ON
    href: "[[kg/templates/inbound-outline]]"
  - rel: EVALUATED_BY
    href: "[[kg/rubrics/gtm-asset-review]]"
---

# Workflow: Inbound outline (v1)

## Routing (view)
Use: `context/inbound-outline-v1.md`

## Inputs (infer from available sources before asking)
- Audience (ICP segment)
- Primary struggling moment
- POV thesis
- Proof artifacts to cite
- Intended CTA (demo, trial, waitlist, consult)

## Preparation and continuity

Follow [[kg/schema/knowledge-graph-schema]] and the relevant organization voice and surface. For a new substantive draft, use a fitting approved example from [[kg/examples/index]] when available. For source-derived work, run `npm run prior:outputs -- --source NODE --surface SURFACE`, then read the relevant earlier copy and exact feedback. Missing records are a coverage limit; intentional reuse can be useful without a new finding. Small edits skip this preflight.

Infer the owner's actual thought and the reader's purpose from sources. Topic relevance alone does not establish the owner's viewpoint. Preserve source-supported confidence and detail. Use the user's requested number of alternatives; defaults below are not quotas.

## Output contract
Return:
- 3 outline options (headings only)
- 1 recommended outline (with 1-line intent per section)
- Claims checklist (Grounded | Hypothesis | TBD)

## Validations (must pass)
- Mechanism appears in the outline (not just claims).
- Proof callouts exist where claims are risky.
- No hype language.


## Review and handoff

Check concrete meaning, reader value, truth/permission and voice. Distinguish material errors from optional editorial preferences. If a gate fails, return a fix list before the revised output. Numeric scoring is optional only when requested. Use [[kg/templates/output-artifact]] for substantive work, with independent assessment, owner review and publication evidence. Continue the existing artifact/handoff; preserve earlier meaningful failures and feedback. A draft does not authorize publication or scheduling.

## Upgrade points

Apply an explicit durable correction, material failure, or repeated pattern at its proper scope and within existing authorization. Link evidence in the current output/handoff. Clean runs need no system upgrade; a saved rule does not prove future learning.

Missing structure belongs in the template; missing proof belongs in source records; audience or voice drift belongs in the affected canon rule.
