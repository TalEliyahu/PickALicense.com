import type { LicenseProfile } from "./types";

export const licenseProfiles = [
  {
    id: "MIT",
    name: "MIT License",
    osiApproved: true,
    category: "permissive",
    copyleftScope: "none",
    allowsClosedSourceUse: "yes",
    explicitPatentGrant: false,
    obligations: ["Include the license text and copyright notice."],
    tradeoffs: ["Very short and permissive, but does not include an express patent grant."],
    sources: {
      spdx: "https://spdx.org/licenses/MIT.html",
      chooseALicense: "https://choosealicense.com/licenses/mit/"
    },
    review: {
      status: "unreviewed",
      reviewedAt: null,
      notes: "Initial structured draft. Needs external legal-content review."
    }
  },
  {
    id: "Apache-2.0",
    name: "Apache License 2.0",
    osiApproved: true,
    category: "permissive",
    copyleftScope: "none",
    allowsClosedSourceUse: "yes",
    explicitPatentGrant: true,
    obligations: [
      "Include the license text.",
      "Preserve required notices.",
      "State significant changes where required.",
      "Include NOTICE information when applicable."
    ],
    tradeoffs: ["More explicit patent language and notice handling than MIT, with a longer text."],
    sources: {
      spdx: "https://spdx.org/licenses/Apache-2.0.html",
      chooseALicense: "https://choosealicense.com/licenses/apache-2.0/"
    },
    review: {
      status: "unreviewed",
      reviewedAt: null,
      notes: "Initial structured draft. Needs external legal-content review."
    }
  },
  {
    id: "MPL-2.0",
    name: "Mozilla Public License 2.0",
    osiApproved: true,
    category: "file-copyleft",
    copyleftScope: "file",
    allowsClosedSourceUse: "conditional",
    explicitPatentGrant: true,
    obligations: [
      "Disclose source for files covered by the license when distributed.",
      "Preserve license notices."
    ],
    tradeoffs: [
      "Keeps modifications to covered files open while allowing combination with differently licensed files."
    ],
    sources: {
      spdx: "https://spdx.org/licenses/MPL-2.0.html",
      chooseALicense: "https://choosealicense.com/licenses/mpl-2.0/"
    },
    review: {
      status: "unreviewed",
      reviewedAt: null,
      notes: "Initial structured draft. Needs external legal-content review."
    }
  },
  {
    id: "LGPL-3.0-only",
    name: "GNU Lesser General Public License v3.0 only",
    osiApproved: true,
    category: "library-copyleft",
    copyleftScope: "library",
    allowsClosedSourceUse: "conditional",
    explicitPatentGrant: true,
    obligations: [
      "Keep covered library modifications under LGPL terms when distributed.",
      "Provide required notices and source availability for covered library code."
    ],
    tradeoffs: [
      "Designed for libraries where applications can often link under different terms, subject to license conditions."
    ],
    sources: {
      spdx: "https://spdx.org/licenses/LGPL-3.0-only.html",
      chooseALicense: "https://choosealicense.com/licenses/lgpl-3.0/",
      steward: "https://www.gnu.org/licenses/lgpl-3.0.html"
    },
    review: {
      status: "unreviewed",
      reviewedAt: null,
      notes: "Initial structured draft. Needs external legal-content review."
    }
  },
  {
    id: "GPL-3.0-only",
    name: "GNU General Public License v3.0 only",
    osiApproved: true,
    category: "strong-copyleft",
    copyleftScope: "distributed-work",
    allowsClosedSourceUse: "no",
    explicitPatentGrant: true,
    obligations: [
      "Distribute covered works under GPL terms.",
      "Provide corresponding source when distributing covered works.",
      "Preserve license notices."
    ],
    tradeoffs: [
      "Strong reciprocal obligations can conflict with downstream proprietary distribution goals."
    ],
    sources: {
      spdx: "https://spdx.org/licenses/GPL-3.0-only.html",
      chooseALicense: "https://choosealicense.com/licenses/gpl-3.0/",
      steward: "https://www.gnu.org/licenses/gpl-3.0.html"
    },
    review: {
      status: "unreviewed",
      reviewedAt: null,
      notes: "Initial structured draft. Needs external legal-content review."
    }
  },
  {
    id: "AGPL-3.0-only",
    name: "GNU Affero General Public License v3.0 only",
    osiApproved: true,
    category: "network-copyleft",
    copyleftScope: "network",
    allowsClosedSourceUse: "no",
    explicitPatentGrant: true,
    obligations: [
      "Distribute covered works under AGPL terms.",
      "Provide corresponding source when distributing covered works.",
      "Offer source to users who interact with modified versions over a network."
    ],
    tradeoffs: [
      "Strong network-copyleft obligations can be unsuitable when proprietary hosted-service use must remain possible."
    ],
    sources: {
      spdx: "https://spdx.org/licenses/AGPL-3.0-only.html",
      chooseALicense: "https://choosealicense.com/licenses/agpl-3.0/",
      steward: "https://www.gnu.org/licenses/agpl-3.0.html"
    },
    review: {
      status: "unreviewed",
      reviewedAt: null,
      notes: "Initial structured draft. Needs external legal-content review."
    }
  }
] satisfies LicenseProfile[];
