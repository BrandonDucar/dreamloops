# DreamLoops M.D.

DreamLoops M.D. is DreamNet's reusable mission-DNA system for agents, humans, guilds, labs, and businesses. A prompt is a one-time instruction. A DreamLoops M.D. file is a repeatable work pattern with triggers, inputs, checks, evidence, receipts, and memory routing.

Use `.mdloop` for canonical mission-DNA files and `.dreamloop.md` when a repo needs a Markdown-native extension that renders cleanly in GitHub.

## Why This Exists

DreamNet should not depend on disposable prompting. Agents need durable loops they can inherit, run, improve, audit, teach, and hand off.

```text
Prompt = message
Runbook = instructions
DreamLoops M.D. = mission DNA
Receipt = proof the loop ran
```

The current operating chain is:

```text
Spark
  -> evidence artifact
  -> Flash Guide
  -> Flash Guild review
  -> Academy, public packet, or receipt
```

DreamLoops make that chain explicit.

## Current Loop Family

| Name | Purpose | Status |
| --- | --- | --- |
| DreamLoops M.D. Protocol | Canonical contract for loop files | active draft |
| Spark Agent M.D. Loop | Ephemeral agent mission loop | template |
| Head Agent Roll Call M.D. Loop | Real-agent availability and role check | template |
| Proof of Resonance M.D. Loop | Website/product redesign quorum loop | template |
| Repo Auditor Loop | Existing repo cleanliness loop | active local |
| Affective Loop Safety Contract | Ethics and safety guard for emotionally adaptive experiences | active draft |
| Affective Experience Safety DreamLoop | Review template for adaptive games, stories, mini-apps, and learning loops | template |
| Goose Integration Contract | Places Goose as a portable recipe executor for DreamLoops M.D. | active draft |
| Goose Recipe Executor DreamLoop | Tool Gym P.O.C. template for bounded Goose recipe runs | template |
| Jules Integration Contract | Places Jules as the tracked-work and acceptance-criteria specialist | active draft |
| Jules Tracked Work Packet DreamLoop | Template for converting decisions into ticket-ready local work packets | template |
| Neyclaw Autonomous Social DreamLoop | Bounded Farcaster social autonomy with Social Quorum votes and receipts | active candidate |
| Cloudflare Read-Only Verification DreamLoop | Bounded Cloudflare status, docs MCP, Wrangler read checks, and Worker Bridge evidence loop | active candidate |
| Developer Code Refactor | Reduce nested complexity and simplify conditionals | template |
| Developer Test Generation | Generate unit tests targeting 100% boundary coverage | template |
| Developer UI Design | Build visually premium responsive layouts with Vanilla HSL CSS | template |
| Developer Docker Deploy | Compile, package, and launch isolated Docker containers | template |

Existing loop-like runbooks:

- `docs/runbooks/repo-auditor-loop.md`
- `docs/runbooks/github-actions-load-balancer.md`
- `docs/runbooks/codequill-immunity-primitive-bridge.md`

## Naming Standard

- Protocol docs: `docs/dreamloops/*.md`
- Templates: `docs/dreamloops/templates/*.dreamloop.md`
- Active runbooks: `docs/runbooks/<mission>.dreamloop.md`
- Evidence receipts: `artifacts/ops/<lane>/<mission>.dreamloop.receipt.md`

Recommended DreamClaw-native paths:

- Library: `docs/mdloops/`
- Canonical loop files: `docs/mdloops/<mission>.mdloop`
- Course docs: `docs/proposals/mdloop-academy-course.md`
- Evidence: `docs/obsidian/staging/<mission>-spark-evidence.md`

## Academy Fit

DreamLoops M.D. should become a core Academy course.

Every verified agent should prove it can:

1. Read a DreamLoop.
2. Execute it inside its permission tier.
3. Emit evidence.
4. Record a receipt.
5. Propose an improvement without widening its own permissions.

Graduation should require at least one completed DreamLoop with reviewable evidence.
