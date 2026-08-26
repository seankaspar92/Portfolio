# Career Intelligence Scanner Privacy Contract

## Purpose
The Career Intelligence Scanner is designed to analyze resumes and job descriptions without retaining personal source data.

## Source-data handling
- Resume files and pasted resume text are processed in browser memory only.
- Job descriptions and optional background notes are processed in browser memory only.
- The static portfolio does not provide an endpoint that receives or stores those inputs.
- Reset clears the interface and in-memory scanner state. Closing or reloading the page destroys the browser-session state maintained by the scanner code.

## Personal information that must not be retained
No future data-building pipeline may retain raw or recoverable copies of:
- names
- email addresses
- phone numbers
- street addresses or postal codes
- government identifiers
- personal profile URLs
- raw resume text
- free-form personal background notes
- any other direct identifier that is not necessary for aggregate system evaluation

## De-identified research records
Future data building is permitted only from an explicitly generated de-identified feature record. The current browser implementation limits that record to fields such as:
- decision category
- preliminary fit score
- ATS component scores
- requirement-match counts
- hard-gate count
- non-identifying skill/keyword features
- evidence-state counts
- scanner version and evaluation metadata

The de-identified export excludes the original source documents and direct identifiers. Generation requires explicit user action and consent. Nothing is automatically submitted or retained by the current static site.

## Future backend rule
If a server-side research or evaluation service is added later, it must:
1. receive only a de-identified payload unless a separate user-facing feature genuinely requires source text;
2. scrub direct identifiers client-side before transmission whenever technically feasible;
3. reject prohibited fields at the API boundary;
4. avoid logging raw request bodies containing resume or background text;
5. define a short retention period for transient processing data;
6. use explicit opt-in consent for any de-identified data retained for evaluation, benchmarking, or model improvement;
7. provide a deletion path for any retained user-linked record;
8. never use retained data to reconstruct user identity.

## Security boundary
This portfolio scanner is a decision-support demonstration and local pre-screen. It is not a secure document vault, applicant-tracking system, identity store, or hiring-probability service.
