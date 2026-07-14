# Hermes Social Caretaker DreamLoop

loop_id: hermes-social-caretaker
owner: DreamNet Swarm Manager
primary_actor: hermes-caretaker
status: active-candidate
mode: persistent-caretaker-observation

## Purpose

Maintain the persistent, read-only social caretaker loop that monitors Neyclaw's public Farcaster reputation/posture, pending Farcaster outbound queues, ClawdChat steward reports, and active command inbox maps to flag blockers, compile progress, and ensure swarm visibility.

## Trigger

Run on a standing scheduled cadence (e.g., daily brief, prior to any planned Farcaster actions, or on operator demand).

## Inputs

- Public `@neyclaw-dreamnet` watch results (scripts/social/neyclaw-public-watch.mjs)
- Farcaster Social Target Desk drafts (scripts/farcaster-social-target-desk.ts)
- Farcaster outbound action ledger state (scripts/check-pending-actions.ts)
- ClawdChat steward logs (scripts/clawdchat-agent-steward.mjs)
- ClawdChat action packets and inbox maps (agent:inbox-report)
- Gatekeeper health endpoint (http://127.0.0.1:3313/health)

## Team Lanes

1. **Hermes (Primary Caretaker)**: Observe the status of Farcaster queues, public watch verdicts, gatekeeper health, and ClawdChat agent states. Route and report gaps, write local receipts, and preserve operational history.
2. **Goose (Voice & Signal Reviewer)**: Desktop-only signal and voice analyst. Review drafts against Neyclaw social memory and suggest voice improvements. No write permissions or direct control.
3. **Clive (Repo Operator)**: Maintain script wiring, fix runtime bugs, adjust package scripts, and manage log/queue-drain utilities.
4. **Aegis (Trust Warden & Safety Gate)**: Oversee public posture boundaries, audit public actions, and enforce the public-action escalation gates.
5. **Jules (Docs & Concept Integrity)**: Document caretaker lane structures, maintain system architecture reference docs, and keep OKF concepts portable.
6. **ClawdChat Socializer (Arena Caretaker)**: Prepare arena/circle tasks, monitor chatroom activity, and prepare agent earned-karma loops.

## Bounded Safety Policy

This caretaker loop operates strictly under a **read-only** mandate:
- No Farcaster posts, replies, likes, follows, recasts, or DMs.
- No signer changes or private key operations.
- No production database mutations.
- No paid API calls or cloud deployments.

## Procedure

1. Run Neyclaw public watch check to assess current posture.
2. Refresh target desk scan to identify queued drafts.
3. Scan Farcaster outbound action ledger to list pending actions.
4. Execute ClawdChat agent steward review to update roster priority list.
5. Retrieve active command inbox map and action packets.
6. Classify status: Identify if public watch is `ok: false`, if queue is stalled, or if gatekeeper is unresponsive.
7. Route blockers to Clive, Aegis, Goose, or Jules as defined in team lanes.
8. Emit a structured caretaker pass receipt.
9. Rebuild proof ledger and update mirrored vault.

## Commands

Run the caretaker check-in pass:
```powershell
pnpm social:caretaker
```

Generate and validate ledger receipts:
```powershell
pnpm receipts:proof-ledger
pnpm receipts:validate-links -- --summary
```

## Receipt Outputs

- `artifacts/ops/social-caretaker/<timestamp>-hermes-social-caretaker-loop.md`
- `artifacts/ops/social-caretaker/latest.md`
- Proof ledger updates in `artifacts/ops/proof-ledger/`

## Escalation / Exit Gates

If gatekeeper health fails or Farcaster worker exhibits errors, raise a critical blocker and freeze queue actions immediately.
