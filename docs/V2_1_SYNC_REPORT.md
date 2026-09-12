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
- AIOS public case study records Phase 25 Context Mode as post-v1 developer tooling while preserving v1.0.0 / Phase 24 as the stable runtime contract.
- NFL EDGE current hardening retained and the real weekly production feedback loop explicitly labeled as the next gate rather than completed capability.
- MLB maturity boundary preserved: v0.2.2 locally validated, v0.3.0 Candidate until authentic local validation passes.
- AI Skills QA changed from frozen lifecycle constants to relationship-based checks. The initial v2.1 release snapshot was 30 Active, 17 Testing, 339 Planned, and 386 registry entries.
- Post-release lifecycle reconciliation on September 12 promoted SKL-011 `tailor_resume_to_job` to Active after governed field validation and incorporated 11 newly registered Planned LinkedIn candidates. Current snapshot: 31 Active, 16 Testing, 350 Planned, 397 entries total; Active + Testing remains 47.
- Service-years canonical claim corrected to 12+, with rendered homepage fallback reconciliation.
- September 12 canonical resume evidence set synchronized across browser resume and public download artifacts.
- The original canonical DOCX source hash is retained separately from the compact public DOCX hash so the release does not claim byte-for-byte identity where the public artifact was regenerated.
- Public DOCX and PDF are cryptographically bound by SHA-256 values in the release manifest and CI workflow.
- Sitemap, robots, public-page inventory, evidence boundaries, and local references remain part of the release QA contract.

## Resume parity receipts

- Canonical source: `Sean_Kaspar_Resume_12SEP26.docx`
- Canonical source SHA-256: `5300ae86fa46ae94aa13ab1285f8567ea47a1141d59a908c2c7bb500cbb1f9b4`
- Public DOCX: `files/Sean_Kaspar_Resume.docx`
- Public DOCX SHA-256: `76b6707c41e80a6b73b4e5cddbebae545cee9ba73fbb7c3ee7b2ce4ecacbbbd5`
- Public DOCX Git blob: `f70d9d661a35ee73aa0c44a2c714d9b3b16699fa`
- Public PDF: `files/Sean_Kaspar_Resume.pdf`
- Public PDF SHA-256: `c18a333efb32cb185d63769aa1ee979b2cec3872be3c7174706c3b9d921edda0`
- Public PDF Git blob: `f1eebfc9f032d7ca5d732f564fb6bcc8be842ede`
- Browser resume: September 12 canonical evidence set, including Jan 2014 start and earlier infantry leadership.

## Explicit boundaries

- Do not claim HOPS uses actual Havoc or partner production data.
- Do not claim HOPS can approve configuration, release production, accept assets, order spares, task workforce, or issue mission tasking.
- Do not promote MLB EDGE v0.3.0 beyond Candidate until authentic local validation is recorded.
- Do not represent AIOS Context Mode as a production runtime feature.
- Do not count Planned external skills as demonstrated capability.
- Do not treat a green synchronization test as evidence for capability outside the claims explicitly covered by the portfolio evidence policy.

## Release gate

`portfolio-manifest.json` is set to v2.1 with `launch_ready: true` as a release candidate. Merge is authorized only if Portfolio QA passes on the exact PR head with zero unresolved blockers. A failed or stale-head check returns the release to non-mergeable status until corrected and rerun.
