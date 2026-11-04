# MBA-CORE-001 / HOPS Advisory Integration

Status: integration specification only; no HOPS runtime or release change.

## Source boundary
Public HOPS prototype and improvement-loop evidence remain controlled by the Portfolio's existing HOPS source, synthetic labels, receipts and public-claim QA. AIOS `mba.adapters.hops_constraint_advice` is a standalone read-only adapter. No automatic state synchronization, mission dispatch, readiness reassignment, procurement decision or human approval is implied.

## Adapter mapping
- `demand`: a clearly labeled, validated capacity-demand quantity in one common unit.
- `resources[].available_capacity`: comparable available capacity for distinct constraint categories, never a readiness flag or arbitrary score.
- `evidence_type`: explicit synthetic/historical/observed/unverified label.
- `bottleneck` and `unserved_demand`: advisory mathematical outputs, not orders.

## Validation requirements
1. Use a representative synthetic HOPS fixture with common capacity units; add field mappings only after checking the native data model.
2. Verify unchanged source hash and no mutation to HOPS reducer/state.
3. Test missing capacity, mismatched units, stale observations and contradictory status. Existing core adapter cannot detect unit mismatch; mapping layer must reject it before calling.
4. Run Portfolio `npm ci --ignore-scripts && npm test` plus existing site QA; run AIOS MBA regression tests on same candidate commit.
5. Publish no measured efficiency or real-world readiness benefit until evidenced.

## Gate
Await actual HOPS field mapper, fixture replay and CI evidence. Then request review under existing release controls.
