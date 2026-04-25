# MEMORY — FEDCON HubSpot Agent

Persistent learnings and context that should inform every heartbeat.

---

## Account Context (established 2026-04-22)
- **HubSpot Account ID**: 48836268
- **Primary pipeline ID**: 695988740
- **Agent user**: Bradley Egbert, owner ID 43759236
- **Email**: bradley.egbert@federalgovernment.info
- **Account domain**: federalgovernment.info

## Known Pipeline Stage IDs (pipeline 695988740)
- `1018642297` — probability ~5% (early/awareness stage)
- `1018642299` — probability ~10% (mid-funnel stage)
- `1018642301` — probability ~15% (active working stage)
- `1071366932` — probability ~8% (unclear — may be a nurture/hold stage)
- `closedwon` — Closed Won
- `closedlost` — Closed Lost

Note: Stage names not yet resolved from IDs — should query pipeline properties on a future heartbeat.

## Baseline Metrics (established 2026-04-22)
- **Open deals**: 4,734 (all non-closed stages, pipeline 695988740)
- **NOT_STARTED tasks total**: 2,122
- **Overdue NOT_STARTED tasks** (due before 2026-04-22): 1,627
- **Deals missing owner**: confirmed multiple (exact count TBD)
- **Deals missing close date**: confirmed multiple (exact count TBD)

## Known Data Quality Issues
1. **Massive task backlog**: 1,627 overdue tasks, oldest from Sept 2025. Majority are auto-generated "Add outcome for Call with..." tasks — these appear to be a systemic HubSpot workflow artifact, not intentional tasks. Flagged for human review; do NOT bulk-delete without approval.
2. **Unowned deals**: Multiple open deals have no hubspot_owner_id. These are pipeline blind spots.
3. **No close dates**: Several open deals missing closedate, impairing forecast accuracy.

## Pipeline Stage ID Map (AUTHORITATIVE — resolved 2026-04-22)
| Stage ID | Stage Name | Notes |
|---|---|---|
| `1018642297` | Discovery Stage | Open — earliest funnel stage |
| `1018642299` | MA Scheduled | Open — meeting/assessment scheduled |
| `1018642301` | Nurturing | Open — active nurture |
| `1071366932` | Long Term Follow-Up | Open — holding/nurture |
| `1018642302` | Closed Won | CLOSED |
| `1018642303` | Closed Lost | CLOSED |

**WARNING**: Always filter open deals using `IN [1018642297, 1018642299, 1018642301, 1071366932]`. Do NOT use `closedwon`/`closedlost` string values — this pipeline uses numeric stage IDs only, and those string filters silently fail to exclude closed deals.

## Corrected Baseline Metrics (2026-04-22 second heartbeat)
Previous baseline (first heartbeat) was wrong — stage filters used default HubSpot string IDs that don't apply to this pipeline's numeric stage IDs.

| Metric | Wrong (first HB) | Correct |
|---|---|---|
| Total open deals | 4,734 | **1,422** |
| Unowned open deals | 567 | **140** |
| Zombie deals (open + past close date) | unknown | **79** |

### Open Stage Distribution (as of 2026-04-22)
- Discovery Stage: 274
- MA Scheduled: 300
- Nurturing: 564 (largest — ~40% of open pipeline)
- Long Term Follow-Up: 285
- **Total: 1,422**

### Known Data Quality (corrected)
- **79 zombie deals**: in open stage but with past close date; oldest from April 2025 (1+ year stale)
- **140 unowned open deals**: 50 have amounts; top 10 represent ~$119,552 unattributed value
- **1,627 overdue NOT_STARTED tasks**: still pending human decision (APR-2026-04-22-001)

## Trend Data (updated each heartbeat)

### Open Deal Count History
| Date | Discovery | MA Scheduled | Nurturing | LTFU | Total |
|---|---|---|---|---|---|
| 2026-04-22 | 274 | 300 | 564 | 285 | 1,422 |
| 2026-04-23 (05:00) | 274 | 303 | 565 | 285 | 1,427 |
| 2026-04-23 (20:10) | 277 | 312 | 567 | 285 | 1,441 |
| 2026-04-24 (00:23) | 279 | 317 | 566 | 287 | 1,449 |
| 2026-04-24 (04:08) | 280 | 317 | 566 | 287 | 1,450 |
| 2026-04-24 (16:29) | 279 | 319 | 566 | 287 | 1,451 |
| 2026-04-24 (20:14) | 281 | 318 | 564 | 289 | 1,452 |
| 2026-04-25 (08:20) | 282 | 320 | 564 | 289 | 1,455 |
| 2026-04-25 (12:24) | 282 | 321 | 563 | 289 | 1,455 |

### Overdue Task Backlog History
| Date | Overdue NOT_STARTED Tasks | Daily Change | Note |
|---|---|---|---|
| 2026-04-22 | 1,627 | (baseline) | Used April 2025 epoch cutoff — tasks overdue before 2025-04-22 |
| 2026-04-23 (05:00) | 1,648 | +21 | Same April 2025 epoch cutoff |
| 2026-04-23 (20:10) | 1,601 | — | **Corrected**: first count using accurate 2026-04-23 epoch (1776902400000 ms) |
| 2026-04-24 (00:23) | 1,636 | +35 | Epoch 1776988800000 (2026-04-24 00:00 UTC). Delta inflated by epoch shift (+1 day); real daily new overdue ~35 tasks |
| 2026-04-24 (16:29) | 1,625 | −11 | Epoch 1777032000000 (~noon UTC). Decrease suggests reps completing tasks today |
| 2026-04-24 (20:14) | 1,672 | +47 | Epoch 1777060800000 (20:00 UTC). Higher due to 8h epoch shift — not a real daily increase |
| 2026-04-25 (08:20) | 1,648 | — | Epoch 1777075200000 (2026-04-25 00:00 UTC). First accurate April 25 baseline. |
| 2026-04-25 (12:24) | 1,648 | 0 | Same epoch. Stable — no net new overdue tasks since midnight. |

**Timestamp correction**: Prior overdue counts used epoch ms 1745366400000 = April 23, 2025 — they counted tasks overdue before April 2025, not today. The correct timestamp for "overdue before today" is 1776902400000 ms. Use this going forward. The 1,601 figure is the first accurate all-in overdue count.

### Unlinked Contacts Breakdown (resolved 2026-04-23)
| Category | Count | Notes |
|---|---|---|
| Total unlinked contacts | 1,590 | `associatedcompanyid` = null |
| Confirmed Aircall artifacts | 291 | lastname = "Aircall new contact" exactly |
| Other unlinked contacts | ~1,299 | Mix of legitimate leads + possible Aircall variants |

## New P0 Finding (2026-04-23)

### Unlinked Contacts (Aircall Artifact)
- **1,590 contacts** have no associated company (`associatedcompanyid` = null)
- Sample entry: "+18432507756 Aircall new contact" — phone number as firstname, "Aircall new contact" as lastname
- **Root cause hypothesis**: Aircall VoIP integration auto-creates a contact record for every inbound call from an unknown number, with no company association. This is the same integration driving the "Add outcome for Call" task backlog.
- **Impact**: Inflated contact database, no rep accountability, deduplication noise
- **Action needed**: Human review. If confirmed Aircall artifacts, a bulk-cleanup approval will be needed (>10 records = GUARDRAILS approval gate).
- **Status**: Flagged. Not actioned. No approval request written yet — need sample analysis to confirm root cause first.

## Aircall Integration Root Cause (confirmed 2026-04-23)
The Aircall VoIP integration auto-creates a HubSpot contact for every inbound call from an unrecognized number:
- **Pattern**: firstname = phone number, lastname = "Aircall new contact", no company, no email
- **Confirmed count**: 291 contacts matching this exact pattern (no company association)
- **Inflow rate**: ~5-10 new Aircall contacts/day based on recent sample dates
- **Same root cause**: Both the "Add outcome for Call" task backlog (APR-2026-04-22-001) and the unlinked contacts issue (APR-2026-04-23-001) originate from Aircall integration
- **Fix at source**: Disable "Create contact for unknown callers" in HubSpot > Settings > Integrations > Aircall — this stops new artifacts without requiring ongoing cleanup
- **Approval written**: APR-2026-04-23-001 covers deletion of 291 confirmed artifacts

## Mystery Batch-Modification Pattern on Unowned Deals (ongoing investigation)

**First observed**: 2026-04-23 (20:10 UTC heartbeat)
**Status**: Unresolved — three events confirmed, source unknown

### Known Events
| Timestamp (UTC) | Deals Affected | Stages | Notes |
|---|---|---|---|
| 2026-04-23T18:02–18:04 | 6+ confirmed (likely more) | Nurturing only | First observed in 20:10 HB |
| 2026-04-24T12:11–12:12 | 10 confirmed | Nurturing AND LTFU | First confirmed LTFU impact |

**Pattern characteristics**:
- Affects unowned open deals (all confirmed deals had `hubspot_owner_id` = null)
- Modification does NOT assign ownership (deals remain unowned after touch)
- Touches multiple deals in a ~2-minute burst (bulk/batch behavior)
- Recurs roughly daily (~18 hours between known events)
- Deals modified retain their original stage and amount

**Revised hypothesis (2026-04-24 20:14 UTC)**: TWO distinct workflows, not one:
1. **"Nurturing sweep"** (daily ~18:03 UTC): Touches ALL unowned Nurturing-stage deals regardless of amount. Does NOT touch LTFU.
2. **"High-value unowned"** (daily ~12:11 UTC): Touches unowned deals with `amount ≥ ~$3,990`, across both Nurturing AND LTFU.

Evidence: This batch (amounts $2,495–$3,231) shows only the April 23 18:03-04 Nurturing event, NOT the April 24 12:11 event. Prior batches (amounts $3,990–$5,395) showed the 12:11 event. Amount threshold appears to be between $3,231 and $3,990.

**NEW EVENT (2026-04-25 04:19 UTC)**: Third distinct time cluster observed. Deals touched: Tearline Aletheia Llc ($2,245.50, Nurturing), The Prosperity Group Llc ($1,995, Nurturing), Roadhouse Operations Llc ($1,795.50, LTFU). All three modified at 2026-04-25T04:19:31-32Z in a ~1-second burst. Dollar range is BELOW the $3,990 threshold of the 12:11 event, and this is a different time. **Revised hypothesis: THREE distinct workflows:**
1. **"Low-value sweep"** (~04:19 UTC): Touches unowned deals with amount in range ~$1,795–$2,245, Nurturing+LTFU.
2. **"High-value unowned"** (~12:11 UTC): Touches unowned deals with `amount ≥ ~$3,990`, Nurturing+LTFU.
3. **"Nurturing sweep"** (~18:03 UTC): Touches ALL unowned Nurturing-stage deals regardless of amount.
- OR: A single workflow runs multiple times daily with different filters. Human investigation of workflow history is strongly recommended.
- NOTE: hs_lastmodifieddate on deals is updated when associated tasks are created — confirmed by observing that deals alerted at 20:14 UTC showed modification at 20:15 UTC. Separate agent-caused modifications from workflow-caused modifications when analyzing timestamps.

**Investigation recommendation**: Review HubSpot workflow history for deal 45977009276 (Relevant Finds LLC, LTFU, $4,490 — touched at 12:11) AND deal 47315427075 (Outlaw, Nurturing, $3,231 — NOT touched at 12:11). Comparing their workflow enrollment history will confirm or refute the amount-based filter hypothesis.

**HYPOTHESIS REVISION (2026-04-25 12:24 UTC)**: The "Nurturing sweep" (~18:03 UTC) was previously characterized as Nurturing-stage-only. New evidence contradicts this. When querying the 10 most-recently-modified unowned+no-amount open deals, ALL 10 showed their last modification at 2026-04-23T18:04:04-31 UTC — and those 10 deals span Discovery (1), MA Scheduled (2), AND Nurturing (7) stages. This strongly suggests the 18:03 event touches ALL unowned open deals regardless of stage. Revised model:
1. **"All-stages unowned sweep"** (~18:03 UTC): Touches ALL unowned open deals across all stages.
2. **"High-value unowned"** (~12:11 UTC): Touches unowned deals with `amount ≥ ~$3,990`, Nurturing+LTFU.
3. **"Low-value sweep"** (~04:19 UTC): Touches unowned deals with amount in range ~$1,795–$2,245.
- Note: the 18:03 event sample now includes no-amount deals — prior samples were biased toward amount-bearing deals in Nurturing, masking the cross-stage scope.

## New Data Quality Finding (2026-04-23 third heartbeat)

### Deals Missing Amount Field
- **1,012 of 1,433 open deals (71%) have no `amount` set**
- This makes pipeline value reporting and forecasting nearly impossible
- Unowned deals that DO have amounts: 140 total unowned; top unowned deal by value = Schultz Contracting LLC-Self Gen at $25,980
- Top 5 stale unowned deals by value: $25,980 / $19,985 / $12,990 / $11,042 / $9,995 = $79,992.50 combined

### Alert Tasks Created (cumulative — stale unowned deals)
All tasks created without approval (low-risk per GUARDRAILS). Due date: 2026-04-25.

| Task ID | Deal | Amount | Session |
|---|---|---|---|
| 108470861647 | Schultz Contracting LLC-Self Gen | $25,980 | 2026-04-23 16:28 |
| 108475274807 | Supply Unlimited LLC | $19,985 | 2026-04-23 16:28 |
| 108462967638 | Das Equity Holding LLC | $12,990 | 2026-04-23 16:28 |
| 108531121742 | Trooper Drones LLC | $12,590 | 2026-04-23 20:10 |
| 108515186566 | Esco Contractors Inc | $11,042.50 | 2026-04-23 20:10 |
| 108512464976 | Action Construction Inc | $9,995 | 2026-04-23 20:10 |
| 108536908150 | Daniel Napoli | $9,995 | 2026-04-23 20:10 |
| 108516425369 | Cherokee Construction & Safety Innovations LLC | $9,995 | 2026-04-23 20:10 |

**Total alerted pipeline value (first 8 tasks)**: ~$133,620 across 8 deals (note: arithmetic in earlier entry may be approximate).

Approval request filed: `approvals/2026-04-23-16-28-assign-owners-stale-high-value-deals.json` (supplements APR-2026-04-22-002 with specific deal IDs and values).

### Alert Tasks — 2026-04-24 Batch (heartbeat 00:23 UTC)
| Task ID | Deal | Deal ID | Amount |
|---|---|---|---|
| 108550337207 | Arrow Route Direct LLC-Self Gen | 45144605086 | $9,995 |
| 108540492169 | Veteran Tree Services And Land Consulting LLC | 45326982295 | $9,995 |
| 108556633666 | Obelisk Consulting Services LLC | 44965367399 | $9,995 |
| 108545136975 | Baws Realty LLC-Self Gen | 42446251320 | $9,995 |
| 108560968099 | Trial Equity LLC | 42665517348 | $9,995 |

**Cumulative**: 13 alert tasks created across all heartbeats. ~127 unowned deals still without alert tasks.

### Alert Tasks — 2026-04-24 Batch (heartbeat 04:08 UTC)
| Task ID | Deal | Deal ID | Amount | Stage |
|---|---|---|---|---|
| 108551292554 | Domain Construction Inc-Certs | 45491310662 | $9,685 | Nurturing |
| 108558360113 | Metal Gear LLC | 44475664514 | $8,995 | Nurturing |
| 108542527398 | Kassoum Oubda | 46555385626 | $7,795 | Nurturing |
| 108547110933 | The Grayonics Pro Drone Pilot Photography & Special Event Company LLC | 48359058581 | $7,490 | LTFU |
| 108553147787 | We Got Your Back Security LLC | 39276614763 | $5,995 | LTFU |
| 108541910127 | WFV Trucking LLC | 45188994654 | $5,495 | LTFU |
| 108534573627 | Trust Pointe Financial Services Inc-Self Gen | 45889615432 | $5,495 | LTFU |
| 108553454848 | Lenape Logistics LLC | 51948611246 | $5,495 | Nurturing |
| 108562849620 | Sterling Rise Federal Corporation | 45348993050 | $5,495 | Nurturing |
| 108533796897 | Gavasha Inc | 41506214230 | $5,495 | Nurturing |

**Cumulative**: 23 alert tasks created across all heartbeats. ~117 unowned deals still without alert tasks.

### Alert Tasks — 2026-04-24 Batch (heartbeat 16:29 UTC)
| Task ID | Deal | Deal ID | Amount | Stage |
|---|---|---|---|---|
| 108650426282 | Dorbren Security LLC | 42673771906 | $5,395.50 | Nurturing |
| 108642120351 | Paradime Networks LLC | 44951255678 | $4,995 | Nurturing |
| 108640569975 | UTTER PRECISION, INC. | 46927014810 | $4,945.50 | Nurturing |
| 108637150794 | Capitol Atlas Strategies LLC | 45334354471 | $4,945.50 | Nurturing |
| 108625508674 | Chicago Embroidery Co. | 45988537718 | $4,945.50 | Nurturing |
| 108635912787 | Relevant Finds LLC | 45977009276 | $4,490 | LTFU |
| 108623804972 | Rose Nexus Group LLC | 44496452495 | $4,131 | Nurturing |
| 108623958679 | Legacy Lane Enterprise LLC | 46566412440 | $4,041 | Nurturing |
| 108623804974 | True Vision Trucking LLC | 46767531893 | $3,990 | Nurturing |
| 108637767250 | ROBINSONCONSULTING | 46792516013 | $3,990 | Nurturing |

**Cumulative**: 33 alert tasks created across all heartbeats. ~107 unowned deals still without alert tasks.

### Alert Tasks — 2026-04-24 Batch (heartbeat 20:14 UTC)
| Task ID | Deal | Deal ID | Amount | Stage |
|---|---|---|---|---|
| 108633800723 | Outlaw | 47315427075 | $3,231 | Nurturing |
| 108632407325 | ALEXIS ENTERPRISES LLC - FEDCON Edge/2025 | 39261782280 | $2,995 | LTFU |
| 108626492596 | Expanxia LLC | 45429828942 | $2,995 | Nurturing |
| 108634113387 | Jmv Development Llc | 45925094943 | $2,995 | Nurturing |
| 108651103112 | Blue Rock Consulting LLC | 44587532436 | $2,995 | Nurturing |
| 108642475398 | Arrowwood Consulting Llc | 43896950434 | $2,995 | Nurturing |
| 108624169245 | Rikki Winters | 46912035848 | $2,495 | LTFU |
| 108653879120 | Ultra Movers LLC | 45197724809 | $2,495 | Nurturing |
| 108643105346 | Health And Wealth First Llc | 47416093528 | $2,495 | Nurturing |
| 108635812112 | Global Services Gs Llc | 45361064503 | $2,495 | Nurturing |

**Cumulative**: 43 alert tasks created across all heartbeats. ~97 unowned deals still without alert tasks (~7 with amounts at offset 43–49; ~90 without amounts).

### Alert Tasks — 2026-04-25 Batch (heartbeat 08:20 UTC) — FINAL AMOUNT-BEARING BATCH
| Task ID | Deal | Deal ID | Amount | Stage |
|---|---|---|---|---|
| 108677837374 | Tearline Aletheia Llc | 46573338715 | $2,245.50 | Nurturing |
| 108662540175 | The Prosperity Group Llc | 44900945278 | $1,995 | Nurturing |
| 108672104361 | Roadhouse Operations Llc | 46619404566 | $1,795.50 | LTFU |

**MILESTONE**: All 50 unowned open deals with amounts have been alerted. **Cumulative: 46 alert tasks**. ~90 unowned deals with no amount field remain — these have no dollar value to prioritize by; human assignment review needed before alerting further.

### Alert Tasks — 2026-04-25 Batch (heartbeat 12:24 UTC) — NO-AMOUNT DEALS (first 5 of 90)
| Task ID | Deal | Deal ID | Amount | Stage |
|---|---|---|---|---|
| 108671648421 | Logistix, Inc. | 37136255241 | none | Nurturing |
| 108667958536 | Aero Sombrero Llc-Self Gen | 44018651986 | none | Nurturing |
| 108685105548 | Armstrong Cal Builders Inc | 43121298831 | none | Nurturing |
| 108677683637 | Shiloh Enterprise Group Corporation | 44852056596 | none | Discovery |
| 108664561453 | Sovereign Defense Intelligence, LLC | 45001878317 | none | Nurturing |

**Cumulative: 51 alert tasks**. 85 no-amount unowned deals remain un-alerted. Due date set to 2026-04-28.

## Decisions & Learnings
- 2026-04-22: First heartbeat. Directory structure initialized. Baseline metrics established (later found to be incorrect due to stage filter bug).
- 2026-04-22: Task backlog likely systemic (auto-generated call outcome tasks) — created approval request for human review before any bulk action.
- 2026-04-22 (second heartbeat): Resolved all stage IDs. Corrected every baseline metric. Key insight: this pipeline uses numeric stage IDs; string-based closedwon/closedlost filters do not work. Updated APR-2026-04-22-002 with correct count of 140 unowned open deals.
- 2026-04-23 (first heartbeat): Confirmed task backlog is actively growing (~21/day). Discovered 1,590 contacts with no company — likely same Aircall root cause. Both prior approvals still pending human action.
- 2026-04-23 (second heartbeat): Confirmed Aircall root cause for unlinked contacts. 291 records provably match the Aircall artifact pattern. Wrote APR-2026-04-23-001. Pipeline stable. Three approvals now pending; all low-risk to approve.
- 2026-04-23 (third heartbeat, 16:28 UTC): New finding — 1,012 deals (71%) missing amount field. Created 3 alert tasks on most critical stale unowned deals. Filed supplemental approval request for owner assignment. Four approvals now pending.
- 2026-04-23 (fourth heartbeat, 20:10 UTC): Pipeline grew to 1,441 total (+14 vs morning). Corrected overdue task epoch timestamp — prior counts used April 2025 cutoff; correct 2026 cutoff shows 1,601. Created 5 more alert tasks on next-tier unowned deals ($53,627.50). Total alerted: 8 tasks / $133,620. Batch workflow touch on several unowned Nurturing deals noted at 18:03-18:04 UTC — unknown cause, monitor. All 4 approvals still pending.
- 2026-04-24 (first heartbeat, 00:23 UTC): Pipeline 1,449 (+8). Overdue tasks 1,636 (+35 with epoch shift). Created 5 more alert tasks on next-tier unowned deals: Arrow Route Direct, Veteran Tree Services, Obelisk Consulting, Baws Realty, Trial Equity (all $9,995 each, deal IDs in table above). All 5 confirmed still unowned. Batch 18:03-18:04 UTC modification still visible on these deals — ownership unchanged. 13 cumulative alert tasks. All 4 approvals still pending.
- 2026-04-24 (second heartbeat, 04:08 UTC): Pipeline 1,450 (+1). Overdue tasks 1,636 (stable). Created 10 more alert tasks on next-tier unowned deals ($5,495–$9,685 each). Cumulative: 23 alert tasks / ~$201,055 total value alerted. 117 unowned deals remain without tasks. Batch 18:02–18:04 UTC touch pattern confirmed on 6 of 10 deals in this batch — all Nurturing stage; LTFU deals not affected. Pattern appears Nurturing-specific. All 4 approvals still pending; oldest (APR-2026-04-22-001) now 2+ days old.
- 2026-04-24 (third heartbeat, 16:29 UTC): Pipeline 1,451 (+1). Overdue tasks 1,625 (−11 — reps completing tasks today). Created 10 more alert tasks on next-tier unowned deals ($3,990–$5,395 each). Cumulative: 33 alert tasks / ~$246,924 total value alerted. ~107 unowned deals remain without tasks. CRITICAL NEW FINDING: Third batch-modification event at 2026-04-24T12:11–12:12 UTC affects BOTH Nurturing AND LTFU stages (Relevant Finds LLC at LTFU confirmed) — prior assumption of "Nurturing-only" was wrong. Events are roughly daily (~18h apart). Hypothesis: a HubSpot workflow or integration is attempting an operation on unowned deals but failing silently. Recommend human investigation of deal workflow history (e.g., deal 45977009276). All 4 approvals still pending; APR-2026-04-22-001 and APR-2026-04-22-002 now >2 days old with no action.
- 2026-04-24 (fourth heartbeat, 20:14 UTC): Pipeline 1,452 (+1). Overdue tasks 1,672 (epoch-shifted baseline, not directly comparable). Created 10 more alert tasks on next-tier unowned deals ($2,495–$3,231). Cumulative: 43 alert tasks / ~$275,110. KEY INSIGHT: Amount threshold identified for April 24 12:11 workflow event — deals ≤ $3,231 were NOT touched at 12:11, suggesting TWO separate workflows: (1) "Nurturing sweep" ~18:03 UTC touching all unowned Nurturing deals, (2) "High-value unowned" ~12:11 UTC touching deals with amount ≥ ~$3,990 across Nurturing+LTFU. Total unowned deals with amounts = 50; ~7 remain to be alerted (offset 43–49). All 4 approvals still pending.
- 2026-04-25 (first heartbeat, 08:20 UTC): Pipeline 1,455 (+3). Overdue tasks 1,648 (first accurate April 25 baseline, epoch 1777075200000). Created final 3 alert tasks completing the full 50-deal unowned+amount sweep. MILESTONE: all 50 unowned deals with amounts alerted (46 cumulative tasks). NEW FINDING: Third batch-modification time cluster at ~04:19 UTC — three lower-value deals ($1,795.50–$2,245.50, Nurturing+LTFU) modified in a 1s burst. Hypothesis updated to THREE distinct workflows. ALSO CONFIRMED: HubSpot updates deal hs_lastmodifieddate when associated tasks are created — explains why alerted deals show modification times matching our task creation times. All 4 approvals still pending (oldest 3 days). Next: ~90 unowned deals with no amount remain un-alerted; human guidance needed on whether to continue without amounts. Consider escalating approval requests.
- 2026-04-25 (second heartbeat, 12:24 UTC): Pipeline 1,455 (stable, MA Scheduled +1, Nurturing -1). Overdue tasks 1,648 (stable — no net growth today). Started no-amount unowned deal alert sweep: created 5 tasks on first batch (Logistix, Aero Sombrero, Armstrong Cal Builders, Shiloh Enterprise, Sovereign Defense). Cumulative: 51 alert tasks. 85 no-amount unowned deals remain. CRITICAL HYPOTHESIS REVISION: April 23 18:04 batch event confirmed to touch Discovery and MA Scheduled deals (not Nurturing-only as previously stated) — the 18:03 UTC sweep likely covers ALL unowned open deals regardless of stage. All 4 approvals still pending.
