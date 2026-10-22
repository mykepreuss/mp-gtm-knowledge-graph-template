# Complete task packs

These generated files let a standalone chat receive the selected view, its seeds, direct proof references, workflow, template, rubric, and shared authority/output contracts.

- `landing-page-hero-context-pack.md`: hero and problem section.
- `landing-page-section-context-pack.md`: a specific website section.
- `category-pov-context-pack.md`: category narrative.
- `inbound-outline-context-pack.md`: article outline.

Paste or upload one whole pack, then use `docs/FIRST-RUN-PROMPT-WRAPPER.md`. Packs ship with template placeholders, not business facts or approved examples. Each manifest hashes the included source snapshot. Other navigation links do not imply that their contents are included.

After editing bundled material, the agent regenerates and checks packs:

```bash
npm run packs:build
npm run packs:check
```

CI checks that committed packs match their current source files. This prevents unnoticed stale bundles; it does not establish factual freshness. Do not paste private sources into another service without applicable permission.
