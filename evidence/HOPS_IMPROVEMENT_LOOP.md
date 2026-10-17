# HOPS 2.9 synthetic improvement loop

Built October 17, 2026. The component is shared by the HOPS mission demo and public portfolio, with byte-identical core, UI and CSS files. Source hashes are recorded in HOPS_IMPROVEMENT_RECEIPT.json.

## Working sequence

Issue observation and evidence → named issue owner and due date → AAR with expected/observed/cause/evidence → corrective action with owner/date/criterion → correction evidence → versioned training objective/task/standard/change → separate simulated reviewer with current-version evidence → closure rationale.

Closure cannot skip stages. A failed check stays open. Training revision invalidates earlier review/closure; recurrence reopens an accountable cycle while retaining historical events. State is rebuilt from the event journal rather than trusting saved closure fields. Invalid records require explicit reset. DOM rendering treats user text as text.

## Outputs

The browser can export the linked JSON packet and a proposed Markdown training task. HOPS_Improvement_Synthetic_Example.json is a completed example, not a real event or qualified learner record. Both deployments use separate browser storage; no shared operational backend exists.

## Verification

19 tests passed: 12 reducer tests and seven jsdom DOM tests. They cover a full closed loop, evidence and ownership gates, dates, stale versions, self-review labels, failed checks, duplicate closure, recurrence, invalid/reordered saved records, stale views, reload/reset, and untrusted-text rendering. DOM tests do not establish visual/browser-device or operational acceptance.

All data and review decisions are synthetic. Reviewer labels are not authenticated identities. No mission authorization, production training certification, FleetVoice microphone/speech verification or field acceptance is granted. FleetVoice verification remains deferred.
