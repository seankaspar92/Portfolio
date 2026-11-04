# MBA-CORE-001 / Drone Recovery Economics Integration

Status: candidate economics adapter; not field validated or wired to live operations.

## Source boundary
The Drone Recovery effort remains platform neutral. Existing evidence includes the Portfolio's recovery gate reconciliation and Mobile Drone Operations conceptual material. This document does not establish an authoritative source code repository for Drone Recovery.

## Economics
AIOS `mba.adapters.drone_recovery_economics` calculates baseline expected asset loss, alternative expected asset loss, gross avoided loss, net expected value and a break-even absolute loss-probability reduction from supplied assumptions. This is expected-value analysis, not a measured reliability claim. The simple model excludes maintenance, downtime, acquisition timing, discounting and correlated failures unless an expanded approved model covers them.

## Required tests before promotion
1. Verify expected value on an explicitly synthetic numeric fixture and preserve input immutability.
2. Fail closed for missing source, out-of-range probabilities, unsupported currency, negative cost and invalid sortie count.
3. Add engineering-sourced evidence with stated time horizon and comparable alternative definitions.
4. Keep field, telemetry, hardware-in-the-loop, interoperability and safety acceptance gates separate.
5. No operational control signals may cross into this adapter.

## Gate
Require a confirmed Drone Recovery source repository or canonical build artifact and real regression run before declaring the integration complete. Downstream FleetVoice, training, deployment and Portfolio expansion remains blocked by MBA-CORE-001 validation.
