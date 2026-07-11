import type { LicenseProfile, QuestionId } from "@pickalicense/catalog";

export type AnswerMap = Partial<Record<QuestionId, string>>;

export interface CandidateResult {
  license: LicenseProfile;
  score: number;
  reasons: string[];
}

export interface ExcludedResult {
  license: LicenseProfile;
  reasons: string[];
}

export interface SafetyStop {
  code: string;
  title: string;
  detail: string;
  nextSteps: string[];
}

export interface RecommendationResult {
  status: "recommendations" | "needs-review";
  recommended: CandidateResult[];
  alternatives: CandidateResult[];
  excluded: ExcludedResult[];
  unresolved: string[];
  safetyStops: SafetyStop[];
}
