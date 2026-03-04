# No-terminal setup (recommended for GTM teams)

You can use this repo without installing Node, Git, or Obsidian.

Use GitHub’s UI to edit Markdown files and use an LLM to generate the first version of your canon.

## 1) Create your copy of the repo

In GitHub:

- Click **Use this template** (or download ZIP if you prefer).

## 2) Generate your v1 canon with AI (fastest)

Open `docs/V1-INTAKE-FLOW.md`, copy the **FAST v1** prompt, paste it into ChatGPT/Claude, and answer the questions.

When it returns a “Patch pack”, apply it by editing these files in GitHub:

- `kg/canon/product-truth.md`
- `kg/canon/icp.md`
- `kg/canon/category-pov.md`
- `kg/canon/positioning.md`
- `kg/canon/proof-map.md`
- `kg/canon/voice.md`
- (optional but recommended) `kg/canon/trust-boundaries.md`, `kg/canon/nomenclature.md`

## 3) Add proof artifacts (do at least one)

Create at least 1 file under:

- `kg/sources/`

Copy `kg/sources/example-demo-video.md` as a template and replace it with your real artifact.

Rule:
- If a claim is risky (pricing/privacy/security/guarantees), it must be evidenced or labeled `TBD`.

## 4) Run your first task with an LLM (no bundling required)

Pick a view:

- `context/landing-page-hero-v1.md`

Open it and look at:

- `seed_nodes:` (a list of files that are allowed to speak)

Now do a “manual bundle”:

1) Open each file listed in `seed_nodes`
2) Copy/paste them into your LLM chat, one by one
3) Then paste the prompt from `docs/FIRST-RUN-PROMPT-WRAPPER.md`

Tip:
- If your LLM supports file uploads, upload the files instead of copy/paste.

Alternative (even easier):
- Use a prebuilt pack from `packs/` and paste it into your LLM chat.
- Start with: `packs/landing-page-hero-context-pack.md`

## 5) Upgrade loop (make next run better)

After you get output:

1) Apply your edits to the output.
2) Then use `kg/loops/reflection-prompt.md` to propose the smallest patch to:
   - canon (`kg/canon/`)
   - view (`context/`)
   - template/workflow (`kg/templates/`, `kg/workflows/`)
   - rubric (`kg/rubrics/`)

Correct it twice, encode it once.
