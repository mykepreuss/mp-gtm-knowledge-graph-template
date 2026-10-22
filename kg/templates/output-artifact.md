---
id: kcg:template:output-artifact:v1
type: template
title: "Template: Output artifact (v1)"
owner: repo
status: active
last_reviewed: 2026-10-22
tags:
  - template
  - output
links:
  - rel: LINKS_TO
    href: "[[kg/canon/claim-labels]]"
  - rel: LINKS_TO
    href: "[[kg/canon/proof-map]]"
  - rel: LINKS_TO
    href: "[[kg/rubrics/index]]"
---

# Output artifact template

Use for substantive outputs worth retaining under `kg/outputs/<topic>/<surface>-v1.md`. The agent fills the record from actual work and normal feedback. Small edits use the existing artifact; historical files need no migration.

Copy this scaffold, replace the node paths, and use the workflow's structure for the actual draft. Optional structured receipt fields are shown together below. Omit the entire receipt on historical/minimal nodes when no assessment is recorded; do not invent values to complete it.

```yaml
---
id: kcg:output:replace-slug
type: output
title: "Replace title"
owner: gtm
status: draft
last_reviewed: YYYY-MM-DD
tags: [output, website]
links:
  - rel: DERIVED_FROM
    href: "[[kg/canon/product-truth]]" # Actual source, not an ID in a wikilink
  - rel: TARGETS_SURFACE
    href: "[[kg/surfaces/website]]"
  - rel: EVALUATED_BY
    href: "[[kg/rubrics/gtm-asset-review]]"
evaluation:
  rubric: "[[kg/rubrics/gtm-asset-review]]"
  rubric_version: null
  assessed_at: null
  assessor: null
  gates: not_assessed # pass | fail | not_assessed
  score: null         # Optional 0 to 10 only when requested and performed
  failure_modes: []
  changes: []
user_review:
  decision: pending   # pending | approved | revise | rejected
  feedback: null
  evidence: null
publication_status: local_draft
publication_evidence: null
---
```

## Draft

Paste the complete usable output here.

## Claims and source limits

Record material claims, Grounded/Hypothesis/TBD labels, exact source file/heading or URL, observation date, and boundaries. Preserve metric names, units, periods, cohorts, and attribution. A source assertion alone does not establish independent verification.

## Review

Record concrete meaning, reader value, truth/permission, and voice findings; decision: ready, revise, hold, or discard. If a gate fails, return the fix list before a revised draft. A score is optional. An assessed receipt uses `pass` or `fail`, a real date, actual assessor, matching EVALUATED_BY rubric, and concrete failures when applicable. `not_assessed` requires null score/date/assessor. Do not invent model identities or scores.

## Owner review and publication

Record exact feedback and actual evidence for this version. Any decision other than pending, or any feedback, requires dated evidence or an accessible record reference. Approval of a source or earlier draft does not approve this version. Preserve earlier reviewed versions before a substantive revision; use DERIVED_FROM to link the revision, starting its owner review at pending. Do not version every small edit.

Publication states: `unknown`, `local_draft`, `draft`, `external_draft`, `buffer_draft`, `scheduled`, `published`, `sent`. External states require evidence identifying the item/version, when it was reported or observed, and by whom or in which system. A local save does not establish external state. A rejected draft may still have been published. Metadata validation cannot establish evidence truth or permission to publish.

## Continuity and learning

Keep current version, relevant exact direction, source/item IDs, unresolved evidence, and next useful action in the existing output or handoff. Retain material failed assessments and superseded decisions without copying transcripts. Apply a durable correction at its proper point of use only within authorization; a clean result needs no upgrade. If response metrics are reviewed, retain capture period and attribution. Reach, engagement, owner acceptance, publication and business outcomes are different observations.
