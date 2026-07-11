import type { LicenseProfile } from "@pickalicense/catalog";
import { licenseProfiles } from "@pickalicense/catalog";
import type { AnswerMap, CandidateResult, ExcludedResult, RecommendationResult, SafetyStop } from "./types";

const softwareTypes = new Set(["application", "library", "service", "software-other"]);

function buildSafetyStops(answers: AnswerMap): SafetyStop[] {
  const stops: SafetyStop[] = [];

  if (answers.authorization && answers.authorization !== "owner") {
    stops.push({
      code: "authorization-review",
      title: "Confirm who can license the code",
      detail: "The tool should not recommend a license until authorization is clear.",
      nextSteps: [
        "Identify copyright holders.",
        "Check employer or organization policies.",
        "Review contributor agreements or contribution history."
      ]
    });
  }

  if (answers.projectStatus === "existing-licensed" || answers.projectStatus === "unclear") {
    stops.push({
      code: "existing-license-review",
      title: "Resolve the current repository license first",
      detail: "Changing or replacing an existing or unclear license can become a relicensing exercise.",
      nextSteps: [
        "Find existing license files and notices.",
        "Determine whether the intended change is permitted.",
        "Document the relicensing process before applying a new license."
      ]
    });
  }

  if (answers.projectStatus === "existing-unlicensed" && answers.authorization === "contributors") {
    stops.push({
      code: "unlicensed-contributors-review",
      title: "Review contributor rights before adding a license",
      detail: "An existing unlicensed project with contributors may require contributor authorization.",
      nextSteps: [
        "List contributors and contribution ownership.",
        "Ask whether contributors agree to the proposed license.",
        "Document consent before opening a license pull request."
      ]
    });
  }

  if (answers.thirdPartyCode === "copied" || answers.thirdPartyCode === "unsure") {
    stops.push({
      code: "third-party-code-review",
      title: "Review third-party code obligations",
      detail: "Copied or modified third-party code can impose terms this picker cannot evaluate.",
      nextSteps: [
        "Inventory copied or vendored code.",
        "Record each upstream license.",
        "Resolve compatibility before choosing a project license."
      ]
    });
  }

  if (answers.projectType && !softwareTypes.has(answers.projectType)) {
    stops.push({
      code: "non-software-scope",
      title: "Use a different licensing flow",
      detail: "This first version only recommends licenses for software projects.",
      nextSteps: [
        "Separate software from documentation, data, media, models, or hardware.",
        "Use a license model designed for the non-software material.",
        "Return to this tool for the software portion."
      ]
    });
  }

  if (answers.commercialUse === "no") {
    stops.push({
      code: "not-open-source",
      title: "Noncommercial restrictions are outside open-source recommendations",
      detail: "Open-source licenses cannot prohibit commercial use while remaining open source.",
      nextSteps: [
        "Consider source-available or proprietary terms.",
        "Document why commercial use should be restricted.",
        "Get professional review before publishing custom terms."
      ]
    });
  }

  return stops;
}

function excludeReason(license: LicenseProfile, answers: AnswerMap): string | null {
  if (answers.closedSourceUse === "yes" && license.allowsClosedSourceUse === "no") {
    return "You said downstream closed-source use should remain possible.";
  }

  if (answers.closedSourceUse === "yes" && answers.copyleftScope === "none" && license.allowsClosedSourceUse === "conditional") {
    return "You preferred no source-disclosure requirement for downstream users.";
  }

  if (answers.closedSourceUse === "no" && license.copyleftScope === "none") {
    return "You said downstream closed-source incorporation should not be allowed.";
  }

  if (answers.copyleftScope === "network" && license.copyleftScope !== "network") {
    return "You said modified network services should have source-sharing obligations.";
  }

  if (answers.copyleftScope === "distributed-work" && !["distributed-work", "network"].includes(license.copyleftScope)) {
    return "You said distributed covered applications should remain open.";
  }

  if (answers.copyleftScope === "library" && !["library", "file"].includes(license.copyleftScope)) {
    return "You said the library itself should remain open while allowing different terms around it.";
  }

  if (answers.copyleftScope === "file" && license.copyleftScope !== "file") {
    return "You said only modified covered files should have source-sharing obligations.";
  }

  if (answers.copyleftScope === "none" && license.copyleftScope !== "none") {
    return "You said no downstream source-sharing obligation is required.";
  }

  if (answers.patentGrant === "required" && !license.explicitPatentGrant) {
    return "You said an explicit patent grant is required.";
  }

  return null;
}

function scoreLicense(license: LicenseProfile, answers: AnswerMap): CandidateResult {
  let score = 0;
  const reasons: string[] = [];

  if (license.osiApproved) {
    score += 1;
  }

  if (answers.closedSourceUse === "yes" && license.allowsClosedSourceUse === "yes") {
    score += 4;
    reasons.push("You want broad downstream commercial and closed-source use.");
  }

  if (answers.closedSourceUse === "conditional" && license.allowsClosedSourceUse === "conditional") {
    score += 4;
    reasons.push("You want reuse under conditions rather than a fully permissive grant.");
  }

  if (answers.closedSourceUse === "no" && license.allowsClosedSourceUse === "no") {
    score += 4;
    reasons.push("You prefer strong reciprocal obligations over downstream proprietary incorporation.");
  }

  if (answers.copyleftScope && answers.copyleftScope === license.copyleftScope) {
    score += 5;
    reasons.push(`Its copyleft scope matches your selected '${answers.copyleftScope}' goal.`);
  }

  if (answers.projectType === "library" && license.copyleftScope === "library") {
    score += 3;
    reasons.push("You are licensing a library or SDK.");
  }

  if (answers.projectType === "service" && license.copyleftScope === "network") {
    score += 3;
    reasons.push("You are licensing software used as a hosted or network service.");
  }

  if ((answers.patentGrant === "required" || answers.patentGrant === "preferred") && license.explicitPatentGrant) {
    score += answers.patentGrant === "required" ? 4 : 2;
    reasons.push("It includes an express patent grant in the initial catalog metadata.");
  }

  if (answers.patentGrant === "not-important" && license.id === "MIT") {
    score += 2;
    reasons.push("You did not prioritize patent language, so a short permissive license remains viable.");
  }

  if (reasons.length === 0) {
    reasons.push("It remains compatible with the answers provided so far.");
  }

  return { license, score, reasons };
}

function unresolvedConcerns(answers: AnswerMap): string[] {
  const unresolved: string[] = [];

  for (const [question, answer] of Object.entries(answers)) {
    if (answer === "unsure") {
      unresolved.push(`You answered 'I am not sure' for ${question}.`);
    }
  }

  if (answers.thirdPartyCode === "dependencies-only") {
    unresolved.push("Dependency-license compatibility is not evaluated in this first version.");
  }

  if (answers.gnuVersion === "or-later") {
    unresolved.push("GNU '-or-later' variants are not in the initial catalog yet.");
  }

  return unresolved;
}

export function recommendLicenses(answers: AnswerMap): RecommendationResult {
  const safetyStops = buildSafetyStops(answers);
  const unresolved = unresolvedConcerns(answers);
  const excluded: ExcludedResult[] = [];
  const candidates: CandidateResult[] = [];

  for (const license of licenseProfiles) {
    const reason = excludeReason(license, answers);
    if (reason) {
      excluded.push({ license, reasons: [reason] });
    } else {
      candidates.push(scoreLicense(license, answers));
    }
  }

  const ranked = candidates.sort((a, b) => b.score - a.score || a.license.id.localeCompare(b.license.id));

  return {
    status: safetyStops.length > 0 ? "needs-review" : "recommendations",
    recommended: ranked.slice(0, 3),
    alternatives: ranked.slice(3),
    excluded,
    unresolved,
    safetyStops
  };
}
