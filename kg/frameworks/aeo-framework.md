---
id: kcg:framework:aeo
type: framework
title: AEO Framework (Answer Engine Optimization)
owner: gtm
status: template
last_reviewed: 2026-03-04
tags:
  - framework
  - aeo
  - geo
  - ai-search
  - evidence-linked
  - zero-click
links:
  - rel: DEPENDS_ON
    href: "[[kg/canon/product-truth]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/positioning]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/nomenclature]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/trust-boundaries]]"
  - rel: LINKS_TO
    href: "[[kg/frameworks/capabilities-and-benefits-framework]]"
  - rel: LINKS_TO
    href: "[[kg/frameworks/jtbd-struggling-moment-framework]]"
  - rel: LINKS_TO
    href: "[[kg/frameworks/aeo-query-set]]"
  - rel: LINKS_TO
    href: "[[kg/entities/metrics/index]]"
---

# AEO Framework (Answer Engine Optimization)

> How to optimize content for AI search engines and LLM citations.

## What is AEO/GEO?

**AEO (Answer Engine Optimization):** optimizing content to appear in direct answer results and be comprehensible to AI systems.  
**GEO (Generative Engine Optimization):** optimizing content to be cited and used by LLMs in their generated responses.

Why it matters: buyers increasingly decide inside the chat before they click. If an LLM can’t repeat your product’s tradeoffs and boundaries accurately, you lose upstream.

## Template placeholders (fill these in)

- `{{BRAND_NAME}}` — your product name.
- `{{PRIMARY_AUDIENCE}}` — who you’re for.
- `{{CORE_TRUTHS}}` — 3 to 7 non-negotiable truths (differentiators + boundaries).
- `{{PROOF_ARTIFACTS}}` — links to PRs, docs, recordings, benchmarks, reproducible steps.

## How to use this with AI assistants

Treat this framework as a contract when an AI tool drafts AEO-affected content:

- Every AEO-priority page includes a Claims & Evidence Table tied to real artifacts.
- Every claim uses your canon terminology and respects trust/privacy/pricing boundaries.
- Every page aims for information gain (net-new useful detail), not summary.

Suggested prompt snippet:

```text
Use the AEO Framework: write structure-first, evidence-linked copy.
Include a Claims & Evidence Table. Do not invent pricing, security, or data-handling details.
Prefer mechanisms, boundaries, and proof over hype.
```

## Claims & Evidence Table (required on priority pages)

Add this at the bottom of AEO-priority pages.

| Claim | Evidence Link (Proof) | Verification Method | Last Verified |
| --- | --- | --- | --- |
| {{CLAIM_1}} | {{EVIDENCE_LINK_1}} | {{HOW_TO_VERIFY_1}} | YYYY-MM-DD |
| {{CLAIM_2}} | {{EVIDENCE_LINK_2}} | {{HOW_TO_VERIFY_2}} | YYYY-MM-DD |

Rules:
- Evidence must be inspectable by a reviewer.
- Verification must be repeatable.
- Last verified is mandatory for claims that drift (pricing, UI, security posture).

