# Affective Loop Safety Contract

Status: active draft
Owner: DreamNet Trust Authority / Academy / Playground / Lab
Applies to: BookSnaps, Farcaster mini-apps, Resonance Trial, Playground, Lab simulations, agentic sports, adaptive education, and any DreamLoop that senses or adapts to human emotion.

## Purpose

DreamNet can build playful, immersive, emotionally responsive experiences, but it must not become a manipulation engine.

An affective loop is any loop that:

```text
elicits a human response
  -> senses behavior or emotion
  -> detects or infers state
  -> adapts the experience
```

This contract turns that loop into a governable DreamLoop. The system may personalize experiences, but it must preserve consent, dignity, auditability, and human control.

## The Four Phases

| Phase | Risk | DreamNet Rule |
| --- | --- | --- |
| Elicitation | Designing for FOMO, frustration, compulsion, or vulnerability. | Do not intentionally create emotional pressure to extract money, attention, or compliance. |
| Sensing | Invisible collection of voice, face, keystrokes, gaze, physiology, or behavior. | Disclose sensing clearly and collect the least data needed. Default to local, coarse, non-biometric signals. |
| Detection | Inferring mood, stress, identity, neurotype, risk profile, or spending intent. | Treat inferred state as uncertain. Store evidence and confidence, not hidden psychological labels. |
| Adaptation | Changing content, difficulty, offers, social pressure, or agent behavior based on inferred state. | Adapt for safety, learning, accessibility, and delight; never for exploitative monetization or coercion. |

## Hard Blocks

The following are blocked unless a later human-approved policy explicitly allows a narrow, audited version:

- targeting a user with purchases because they appear frustrated, lonely, impulsive, stressed, or emotionally vulnerable
- using dark patterns, false scarcity, surprise charges, or pressure timers in child-facing or family experiences
- using affect detection to create personalized prices, hidden offers, or gambling-like near-miss loops
- storing biometric or psychological profiles as permanent reputation facts
- classifying neurodivergent, atypical, or culturally different behavior as toxicity or cheating without review
- generating explicit, unsafe, hateful, or age-inappropriate content in child-facing story loops
- forcing users to surrender excessive behavioral privacy to participate in basic experiences

## Allowed Uses

Allowed affective adaptation should be boringly defensible:

- accessibility adjustments
- pacing changes
- calming or difficulty-reducing safety mode
- age-appropriate story branching
- learning support
- opt-in personalization
- anti-abuse moderation with appeal paths
- wellbeing nudges that do not monetize the user

## Receipt Requirements

Any DreamLoop using affective adaptation must emit a receipt with:

```yaml
loop_id:
experience_id:
actor_identity:
human_visible_notice:
consent_mode:
sensed_inputs:
inferred_state:
confidence:
adaptation_taken:
blocked_adaptations:
monetization_disabled:
child_safety_mode:
appeal_or_review_path:
evidence_paths:
timestamp:
```

Do not store raw biometric traces, raw child conversations, private voice recordings, or raw psychological telemetry in default receipts. Store hashes, summaries, and review paths.

## Product Fit

### BookSnaps

Use affective loops only for story pacing, age safety, and positive endings. Tips must remain optional and never be triggered by emotional vulnerability.

### Resonance Trial

Use emotional design to make verification engaging, but the proof card must explain the decision, not manipulate the user into sharing.

### Playground

Allow experimental adaptive play, but require local-only evidence, opt-in sensing, and Lab review before public release.

### Academy and Tool Gym

Teach affective loop safety as a required module before agents can design child-facing, financial, social, or adaptive experiences.

### Lab

Stress-test each affective loop for manipulation, privacy leakage, bias, unsafe generation, and unclear liability.

## Quorum Trigger

Any affective loop must go to Quorum when it touches:

- children
- finance
- health or wellbeing
- biometric sensing
- persistent identity or reputation
- public social posting
- paid offers
- moderation or enforcement

## Core Rule

DreamNet should personalize to help the human, not to harvest the human.

