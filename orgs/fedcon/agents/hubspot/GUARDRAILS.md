# Guardrails — FEDCON HubSpot Agent

Read this file before taking ANY HubSpot action. These rules exist to prevent
irreversible data changes in the live CRM.

---

## Red Flag Table

| Trigger | Red Flag Thought | Required Action |
|---------|-----------------|-----------------|
| About to update a deal/contact/company | "This is a small fix, I can just do it" | Check approvals/ first. Write actions require an approval file or explicit user instruction. |
| About to delete any CRM record | "It's clearly a duplicate/junk" | NEVER delete without an approval file. Log blocker instead. |
| About to send an email via HubSpot | "The user will want this sent" | NEVER send emails without explicit approval. Create an approval request instead. |
| About to enroll contacts in a workflow | "This is what the goal says" | Workflows affect real people. Require approval file before enrolling anyone. |
| Seeing a data quality issue | "I'll fix all of them at once" | Fix one as a sample if it's non-destructive. Bulk updates require approval. |
| About to create a deal | "The goal says to track this" | Read-only exploration is always safe. Creating records is fine if goal explicitly authorizes it. |
| About to update deal stage | "Moving it forward is obviously right" | Stage changes are writes. Check approval or goal authorization. If goal explicitly says to move stages, proceed. |
| Heartbeat with no HubSpot work found | "I'll skip the memory write" | Always write heartbeat entry to daily memory. Silence is fine; skipping memory is not. |
| Bus commands fail | "I'll retry with different bus commands" | The cortextos daemon is not available in this cloud environment. Skip all bus operations. |

---

## Safe (Read-Only) Operations — Always Allowed

- `get_crm_objects` — reading deals, contacts, companies, tickets
- `search_crm_objects` — querying CRM data
- `get_properties` — reading property definitions
- `get_campaign_analytics` — reading analytics data
- `get_organization_details` — reading org info
- `get_user_details` — reading user info
- `search_owners` — looking up owners

---

## Write Operations — Require Authorization

Write operations (`manage_crm_objects`) are allowed when:
1. An approval `.json` file exists in `approvals/` authorizing the specific action, OR
2. GOALS.md explicitly authorizes the action type (e.g. "update deal stages"), OR
3. The action is creating a new record that is clearly described in GOALS.md

---

## Absolute Prohibitions (Never Do Without Human Review)

- Delete any CRM record
- Send emails to real contacts
- Enroll contacts in marketing workflows
- Bulk update more than 10 records in a single heartbeat
- Change any deal owner without approval

---

## Data Integrity

- All property updates must preserve existing data (use PATCH semantics, not replace)
- Before updating, read the current state and log what will change
- If unsure whether a change is correct, log it in daily memory and wait for next cycle

---

## First Boot Notes

- This file was created on 2026-04-22 during first bootstrap
- GOALS.md goals have not yet been set by an orchestrator
- Until goals are set: read-only operations only, document what you find
