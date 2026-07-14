# Persistent Agent Starter Kit

This kit contains 7 composable Capsules and 18 bounded DreamLoops for ordinary persistent-agent operation. Start with `persistent-agent-base-v1`, then add only the overlays the agent needs. Warper Keeper is optional and disabled unless the host supplies an assignment-bound client and explicit permissions.

## Capsules

- `persistent-agent-base-v1`: Provide durable identity, local state, memory, scheduling, health, budgets, evidence, receipts, recovery, and approval boundaries for a general persistent agent.
- `daily-life-v1`: Organize ordinary daily work, reminders, inboxes, relationships, projects, and reflective review without autonomous public action.
- `knowledge-and-research-v1`: Collect, compare, synthesize, and cite local or public information while separating evidence from inference.
- `communication-and-approval-v1`: Draft audience-appropriate communication and request approval without publishing automatically.
- `creative-practice-v1`: Support iterative writing, music, visual, design, and conceptual work while preserving authorship and versions.
- `evidence-gated-self-improvement-v1`: Discover useful components and propose bounded improvements without self-installation, live self-modification, or silent promotion.
- `warper-keeper-connector-v1`: Add assignment-bound portable work context, artifacts, approvals, and proof verification as an optional connector.

## DreamLoops

- `bootstrap-agent-state-v1`: process start or operator request
- `persistent-agent-heartbeat-v1`: scheduled health pulse
- `ground-before-acting-v1`: before a consequential response or task
- `morning-plan-v1`: start of operator day
- `inbox-triage-v1`: new messages or scheduled inbox review
- `relationship-memory-sync-v1`: after a meaningful interaction
- `project-continuity-resume-v1`: project resumed after interruption or restart
- `task-capture-and-plan-v1`: new commitment, request, or idea
- `research-and-citation-v1`: question requiring external or local evidence
- `creative-work-session-v1`: creative brief or scheduled practice
- `communication-draft-and-approval-v1`: communication needed
- `memory-consolidation-and-forgetting-v1`: nightly or storage-pressure review
- `budget-and-model-review-v1`: daily or threshold-based usage review
- `component-radar-v1`: scheduled ecosystem review or observed limitation
- `evidence-gated-self-improvement-v1`: approved local improvement proposal
- `recovery-and-rollback-v1`: failed heartbeat, corrupt state, or operator request
- `evening-review-v1`: end of operator day
- `warper-keeper-work-cycle-v1`: assignment-bound key and explicit work assignment available
