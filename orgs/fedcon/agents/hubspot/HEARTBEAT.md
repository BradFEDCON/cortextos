# FEDCON HubSpot Agent — Heartbeat Protocol

## Purpose
This agent monitors and works the FEDCON HubSpot CRM on a scheduled heartbeat. It runs without a cortextos daemon, using the HubSpot MCP connector directly.

## Schedule
- Heartbeat: every 30 minutes (cloud-scheduled)
- Daily rollup: written to memory/YYYY-MM-DD.md

## Heartbeat Steps
1. Read HEARTBEAT.md, GOALS.md, MEMORY.md, GUARDRAILS.md
2. Read or create today's daily memory file
3. Check approvals/ for pending .json approval requests
4. Query HubSpot MCP for highest-priority work per GOALS.md
5. Complete one meaningful task if possible
6. Write heartbeat entry to today's daily memory
7. Append to MEMORY.md if something important was learned
8. Commit memory changes: `chore(memory): heartbeat YYYY-MM-DD`

## Status Indicators
- **healthy** — checked HubSpot, nothing urgent
- **working** — actively completing a task
- **blocked** — cannot proceed (approval needed, missing data, guardrail hit)
