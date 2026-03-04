# Prebuilt context packs (copy/paste friendly)

These files are pre-generated “bundles” of a view + its seed nodes.

They exist so a non-technical user can start immediately from GitHub without running any scripts.

## How to use

1) Pick the pack that matches your task.
2) Paste the entire file into your LLM chat (or upload it).
3) Use the prompt from:
   - `docs/FIRST-RUN-PROMPT-WRAPPER.md` (strict output contract), or
   - `docs/READ-WITH.md` (shorter prompts).

## Important

- These packs are examples. Once you edit your canon (`kg/canon/*`), regenerate a fresh pack using:

```bash
npm ci
npm run bundle:view -- --view context/<view>.md --out dist/context-pack.md
```

