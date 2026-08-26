# AI Skills Portfolio Sync

The public AI Skills Command Center is a generated presentation layer, not a second source of truth.

## Authority

The authoritative lifecycle and version state lives in the private Google Drive artifact `00_AI Skills Registry`, sheet `Skills Registry`.

The Portfolio file `skills-data.js` is a sanitized public snapshot generated from that registry.

## Sync behavior

A governed scheduled agent checks for drift between the authoritative registry and the public snapshot. Drift includes skill additions/removals, version changes, lifecycle changes, material purpose/evaluation changes, curriculum-stage changes, or library-count changes.

When drift exists, the agent:

1. Reads `skills-sync-contract.json`.
2. Reads the current authoritative registry.
3. Reads `skills-data.js` from Portfolio `main`.
4. Builds a sanitized candidate snapshot using only the allowed public fields.
5. Verifies totals/status counts from the candidate rows.
6. Confirms Testing/Draft capabilities are not represented as Active.
7. Confirms private Drive links, operational inputs/outputs, notes, and sensitive evidence are excluded.
8. Creates a fresh `sync/skills-registry-YYYYMMDD-HHMM` branch.
9. Updates only the generated snapshot and any count-only display text that must stay synchronized.
10. Verifies the diff.
11. Opens a governed pull request for review.

It never pushes a generated snapshot directly to `main` and never auto-merges the PR.

## No-change runs

If the authoritative registry and public snapshot are materially identical, no branch or PR is created.

## Failure behavior

If the authoritative registry cannot be read, row identity is ambiguous, sanitization cannot be proven, or the public candidate would expose a prohibited field, the sync fails closed and reports the blocker. It must not publish a guessed or partial snapshot.

## Public domain mapping

The portfolio may present curriculum stages with shorter public domain labels, but the mapping must be deterministic and must not change lifecycle semantics.

## Governance principle

A public portfolio claim about a skill is downstream evidence. Lifecycle, version, and capability truth remain governed by the authoritative Skills Registry and its validation process.
