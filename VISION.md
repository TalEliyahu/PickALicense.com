# PickALicense v2 Vision

PickALicense helps software maintainers understand their licensing goals, compare a small set of suitable open-source licenses, and safely prepare the license text they choose.

The product must not claim that one license is definitively correct for every project. Instead, it should provide decision support:

- Explain which licenses fit the user's stated requirements.
- Explain why other licenses were excluded or ranked lower.
- Stop when the user's situation needs professional review.
- Use stable SPDX identifiers instead of display text as internal keys.
- Keep the legal-content layer transparent, sourced, testable, and reviewable.

The original project proved that developers want a guided licensing flow. The v2 goal is to make that flow trustworthy by separating the recommendation engine, catalog data, scenario tests, and user interface.
