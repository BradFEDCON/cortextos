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
| 2026-04-23 | 274 | 303 | 565 | 285 | 1,427 |

### Overdue Task Backlog History
| Date | Overdue NOT_STARTED Tasks | Daily Change |
|---|---|---|
| 2026-04-22 | 1,627 | (baseline) |
| 2026-04-23 | 1,648 | +21 |

**Growth rate**: ~21 new overdue tasks/day. At this rate, backlog will exceed 2,000 within ~17 days if APR-2026-04-22-001 is not actioned.

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

## New Data Quality Finding (2026-04-23 third heartbeat)

### Deals Missing Amount Field
- **1,012 of 1,433 open deals (71%) have no `amount` set**
- This makes pipeline value reporting and forecasting nearly impossible
- Unowned deals that DO have amounts: 140 total unowned; top unowned deal by value = Schultz Contracting LLC-Self Gen at $25,980
- Top 5 stale unowned deals by value: $25,980 / $19,985 / $12,990 / $11,042 / $9,995 = $79,992.50 combined

### Alert Tasks Created (2026-04-23 16:28 UTC)
Three follow-up tasks created (no approval required per GUARDRAILS) on most critical stale unowned deals:
| Task ID | Deal | Amount | Days Stale |
|---|---|---|---|
| 108470861647 | Schultz Contracting LLC-Self Gen | $25,980 | 99 |
| 108475274807 | Supply Unlimited LLC | $19,985 | 92 |
| 108462967638 | Das Equity Holding LLC | $12,990 | 125 |

Approval request filed: `approvals/2026-04-23-16-28-assign-owners-stale-high-value-deals.json` (supplements APR-2026-04-22-002 with specific deal IDs and values).

## Decisions & Learnings
- 2026-04-22: First heartbeat. Directory structure initialized. Baseline metrics established (later found to be incorrect due to stage filter bug).
- 2026-04-22: Task backlog likely systemic (auto-generated call outcome tasks) — created approval request for human review before any bulk action.
- 2026-04-22 (second heartbeat): Resolved all stage IDs. Corrected every baseline metric. Key insight: this pipeline uses numeric stage IDs; string-based closedwon/closedlost filters do not work. Updated APR-2026-04-22-002 with correct count of 140 unowned open deals.
- 2026-04-23 (first heartbeat): Confirmed task backlog is actively growing (~21/day). Discovered 1,590 contacts with no company — likely same Aircall root cause. Both prior approvals still pending human action.
- 2026-04-23 (second heartbeat): Confirmed Aircall root cause for unlinked contacts. 291 records provably match the Aircall artifact pattern. Wrote APR-2026-04-23-001. Pipeline stable. Three approvals now pending; all low-risk to approve.
- 2026-04-23 (third heartbeat, 16:28 UTC): New finding — 1,012 deals (71%) missing amount field. Created 3 alert tasks on most critical stale unowned deals. Filed supplemental approval request for owner assignment. Four approvals now pending.
