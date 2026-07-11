# PickALicense v2 Scope

## In Scope For The First Reliable Version

- Software projects only.
- A focused initial catalog:
  - `MIT`
  - `Apache-2.0`
  - `MPL-2.0`
  - `LGPL-3.0-only`
  - `GPL-3.0-only`
  - `AGPL-3.0-only`
- Plain-language questions with "I am not sure" paths.
- Eligibility checks before recommending licenses.
- Hard constraints for incompatible stated requirements.
- Preference ranking among remaining candidates.
- Explainable recommendations, alternatives, exclusions, and unresolved concerns.
- Personalized license download support in a later iteration.
- GitHub pull request workflow in a later iteration.

## Out Of Scope For The First Reliable Version

- Legal advice.
- Every SPDX license.
- Dependency-license compatibility analysis.
- Relicensing automation.
- Direct commits to a user's default branch.
- Non-software licensing for documentation, datasets, media, fonts, hardware, AI models, or model weights.
- Ethical-use, noncommercial, no-SaaS, geographic, or field-of-use restrictions as open-source recommendations.
- Any claim of endorsement by SPDX, OSI, FSF, GitHub, or license stewards.

## Safety Contract

If ownership, prior licensing, copied third-party code, or project type creates uncertainty, the tool should stop or downgrade the result instead of producing an unsupported recommendation.
