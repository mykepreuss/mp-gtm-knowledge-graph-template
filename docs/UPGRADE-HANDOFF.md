# Template upgrade handoff

## Contract and state

October 22, 2026. Apply the reusable improvements in the current MP-KG working tree to this GTM template. Preserve the existing `kg/`, `context/`, and Node command interface. The source checkout is read-only for this task. Template baseline: `3cc0db8`; working branch: `mp/knowledge-graph-template-upgrades`.

Authorized: template implementation and verification; Michael subsequently authorized committing the upgrades and opening a PR on October 22, 2026. Completion means reusable rules are routed from the entrypoints, tools enforce their documented structural checks, fixtures demonstrate rejection of defective inputs, and generated packs match source. This does not authorize publication, deployment, scheduling, or adoption of an organization's business claims.

## Transfer map

| MP-KG source | Reusable improvement | Template destination |
|---|---|---|
| `graph/conventions.md` | Claim-level authority, scoped promotion, conditional freshness, graph contracts | `kg/schema/knowledge-graph-schema.md`, agent instructions, validator |
| Core catalogs and `.agents/skills/mp-writing/SKILL.md` | Agent selects relevant context and examples; small edits remain small | Existing indexes, `AGENTS.md`, portable `gtm-writing` skill |
| Validator contract and recorded fixture results | Real dates and shapes, seeds, workflow dependencies, catalog coverage, honest enforcement limits | Existing Node tooling and isolated fixtures |
| `templates/output-derivative.md`, `scripts/prior-outputs.rb` | Separate assessment, owner review and publication; inspect relevant prior versions | Output template, receipt validation, prior-output discovery |
| `examples/index.md`, `templates/example-writing.md` | Source-linked, scope-specific approved references | Empty example catalog and reusable scaffold |
| Current editorial workflow and derivative workflow | Concrete meaning, reader value, source fidelity, optional scoring, intentional reuse | Shared GTM writing guidance, task workflows and rubrics |
| Correction audit and review handoff | Put durable corrections at their point of use; preserve evidence; no mandatory upgrade | Reflection prompt, agent instructions, this handoff |

Source basis: MP-KG at `9f44aa9` plus current local changes inspected on October 22. This is a semantic adaptation, not a byte-for-byte mirror or a claim that every local source change is approved. The original template essay remains historical background; current operational instructions take precedence.

Excluded: personal facts, career positioning, private transcripts, actual writing examples, organization-specific facts, external account IDs, social schedules, rendering assets, and retired pilot execution. The template supplies mechanisms for an organization to add its own approved material. No personal skill installation paths or machine-specific symlinks are carried over.

## Verification

Baseline `npm run lint:graph`: passed 48 nodes. The original parser and linter did not validate full YAML, real dates, agreement between seed representations, workflow routing, or separate review/publication receipts. Original packs contained seeds and a view but omitted the task workflow/template/rubric named by their prompts.

Completed locally on October 22, 2026. Implementation acceptance: **PASS** for the required local transfer and tooling scope.

| Criterion | Result | Evidence |
|---|---|---|
| Reusable authority, freshness, correction and discovery rules are applied | MET | Schema, AGENTS, catalogs, workflow entrypoints, portable skill and onboarding prompts use the same contract; original essay is explicitly historical |
| Structural checks reject defective inputs | MET | 57 isolated fixtures pass, covering malformed YAML, UTF-8, empty values, real dates, broken links, duplicate edges/seeds, seed disagreement, workflow routing, receipts, catalogs, exclusions, and wrong working directory |
| Assessment, owner review and publication remain independent | MET | Positive and negative receipt fixtures, including a rejected but published output and qualitative assessment without a score |
| Prior-output discovery preserves provenance and coverage limits | MET | Revision-family, explicit-surface precedence, tag fallback, omission, missing-provenance, excluded malformed records and private-directory fixtures |
| Task packs include the actual contract and remain synchronized | MET | Four deterministic packs include workflow/template/rubric and shared rules; source-manifest and stale-source/ambiguous-workflow tests pass; `npm run packs:check` passes |
| Documented commands work | MET | `npm ci`, `npm run check`, `npm run export:graph`, `npm run report:graph`, `npm run prior:outputs -- --source kg/canon/product-truth.md --surface website`, and hero bundling all succeeded |
| Template remains generic | MET | Transfer scope review and added-content scan found no personal paths, identity copy, private-record pointers or organization-specific source claims; examples remain empty scaffolds |

`npm run check` passed on local Node 26.12.0: 53 graph nodes, no catalog warnings, 57/57 fixtures, and all four packs current. The same 57 fixtures passed on Node 20.20.2 and Node 24.22.1. Export/report: 53 nodes, 133 edges, zero duplicate IDs, unresolved internal edges or isolated nodes. The history command correctly returned zero outputs with explicit coverage limits for the unused template. Skill frontmatter validation and `git diff --check` passed.

The first fixture run had 55/56 passes: the outside-path test used a path that stayed within the repository. Correcting that fixture to actually leave the root established rejection. Final review added the wrong-working-directory regression, bringing the final suite to 57. No required criterion remains failed.

## Adaptation choices

- Preserve the template's Node tooling, `kg/` and `context/` layout, existing lifecycle statuses and `seed_nodes` interface. Support `seed_paths` too; optional `scope` avoids an unrelated metadata migration.
- Replace the partial frontmatter parser with the documented [yaml package](https://eemeli.org/yaml/). The lockfile pins the tested installation. Repair invalid unquoted YAML titles and make empty link lists explicit.
- Adapt the current qualitative editorial process directly: assessed gates can have a null numeric score, with a real assessment date and assessor. Owner review and external-state evidence are still required independently. This intentionally avoids copying the source's legacy score requirement.
- Add a small organization-writing skill and example scaffold. Personal voice, actual approved passages, LinkedIn-specific selection rules and schedules do not transfer.
- Generated packs now include complete task contracts, direct proof references, and content hashes. They do not recursively pull unrelated catalogs, histories or workflows into context. The hero route now explicitly includes the audience and proof needed for its task.

## Delivery, limits and next action

The upgrades were committed as `42242802b2e5e20bc0fb6ea88a9f943c192237fa`, pushed on `mp/knowledge-graph-template-upgrades`, and opened as [PR #1](https://github.com/mykepreuss/mp-gtm-knowledge-graph-template/pull/1) against `main` on October 22, 2026. No merge, publication, deployment, schedule or personal skill installation is authorized by that delivery request. The source MP-KG checkout was not edited by this task. The [source manifest](upgrade-source-manifest.json) records hashes of nine central reference files, including current local changes, without copying their contents.

GitHub Actions is configured to run the completion checks on Node 20 and 24 with read-only contents permission. Hosted CI was queued at PR creation for implementation commit `4224280` on Node 20 and 24. This delivery receipt is a documentation-only follow-up; inspect the PR for the latest head and check state. Branch protection remains **UNVERIFIED**. Fresh-agent skill activation, actual owner acceptance, reduced review effort and better writing are **UNVERIFIED** until ordinary use; structural fixtures do not establish them.

The requested local upgrade, commit and open-PR delivery are complete. The PR remains open for review and is not merged. An organization adopting the template should supply its own source-backed facts, recorded approvals and useful examples through the intake flow, then run a real GTM task. Continue from this handoff and the repository entrypoints, rather than importing personal source history.

## PR delivery

Pre-commit refresh: `origin/main` and the branch both resolve to baseline `3cc0db8`; `npm run check` passed again with 53 nodes, 57 fixtures and all four synchronized packs. The existing diff and 14 new files match the scoped upgrade. Staging exposed a trailing blank line in the new inbound pack that unstaged diff checks did not cover; the generator now normalizes the final newline and all packs were regenerated and rechecked. Implementation commit: `42242802b2e5e20bc0fb6ea88a9f943c192237fa`. PR: [#1](https://github.com/mykepreuss/mp-gtm-knowledge-graph-template/pull/1), open and ready for review against `main`. At creation, Graph checks `check (20)` and `check (24)` were queued in [run 39817520398](https://github.com/mykepreuss/mp-gtm-knowledge-graph-template/actions/runs/39817520398). The GitHub connector returned an integration-permission error when creating the PR; the authenticated GitHub CLI created it successfully. The PR is attached to the originating Codex chat.
