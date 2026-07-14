# 🌀 DreamNet DreamLoops System (Mission DNA)

Welcome to the **DreamLoops** control plane. A prompt is a one-off instruction. A **DreamLoop** (`.dreamloop.md` or `.mdloop`) is repeatable, version-controlled mission DNA for agents, humans, and guilds. It combines triggers, context inputs, safety checks, execution steps, and automatic receipt logging into a single auditable format.

---

## 🚀 How to Feed DreamLoops to Grok
If you are interacting with Grok via the hosted web application (xAI), it does not have direct access to your local workspace files. 

To give Grok access to a specific DreamLoop:
1. **Copy the contents** of any `.dreamloop.md` file from `docs/dreamloops/` or `docs/dreamloops/templates/`.
2. **Paste it directly into the chat** or save it in your Grok **Custom Instructions / Personalizations**.
3. Instruct Grok: *"Run the following DreamLoop, compile the steps, and generate the execution receipt."*

---

## 🛠️ The DreamLoop Runner CLI
You can execute and record any DreamLoop run locally using our execution script:

```bash
node scripts/run-dreamloop.mjs --dreamloop <path-to-loop> [options]
```

### Options:
*   `--dreamloop <path>`: (Required) Path to the `.dreamloop.md` file.
*   `--permission <tier>`: Enforce permission boundary (`read_only` | `local_execute` | `live_guarded`).
*   `--objective "<text>"`: Override the default run objective.
*   `--file-read <path>` / `--file-written <path>`: Track file activity.
*   `--command "<command>"`: Record a terminal command executed during the run.

### Example Run:
```bash
node scripts/run-dreamloop.mjs --dreamloop docs/dreamloops/templates/developer-code-refactor.dreamloop.md --file-read src/index.ts --command "pnpm build"
```
This automatically produces a signed **Agent Knowledge State** and **Execution Trace** under `artifacts/ops/agent-state/<mission-slug>/`.

---

## 📚 Active DreamLoop Directory

Here is the list of version-controlled loops in the repository. Click the links to open their configurations:

| Loop Name | Path | Permission Tier | Purpose |
| :--- | :--- | :--- | :--- |
| **Neyclaw Social Steward** | [neyclaw-autonomous-social.dreamloop.md](../../library/dreamnet/templates/neyclaw-autonomous-social.dreamloop.md) | `local_execute` | Bounded Farcaster social autonomy with Social Quorum votes. |
| **ClawdChat HA Lane** | [clawdchat-high-availability-lane.dreamloop.md](../../library/dreamnet/clawdchat-high-availability-lane.dreamloop.md) | `read_only` | Keep ClawdChat channels synchronized with local logs. |
| **KubeClaw ClawCapsule Scheduler** | [kubeclaw-clawcapsule-scheduler.dreamloop.md](../../library/dreamnet/kubeclaw-clawcapsule-scheduler.dreamloop.md) | `local_draft_write` | Convert ClawCapsules into credential-gated schedule proposals with receipts. |
| **Goose Recipe Executor** | [goose-recipe-executor.dreamloop.md](../../library/dreamnet/templates/goose-recipe-executor.dreamloop.md) | `local_execute` | Bounded Goose task runner for Tool Gym validation. |
| **Jules Tracked Work** | [jules-tracked-work-packet.dreamloop.md](../../library/dreamnet/templates/jules-tracked-work-packet.dreamloop.md) | `read_only` | Converts decisions into ticket-ready JIRA/Linear work packets. |
| **UI Design Loop** | [developer-ui-design.dreamloop.md](../../library/dreamnet/templates/developer-ui-design.dreamloop.md) | `local_execute` | Build visually premium responsive layouts with Vanilla HSL CSS. |
| **Code Refactor Loop** | [developer-code-refactor.dreamloop.md](../../library/dreamnet/templates/developer-code-refactor.dreamloop.md) | `local_execute` | Enforce code simplification, flattening, and formatting rules. |
| **Test Generation Loop** | [developer-test-generation.dreamloop.md](../../library/dreamnet/templates/developer-test-generation.dreamloop.md) | `local_execute` | Generate Vitest unit test suites targeting 100% boundary coverage. |
| **Docker Deploy Loop** | [developer-docker-deploy.dreamloop.md](../../library/dreamnet/templates/developer-docker-deploy.dreamloop.md) | `local_execute` | Compile, package, and launch isolated Docker containers. |

---

## 📝 Canonical DreamLoop Template
To create a new DreamLoop, create a file named `<loop-name>.dreamloop.md` with the following structure:

```markdown
# loop_id: my-new-loop
# title: My New Loop Title
# version: 1.0.0
# permission_tier: local_execute

## Trigger
- Describe when this loop should run (e.g., "On file change in packages/")

## Context Sources
- docs/okf/my-knowledge-source.md
- src/my-types.ts

## Allowed Actions
- Read files in the workspace
- Run test commands

## Blocked Actions
- Push commits to main branch
- Call external payment APIs

## Checks
1. Code compiles cleanly
2. All unit tests pass
```
