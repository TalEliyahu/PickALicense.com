# Recommendation Methodology

PickALicense v2 uses a decision-support model rather than a binary decision tree.

```text
User answers
  -> normalized project facts
  -> eligibility checks
  -> hard-constraint filtering
  -> preference scoring
  -> explainable shortlist
```

## Rule Types

### Eligibility Checks

Eligibility checks decide whether the normal picker can continue. Examples include whether the user is authorized to license the code, whether the project is primarily software, and whether the repository has an existing or unclear license.

### Hard Constraints

Hard constraints remove licenses that conflict with the user's explicit requirements. For example, a requirement for network-copyleft obligations excludes non-network-copyleft licenses from the top recommendation set.

### Preferences

Preferences rank licenses that remain eligible. For example, if an express patent grant is required or preferred, `Apache-2.0` receives stronger ranking than `MIT`.

## Review Status

The initial catalog is marked `unreviewed`. That means the data is structured and sourced, but it has not yet been reviewed by a qualified external reviewer. Recommendation copy must remain conservative until review is complete.

## Required Evidence For Catalog Changes

Every material catalog or rule change should include:

- Stable SPDX identifier.
- Source URLs.
- Plain-language obligations and tradeoffs.
- Scenario tests proving expected recommendation behavior.
- Review status and review date.

## Legal Disclaimer

PickALicense is not a law firm and does not provide legal advice. It is an educational decision-support tool for common open-source software licensing scenarios.
