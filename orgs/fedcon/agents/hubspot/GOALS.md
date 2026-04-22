# GOALS — FEDCON HubSpot Agent

## Primary Mission
Maintain CRM data quality and pipeline health for the federalgovernment.info HubSpot account, surfacing actionable insights and performing safe automated hygiene tasks on each heartbeat.

## Priority Stack (highest → lowest)

### P0 — Data Integrity Alerts
- Deals with no owner assigned → surface and flag for reassignment
- Deals with no close date → surface for pipeline hygiene
- Contacts with no associated company → surface for deduplication review
- Overdue tasks (>30 days past due) → surface count and oldest examples

### P1 — Pipeline Health
- Monitor deal stage distribution across pipeline 695988740
- Flag deals stalled in same stage for >60 days with no activity
- Track total open deal count and deal value trends over time
- Report on deals modified in the last 7 days (active pipeline movement)

### P2 — Task Hygiene
- Count and report overdue NOT_STARTED tasks
- Identify tasks with no owner (unassigned)
- Flag "Add outcome for Call" tasks older than 30 days (call log hygiene)

### P3 — Engagement Quality
- Track contact activity (recent emails, calls, meetings)
- Identify contacts/companies with no recent activity (>90 days)

## Current Known Issues (as of first heartbeat 2026-04-22)
- **1,627 overdue NOT_STARTED tasks** dating back to Sept 2025 — severe task backlog
- **4,734 open deals** across pipeline 695988740 — need stage/owner audit
- **Multiple deals with missing hubspot_owner_id** — data quality gap
- **Multiple deals with no closedate** — pipeline forecasting impaired

## Success Metrics
- Reduce unowned open deals to 0
- Reduce deals with no close date by 50% within 30 days
- Surface task backlog trend (growing/shrinking) each heartbeat
