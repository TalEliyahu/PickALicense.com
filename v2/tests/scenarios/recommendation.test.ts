import { describe, expect, it } from "vitest";
import { licenseProfiles, questions } from "@pickalicense/catalog";
import { recommendLicenses, type AnswerMap } from "@pickalicense/engine";

const baseAnswers: AnswerMap = {
  authorization: "owner",
  projectStatus: "new",
  thirdPartyCode: "no",
  projectType: "application",
  commercialUse: "yes",
  closedSourceUse: "yes",
  copyleftScope: "none",
  patentGrant: "not-important",
  gnuVersion: "only"
};

describe("recommendLicenses", () => {
  it("recommends MIT for a permissive project without patent priority", () => {
    const result = recommendLicenses(baseAnswers);

    expect(result.status).toBe("recommendations");
    expect(result.recommended[0]?.license.id).toBe("MIT");
    expect(result.excluded.map((item) => item.license.id)).toContain("GPL-3.0-only");
  });

  it("recommends Apache-2.0 when an explicit patent grant is required", () => {
    const result = recommendLicenses({ ...baseAnswers, patentGrant: "required" });

    expect(result.status).toBe("recommendations");
    expect(result.recommended[0]?.license.id).toBe("Apache-2.0");
    expect(result.excluded.map((item) => item.license.id)).toContain("MIT");
  });

  it("recommends MPL-2.0 for file-level copyleft", () => {
    const result = recommendLicenses({
      ...baseAnswers,
      closedSourceUse: "conditional",
      copyleftScope: "file",
      patentGrant: "preferred"
    });

    expect(result.recommended[0]?.license.id).toBe("MPL-2.0");
  });

  it("recommends LGPL-3.0-only for a library-copyleft goal", () => {
    const result = recommendLicenses({
      ...baseAnswers,
      projectType: "library",
      closedSourceUse: "conditional",
      copyleftScope: "library"
    });

    expect(result.recommended[0]?.license.id).toBe("LGPL-3.0-only");
  });

  it("recommends GPL-3.0-only for distributed-work copyleft", () => {
    const result = recommendLicenses({
      ...baseAnswers,
      closedSourceUse: "no",
      copyleftScope: "distributed-work",
      patentGrant: "preferred"
    });

    expect(result.recommended[0]?.license.id).toBe("GPL-3.0-only");
  });

  it("recommends AGPL-3.0-only for network copyleft", () => {
    const result = recommendLicenses({
      ...baseAnswers,
      projectType: "service",
      closedSourceUse: "no",
      copyleftScope: "network",
      patentGrant: "preferred"
    });

    expect(result.recommended[0]?.license.id).toBe("AGPL-3.0-only");
  });

  it("stops when authorization is uncertain", () => {
    const result = recommendLicenses({ ...baseAnswers, authorization: "unsure" });

    expect(result.status).toBe("needs-review");
    expect(result.safetyStops.map((stop) => stop.code)).toContain("authorization-review");
  });

  it("stops when a user wants noncommercial restrictions", () => {
    const result = recommendLicenses({ ...baseAnswers, commercialUse: "no" });

    expect(result.status).toBe("needs-review");
    expect(result.safetyStops.map((stop) => stop.code)).toContain("not-open-source");
  });
});

describe("catalog integrity", () => {
  it("uses unique license ids and source urls", () => {
    const ids = licenseProfiles.map((profile) => profile.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const profile of licenseProfiles) {
      expect(profile.sources.spdx).toMatch(/^https:\/\/spdx\.org\/licenses\//);
      expect(profile.review.status).toBe("unreviewed");
    }
  });

  it("gives every question options and stable ids", () => {
    const ids = questions.map((question) => question.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const question of questions) {
      expect(question.options.length).toBeGreaterThan(1);
      expect(question.options.every((option) => option.id && option.label)).toBe(true);
    }
  });
});
