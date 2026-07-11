# Legal Review Package

The v2 legal-content model is designed to make review bounded and practical.

## Reviewer Tasks

Reviewers should not be asked to invent the entire decision graph. They should be asked focused questions:

- Is each license profile factually accurate?
- Are obligations and tradeoffs stated conservatively?
- Do the scenario tests produce reasonable shortlists?
- Are safety stops triggered where automated selection would be risky?
- Are source citations appropriate?
- Is the disclaimer clear enough for an educational tool?

## Initial Review Targets

- Six license profiles in `v2/data/licenses/`.
- Scenario tests in `v2/tests/scenarios/`.
- Recommendation rules in `v2/packages/engine/`.
- User-facing copy in `v2/packages/catalog/`.

## Review Status Values

- `unreviewed`: structured draft, not externally reviewed.
- `reviewed`: reviewed by a named qualified reviewer or review body.
- `needs-changes`: reviewed and found to need changes.
- `disputed`: public disagreement exists and must be documented.

## Contribution Rule

Any pull request changing recommendation outcomes should include scenario coverage and sources. Changes that only alter visual presentation do not need legal review unless they change legal meaning.
