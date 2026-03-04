# Read with an agent (copy/paste prompts)

This repo is meant to be used with LLM tools. These prompts make it easy to:

- bootstrap v1 canon from your answers
- run one workflow end-to-end
- convert feedback into graph upgrades (canon/view/template/rubric)

## 1) V1 setup interview (recommended first)

Use: `docs/V1-INTAKE-FLOW.md`

Prompt (paste into ChatGPT/Claude/etc.):

```text
I’m setting up a Knowledge + Context Graph repo.

Open and follow this doc exactly:
- docs/V1-INTAKE-FLOW.md

Start the interview now. Ask at most 5 questions at a time. If I don’t know, I will answer TBD.
```

## 2) First end-to-end run (landing page hero)

Prereq: bundle a view so the context is frozen:

```bash
npm ci
npm run bundle:view -- --view context/landing-page-hero-v1.md --out dist/context-pack.md
```

Then use:

- `docs/FIRST-RUN-PROMPT-WRAPPER.md`

Quick prompt (paste into your LLM, then attach/paste `dist/context-pack.md`):

```text
I will paste a bundled context pack next (dist/context-pack.md).

After I paste it:
- Use ONLY that context pack as source of truth.
- Follow the workflow: kg/workflows/landing-page-hero.md
- Follow the template: kg/templates/landing-page-hero.md
- Validate with: kg/rubrics/gtm-asset-review.md
- Output claims with labels: Grounded | Hypothesis | TBD
- Then propose the smallest graph upgrades to prevent the same issues next time.
```

## 3) Upgrade loop (turn edits into patches)

When you have an output + edits, paste this:

```text
You are my GTM context engineer.

Given:
- the task brief
- the view used (context/*.md)
- the output produced
- my edits and notes

Use: kg/loops/reflection-prompt.md

Return a patch plan with:
- which file(s) to change (kg/canon, context, kg/templates, kg/rubrics)
- exact text to add
- and the smallest change that would prevent the failure next time.
```

## Notes

- If your tool supports file uploads, attaching `dist/context-pack.md` is better than copy/paste.
- If your tool supports citations, require file path + heading citations for any “Grounded” claim.

