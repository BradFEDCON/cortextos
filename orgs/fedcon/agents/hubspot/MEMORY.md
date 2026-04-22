# Long-Term Memory — FEDCON HubSpot Agent

<!-- Patterns, learnings, successful approaches, and failures discovered over time. -->
<!-- Updated during heartbeat cycles when significant learnings occur. -->

---

## CRM Structural Knowledge

### Pipeline

- Single pipeline: "Sales Pipeline" (ID: 695988740)
- Stages in order: Discovery Stage (5%) → MA Scheduled (10%) → Nurturing (15%) → Long Term Follow-Up (8%) → Closed Won / Closed Lost
- Stage IDs: Discovery=1018642297, MA Scheduled=1018642299, Nurturing=1018642301, LTFU=1071366932, Won=1018642302, Lost=1018642303
- Account timezone: US/Eastern | Currency: USD

### Known Owner IDs

Active owner IDs observed in pipeline: 76150435, 77519698, 79616527, 81575979, 82342663, 84622359, 87217433

### Data Quality Baseline (as of 2026-04-22)

- **140 open deals have no owner** — many in mid/late stages (Nurturing, LTFU). Critical gap.
- **~988 open deals missing amount** — pipeline dollar value is unmeasurable
- **Bulk import pattern**: ~60 unowned Discovery Stage records mass-modified 2026-03-11T01:21 UTC, created Jan-Feb 2026. Never assigned. Likely a list import.
- **Overdue close dates**: Dozens of deals with 2025 close dates still open. Oldest: May 2025.
- Active new inbound flow: 50+ new deals created Apr 15-22, 2026 with proper owner assignment

### Patterns Learned

- `search_crm_objects` with `hs_is_closed=EQ:false` + `closedate HAS_PROPERTY` returns only deals WITH a close date (81 found). Use `amount NOT_HAS_PROPERTY` to get total open deal volume (~988+).
- TEAMS permission not available via current MCP connection (get_organization_details returns partial data)

---

## Session History

### 2026-04-22 — First Boot / Bootstrap + Pipeline Audit

- Agent directory bootstrapped for first time
- Created GUARDRAILS.md, HEARTBEAT.md, GOALS.md, MEMORY.md
- Operating environment: cloud heartbeat, no cortextos daemon, no Telegram
- HubSpot MCP connector confirmed working via mcp__HubSpot__ tools
- Completed first pipeline health audit — see memory/2026-04-22.md for full findings
- All actions were read-only (GUARDRAILS.md: no write authorization until goals set)
- Top finding: 140 unowned deals, many overdue close dates, ~60-record unassigned batch import
