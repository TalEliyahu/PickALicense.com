# PickALicense v2 Architecture

The v2 work lives under `v2/` so the legacy Angular application remains available for history and comparison.

```text
v2/
  apps/web/              browser questionnaire UI
  packages/catalog/      license and question catalog
  packages/engine/       pure recommendation logic
  data/licenses/         reviewable YAML license profiles
  tests/scenarios/       scenario-based behavior tests
```

## Design Principles

- The engine has no React dependency.
- The catalog uses stable IDs and SPDX identifiers.
- The UI renders engine output; it is not the source of recommendation truth.
- Scenario tests are the primary quality gate.
- Legal-content review metadata is stored with catalog data.

## Later GitHub App Shape

The future GitHub integration should create a branch and pull request, never silently overwrite an existing license. It should detect `LICENSE`, `LICENSE.md`, `COPYING`, and `LICENSES/` before proposing changes.
