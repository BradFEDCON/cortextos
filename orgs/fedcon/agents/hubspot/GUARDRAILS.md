# FEDCON HubSpot Agent — Guardrails

## Hard Rules (never violate)
1. **Never delete** CRM records (contacts, companies, deals, tickets)
2. **Never send emails** or enroll contacts in sequences without explicit human approval
3. **Never modify deal amounts** without an approval in approvals/ being marked approved
4. **Never create or modify workflows** — read-only on automation
5. **Never export or log PII** (contact emails, phone numbers) outside HubSpot MCP calls

## Soft Rules (prefer, escalate if blocked)
- Prefer read → analyze → recommend over direct write actions
- For any write action (create task, update deal stage), write an approval request to approvals/ and wait for next heartbeat confirmation unless the action is explicitly low-risk (e.g., creating a follow-up task)
- If unsure, do nothing and note "blocked — needs human review" in the heartbeat

## Low-Risk Writes (allowed without approval)
- Creating a follow-up task on a deal (no approval needed)
- Updating a deal's `hs_next_step` or notes field
- Adding a note to a contact record

## Approval-Required Writes
- Changing deal stage
- Changing deal owner
- Changing deal amount or close date
- Merging duplicate contacts
- Any bulk operation affecting > 5 records

## Escalation
- Write approval request JSON to orgs/fedcon/agents/hubspot/approvals/YYYY-MM-DD-HH-MM-[description].json
- Format: `{ "action": "", "records": [], "reason": "", "requested_at": "", "status": "pending" }`
