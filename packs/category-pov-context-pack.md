# Context Pack

This file is generated from a view. Treat it as the frozen context for a run.

Rules:
- Canon wins. If outputs disagree, upgrade canon, not the draft.
- Do not invent facts. If something is missing, label it TBD or Hypothesis.
- When making factual claims, cite the file path (and heading) from this pack.

---
## context/category-pov-doc-v1.md

```markdown
---
id: kcg:view:category-pov-doc:v1
type: view
title: View: Category POV doc (v1)
owner: gtm
status: active
last_reviewed: 2026-03-04
tags:
  - view
  - routing
  - gtm
task: Draft a category POV doc that is stable, routable, and evidence-aware.
seed_ids:
  - "kcg:canon:category-pov"
  - "kcg:canon:positioning"
  - "kcg:canon:icp"
  - "kcg:canon:proof-map"
seed_nodes:
  - "[[kg/canon/category-pov]]"
  - "[[kg/canon/positioning]]"
  - "[[kg/canon/icp]]"
  - "[[kg/canon/proof-map]]"
links:
  - rel: DEPENDS_ON
    href: "[[kg/canon/category-pov]]"
  - rel: DEPENDS_ON
    href: "[[kg/canon/positioning]]"
---

# Category POV doc (v1)

Keep the seed set small. Add nodes only when the same correction repeats.
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

