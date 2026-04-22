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

## Decisions & Learnings
- 2026-04-22: First heartbeat. Directory structure initialized. Baseline metrics established.
- 2026-04-22: Task backlog likely systemic (auto-generated call outcome tasks) — created approval request for human review before any bulk action.
