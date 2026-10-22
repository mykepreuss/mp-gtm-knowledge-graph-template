---
id: kcg:workflow:landing-page-hero:v1
type: workflow
title: "Workflow: Landing page hero + problem section (v1)"
owner: gtm
status: active
last_reviewed: 2026-10-22
tags:
  - workflow
  - gtm
links:
  - rel: DEPENDS_ON
    href: "[[context/landing-page-hero-v1]]"
  - rel: DEPENDS_ON
    href: "[[kg/templates/landing-page-hero]]"
  - rel: DEPENDS_ON
    href: "[[kg/rubrics/gtm-asset-review]]"
---

# Workflow: Landing page hero + problem section (v1)

## Routing (view)
Use: `context/landing-page-hero-v1.md`

## Inputs (infer from available sources before asking)
- Audience (ICP segment)
- Enemy (what the buyer is replacing, in concrete terms)
- Proof artifacts to cite (links or `kg/sources/*`)
- Trust boundaries to respect (privacy/security/pricing)
- CTA (demo, trial, waitlist, consult)

## Preparation and continuity

Follow [[kg/schema/knowledge-graph-schema]] and the relevant organization voice and surface. For a new substantive draft, use a fitting approved example from [[kg/examples/index]] when available. For source-derived work, run `npm run prior:outputs -- --source NODE --surface SURFACE`, then read the relevant earlier copy and exact feedback. Missing records are a coverage limit; intentional reuse can be useful without a new finding. Small edits skip this preflight.

Infer the owner's actual thought and the reader's purpose from sources. Topic relevance alone does not establish the owner's viewpoint. Preserve source-supported confidence and detail. Use the user's requested number of alternatives; defaults below are not quotas.

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

## Upgrade points

Apply an explicit durable correction, material failure, or repeated pattern at its proper scope and within existing authorization. Link evidence in the current output/handoff. Clean runs need no system upgrade; a saved rule does not prove future learning.
- If headlines are generic: tighten the template to require one concrete noun + enemy.
- If risky claims keep appearing: tighten `kg/canon/trust-boundaries.md`.
- If it’s not ICP-specific: tighten `kg/canon/icp.md`.


## Review and handoff

Check concrete meaning, reader value, truth/permission and voice. Distinguish material errors from optional editorial preferences. If a gate fails, return a fix list before the revised output. Numeric scoring is optional only when requested. Use [[kg/templates/output-artifact]] for substantive work, with independent assessment, owner review and publication evidence. Continue the existing artifact/handoff; preserve earlier meaningful failures and feedback. A draft does not authorize publication or scheduling.
