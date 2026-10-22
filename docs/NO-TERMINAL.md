# No-terminal setup

Use a repository-connected agent where available. It can select files, apply authorized local changes, run checks, and regenerate packs for you. You provide business direction and feedback; the agent maintains the graph records.

## Create and fill your copy

Use the repository template or ZIP. Follow `docs/V1-INTAKE-FLOW.md` to replace placeholder canon with your source-backed facts and documented owner decisions. Add actual proof under `kg/sources/`, retaining dates, provenance and limits. A placeholder, filename, status or generated score does not establish approval.

## Run one task

With a connected agent, use `docs/READ-WITH.md` and describe the requested asset. It routes through the matching view, workflow and rubric.

Without repository access, upload a complete pack from `packs/` and use `docs/FIRST-RUN-PROMPT-WRAPPER.md`. Prebuilt packs contain template content. After your canon changes, have an agent regenerate the pack, or manually assemble the exact files listed in the selected pack's source manifest from your current copy. Include the view, workflow, template, rubric and shared contracts as well as the seeds. Copying only seeds omits the task interface. Do not represent an old manifest as matching edited content.

If you cannot supply a required source, state that gap. The assistant can continue a draft where useful but must not invent evidence, voice approval, or a completed history check.

## Carry feedback forward

Give edits and decisions in ordinary language. Preserve the reviewed version, exact feedback, and actual publication state. Use `kg/loops/reflection-prompt.md` when a durable correction, material failure or repeated pattern warrants an upgrade. A clean run can finish without one. Request publication or scheduling separately when needed; drafting alone does not authorize it.

GitHub Actions checks graph structure and generated-pack consistency on pushes and pull requests. A green run does not establish business accuracy, owner approval, writing quality, or required branch protection.
