# Start Here (15 minutes to first run)

This repo is a template for building:

- A **knowledge graph**: durable truth you refuse to let drift (`kg/`).
- A **context graph**: routing + task interfaces + checks (`context/` + workflows/templates/rubrics).

The goal is simple: make AI-assisted GTM output repeatable and evidence-aware.

If you only do one thing: replace the placeholder canon and add proof artifacts. Everything else builds on that.

## 0) Prereqs

- Node 20+
- Git

Then:

```bash
npm ci
npm run lint:graph
```

## 1) Pick (or keep) an `id` namespace

This template uses the prefix `kcg:` in `id:` fields.

- You can keep it.
- If you change it, do it once with a repo-wide search/replace and keep it stable forever (IDs are infrastructure).

## 2) Fill the v1 canon (this is the setup)

Before you expect reliable output, replace the placeholders in:

- `kg/canon/product-truth.md`
- `kg/canon/icp.md`
- `kg/canon/category-pov.md`
- `kg/canon/positioning.md`
- `kg/canon/proof-map.md`
- `kg/canon/trust-boundaries.md`
- `kg/canon/voice.md`
- `kg/canon/nomenclature.md`
- `kg/canon/claim-labels.md` (how you enforce Grounded vs Hypothesis vs TBD)

Recommended order:

1) Trust boundaries + claim labels (stops accidental promises)
2) Voice + nomenclature (stops drift in language)
3) Product truth (stops capability drift)
4) ICP + positioning + category POV (stops “everyone copy”)
5) Proof map (makes grounding mechanical)

## 3) Add real proof artifacts

Create 1 to 3 `kg/sources/*` nodes that prove claims you expect to ship.

Example:

- `kg/sources/example-demo-video.md` (replace with your real artifact)

Rule:
- If a claim is risky (pricing, privacy, security, guarantees), it must be either evidenced by a current artifact or labeled TBD.

## 4) Pick one task to run end-to-end

Start with a landing page hero because it forces the whole contract:

- View (routing): `context/landing-page-hero-v1.md`
- Workflow (task interface): `kg/workflows/landing-page-hero.md`
- Template (structure): `kg/templates/landing-page-hero.md`
- Rubric (checks): `kg/rubrics/gtm-asset-review.md`
- Loop (upgrade plan): `kg/loops/reflection-prompt.md`

## 5) Bundle the view (freeze the context)

```bash
npm run bundle:view -- --view context/landing-page-hero-v1.md --out dist/context-pack.md
```

This generates one file that you can hand to an agent (or paste into a prompting tool) as the frozen source of truth for that run.

## 6) Run with an agent (copy/paste)

Use:

- `docs/FIRST-RUN-PROMPT-WRAPPER.md`
- `docs/V1-INTAKE-FLOW.md` (if you need the LLM to interview you to fill canon)
- `AGENTS.md` (agent operating rules)

## 7) After the run: upgrade the system, not the draft

When something is wrong:

- Fix canon (truth), view (routing), template (structure), or rubric/validations (checks).
- Don’t just rewrite the output forever.

Rule of thumb:

Correct it twice, encode it once.
