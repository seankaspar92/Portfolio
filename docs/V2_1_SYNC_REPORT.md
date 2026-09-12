# Portfolio v2.1 Sync Report

Date: 2026-09-12
Status: synchronization complete; release candidate ready for exact-head QA

## Purpose

Close the cross-project audit findings and restore the public portfolio to a current, evidence-bounded state without inflating project maturity.

## Completed

- HOPS public case study moved from v2.3 to v2.6.
- HOPS v2.6 public evidence retained: 92/92 automated tests, 44/44 release-security invariants, 50/50 Chromium QA, zero console errors, zero page errors, visual QA pass.
- HOPS distributed industrial-readiness lane documented with synthetic-data and human-authority boundaries intact.
- `portfolio-claims.json` reconciled to current HOPS, AIOS, Skills, service-year, and career facts.
- AIOS public case study now records Phase 25 Context Mode as post-v1 developer tooling while preserving v1.0.0 / Phase 24 as the stable runtime contract.
- NFL EDGE current hardening retained and the real weekly production feedback loop explicitly labeled as the next gate rather than completed capability.
- MLB maturity boundary preserved: v0.2.2 locally validated, v0.3.0 Candidate until authentic local validation passes.
- AI Skills QA changed from frozen lifecycle constants to relationship-based checks while retaining the current 30 Active, 17 Testing, 339 Planned, 386-entry snapshot.
- Service-years canonical claim corrected to 12+, with rendered homepage fallback reconciliation.
- September 12 canonical resume promoted across browser, DOCX, and PDF.
- Resume DOCX and PDF are cryptographically bound by SHA-256 values in the release manifest and CI workflow.
- Sitemap, robots, public-page inventory, evidence boundaries, and local references remain part of the release QA contract.

## Resume parity receipts

- Canonical source: `Sean_Kaspar_Resume_12SEP26.docx`
- Public DOCX: `files/Sean_Kaspar_Resume.docx`
- Public PDF: `files/Sean_Kaspar_Resume.pdf`
- DOCX SHA-256: `5300ae86fa46ae94aa13ab1285f8567ea47a1141d59a908c2c7bb500cbb1f9b4`
- PDF SHA-256: `c18a333efb32cb185d63769aa1ee979b2cec3872be3c7174706c3b9d921edda0`
- Browser resume: September 12 canonical evidence set, including Jan 2014 start and earlier infantry leadership.

## Explicit boundaries

- Do not claim HOPS uses actual Havoc or partner production data.
- Do not claim HOPS can approve configuration, release production, accept assets, order spares, task workforce, or issue mission tasking.
- Do not promote MLB EDGE v0.3.0 beyond Candidate until authentic local validation is recorded.
- Do not represent AIOS Context Mode as a production runtime feature.
- Do not count Planned ECC-derived skills as demonstrated capability.
- Do not treat a green synchronization test as evidence for capability outside the claims explicitly covered by the portfolio evidence policy.

## Release gate

`portfolio-manifest.json` is set to v2.1 with `launch_ready: true` as a release candidate. Merge is authorized only if Portfolio QA passes on the exact PR head with zero unresolved blockers. A failed or stale-head check returns the release to non-mergeable status until corrected and rerun.
