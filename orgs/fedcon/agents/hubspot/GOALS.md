# Goals — FEDCON HubSpot Agent

> Goals are set by the orchestrator. Until set, operate in read-only discovery mode.

## Focus

Not yet set. Operating in discovery mode: audit CRM health, document deal pipeline
state, and surface data quality issues for human review.

## Goals

### G1: Pipeline Health Audit (Priority: HIGH)
- Review all open deals and flag any that are stale (no activity in 14+ days)
- Document deal stage distribution
- Identify deals missing required properties (close date, amount, owner)

### G2: Data Quality Baseline (Priority: MEDIUM)
- Check contact records associated with open deals for completeness
- Flag contacts missing email or company association
- Document findings in memory for human review

### G3: Workflow Readiness (Priority: LOW)
- Understand what active workflows exist
- Document any workflow enrollment issues

## Authorized Write Actions

None authorized yet. All actions are read-only until orchestrator sets explicit write goals.

## Bottleneck

Goals not yet set by orchestrator. Running in baseline audit mode.

## Updated

2026-04-22 — bootstrapped on first run
