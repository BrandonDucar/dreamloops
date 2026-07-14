# Synergy Capsule Atlas

Status: draft atlas  
Owner: DreamNet Runtime Council  
Last reviewed: 2026-06-30

## Core Idea

Synergy Capsules are not one product. They are a pattern for packaging useful behavior so it can move through DreamNet safely.

```text
Capability learned
  -> capsule drafted
  -> Aegis scans it
  -> University or ToolGym validates it
  -> KubeClaw checks eligible cells
  -> Shielded Cells adopt it
  -> receipts prove adoption and outcome
  -> Dreamthrax quarantines drift
```

This is where DreamNet gets hybrid.

Every important lane can pair with another lane and produce a capsule family.

## Priority Capsule Families

| Capsule Family | Hybrid | What It Does | First Product Use |
| --- | --- | --- | --- |
| `aegis.dreamsnail.timestamp-trust` | Aegis x DreamSnail | Hardens timestamp/proof claims before receipts become trusted memory. | Proof Drop, Pi Proof Drop, receipt ledger |
| `ahap.relationship-memory` | AHAP x Ghostmintops x Neyclaw | Transfers public graph/taste patterns without copying identity. | Farcaster, ClawdChat, Nostr |
| `sherlock.shield.casefile` | SherlockClaw x Shield Core | Turns incidents into case files, threat patterns, and quarantine rules. | Docker/social/signer failures |
| `dreamthrax.quarantine-repair` | Dreamthrax x Aegis x Shield | Isolates risky agents, repairs prompts/policies, and creates reactivation criteria. | Social agents, tool agents |
| `spike.bloodstream.feed` | Sensory Spikes x Bloodstream | Converts live API feeds into visible data channels and agent memory events. | NASA, crypto, metals, air/boat traffic |
| `fugu.nim.review-router` | Fugu x NVIDIA NIM | Routes bulk drafting to NIM and hard review/dissent to Fugu. | Architecture review, proof review |
| `chroma.proofdrop.interface` | Chroma Lab x Proof Drop | Packages UI color/contrast/tone rules for receipt products. | Proof Drop onboarding, University UI |
| `codequill.release-evidence` | CodeQuill x Release Ledger | Converts CI/build/test evidence into release receipts. | OpenClaw-style artifact gating |
| `university.toolgym.badge` | University x ToolGym | Converts benchmark performance into credentials and routing authority. | Agent staff training |
| `ott.bloodflow.channel` | OTT x Spikes x Bloodstream | Turns ingest feeds into always-on visual channels. | DreamNet data TV / blood flow page |
| `dadfi.settlement-proof` | DadFi x Receipt Ledger | Packages usage, revenue share, and payout proof rules. | Marketplace settlement |
| `passport.ens.graduation` | Agent Passport x ENS | Defines when an agent earns a public identity/name. | Agent society / marketplace |
| `mcp.surface-operator` | MCP x KubeClaw | Teaches an agent how to operate one surface with scoped permissions. | MailClaw, RepoClaw, DockerClaw |
| `nexus.morning-brief` | Social Nexus x Hermes | Packages daily social summary, risks, wins, and next actions. | 7 AM morning brief |

## Aegis x DreamSnail

This should be one of the first serious capsules.

DreamSnail already represents slow, persistent, traceable proof movement. Aegis is the gate. Together they create:

```text
Aegis x DreamSnail = timestamp trust capsule
```

It should check:

- canonical JSON shape
- content hash stability
- server-received timestamp
- client timestamp drift
- monotonic receipt ordering
- replay/idempotency guards
- source identity binding
- storage location
- proof ledger inclusion
- verification route availability

This is useful for:

- Proof Drop
- Pi Proof Drop
- image receipts
- social proof receipts
- agent learning receipts
- University graduation receipts
- release evidence receipts

## Sherlock x Shield

This capsule turns every weird failure into a case file.

Example:

```text
Neyclaw signer fails
  -> Sherlock gathers evidence
  -> Shield labels it signer/preflight drift
  -> Aegis confirms no secret leak
  -> capsule proposes repair pattern
  -> receipt records the fix
```

This makes the swarm smarter after every issue.

## Spike x Bloodstream

Specialized spikes are the sensory organs. Capsules make them installable.

Example:

```text
NASA APOD spike
  -> ingest image metadata
  -> scan/categorize
  -> store bounded summary
  -> surface as a visual channel
  -> emit memory/receipt
```

That turns free APIs into DreamNet data TV.

## Model Router Capsules

DreamNet should treat model-routing decisions as capsules too.

Example:

```text
NIM drafts
Fugu critiques
Aegis gates
Receipt ledger stores
```

This gives the swarm a repeatable reasoning pipeline instead of ad hoc model selection.

## Product Framing

The capsule marketplace becomes more defensible than a prompt marketplace.

Prompts are easy to copy.

Capsules include:

- permissions
- memory policy
- safety rules
- receipts
- adoption evidence
- validation
- rollback
- University credentials
- Shield/Dreamthrax quarantine behavior

That is much harder to reproduce.

## Near-Term Build Order

1. `aegis.dreamsnail.timestamp-trust.v1`
2. `ahap.relationship-memory.v1`
3. `sherlock.shield.casefile.v1`
4. `spike.bloodstream.feed.v1`
5. `fugu.nim.review-router.v1`
6. `codequill.release-evidence.v1`

## Rule Of Thumb

If a useful pattern can be learned, validated, adopted, monitored, and rolled back, it should become a capsule.
