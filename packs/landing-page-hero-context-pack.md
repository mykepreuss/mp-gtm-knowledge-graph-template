# Context Pack

This file is generated from a view. Treat it as the frozen context for a run.

Rules:
- Canon wins. If outputs disagree, upgrade canon, not the draft.
- Do not invent facts. If something is missing, label it TBD or Hypothesis.
- When making factual claims, cite the file path (and heading) from this pack.

---
## context/landing-page-hero-v1.md

```markdown
---
id: kcg:view:landing-page-hero:v1
type: view
title: View: Landing page hero + problem section (v1)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - view
  - routing
  - gtm
task: Write a landing page hero and problem section that signals ICP fit, names the enemy, and stays proof-aware.
seed_nodes:
  - "[[kg/canon/product-truth]]"
  - "[[kg/canon/positioning]]"
  - "[[kg/canon/nomenclature]]"
  - "[[kg/canon/trust-boundaries]]"
  - "[[kg/canon/voice]]"
links:
  - rel: DEPENDS_ON
    href: "[[kg/canon/product-truth]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/positioning]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/nomenclature]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/trust-boundaries]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/voice]]"
  - rel: LINKS_TO
    href: "[[kg/rubrics/gtm-asset-review]]"
---

# Landing page hero + problem section (v1)

## Task

Landing page hero + problem section.

## Audience

`[ICP SEGMENT]`

## Stage

Problem-aware.

## Goal

Make the right buyer self-identify and take the CTA.

## Non-goals

- Feature list hero
- Unprovable performance claims
- Generic SaaS hype

## Constraints

- Every claim must be evidenced (or removed).
- Name the enemy. No vague “manual work” unless defined.
- No competitor naming unless asked.

## Output format

- Hero: headline + subhead + CTA
- Problem: before state, stakes, why now
- Wedge: 3 bullets mapped to outcomes
- Proof: 1 claim with evidence + caveat

## Checks

- Does the hero signal ICP fit and disqualify non-fit?
- Is the enemy concrete?
- Are claims pinned to evidence or caveats?
- Does it sound like us?
```

## kg/canon/nomenclature.md

```markdown
---
id: kcg:canon:nomenclature
type: canon
title: Nomenclature (Preferred Terms)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - terms
  - nomenclature
---

# Nomenclature

This file keeps your preferred nouns stable across assets and AI runs.

## Preferred nouns (replace)
- {{term}}: {{definition}}

## Terms to avoid (replace)
- {{term}}: {{reason}}

## How to use
- If two people use different words for the same thing, it will drift in AI outputs.
- If you rename something, update this file and add an alias term.
```

## kg/canon/positioning.md

```markdown
---
id: kcg:canon:positioning
type: canon
title: Positioning
owner: pmm
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - positioning
---

# Positioning

## Purpose
Make “what we sell” stable across assets.

## Scope
Applies to: GTM assets. Not for: internal strategy docs.

## Positioning snapshot
{{A short positioning statement in buyer language.}}

## We win when
- {{Condition}}

## We lose when
- {{Condition}}

## Landmines
- {{What not to imply or promise}}

## How to use this
If an asset doesn’t disqualify, it will drift toward generic.
```

## kg/canon/product-truth.md

```markdown
---
id: kcg:canon:product-truth
type: canon
title: Product Truth
owner: product
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - product
links:
  - rel: DEPENDS_ON
    href: "[[kg/canon/trust-boundaries]]"
---

# Product Truth

This file prevents capability drift and accidental promises.

## Purpose
Prevent capability drift across GTM assets and AI runs.

## Scope
Applies to: external and customer-facing GTM output. Not for: replacing product docs.

## Definition
{{Define the product in buyer language. No adjectives you cannot defend.}}

## It is
- {{Binary statement in buyer language.}}
- {{Binary statement.}}

## It is not
- {{Common misconception.}}
- {{Adjacent category you are not.}}

## Capabilities index
Only claim capabilities that exist as `entity` nodes and are linked here.

- [[kg/entities/capability/example-capability]]

## Constraints and caveats
- Works best when: {{conditions}}
- Breaks when: {{conditions}}
- Not a fit when: {{conditions}}

## Terms that must not drift
- {{Term}}: {{definition}} (or link to a term entity)

## How to use this (for humans and models)
1) Only claim capabilities that exist in the Capabilities index.
2) If the output implies a guarantee, check Trust Boundaries.
3) Any performance claim must be bounded, or labeled Hypothesis/TBD.

## Change control
- Update triggers: launches, deprecations, pricing changes, security posture changes
- Known gaps: {{what is not yet captured}}
```

## kg/canon/trust-boundaries.md

```markdown
---
id: kcg:canon:trust-boundaries
type: canon
title: Trust Boundaries (Privacy, Security, Guarantees)
owner: legal
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - trust
  - privacy
  - security
links:
  - rel: LINKS_TO
    href: "[[kg/canon/product-truth]]"
---

# Trust Boundaries

Use this to stop accidental promises.

## Purpose
Define what can be claimed about privacy, security, retention, and guarantees, and what must be labeled TBD.

## Scope
Applies to: any public-facing claim about trust, privacy, security, compliance, uptime, and guarantees.

## Allowed claims (only if evidenced)
- {{Claim that is safe and evidenced}}

## Claims that require current evidence or must be labeled TBD
- Pricing, tiers, limits
- Security/compliance posture
- Data retention, data usage, training usage
- Uptime and guarantees

## Required caveats
- {{Caveat language that must appear}}

## Change control
- Update triggers: policy changes, security posture changes, new compliance reports
```

## kg/canon/voice.md

```markdown
---
id: kcg:canon:voice
type: canon
title: Voice (Executable Spec)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - voice
  - writing
---

# Voice

Treat voice like a system:

- constraints (what you never say)
- defaults (how you structure)
- examples and non-examples (what ships and what does not)

## Required run header (every prompt must include)
{{Paste this into your agent prompt wrapper as the “always-on” voice layer.}}

## Voice pillars
- {{Pillar}}

## Non-negotiables
- No invented claims. If unsure: label TBD/Hypothesis.
- Prefer concrete nouns and mechanisms over adjectives.

## Banned patterns
- “In today’s fast-paced world…”
- “Unlock”, “revolutionary”, “game-changing”

## How to use this
When you rewrite a line to match voice, add an example. When you refuse a line, add a non-example with the reason.
```

