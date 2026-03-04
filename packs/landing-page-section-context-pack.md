# Context Pack

This file is generated from a view. Treat it as the frozen context for a run.

Rules:
- Canon wins. If outputs disagree, upgrade canon, not the draft.
- Do not invent facts. If something is missing, label it TBD or Hypothesis.
- When making factual claims, cite the file path (and heading) from this pack.

---
## context/landing-page-section-v1.md

```markdown
---
id: kcg:view:landing-page-section:v1
type: view
title: View: Landing page section (v1)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - view
  - routing
  - gtm
task: Write a landing page section that is ICP-specific, proof-aware, and non-hype.
seed_ids:
  - "kcg:canon:product-truth"
  - "kcg:canon:icp"
  - "kcg:canon:category-pov"
  - "kcg:canon:positioning"
  - "kcg:canon:proof-map"
  - "kcg:canon:voice"
seed_nodes:
  - "[[kg/canon/product-truth]]"
  - "[[kg/canon/icp]]"
  - "[[kg/canon/category-pov]]"
  - "[[kg/canon/positioning]]"
  - "[[kg/canon/proof-map]]"
  - "[[kg/canon/voice]]"
links:
  - rel: DEPENDS_ON
    href: "[[kg/canon/product-truth]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/icp]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/voice]]"
---

# Landing page section (v1)

Seed set for landing page copy that stays grounded.
```

## kg/canon/category-pov.md

```markdown
---
id: kcg:canon:category-pov
type: canon
title: Category POV
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - category
  - narrative
---

# Category POV

## Purpose
Define the POV that anchors positioning and messaging.

## Scope
Applies to: narrative/positioning assets. Not for: feature docs.

## POV thesis
{{One sentence.}}

## Environment shift
{{What changed.}}

## Enemy
{{What we are against, and why.}}

## The old way breaks because
{{Mechanism.}}

## New way principles
- {{Principle}}

## Our wedge
{{What we do that makes the new way possible.}}

## Tradeoffs (what we do on purpose)
- {{Tradeoff}}

## How to use this
If an asset can’t name the shift + enemy + wedge, it is probably generic.
```

## kg/canon/icp.md

```markdown
---
id: kcg:canon:icp
type: canon
title: ICP
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - icp
  - segmentation
---

# ICP

## Purpose
Prevent ICP drift and stop “everyone copy.”

## Scope
Applies to: conversion assets and outbound. Not for: replacing sales discovery.

## ICP in one paragraph
{{Who this is for, in real-world terms. Include disqualifier logic.}}

## Fit criteria
- Must have: {{signals}}
- Strong signals: {{signals}}
- Disqualifiers: {{signals}}

## Buying committee
- Economic buyer: {{role}}
- Champion: {{role}}
- Blockers: {{role}}

## Triggers and stakes
- Trigger events: {{events}}
- Cost of doing nothing: {{cost}}
- Why now: {{why now}}

## How to use this
Every asset must signal fit and disqualify non-fit.
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

## kg/canon/proof-map.md

```markdown
---
id: kcg:canon:proof-map
type: canon
title: Proof Map
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - canon
  - proof
  - evidence
links:
  - rel: LINKS_TO
    href: "[[kg/sources/example-demo-video]]"
---

# Proof Map

## Purpose
Index proof artifacts so claims stay grounded.

## Scope
Applies to: any non-obvious claim (performance, outcomes, trust, pricing).

## Proof artifacts index
- [[kg/sources/example-demo-video]]

## Proof rules
- Any risky claim must be either evidenced or labeled Hypothesis/TBD.
- Pricing, privacy, and security claims require current sources, or must be labeled TBD.

## How to use this
When you add a new claim to canon, add its evidence artifact here.
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

