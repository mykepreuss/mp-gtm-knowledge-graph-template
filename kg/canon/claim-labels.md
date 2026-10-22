---
id: kcg:canon:claim-labels
type: canon
title: Claim Labels (Grounded, Hypothesis, TBD)
owner: gtm
status: active
last_reviewed: 2026-10-22
tags:
  - canon
  - claims
  - evidence
links:
  - rel: DEPENDS_ON
    href: "[[kg/canon/proof-map]]"
  - rel: LINKS_TO
    href: "[[kg/canon/trust-boundaries]]"
---

# Claim labels

Use this to keep outputs honest and to make validations mechanical.

## Grounded

A grounded claim has an inspectable proof artifact that supports this specific wording within its date, population, and verification limits. Preserve whether it is a source assertion, a reported result, or an independently observed fact.

- Evidence: a `kg/sources/*` node or an external link that a reviewer can inspect.
- If the claim can drift (pricing, security, UI), include a last verified date in the source node.

## Hypothesis

A hypothesis is a plausible claim that you have not proven yet.

- It must be labeled Hypothesis.
- Include what would prove or disprove it (and what artifact you’d add to the proof map).

## TBD

TBD means you do not know and you are not guessing.

- Prefer TBD for pricing/privacy/security claims when you cannot cite a current source.
- TBD records a gap. Add evidence when needed for the task; no automatic canon upgrade is required. Labels belong in internal review notes and do not make unsupported public promises acceptable.

Apply [[kg/schema/knowledge-graph-schema]] for authority and conditional freshness. A link, review date, or approved wording alone does not verify current truth.

