---
id: mp:writing:gtm-knowledge-graph
type: writing
title: You Don’t Need Better Prompts. You Need a Knowledge Graph.
owner: mp
status: draft
last_reviewed: 2026-02-25
tags:
  - writing
  - field-note
  - go-to-market
  - knowledge-graph
  - context-engineering
  - claims
  - evidence
  - agentic-ai
scope: personal
links:
  - rel: USED_BY
    href: "[[mp-kg/canon/tone-of-voice]]"
provenance:
  - origin: notion
    page_title: You Don’t Need Better Prompts. You Need a Knowledge Graph.
---

If you’ve been living in these tools for the last few months, you already know the headline: models can write shippable copy.

Where the cracks show is drift.

Same company. Same product. Same week. Two assets that quietly contradict because the model guessed where your truth was missing.

I’m giving away the system I use to make go-to-market output with LLMs predictable.

Not a prompt library.
An operating system.

The test is simple:

Can you get the same result tomorrow without re-loading the whole company into the session, and without drift turning into made-up claims?

This used to be a prompting problem. People collected cookbooks or asked the model to “act like a world-class X.”

It’s now a context problem.

If you only take one thing from this:

- Prompting is a tactic.
- Context is infrastructure.
- Infrastructure compounds.

*If you don’t have time to read the whole thing, treat it like a spec. Paste it into Codex, Claude Code, or OpenClaw and ask it to build v1: canon files, views, templates, validations, and the loop.*

---

## 1) Drift is the killer

The first time an LLM produces something you can ship, it feels like a win.

Then you notice the tax.

You get there, but it takes:

- five iterations
- three clarifications
- a rewrite to remove the synthetic sheen
- a final human pass to get it back into your voice

Do that once and it’s fine.

Do it across a quarter and your team is buried.

In GTM, variance shows up as drift across assets:

- The landing page sounds like you. The nurture sequence sounds like a vendor.
- The category POV is crisp. The sales deck reads like feature soup.
- One asset is tight and evidence-linked. Another smuggles in an invented ICP.
- The team says “we don’t do hype,” then ships hype.

Everyone blames the model. That’s a mistake.

LLMs are non-deterministic systems. Small input differences create big output differences.

When context is missing, the model guesses. Guessing causes drift.

In GTM, constraints are the difference between “generate” and “guess”:

- what we sell (and what we don’t)
- who it’s for (and who it’s not)
- the enemy (and why now)
- what we can prove (and where proof lives)
- what tradeoffs we make on purpose
- the words we use (and the words we refuse)

If those constraints aren’t encoded anywhere, every session and every person restarts from zero.

Nothing compounds.

---

## 2) Version the context

Here’s the move that makes this compound:

Correct it twice. Encode it once.

Not in your head. Not in a “prompt doc.” Not in a custom GPT, ChatGPT, or Claude project.

Make it a versioned source of truth the model reads before it writes.

Git gives you the mechanics:

- diffs
- review
- owners
- history

Now the whole team can upgrade the system, not just the draft, without re-loading the company into every session.

This also gives you a name for what otherwise feels like “the model is inconsistent.”

Context decay is your company’s truth leaking between sessions, assets, and authors, and over time as people move on, because it never got encoded.

LLMs don’t create context decay. They surface it. When the graph is missing, the model has to guess.

It’s two layers, plus a voice spec:

- Knowledge Graph: durable truth
- Context Graph: routing plus feedback loops
- Voice spec: what “sounds like us” and what never ships

Use whatever UI you want. The requirement is simple:

Your canon has to be versioned Markdown, so you can diff it, review it, and run checks (validations) on it.

Git is the easiest way to get there.

If you can’t diff it, review it, or run checks on it, you don’t have a knowledge graph. You have a bunch of docs, and the model burns tokens figuring out your rules instead of using them.

---

## 3) What I mean by “GTM Knowledge Graph”

A GTM Knowledge Graph is a system of record for the truth your GTM relies on.

Not a wiki. Not a collection of random docs.

“Graph” means this in practice:

You can point to truth by `id`, link it with typed edges, and review changes over time.

In this implementation, each canon file is a versioned Markdown file in Git, and edges are typed links between files.

### 3.0) The contract

If you want this to behave like infrastructure, not a writing aid, here’s the contract:

- Canon wins. If outputs disagree, you upgrade canon, not the draft.
- Every canon file has frontmatter: `id`, `owner`, `status`, `last_reviewed`, and `links`.
- Edges are typed links (e.g., `EVIDENCED_BY`, `DEPENDS_ON`, `CONTRADICTS`).
- Key claims are labeled: Grounded, Hypothesis, or TBD. Grounded claims have proof.
- Work runs through a view (`seed_ids`), a template, and validations.
- Anyone can open a pull request. Owners review and merge. Humans ship anything public.

If your knowledge base doesn’t have those mechanics, the model is still guessing. It’s just guessing with more words nearby.

### 3.1) Minimum viable canon

Before you build workflows, you need canon.

Canon is the durable truth you refuse to let drift between sessions.

Minimum viable canon, highest leverage per hour:

- Product truth
- ICP and segmentation
- Narrative and positioning
- Proof map
- Objections
- Tone of Voice

#### 3.1.1) Frontmatter

A frontmatter template isn’t enough if the file can’t be maintained.

Minimum frontmatter contract:

- Identity: a stable `id` (not just a title)
- Ownership: one responsible owner (person or function)
- Freshness: status plus last reviewed date (active, draft, historical)
- Edges: typed links (e.g., `EVIDENCED_BY`, `DEPENDS_ON`, `CONTRADICTS`)
- Proof: any non-obvious claim either has an artifact, or is explicitly labeled Hypothesis or TBD

In practice, this is a Markdown file with frontmatter in Git:

```yaml
---
id: gtm:canon:product-truth
type: canon
title: Product Truth
owner: Product Marketing
status: active
last_reviewed: YYYY-MM-DD
links:
  - rel: EVIDENCED_BY
    href: "[[gtm:source:demo-video-2026-02]]"
---
```

Two canon files worth adding early, because they prevent accidental promises:

- Trust boundaries: what you can and can’t say about privacy, retention, security, and guarantees, plus required caveats and source links.
- Consent and approvals boundaries: what can happen automatically, what requires explicit sign-off, and who owns the decision.

### 3.2) Template pack

Your canon files should stay small enough to review in one sitting.

Anything that grows should be its own file, with its own owner and proof links:

- Capabilities are entity files.
- Struggling moments are entity files.
- Proof artifacts are source files.

#### Base file template

Use this for canon, entity, index, source, view, and validation files.

```yaml
---
id: <namespace>:<type>:<slug>
type: canon | entity | index | source | view | template | validation | decision | decision-trace
title: <Human title>
owner: <Person or function>
status: active | draft | historical | planned
last_reviewed: YYYY-MM-DD
tags:
  - <tag>
links:
  # - rel: DEPENDS_ON | DEFINES_TERM | EVIDENCED_BY | APPLIES_TO | CONTRADICTS
  #   href: "[[<id-or-path>]]"
---
```

#### Required body sections

For canon and index files:

- Purpose (one sentence)
- Scope (where this applies, and where it does not)
- Canonical truth (the statements that should not drift)
- How to use this (for humans and models)
- Change control (what triggers an update, what is still TBD)

For entity files:

- Purpose
- Scope
- Statement (the reusable unit)
- Benefit (outcome for a specific audience)
- Constraints (when it applies, when it breaks)
- Evidence label: Grounded, Hypothesis, or TBD
- How to use this

For source files:

- What this is
- What it supports (and does not support)
- Freshness
- Usage rules
- Location

---

#### Canon file: Product Truth

```markdown
---
id: gtm:canon:product-truth
type: canon
title: Product Truth
owner: Product Marketing
status: active
last_reviewed: YYYY-MM-DD
tags:
  - product
  - canon
links:
  - rel: DEPENDS_ON
    href: "[[gtm:canon:trust-boundaries]]"
---

## Purpose
Prevent capability drift and accidental promises in GTM output.

## Scope
Applies to: external and customer-facing GTM output. Not for: product docs.

## Definition
[What it is, in buyer language, no adjectives you cannot defend.]

## It is
- [Binary statement in buyer language.]
- [Binary statement.]

## It is not
- [Common misconception.]
- [Adjacent category you are not.]

## Capabilities index
Only claim capabilities that are linked here:
- [[gtm:entity:capability:<slug-1>]]
- [[gtm:entity:capability:<slug-2>]]

## Constraints and caveats
- Works best when:
- Breaks when:
- Not a fit when:

## Terms that must not drift
- Term: definition (link to a definition file if you use one)
- Term: definition

## How to use this (for humans and models)
1) Only claim capabilities that exist in the Capabilities index.
2) If the output implies a guarantee, check Trust Boundaries.
3) Any performance claim must be bounded or labeled Hypothesis or TBD.

## Change control
- Update triggers: launches, deprecations, pricing changes, security posture changes
- Known gaps: [what is not yet captured]
```

#### Entity file: Capability

```markdown
---
id: gtm:entity:capability:<slug>
type: entity
title: Capability: <short name>
owner: Product
status: active
last_reviewed: YYYY-MM-DD
tags:
  - capability
links:
  - rel: DEPENDS_ON
    href: "[[gtm:canon:product-truth]]"
  # - rel: EVIDENCED_BY
  #   href: "[[gtm:source:<artifact>]]"
---

## Purpose
Make one capability claim reusable, testable, and evidence-linked.

## Scope
This capability only applies when its constraints are true.

## Statement
[One sentence, binary, buyer language.]

## Mechanism
[How it works, concrete nouns, no hype.]

## Benefit
So you can <outcome> without <pain>. Keep it specific to one audience anxiety.

Avoid comparative descriptors (faster, better, easier). Name the mechanism and link evidence instead.

## Constraints and caveats
- Requires:
- Does not support:
- Where it breaks:

## Evidence
- Grounded: [[gtm:source:<artifact>]] (what it supports)
- Hypothesis: [what would prove or disprove it]
- TBD: [what is missing]

## How to use this
Use this capability in output only when you can also state its constraints.
```

#### Canon file: ICP

```markdown
---
id: gtm:canon:icp
type: canon
title: ICP
owner: GTM
status: active
last_reviewed: YYYY-MM-DD
tags:
  - icp
  - segmentation
---

## Purpose
Prevent ICP drift across assets and stop “everyone copy.”

## Scope
Applies to: conversion assets. Not for: replacing sales discovery.

## ICP in one paragraph
[Who this is for, in real-world terms. Include disqualifier logic.]

## Fit criteria
- Must have:
- Strong signals:
- Disqualifiers:

## Segments that look similar but buy differently
- Segment:
  - Why they buy:
  - What they punish:
  - What they need to see first:

## Buying committee
- Economic buyer:
- Champion:
- Blockers:

## Triggers and stakes
- Trigger events:
- Cost of doing nothing:
- Why now:

## Struggling moments index
Pick one struggling moment as primary for any asset:
- [[gtm:entity:struggling-moment:<slug-1>]]
- [[gtm:entity:struggling-moment:<slug-2>]]

## Objections we actually hear
- Objection:
  - Best response:
  - What not to say:

## How to use this (for humans and models)
1) Every asset must signal fit and disqualify non-fit.
2) Choose one struggling moment as primary. Do not mash multiple moments by default.
3) If the asset cannot name a trigger, it is probably generic.

## Change control
- Update triggers: win-loss changes, segment shifts, pricing changes
- Known gaps: [what we still do not know]
```

#### Entity file: Struggling Moment

```markdown
---
id: gtm:entity:struggling-moment:<slug>
type: entity
title: Struggling Moment: <short label>
owner: PMM
status: active | draft
last_reviewed: YYYY-MM-DD
tags:
  - jtbd
  - struggling-moment
links:
  - rel: DEPENDS_ON
    href: "[[gtm:canon:icp]]"
  # - rel: EVIDENCED_BY
  #   href: "[[gtm:source:<call-recording>]]"
---

## Purpose
Make one buyer moment routable, reusable, and hard to misread.

## Scope
One trigger, one job, one stake.

## Snapshot
- Situation: When ...
- Motivation: We want to ...
- Outcome: So we can ...

## Optional
- Candidate set: what else they would do instead
- Stakes: what breaks if they do nothing
- Language: phrases the buyer uses

## Evidence
- Grounded: [[gtm:source:<artifact>]] (what it supports)
- Hypothesis: [what would prove or disprove this]
- TBD: [what is missing]

## How to use this
Choose one struggling moment per asset unless the template asks for more.
```

#### Canon file: Category POV

```markdown
---
id: gtm:canon:category-pov
type: canon
title: Category POV
owner: GTM Lead
status: active
last_reviewed: YYYY-MM-DD
tags:
  - category
  - narrative
---

## Purpose
Keep enemy, why now, wedge, and tradeoffs consistent across channels.

## Scope
Applies to: any deliverable that references the category. Not for: internal ideation.

## POV thesis
[One sentence. Concrete nouns.]

## Environment shift
[What changed and why now, in 1 to 2 sentences.]

## Enemy
[Name it with concrete nouns.]

## The old way breaks because
- [Break 1:]
- [Break 2:]
- [Break 3:]

## New way principles
- [Principle 1:]
- [Principle 2:]
- [Principle 3:]

## Our wedge
[What we do differently, mapped to outcomes.]

## Tradeoffs (what we do on purpose)
- We choose X over Y because:
- We refuse Z because:

## Belief ladder (for inbound and sales)
- What the market believes today:
- What they need to believe next:
- What changes the belief:

## Competitive posture
- We engage when:
- We ignore when:
- We reframe when:

## How to use this
1) Keep the enemy consistent.
2) Reuse the same environment shift.
3) State the wedge as outcomes, not feature lists.

## Change control
- Update triggers: positioning shifts, new competitors, new constraints, new proof
```

#### Canon file: Positioning

```markdown
---
id: gtm:canon:positioning
type: canon
title: Positioning
owner: PMM
status: active
last_reviewed: YYYY-MM-DD
tags:
  - positioning
  - messaging
---

## Purpose
Keep the one-liner, wedge, and proof consistent across assets.

## Scope
Applies to: positioning claims. Not for: Category POV.

## Positioning snapshot
- One-liner:
- For:
- Who:
- Unlike:
- We:
- Proof:

## We win when
- Condition:
- Condition:

## We lose when
- Condition:
- Condition:

## Landmines
- What not to imply:
- What we do not promise:

## How to use this
1) If a claim is not in the snapshot, label it Hypothesis or TBD, or remove it.
2) Always pair wedge with evidence, or label as TBD.
3) Keep it consistent with Category POV.

## Change control
- Update triggers: pricing or packaging changes, new proof, ICP shifts
```

#### Index file: Proof Map

```markdown
---
id: gtm:index:proof-map
type: index
title: Proof Map
owner: Marketing Ops
status: active
last_reviewed: YYYY-MM-DD
tags:
  - proof
  - evidence
---

## Purpose
Make proof routable so validations can block ungrounded claims.

## Scope
Applies to: non-obvious claims. Not for: obvious statements.

## Proof artifacts index
Link to source files. Keep this list curated:
- [[gtm:source:<artifact-1>]] (supports: <capability or outcome>)
- [[gtm:source:<artifact-2>]] (supports: <claim or outcome>)

## Proof rules
- If it cannot be supported, label it Hypothesis or TBD, or remove it.
- Prefer bounded statements over sweeping claims.
- If time-sensitive, require freshness.

## How to use this
1) High-risk surfaces (pricing, security, privacy) require a current source.
2) If you cannot point to a source, label the claim Hypothesis or TBD.
3) If it’s time-sensitive, refresh it or remove it.

## Change control
- Update triggers: new launches, new proof, stale proof, policy changes
```

#### Source file: Proof artifact

```markdown
---
id: gtm:source:<artifact>
type: source
title: <Artifact title>
owner: <Owner>
status: active | historical
last_reviewed: YYYY-MM-DD
tags:
  - evidence
  - source
---

## Purpose
Make one artifact usable as evidence without interpretation.

## Scope
What this does and does not support.

## What this is
[Call recording, customer quote, case study, benchmark, metric snapshot, demo.]

## What it supports
- Supports:
- Does not support:

## Freshness
- Captured on:
- Expires on: [date or N/A]
- Staleness risk:

## Usage rules
- Allowed surfaces:
- Restricted surfaces:
- Required caveats:

## Location
- Link:
```

#### Canon file: Tone of Voice

```markdown
---
id: gtm:canon:voice
type: canon
title: Tone of Voice
owner: GTM Lead
status: active
last_reviewed: YYYY-MM-DD
tags:
  - voice
  - writing
---

## Purpose
Prevent vendor-speak and smart-but-empty output.

## Scope
Applies to: GTM output. Not for: product docs.

## Required run header (every prompt must include)
- Audience:
- Channel:
- Objective:
- Length constraints:
- Must-include facts and links:
- Primary struggling moment (link):
- Primary POV (link):

## Voice pillars
- Operator-first, mechanism beats mood.
- Strategy with teeth, choices and tradeoffs.
- Precision, defined terms, tight claims.
- Direct, not performative.

## Non-negotiables
- No em dashes or en dashes.
- No press release voice. No hype.
- No implied guarantees.
- If you reference external facts, include a source link, or write `[source needed]`.
- Never invent sources, quotes, or URLs.

## Defaults
- Short paragraphs, 1 to 4 lines.
- Use bullets for frameworks and checklists.
- Define terms before you use them.

## Banned patterns
- Openers: “In today’s world...”, “In a world where...”, “Let’s dive in...”
- Filler: “It’s important to note...”, “It’s worth noting...”
- Closings: “I hope this helps.”, “Let me know if you have questions.”

## How to use this
1) Every prompt starts with the Required run header.
2) If the output trips a banned pattern, rewrite it.
3) When the same kind of rewrite repeats, turn it into a constraint or a non-example.

## Vocabulary
Use:
- [list]
Avoid:
- [list]

## Examples
[Paste 3 examples, labeled by surface.]

## Non-examples (annotated)
[Paste 3 non-examples and the fix.]

## Change control
- Update triggers: new channels, new surfaces, new recurring rewrites
```

#### Optional: Validation file template

```markdown
---
id: gtm:validation:<task>
type: validation
title: Validation: <task name>
owner: Marketing Ops
status: active
last_reviewed: YYYY-MM-DD
tags:
  - validation
  - quality-gate
---

## Purpose
Turn drift into a fix list.

## Structural checks
- Required frontmatter present in all referenced canon and entity files.
- All referenced canon files are `status: active`.
- All `EVIDENCED_BY` links resolve.

## Content checks
- No unbounded claims without evidence.
- Pricing, privacy, and security claims require current evidence or must be labeled TBD.
- Terminology matches definitions.
- Voice rules pass (no banned openers, no filler).

## Failure output
Return a fix list with:
- failing check
- file to update
- exact text to add
```

### 3.3) The maintenance rule

Most knowledge bases die because updates never make it back into the system. They stay as one-off edits in a doc or a thread, so the next run repeats the same mistake.

Maintenance rule: correct it twice, encode it once.

Don’t fix the draft. Fix the system, then commit the change.

---

## 4) The Context Graph: routing, views, templates, validations, loops

If the Knowledge Graph is your system of record, the Context Graph is your system of action.

This is where teams stall. They keep polishing drafts, tools, and interfaces, but nothing compounds.

The deliverable isn’t the draft. It’s the system that makes drafts repeatable:

- a view that routes the right canon sources
- a template that forces structure
- validations that stop drift before it ships
- a loop that turns edits into upgrades

This is what you want to run agentically. A runner can load the view, fill the template, run validations, and open a pull request.

Humans merge canon changes and ship anything public.

### 4.1) Views: routing

A view is a curated slice of the graph for a task type.

It answers: “Which canon sources are allowed to speak for this job?”

View spec, minimum:

- `view`: stable name
- `seed_ids`: frontmatter `id` values for canon and index files
- `task`: what this view is for
- `validators`: what must pass before ship

Rules:

- default to the smallest set that works
- canon wins over everything else
- default to current canon only, add drafts only when you’re revising them

Example view:

```yaml
view: landing_page_section_v1
seed_ids:
  - gtm:canon:product-truth
  - gtm:canon:icp
  - gtm:canon:category-pov
  - gtm:canon:positioning
  - gtm:canon:voice
  - gtm:index:proof-map
```

### 4.2) Templates: the generation interface

Templates turn a vague request (“write a landing page section”) into a concrete interface:

- required sections
- required inputs (ICP, proof artifacts, constraints)
- required outputs (claims, proof links, CTA)

Template spec, minimum:

- `template`: stable name
- `inputs`: required canon files and proof artifacts
- `output`: required sections and formatting
- `evidence`: where evidence links must appear

You don’t start from a blank page.

You run a view, then the model fills the template.

### 4.3) Validations: rubrics plus evidence rules

Validations are the checks that must pass before something ships.

Some can be automated. Most will start as human-run checklists.

Validation spec, minimum:

- `checks`: pass-fail rules (and any required source links)
- `result`: pass, or a fix list
- `evidence rules`: what must be Grounded vs allowed as Hypothesis or TBD

The validations that matter most in GTM are boring:

- no unbounded claims without evidence artifacts
- pricing, security, and privacy claims require a current source, otherwise label as TBD
- terminology stays consistent, definitions win
- voice check: reads like an operator, not a vendor

### 4.4) The compounding loop: edits become upgrades

Loop, fastest convergence:

1. Set the gate: validators, max iterations, clear done definition
2. Route with a view, freeze the seed ids for this run
3. Generate using a template
4. Extract key claims and label each: Grounded, Hypothesis, or TBD
5. Validate against canon and evidence, and voice constraints
6. Upgrade the system (canon files, views, templates, validations), not just the draft
7. Re-run until the gate passes, then commit the upgrade

If a validator fails, the output is a fix list, not more prose.

Upgrade the system, then re-run using the same frozen seed ids.

Net effect: feedback becomes an upgrade, so the next run starts better than the last.

Reflection prompt:

```text
You are my GTM context engineer.

Given:
- task brief
- view used
- template used
- output produced
- edits and notes

Return:
0) Claims and evidence:
   - list key claims in the output
   - label each: Grounded | Hypothesis | TBD
   - Grounded claims: point to canon file or proof artifact
   - Hypothesis: what would prove or disprove it
1) Knowledge Graph upgrades:
   - missing canon files or missing fields
   - missing definitions that caused drift
   - proof artifacts to index
2) View upgrades:
   - seed ids to add or remove
   - routing changes that reduce drift
3) Template upgrades:
   - output format changes that reduce variance
   - required fields to prevent recurring omissions
4) Validation upgrades:
   - checks to add or tighten
   - evidence rules to make risky claims safe
5) Minimal change plan:
   - files to update
   - exact text to add
   - commit message

Constraints:
- keep the seed ids frozen unless you propose an explicit view change
- do not introduce new claims without evidence labels

Optimize for: remove the need for this correction in future runs.
```

---

## 5) Tone of voice is not style, it’s a system

Most teams treat voice as vibes.

That works when the writer is a human and the context lives in their head.

In LLM workflows, if the constraints aren’t explicit, the model will average your voice into vendor-speak.

You need an executable spec:

- constraints (what you never say)
- defaults (how you structure)
- examples (what good looks like)
- non-examples (what you refuse to ship)

Make it runnable:

- When you rewrite a line to match your voice, add it to Examples.
- When you refuse a line, add it to Non-examples with the reason.
- When the same class of rewrite repeats, add a constraint.

This prevents the two most common ways voice drifts:

- competent vendor voice
- smart but says nothing voice

---

## 6) What it looks like in a team

If you want this to compound, assign owners. Otherwise your context repo turns into a doc graveyard.

A minimal operating model:

- GTM lead: narrative and ICP boundaries
- PMM: positioning, competitors, objections
- Marketing ops: views, templates, validations
- Product: product truth and caveats
- Everyone can open a pull request. Owners review and merge.

Dogfooding is the flywheel. Run real launches through it.

After you ship an asset, you should be able to point to one upgrade:

- a canon file
- a view
- a template
- a validation

If nothing got better, you probably just paid the tax again.

Cadence:

- Weekly, 30 minutes: review drift, approve upgrades
- Monthly: refresh the proof map
- Per launch: freeze the view seed ids, draft into templates, validate, upgrade after ship

Decision rights:

- If a view plus template trips the same validation twice, upgrade the system, not the editor.

That’s how you increase consistency without slowing down.

---

## 7) Build v1

The first build is a snapshot, not a masterpiece.

You’re not documenting the company. You’re writing down the context you keep re-explaining.

1. Capture durable truth
   Write 6 canon files:

- Product truth
- ICP
- Category POV
- Positioning
- Proof map
- Voice

2. Build routing and tests
   Create 3 workflows (each = a view + template + validations):

- Category POV doc
- Landing page section
- Inbound outline

Create 2 rubrics:

- Category POV rubric
- Landing page rubric

Add 3 checks:

- banned language filter
- ICP fit signals are explicit
- no unbounded claims without evidence

3. Run one chain end-to-end
   Category POV doc to landing page section to inbound outline.

Ship one asset.

Then upgrade one thing.

---

## Own the contract, not the model

Models will keep improving. I don’t want my GTM system tied to any one vendor or UI.

The durable part is the contract:

- the context the model reads before it writes
- the structure it has to fill
- the checks it has to pass

Swap models. Keep the contract.

Run the loop and three things happen:

- output quality goes up
- drift goes down
- your team stops re-explaining the same truth every week

That’s what I’m giving away here, because most teams still treat this as prompt work, not infrastructure.

Build the environment. Rent the model.
