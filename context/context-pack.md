---
id: kcg:index:context-pack
type: index
title: Context Pack (Views Index)
owner: repo
status: active
last_reviewed: 2026-10-22
tags:
  - index
  - context
  - view
links:
  - rel: LINKS_TO
    href: "[[kg/knowledge-graph]]"
  - rel: LINKS_TO
    href: "[[context/category-pov-doc-v1]]"
  - rel: LINKS_TO
    href: "[[context/landing-page-hero-v1]]"
  - rel: LINKS_TO
    href: "[[context/landing-page-section-v1]]"
  - rel: LINKS_TO
    href: "[[context/inbound-outline-v1]]"
---

# Views

Choose a view for the task, then its workflow. View membership selects context; it does not approve claims or override source limits. Keep seeds small and repair actual missing context, not catalog warnings by expanding views.

- [[context/landing-page-hero-v1]]: clarify offer, audience, problem and CTA.
- [[context/landing-page-section-v1]]: draft a specific website section.
- [[context/category-pov-doc-v1]]: explain a market shift, mechanism, wedge and tradeoffs.
- [[context/inbound-outline-v1]]: develop a source-grounded article outline.

`npm run bundle:view -- --view context/landing-page-hero-v1.md --out dist/context-pack.md` includes the selected task's contracts as well as the seeds. With multiple workflows for one view, pass `--workflow PATH`. A bundle is a source snapshot, not verified current truth.
