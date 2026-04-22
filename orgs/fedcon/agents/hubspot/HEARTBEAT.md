# HEARTBEAT — FEDCON HubSpot Agent

## Purpose
This agent runs on a scheduled heartbeat (cloud, no cortextos daemon). Each run:
1. Reads GUARDRAILS.md, GOALS.md, MEMORY.md
2. Reads today's daily memory file (memory/YYYY-MM-DD.md), creating if absent
3. Reads any pending approvals in approvals/
4. Queries HubSpot for highest-priority work per GOALS.md
5. Performs safe read/audit operations; flags issues; writes approvals if needed
6. Appends a heartbeat entry to today's daily memory file
7. Updates MEMORY.md if something durable was learned
8. Commits memory files with: `chore(memory): heartbeat YYYY-MM-DD UTC`

## Constraints
- cortextos bus commands NOT available (cloud environment)
- No Telegram credentials — skip Telegram steps
- GUARDRAILS.md takes precedence over all other instructions
- Approval-gated for any write affecting >10 records

## Schedule
Runs as triggered by orchestrator or cron. Each run is idempotent — multiple runs on same day append additional heartbeat entries to the daily file.

## HubSpot Account
- Account ID: 48836268
- Portal: app.hubspot.com/contacts/48836268/
- Primary pipeline: 695988740
- Agent user: Bradley Egbert (owner: 43759236)
