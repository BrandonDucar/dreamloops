# ZOL Persistent-Agent Upgrade Prompt

Give the following prompt to the coding agent that has access to `bettercallzaal/zol`.

```text
You are the senior engineer upgrading ZOL in bettercallzaal/zol into a durable general-purpose persistent agent while preserving its existing identity, music-curator mission, Raspberry Pi runtime, local Farcaster signing, Telegram approval flow, zero-spend boundary, and current working integrations.

Use only public sources. Install or vendor the tagged DreamLoops v0.1.0 release from:
https://github.com/BrandonDucar/dreamloops

Do not assume access to DreamNet, Groks-Dream-Repo, private documentation, private package registries, or private infrastructure.

Definitions:

1. A Capsule is a versioned, hash-addressed, declarative bundle of identity, preferences, capabilities, permissions, blocked actions, resource ceilings, provenance, activation policy, and rollback information. A Capsule is inert data and never grants arbitrary code execution.

2. A DreamLoop is a versioned, bounded state machine with a trigger, context sources, typed steps, explicit permissions, checks, evidence, receipts, memory routing, failure behavior, and resource ceilings. Markdown is explanatory. The JSON manifest is authoritative. Never evaluate Markdown or manifest text as code.

Complete this work in a feature branch and open a draft pull request. Do not merge, deploy to the Raspberry Pi, restart daemons, change cron or tmux, rotate credentials, publish casts, send messages, follow users, spend funds, install unrelated components, or mutate live services.

Phase 0: Audit before editing

- Read README.md, persona.md, package.json, .env.example, docs/, src/, scripts/, tests, open pull requests, and deployment notes.
- Map every cron job, daemon, state file, draft directory, Telegram gate, Farcaster read/write path, model call, timeout, budget, and recovery behavior.
- Preserve ZOL's verified identity and voice rules. Do not invent facts or silently change the posting policy.
- Write docs/persistent-agent-audit.md with current behavior, gaps, risks, and an implementation map.

Phase 1: Install the public DreamLoops foundation

- Vendor or install @dreamloops/runtime and the persistent-agent starter kit from the immutable v0.1.0 tag.
- Run the upstream tests before integration.
- Preserve upstream LICENSE and provenance.
- Add package scripts for validation, dry-run, tests, and secret scanning.
- Store ZOL-specific behavior in an overlay Capsule rather than editing the generic base Capsule.

Phase 2: Compose ZOL's operating profile

Compose these public Capsules:

- persistent-agent-base-v1
- daily-life-v1
- knowledge-and-research-v1
- communication-and-approval-v1
- creative-practice-v1
- evidence-gated-self-improvement-v1
- optional warper-keeper-connector-v1

Create a ZOL overlay that records references, never secret values:

- agent id: zolbot
- Farcaster identity: @zolbot, FID 3338501
- controller: Zaal
- mission: music discovery, artist advocacy, ZAO context, project support, ordinary daily assistance
- voice: preserve persona.md exactly
- runtime: Raspberry Pi and existing Node version
- approvals: preserve Telegram and existing public-action gates
- wallet: identity-only, no spend capability
- model policy: bounded OpenRouter use with explicit timeouts, daily limits, and no runaway retries

Seal every Capsule after changes and verify its content hash.

Phase 3: Durable local state and memory

Implement a state adapter behind the DreamLoops state-store interface. Prefer SQLite in WAL mode when the Pi environment supports it cleanly; otherwise use the provided atomic file state store without pretending it is SQLite.

Persist separately:

- identity and operator preferences
- open tasks, reminders, deadlines, and priorities
- project checkpoints and next actions
- relationship summaries and interaction timestamps
- approved facts and source references
- drafts and approval status
- model usage and budget totals
- health history and failure receipts
- component proposals and experiment outcomes

Never persist raw secrets, private keys, full hidden reasoning, unrestricted private conversations, or credentials. Add retention, deduplication, provenance, sensitivity, and deletion policies. Back up state before migrations and provide a restore test.

Phase 4: Register broad daily-life DreamLoops

Integrate the complete public starter catalog:

- bootstrap-agent-state
- persistent-agent-heartbeat
- ground-before-acting
- morning-plan
- inbox-triage
- relationship-memory-sync
- project-continuity-resume
- task-capture-and-plan
- research-and-citation
- creative-work-session
- communication-draft-and-approval
- memory-consolidation-and-forgetting
- budget-and-model-review
- component-radar
- evidence-gated-self-improvement
- recovery-and-rollback
- evening-review
- optional warper-keeper-work-cycle

Register typed local handlers for ZOL's actual systems. Do not create a generic shell-execution handler. Every handler must validate input, honor AbortSignal timeouts, return structured state, and produce bounded evidence.

Phase 5: Ordinary daily operation

Make ZOL useful beyond Warper Keeper:

- resume interrupted work after restart
- maintain a morning plan and evening review
- capture commitments from authorized conversations
- remember relationship context without impersonating familiarity
- maintain project status, blockers, and next actions
- research public sources and cite them
- help draft writing, music, campaign, technical, and organizational artifacts
- prepare communications for approval
- monitor its own health and model budget
- consolidate useful memory and forget stale or low-value material
- recover from corrupt or incomplete state using verified checkpoints

Warper Keeper is optional. ZOL must remain fully functional when WARPER_KEEPER_MODE=disabled.

Phase 6: Evidence-gated self-improvement

Implement the state machine:

observed -> proposed -> approved_for_sandbox -> tested -> reviewed -> approved_for_canary -> canary -> accepted | rejected | rolled_back

The component radar may read public release notes and propose improvements. It may not install packages, change live code, change prompts, alter permissions, deploy, or promote itself. Every proposal must include problem, evidence, alternatives, compatibility, security, cost, test plan, rollback, and expected benefit.

Phase 7: Optional Warper Keeper adapter

- Use @dreamloops/warper-keeper.
- Default mode is disabled.
- Support disabled, mock, and remote modes without fallback between them.
- Discover capabilities before assignment work.
- Keep assignment keys secret and assignment-bound.
- Use request, correlation, and idempotency IDs.
- Support get assignment, open Trapper, append bounded context, submit artifact references, request approval, close or release, and verify proof.
- Do not upload ZOL's private memory, secrets, signer material, or hidden reasoning.

Phase 8: Tests and delivery

Add automated tests for:

- every Capsule and DreamLoop manifest
- Capsule hash verification and composition
- blocked permission precedence
- unknown handler rejection
- state persistence across restart
- migration and restore
- timeout and retry ceilings
- failed-run receipts
- memory retention and deletion
- relationship and project continuity
- model budget enforcement
- no secret leakage
- no public action in dry-run
- Warper Keeper disabled and mock modes
- existing ZOL behavior and persona preservation

Run the full test suite, syntax checks, manifest validation, and secret scan. Include a migration plan, rollback plan, changed-file inventory, test evidence, and remaining operator steps in the draft pull request.

Stop after opening the draft pull request. Wait for Zaal to approve deployment and every live behavior change.
```
