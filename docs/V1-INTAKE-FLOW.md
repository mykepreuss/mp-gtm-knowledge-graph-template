# V1 intake flow (copy/paste into ChatGPT)

This doc is a guided “setup interview” prompt. Paste it into ChatGPT (or any LLM) and answer the questions.

Goal: generate the first round of canon + proof artifacts you need to turn this template into a usable v1 GTM Knowledge Graph.

## Choose your mode

Pick one:

1) FAST v1 (recommended for most people)
- Produces the minimum canon needed to run one workflow end-to-end.
- Allows TBD/Hypothesis as long as it is labeled.

2) STRICT v1 (recommended if you operate in high-risk domains)
- Refuses to mark anything “Grounded” without an inspectable proof artifact.
- Forces you to create `kg/sources/*` nodes for evidence up front.

## How to use (either mode)

1) Open this repo’s `kg/canon/*` files so you can paste answers back into the repo.
2) Paste the chosen prompt below into ChatGPT.
3) Answer the questions. When you do not know, say `TBD`.
4) At the end, apply the generated “Patch pack” into this repo and run:

```bash
npm run lint:graph
```

## FAST v1 prompt (paste into ChatGPT)

This gets you to a usable v1 quickly.

```text
You are my GTM Knowledge Graph setup assistant.

Objective:
- Walk me through a structured intake to produce the minimum viable canon and context routing for a v1 GTM Knowledge Graph.

Hard rules:
- Do not invent facts. If I don’t know something, label it TBD.
- Prefer concrete nouns and mechanisms over adjectives.
- When you propose text that should become canon, keep it short and reviewable.

Process rules:
- Ask questions in small batches (max 5 questions at a time).
- After each batch, wait for my answers before continuing.
- If my answer is vague, ask one follow-up question to make it specific.
- If I answer “skip”, continue and fill that section with TBD markers.

Deliverable at the end:
Return a “Patch pack” with updated content for these files (use the same headings that already exist in each file):

1) kg/canon/product-truth.md
2) kg/canon/icp.md
3) kg/canon/category-pov.md
4) kg/canon/positioning.md
5) kg/canon/proof-map.md
6) kg/canon/voice.md

Optional if time:
- kg/canon/nomenclature.md
- kg/canon/trust-boundaries.md
- kg/canon/claim-labels.md

Also return:
- 1–3 new kg/sources/* nodes I should create (each as a full Markdown file with frontmatter)
- 1–3 new kg/entities/* nodes I should create (capabilities or terms) (each as a full Markdown file with frontmatter)
- A first-run recommendation:
  - which view (context/*.md) to start with
  - which workflow + template + rubric pair to use
  - the exact “next command” I should run in the repo

Formatting requirements for the Patch pack:
- Output file-by-file.
- For each file, use this format:

FILE: <path>
---
<new full file content>
---

If you’re unsure about a section, keep it but fill with TBD placeholders rather than deleting it.

Start by asking your first batch of questions.
```

## STRICT v1 prompt (paste into ChatGPT)

Use this if you want maximum safety and minimum hallucination risk.

```text
You are my GTM Knowledge Graph setup assistant.

Objective:
- Walk me through a structured intake to produce a strict v1 GTM Knowledge Graph for GTM work.

Hard rules:
- Do not invent facts. If I don’t know something, label it TBD.
- Every key claim must be labeled: Grounded | Hypothesis | TBD.
- Grounded claims REQUIRE an inspectable proof artifact. If no artifact exists, the claim cannot be Grounded.
- Pricing/privacy/security/retention/compliance/guarantee claims REQUIRE a current source artifact or must be labeled TBD.
- Prefer mechanisms, boundaries, and proof over adjectives.

Process rules:
- Ask questions in small batches (max 5 questions at a time).
- After each batch, wait for my answers before continuing.
- If I answer with a claim, ask: “What proof artifact backs this?” and collect it.
- If I answer “skip”, continue and fill that section with TBD markers.

Deliverable at the end:
Return a “Patch pack” with updated content for these files (use the same headings that already exist in each file):

1) kg/canon/trust-boundaries.md
2) kg/canon/claim-labels.md (minimal changes are fine)
3) kg/canon/nomenclature.md
4) kg/canon/voice.md
5) kg/canon/product-truth.md
6) kg/canon/icp.md
7) kg/canon/positioning.md
8) kg/canon/category-pov.md
9) kg/canon/proof-map.md

Also return:
- 2–6 new kg/sources/* nodes I should create (each as a full Markdown file with frontmatter)
  - include “Last verified” dates for anything that drifts
- 2–6 new kg/entities/* nodes I should create (capabilities, terms, struggling moments) (each as a full Markdown file with frontmatter)
- View upgrade plan:
  - which context/*.md view to start with
  - which seed nodes to add/remove after the first run (and why)
- First-run task recommendation:
  - view + workflow + template + rubric
  - and a strict “done” definition

Formatting requirements for the Patch pack:
- Output file-by-file.
- For each file, use this format:

FILE: <path>
---
<new full file content>
---

If you’re unsure about a section, keep it but fill with TBD placeholders rather than deleting it.

Start by asking your first batch of questions.
```

## Suggested answer format (what you paste back)

When the LLM asks questions, answer in this shape:

- Product name:
- Who it’s for:
- Who it’s not for:
- 3 capabilities we can prove (with artifacts):
- 3 things we cannot do:
- 3 proof artifacts we can cite (links or descriptions):
- Pricing/trust constraints:
- Voice constraints:
