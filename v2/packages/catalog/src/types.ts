export type ReviewStatus = "unreviewed" | "reviewed" | "needs-changes" | "disputed";

export type LicenseCategory =
  | "permissive"
  | "file-copyleft"
  | "library-copyleft"
  | "strong-copyleft"
  | "network-copyleft";

export type CopyleftScope = "none" | "file" | "library" | "distributed-work" | "network";

export interface LicenseProfile {
  id: string;
  name: string;
  osiApproved: boolean;
  category: LicenseCategory;
  copyleftScope: CopyleftScope;
  allowsClosedSourceUse: "yes" | "conditional" | "no";
  explicitPatentGrant: boolean;
  obligations: string[];
  tradeoffs: string[];
  sources: {
    spdx: string;
    chooseALicense?: string;
    steward?: string;
  };
  review: {
    status: ReviewStatus;
    reviewedAt: string | null;
    notes: string;
  };
}

export type QuestionId =
  | "authorization"
  | "projectStatus"
  | "thirdPartyCode"
  | "projectType"
  | "commercialUse"
  | "closedSourceUse"
  | "copyleftScope"
  | "patentGrant"
  | "gnuVersion";

export interface QuestionOption {
  id: string;
  label: string;
  description: string;
}

export interface Question {
  id: QuestionId;
  title: string;
  whyItMatters: string;
  options: QuestionOption[];
}
