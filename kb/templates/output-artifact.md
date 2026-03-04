---
id: kcg:template:output-artifact:v1
type: template
title: Template: Output artifact (v1)
owner: repo
status: active
last_reviewed: 2026-03-04
tags:
  - template
  - output
links:
  - rel: LINKS_TO
    href: "[[kb/canon/claim-labels]]"
  - rel: LINKS_TO
    href: "[[kb/canon/proof-map]]"
  - rel: LINKS_TO
    href: "[[kb/rubrics/index]]"
---

# Output artifact template (v1)

Copy this into `kb/outputs/` and fill it in.

## Frontmatter

```yaml
---
id: kcg:output:{{slug}}
type: output
title: "{{title}}"
owner: {{owner}}
status: draft
last_reviewed: YYYY-MM-DD
tags:
  - output
links:
  - rel: DERIVED_FROM
    href: "[[{{source_node_path_or_id}}]]"
  - rel: EVALUATED_BY
    href: "[[{{rubric_path}}]]"
---
```

## Output

Paste the final output here.

## Claims (optional but recommended)

- Claim:
  - Label: Grounded | Hypothesis | TBD
  - Evidence: {{file path or URL}}

## Rubric result (optional)

- Pass/fail gates:
- Score:
- Fixes applied:

