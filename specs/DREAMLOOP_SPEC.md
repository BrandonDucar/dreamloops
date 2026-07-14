# DreamLoops M.D. Protocol

Status: public specification v1.0  
Owner: DreamLoops contributors  
Scope: all reusable agent, human, guild, and business work loops

## Definition

DreamLoops M.D. is a reusable operating circuit and mission-DNA format. It tells an agent or workforce unit how to turn current knowledge, a trigger, and a permission tier into bounded action, execution trace, evidence artifact, receipt, and next routing decision.

M.D. can be read two ways:

- Markdown DNA: the loop lives in human-readable files.
- Mission Directive: the loop is executable work guidance, not chat fluff.

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

## Middle Layers

DreamNet uses two middle layers between knowledge and proof:

```text
OKF = what agents should know
Agent Knowledge State = what this agent currently knows and can rely on
DreamLoop = what this agent is allowed to do
Execution Trace = what this agent actually did
Receipt = proof summary and hashable accountability object
```

### Agent Knowledge State

Agent Knowledge State is the loaded working context for one agent, run, or mission. It is not the whole library. It is the specific subset of OKF, memory, permissions, identities, tools, and recent receipts the agent used to choose or run a DreamLoop.

Recommended fields:

```yaml
knowledge_state_id:
agent_identity:
loaded_at:
okf_refs:
memory_refs:
receipt_refs:
tool_refs:
permission_tier:
known_gaps:
staleness_notes:
hashes:
```

### Execution Trace

Execution Trace records the steps between selecting a DreamLoop and producing the final receipt. It is more granular than a receipt and less canonical than the final proof object.

Recommended fields:

```yaml
trace_id:
loop_id:
actor_identity:
knowledge_state_id:
started_at:
steps:
tool_calls:
files_read:
files_written:
commands_run:
external_calls:
blocked_actions:
checks:
errors:
finished_at:
```

Receipts should summarize and hash execution traces. Traces can be private, redacted, or selectively promoted depending on sensitivity.

## Required Fields

Every `.mdloop` or `.dreamloop.md` file should include:

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
knowledge_state_outputs:
execution_trace_outputs:
memory_routes:
cooldown:
failure_modes:
promotion_path:
last_reviewed:
```

## Permission Tiers

| Tier | Meaning |
| --- | --- |
| `read_only` | Inspect and report only. |
| `local_draft_write` | Write local artifacts only. |
| `artifact_draft_write` | Create bounded proposals, drafts, and evidence packets. |
| `private_branch_write_candidate` | May request scoped branch work after review. |
| `live_guarded_action` | May perform approved live action under explicit guardrails. |
| `production_write` | Reserved for fully verified agents with human-approved scope. |

## Lifecycle

```text
draft
  -> rehearsed
  -> active_local
  -> live_guarded
  -> certified
  -> retired
```

`certified` does not mean unlimited authority. It means the loop has repeatable evidence, known failure behavior, and a named review owner.

## Evidence Rules

A DreamLoops M.D. run is not complete until it writes at least one evidence artifact.

Minimum evidence:

- who or what ran the loop
- what the agent knew at run time
- trigger
- inputs read
- actions taken
- trace of meaningful steps
- checks performed
- blocked actions avoided
- outputs produced
- next safe action

## Receipt Rules

Receipts should preserve facts, not hype.

Recommended receipt fields:

```yaml
receipt_id:
loop_id:
actor_identity:
execution_mode:
trigger:
objective:
inputs:
knowledge_state_refs:
outputs:
checks:
approvals:
blocked_actions:
result:
next_safe_action:
evidence_paths:
trace_paths:
hashes:
timestamp:
```

## Training And Evaluation Use

DreamLoops M.D. files can be training and evaluation objects.

- Academy teaches the theory.
- Tool Gym tests execution.
- Playground tests adaptation.
- Lab tests boundary behavior.
- Quorum reviews risky promotions.
- Immunity checks capability drift.
- CodeQuill records provenance.
- Walrus can archive approved receipts.

## Core Rule

Do not reward agents for acting fast. Reward them for running the correct loop, staying inside scope, producing evidence, and improving the system without hiding risk.
