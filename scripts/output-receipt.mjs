import { mapping, text, stringList, validDate } from "./graph-utils.mjs";

export function validateReceipt(node, target, error) {
  const keys = ["evaluation", "user_review", "publication_status", "publication_evidence"];
  if (node.type !== "output" || node.status === "template" || !keys.some((key) => key in node)) return;
  const assessment = node.evaluation;
  if (!mapping(assessment)) error("evaluation must be a mapping");
  else {
    for (const key of ["rubric", "rubric_version", "assessed_at", "assessor", "gates", "score", "failure_modes"]) {
      if (!(key in assessment)) error(`evaluation missing ${key}`);
    }
    const rubric = target(assessment.rubric);
    if (rubric?.type !== "rubric" || !(Array.isArray(node.links) && node.links.some((link) => link?.rel === "EVALUATED_BY" && target(link.href) === rubric))) error("evaluation.rubric must identify an EVALUATED_BY rubric");
    if (assessment.rubric_version !== null && !text(assessment.rubric_version)) error("evaluation.rubric_version must be text or null");
    if (!["pass", "fail", "not_assessed"].includes(assessment.gates)) error("evaluation.gates must be pass, fail, or not_assessed");
    if (assessment.score !== null && !(Number.isFinite(assessment.score) && assessment.score >= 0 && assessment.score <= 10)) error("evaluation.score must be a number from 0 to 10 or null");
    if (assessment.gates === "not_assessed") {
      if (![assessment.score, assessment.assessed_at, assessment.assessor].every((v) => v === null)) error("unassessed evaluation needs null score, date, and assessor");
    } else if (!validDate(assessment.assessed_at) || !text(assessment.assessor)) error("assessed evaluation needs a real date and assessor");
    // Concrete gate findings can be assessed without manufacturing a numeric score.
    if (!stringList(assessment.failure_modes)) error("evaluation.failure_modes must be a string list");
    if (assessment.gates === "fail" && !assessment.failure_modes?.length) error("failed gates require failure_modes");
    if ("changes" in assessment && !stringList(assessment.changes)) error("evaluation.changes must be a string list");
  }
  const review = node.user_review;
  if (!mapping(review)) error("user_review must be a mapping");
  else {
    if (!["pending", "approved", "revise", "rejected"].includes(review.decision)) error("invalid user_review.decision");
    for (const key of ["feedback", "evidence"]) if (review[key] !== null && !text(review[key])) error(`user_review.${key} must be text or null`);
    if ((review.decision !== "pending" || review.feedback !== null) && !text(review.evidence)) error("user decisions or feedback require user_review.evidence");
  }
  if (!["unknown", "local_draft", "draft", "external_draft", "buffer_draft", "scheduled", "published", "sent"].includes(node.publication_status)) error("invalid publication_status");
  if (node.publication_evidence !== null && !text(node.publication_evidence)) error("publication_evidence must be text or null");
  if (["external_draft", "buffer_draft", "scheduled", "published", "sent"].includes(node.publication_status) && !text(node.publication_evidence)) error("external publication states require publication_evidence");
}
