# First-run prompt wrapper (copy/paste)

This is a practical wrapper you can paste into Codex/Claude/ChatGPT or any agent runner.

Goal: force routing, structure, evidence labeling, and a compounding loop upgrade plan.

## Step 1: Generate a bundled context pack

From the repo root:

```bash
npm ci
npm run bundle:view -- --view context/landing-page-hero-v1.md --out dist/context-pack.md
```

Open `dist/context-pack.md` and paste it into the agent session (or attach it if your tool supports files).

## Step 2: Paste this prompt

```text
You are my GTM knowledge + context graph operator.

Source of truth:
- Use ONLY the bundled context pack I provide (dist/context-pack.md). If a fact is not in it, do not invent it.

Rules:
- Canon wins. If something is missing, label it TBD or Hypothesis.
- For each key claim you write, label it: Grounded | Hypothesis | TBD.
- If you label a claim Grounded, cite the exact file path (and heading) from the context pack that supports it.
- Pricing/privacy/security/guarantee claims: must be evidenced by a current source or labeled TBD.
- Write in an operator voice. No hype.

Task:
- Write a landing page hero + problem section for the ICP described in the context pack.

Required output (in this order):
1) Clarifying questions (only if truly blocking; max 5).
2) Draft output using the template structure (hero, problem, wedge, proof, CTA).
3) Claims list:
   - claim
   - label (Grounded | Hypothesis | TBD)
   - evidence (file path + heading) OR what would prove it
4) Validation result:
   - run the rubric gates
   - list any failures as a fix list
5) Upgrade plan:
   - if any failure happened, propose the smallest patch to canon/view/template/rubric that would prevent it next time
   - include exact file(s) + exact text to add
```

## Step 3: Apply the upgrades

If the agent suggests canon/view/template/rubric upgrades, make the edits in Git and rerun:

```bash
npm run lint:graph
```

Then bundle again and re-run the task until the gates pass.

