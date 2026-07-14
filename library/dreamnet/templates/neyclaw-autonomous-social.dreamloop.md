# Neyclaw Autonomous Social DreamLoop

loop_id: neyclaw-autonomous-social
owner: DreamClaw Social Quorum
primary_actor: neyclaw-dreamnet
status: active-candidate
mode: bounded-autonomous-public-social

## Purpose

Let Neyclaw walk, talk, listen, react, follow, and reply on Farcaster without requiring Brandon to approve every individual action, while still producing receipts for scan, quorum, queue, publish, and follow-up decisions.

This loop is not a mass-posting or growth-hacking loop. It is a social presence loop for a verified DreamNet agent identity.

## Trigger

Run when any of these are true:

- Neyclaw has been quiet longer than the configured cadence.
- Farcaster target desk finds high-signal conversations.
- Neyclaw receives a reply or mention.
- A relevant Base, x402, mini app, Neynar, Snapchain, Empire Builder, agent-memory, or receipt/provenance conversation appears.
- Social Quorum pool has expired and needs refill.

## Inputs

- Public Neyclaw profile watcher output.
- Farcaster public feed data.
- Neynar API data when configured.
- DreamNet Snapchain node data when available.
- Social target desk queue.
- Neyclaw social memory.
- Spam/reputation label.
- Existing action ledger status.
- Signer status.
- Social Quorum votes.

## Team

The Social Quorum has 11 members:

1. Neyclaw Voice Keeper
2. Aegis Safety Guard
3. Farcaster Culture Scout
4. Base/x402 Scout
5. Mini App Scout
6. Relationship Mapper
7. ClawdChat Social Memory
8. Spam/Reputation Guard
9. DreamNet Brand Guard
10. Timing/Cadence Guard
11. Human Operator Proxy

The Human Operator Proxy represents Brandon's standing policy, not manual per-action approval.

## Bounded Autonomy Policy

Default per-run caps:

- Replies: 1
- Likes: 3
- Follows: 0 unless explicitly enabled
- Recasts: 0

Promotion caps may be increased only after clean receipts and healthier public reputation.

Live actions require:

- Fresh Social Quorum pool
- No quorum vetoes
- No more than one hard reject
- Guard-approved copy
- Valid target hash or FID
- Neyclaw signer configured
- Farcaster worker available
- No active quiet window

## Red Lines

Never do these:

- mass follow
- mass reply
- mass like
- spam bursts
- paid engagement farming
- fake endorsements
- financial promises
- internal Hawk/report/ranking leaks
- secret, signer, API key, or private ops disclosure
- harassment or dogpiling
- platform policy evasion

## Procedure

1. Refresh Neyclaw public watcher.
2. Refresh Farcaster Social Target Desk.
3. Build a 10-slot Social Quorum pool.
4. Evaluate each target through the 11-agent panel.
5. Select actions inside bounded caps:
   - reply if copy is approved and target context is strong
   - like if target is high-signal and low-risk
   - follow only when explicitly enabled and target identity is valuable
6. Queue selected actions to the Farcaster outbound action ledger.
7. Let `FarcasterActionWorker` execute pending actions when live worker policy allows it.
8. Write receipts for:
   - feed scan
   - target selection
   - Social Quorum vote
   - queued action
   - published action
   - reply/reaction follow-up scan
9. Refresh proof ledger and Obsidian receipt mirror.

## Commands

Dry-run with fresh target scan and receipts:

```powershell
pnpm social:neyclaw-autonomy
```

Queue bounded actions into the Farcaster outbound action ledger:

```powershell
pnpm social:neyclaw-autonomy:queue
```

Run the existing Farcaster worker:

```powershell
pnpm worker:farcaster
```

Refresh proof outputs:

```powershell
pnpm receipts:obsidian
pnpm receipts:event-preview
pnpm receipts:proof-ledger
```

## Receipt Outputs

- `artifacts/ops/farcaster-social-autonomy/<timestamp>-neyclaw-autonomous-social-loop.md`
- `artifacts/ops/farcaster-social-autonomy/<timestamp>-neyclaw-autonomous-social-loop.json`
- `artifacts/ops/farcaster-social-autonomy/latest.md`
- `artifacts/ops/farcaster-social-autonomy/latest.json`
- Farcaster action ledger rows for queued live actions
- Neyclaw social memory dashboard updates
- Obsidian receipt mirrors
- Proof-ledger hash index

## Escalation

Pause autonomy if:

- spam/reputation label worsens
- any action fails due to signer/API errors
- a cast/reply receives negative moderation signal
- repeated or bot-like language appears
- broadcaster health hangs
- Neynar/Snapchain data becomes stale
- daily caps are reached

## Success Criteria

- Neyclaw posts or replies naturally.
- The team can explain why each action was taken.
- Every action has a local receipt.
- Public language sounds human and low-pressure.
- Engagement improves without spam.
- Relationship graph grows through useful interactions, not volume.
