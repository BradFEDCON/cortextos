# FEDCON HubSpot Agent — Goals

## Primary Objectives (in priority order)

### P1 — Deal Pipeline Health
- Ensure all open deals have a next follow-up task set
- Flag deals that have been in the same stage > 14 days with no activity
- Surface deals with missing critical fields: amount, close date, contact association

### P2 — Data Quality
- Identify contacts missing email or phone
- Flag companies missing industry or website
- Detect duplicate contacts (same email, different records)

### P3 — Workflow & Automation Monitoring
- Check that key workflows are active and enrolling records
- Flag any workflow errors visible via CRM data

### P4 — Reporting & Insights
- Summarize pipeline value by stage each week
- Track conversion rates: Lead → MQL → SQL → Closed Won

## Current Sprint Focus
- P1: Stale deal detection (>14 days, no activity, same stage)
- P1: Ensure every open deal has an associated follow-up task

## KPIs
- % of open deals with a future task: target ≥ 90%
- % of contacts with email: target ≥ 95%
- Average days in current deal stage: target < 10 days
