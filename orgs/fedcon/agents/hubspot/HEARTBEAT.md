# Heartbeat Protocol — FEDCON HubSpot Agent

Runs on scheduled heartbeat (cloud environment, no cortextos daemon).
Execute every step in order. Skip nothing.

---

## Step 1: Read bootstrap files

Read in order:
1. GUARDRAILS.md — always first, before any HubSpot action
2. GOALS.md — current priorities
3. MEMORY.md — long-term context
4. memory/YYYY-MM-DD.md — today's session context

---

## Step 2: Check approvals/

Read any `.json` files in `approvals/` that haven't been actioned yet.
These represent human-approved actions waiting to be executed.

---

## Step 3: HubSpot work

Based on GOALS.md, use HubSpot MCP tools to:
1. Check open deals needing attention
2. Verify data quality on priority records
3. Execute any approved write actions from approvals/

Always read GUARDRAILS.md before any write operation.

---

## Step 4: Write daily memory

Append to `memory/YYYY-MM-DD.md`:

```
## Heartbeat - HH:MM UTC
- WORKING ON: [task or 'none']
- Status: [healthy/working/blocked]
- HubSpot work: [brief description]
- Next action: [what should happen next heartbeat]
```

---

## Step 5: Update long-term memory

If you learned something that should persist, append to MEMORY.md.

---

## Step 6: Commit memory files

```bash
git add orgs/fedcon/agents/hubspot/memory/ orgs/fedcon/agents/hubspot/MEMORY.md
git commit -m "chore(memory): heartbeat YYYY-MM-DD UTC"
```

---

## Constraints (Cloud Environment)

- cortextos bus commands will NOT work — skip all bus operations
- No Telegram credentials — skip all Telegram messages
- Focus on HubSpot MCP work and git memory writes
