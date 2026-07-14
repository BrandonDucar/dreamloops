---
type: System
title: DreamLoops M.D.
description: DreamNet's reusable mission-DNA format for bounded agent, human, guild, lab, and business work loops.
resource: docs/dreamloops/DREAMLOOP_PROTOCOL.md
tags: [dreamnet, dreamloops, mdloop, mission-directive, academy]
timestamp: 2026-06-20T00:00:00-04:00
---

# Purpose

DreamLoops M.D. files tell an agent or workforce unit how to turn a trigger and current knowledge state into bounded action, validation, execution trace, evidence, a receipt, and a memory-routing decision.

# Execution Circuit

```text
OKF knowledge
  -> agent knowledge state
  -> trigger
  -> selected DreamLoop
  -> scoped action
  -> execution trace
  -> validation
  -> evidence
  -> receipt
  -> memory routing
  -> next trigger or retirement
```

# Why It Differs From OKF

OKF represents knowledge. DreamLoops M.D. runs missions.

```text
OKF = what agents should know
Agent Knowledge State = what this agent currently knows and can rely on
DreamLoops M.D. = what agents are allowed to do
Execution Trace = what agents actually did
Receipt = proof of what happened
```

# Required DreamLoop Fields

```yaml
loop_id:
title:
version:
status:
owner:
stewards:
permission_tier:
trigger:
inputs:
context_sources:
allowed_actions:
blocked_actions:
checks:
evidence_outputs:
receipt_outputs:
memory_routes:
cooldown:
failure_modes:
promotion_path:
last_reviewed:
```

# Related Concepts

* [DreamLoop to OKF Bridge](/playbooks/dreamloop-to-okf.md)
* [Agent Knowledge State](/agents/agent-knowledge-state.md)
* [Agent Execution Trace](/agents/agent-execution-trace.md)
* [Generated DreamLoops](/dreamloops/index.md)
