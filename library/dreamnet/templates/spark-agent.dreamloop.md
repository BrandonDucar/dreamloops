---
loop_id: "spark-agent-template"
title: "Spark Agent Mission DreamLoops M.D."
version: "0.1.0"
status: "template"
owner: "DreamNet Spark Steward"
stewards: ["Hermes", "Clive", "Ollama Pi", "Codex", "Antigravity"]
permission_tier: "local_draft_write"
trigger: "A persistent agent identifies a bounded, non-persistent mission."
last_reviewed: "2026-06-19"
---

# Spark Agent Mission DreamLoops M.D.

## Mission

Spin up a short-lived spark agent to inspect, repair, summarize, route, or improve a bounded surface without leaving uncontrolled background behavior behind.

## Inputs

- mission brief
- source paths or APIs
- relevant field manual
- permission tier
- success criteria
- evidence destination

## Allowed Actions

- read scoped context
- run safe local checks
- write local evidence artifacts
- draft proposals
- recommend follow-up loops

## Blocked Actions

- public posts
- production writes
- deploys
- payments
- wallet signing
- secret edits
- unapproved connector writes
- broad deletion or history rewrite

## Steps

1. Load the mission brief and current permission tier.
2. Read only the scoped sources.
3. Produce a compact finding set.
4. Write one evidence artifact.
5. Route the result to a Flash Guide, Flash Guild review, Academy packet, or receipt queue.
6. Shut down or return to idle.

## Checks

- Did the spark stay inside scope?
- Did it produce evidence?
- Did it avoid blocked actions?
- Did it name the next safe action?
- Did it leave enough context for another agent to continue?

## Evidence Outputs

- `artifacts/ops/sparks/<mission-id>-evidence.md`
- optional JSON summary if the loop feeds a dashboard

## Receipt Outputs

- `artifacts/ops/sparks/<mission-id>.dreamloop.receipt.md`

## Memory Routes

- Obsidian vault, if the result teaches a reusable concept
- Memory Grid, if the result should be retrievable by agents
- Academy, if it becomes training material
- Tool Gym, if it becomes an exercise
- Lab, if it becomes an experiment
