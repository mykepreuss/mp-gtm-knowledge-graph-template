---
id: kcg:template:base-node
type: template
title: Template: Base node
owner: repo
status: active
last_reviewed: 2026-03-04
tags:
  - template
  - node
---

# Base node template

Copy, then replace placeholders.

```yaml
---
id: {{namespace}}:{{type}}:{{slug}}
type: canon|entity|source|view|workflow|rubric|template|index|schema
title: {{Human title}}
owner: {{person or function}}
status: active|draft|planned|historical|template|archived
last_reviewed: YYYY-MM-DD
tags:
  - {{tag}}
links:
  # - rel: DEPENDS_ON
  #   href: "[[kg/canon/product-truth]]"
---
```

