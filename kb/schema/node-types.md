---
id: kcg:schema:node-types
type: schema
title: Node Types
owner: repo
status: active
last_reviewed: 2026-03-04
tags:
  - schema
  - nodes
links:
  - rel: DEPENDS_ON
    href: "[[kb/schema/knowledge-graph-schema]]"
---

# Node types

Keep the type set small and treat it like an API contract for tooling.

Core types used in this template:

- `canon`: durable truth and boundaries
- `entity`: a single concept (capability, term, struggling moment, competitor)
- `framework`: reusable strategy/writing/checklist structure
- `dataset`: enumerations/backlogs (e.g., query sets)
- `source`: evidence artifacts and proof nodes
- `output`: generated artifact you want to review/reuse
- `view`: routing seed sets (lives in `context/`)
- `workflow`: a task interface (view + template + validations)
- `rubric`: gates and scoring for an output type
- `template`: reusable scaffolds
- `index`: navigation pages
- `schema`: the contract itself
- `decision`, `decision-trace`: governance (optional)
