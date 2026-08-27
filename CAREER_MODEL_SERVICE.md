# Career Intelligence Governed Model Service

## Purpose
Provide deeper model-backed resume tailoring while preserving the Career Intelligence evidence, privacy, and decision-governance rules.

## Runtime boundary
The public GitHub Pages client must never contain model credentials. The client calls a same-origin `/api/career-tailor` endpoint only after explicit transient-processing consent. GitHub Pages itself does not execute this endpoint, so production deployment requires a secret-bearing serverless or backend runtime.

## Personal-data rule
Personal source material is transient request data only. The service must not persist raw resumes, job descriptions, background notes, generated personally identifiable resume text, request bodies, or direct identifiers. Application/access logging must be configured so request bodies are never captured.

Required response headers include `Cache-Control: no-store`.

## Request lifecycle
1. Browser extracts resume locally.
2. Local fit/ATS scan runs first.
3. Model path is blocked for PASS decisions.
4. User explicitly consents to transient processing.
5. Browser sends resume, factual background, job description, tailoring preferences, and governance flags to `/api/career-tailor`.
6. Service indexes evidence fragments with ephemeral IDs.
7. Model receives the job description plus evidence fragments and governed output instructions.
8. Service verifies evidence IDs and numeric claims before returning the result.
9. Response includes claim provenance and post-generation ATS/requirement measures.
10. Source request data is discarded after the response completes.

## Governance invariants
- No invented employers, dates, credentials, metrics, tools, direct experience, licenses, or qualifications.
- Transferable experience can be translated only when wording remains supported by cited evidence.
- Every generated bullet requires one or more evidence IDs.
- Numeric claims must appear in the transient source evidence exactly.
- Unsupported requirements remain gaps.
- High ATS alignment cannot override a poor-fit or hard-gate decision.
- The standardized resume shell may vary emphasis, density, section labels, bullet order, competency order, and summary angle.
- Model output is a proposal. The verifier is the authority for release.

## Model provider interface
The reference handler expects two runtime secrets:

- `MODEL_PROVIDER_URL`
- `MODEL_PROVIDER_TOKEN`

The provider endpoint must accept a JSON request with `input` and return structured JSON in `output`, `result`, or directly as the response body. Provider-specific adapters should be implemented server-side only.

## Learning
Continuous improvement must operate on de-identified features such as strategy choice, role archetype, ATS delta, requirement-coverage delta, acceptance/rejection, and outcome labels. Raw source text, generated personal resume text, names, contact information, and free-form background notes are prohibited from the retained learning profile.

## Deployment gate
Do not describe the model-backed path as live until `/api/career-tailor` is deployed on a runtime that satisfies this contract, secrets are server-side, body logging is disabled, retention behavior is verified, and adversarial privacy/truthfulness tests pass.