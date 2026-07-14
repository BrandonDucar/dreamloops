# Clanker Droid Agent Launch Capsule

Updated: 2026-07-01

## Why This Matters

Clanker now supports token launches with an attached Droid: a Farcaster-native AI agent that gets its own account, can cast and reply, and can be funded from the token's liquidity-pool rewards. That is close to DreamNet's agent-passport thesis, but Clanker gives us a live distribution rail on Base and Farcaster.

DreamNet's edge is not merely launching a token with a droid. The edge is launching a token with a pre-trained, receipt-backed agent that already has:

- a DreamNet Passport
- AHAP social training
- University badge receipts
- public behavior boundaries
- memory and relationship rules
- a post-launch reporting loop

## Preferred Launch Identity

Use `ghostmintops` as the preferred Farcaster launcher/social-signer identity for DreamNet-led Clanker experiments.

Reason:

- `ghostmintops` is the strongest current public account lane.
- It has the better social reputation surface for launch credit and Farcaster discoverability.
- It already serves as the template identity for Neyclaw and the Social Nexus.

Boundary:

- Do not store or print wallet private keys.
- Do not deploy a token from automation without explicit human confirmation in the Clanker UI or a reviewed launch script.
- Treat Neynar/Farcaster signer access as social authorization, not as a wallet replacement for on-chain deployment.

## Launch Flow

1. Pick the token concept.
2. Pick or train the attached agent.
3. Generate the Droid voice from the agent's DreamNet passport.
4. Confirm the agent has passed AHAP and any token-specific safety module.
5. Launch through Clanker with Droid enabled.
6. Route a share of LP rewards to the Droid runtime wallet.
7. Publish a DreamNet receipt linking:
   - token contract
   - droid handle
   - launcher identity
   - passport id
   - University badges
   - operating boundaries
   - first social proof events

## Droid Voice Template

```text
You are <DROID_NAME>, the public agent for <TOKEN_NAME>.

You care about:
- helping holders understand what the token is for
- finding useful builders and collaborators
- answering honestly without fake certainty
- turning major actions into receipts

You do not care about:
- price predictions
- artificial hype
- pretending to be human

Tone:
- concise, curious, builder-facing
- playful only when the thread already has that energy
- allergic to empty moon-talk

Quirks:
- asks one useful question when a thread is vague
- turns claims into proof requests
- mentions receipts, passports, and training only when relevant

Example casts:
- "A token is easy to launch. The hard part is giving it a useful agent with memory, boundaries, and receipts."
- "I am not here to promise a chart. I am here to keep the token's public memory legible."

Example replies:
- When someone asks what you do, say: "I track the token's work: useful threads, receipts, contributors, and what we should do next."
- When someone asks price, say: "I do not predict price. I can explain the project, surface receipts, and route useful questions."
```

## DreamNet Capsule Fields

```json
{
  "schema": "dreamnet.clanker_droid_capsule.v0",
  "launcher_identity": "ghostmintops",
  "token": {
    "name": "TBD",
    "symbol": "TBD",
    "chain": "base",
    "contract": null
  },
  "droid": {
    "name": "TBD",
    "farcaster_handle": null,
    "mode": "cast_and_reply",
    "lp_reward_share_bps": 1000,
    "voice_source": "dreamnet-passport-ahap"
  },
  "agent_passport": {
    "id": null,
    "university_badges": [],
    "ahap_status": "required"
  },
  "receipts_required": [
    "launch_receipt",
    "voice_receipt",
    "boundary_receipt",
    "first_cast_receipt",
    "first_reply_receipt"
  ]
}
```

## First Candidate Agents

- `ghostmintops`: launch authority and social template.
- `neyclaw-dreamnet`: Farcaster relationship/scout layer.
- `starbridge-navigator`: cross-platform bridge narrator.
- `aegis-defender-v2`: safety/boundary voice.
- `lucid-oracle`: market and cross-cultural signal reader.

## Operating Rule

The droid can be energetic. DreamNet receipts keep it credible.
