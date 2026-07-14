# DreamNet Evolution Engine: Genealogist, DreamLoops, and Capsules

Date: 2026-07-07

## Core Correction

DreamNet is not primarily an agent platform.

It is a digital evolution engine.

Agents are one lifeform inside it. Capsules are how useful traits move. DreamLoops are mission DNA. The Genealogist records ancestry. Tuatara decides what becomes durable civilization genome.

## The Four-Part Model

```text
DreamLoop
  = Mission DNA

Capsule
  = Transferable living capability organism

Genealogist
  = Lineage, inheritance, and ancestry tracker

Tuatara
  = Long-term evolution governor and preservation layer
```

## DreamLoops Are Mission DNA

DreamLoops are not just docs.

They are compressed operating memory for a repeatable mission.

They define:

- what the agent should know
- what trigger starts the work
- what actions are allowed
- what actions are blocked
- what evidence must be produced
- what receipt proves completion
- what memory routes update afterward
- when the loop should cool down, retry, promote, or retire

This makes DreamLoops the stable genome for work.

```text
OKF knowledge
→ agent knowledge state
→ trigger
→ selected DreamLoop
→ scoped action
→ execution trace
→ validation
→ evidence
→ receipt
→ memory routing
```

## Do DreamLoops Save Credits?

Yes, when used correctly.

They save credits because an agent can load a compact mission directive instead of rediscovering:

- repo layout
- operating rules
- allowed actions
- blocked actions
- prior decisions
- required receipts
- known failure modes
- next routing step

But they are not free magic. Reading every DreamLoop every run would waste context and credits. The efficient pattern is:

```text
Select the relevant DreamLoop
→ load only that loop and its direct references
→ execute within scope
→ write receipt / memory update
```

Best use:

- one DreamLoop per recurring mission
- short, explicit, evidence-backed
- linked to receipts and capsule outputs
- reviewed periodically by Tuatara

## Capsules Are Living Capability Organisms

Capsules are not merely containers and not merely config.

A capsule is a portable, signed, receipt-backed capability organism that can move between Shielded Cells.

It may carry:

- prompt patches
- social playbooks
- AHAP relationship patterns
- ToolGym skills
- University lessons
- safety rules
- model-router preferences
- workflow recipes
- UI/UX patterns
- memory update proposals
- certification criteria

It must not carry:

- secrets
- raw private user data
- malware
- destructive commands
- signer authority
- wallet authority
- public posting authority by itself
- cloud mutation authority

The capsule is how evolution spreads safely.

```text
One cell learns a useful trait
→ receipt proves the learning
→ capsule packages the trait
→ Aegis scans it
→ University grades it
→ KubeClaw selects eligible cells
→ Shielded Cells adopt it
→ Genealogist records lineage
→ Tuatara evaluates permanence
```

## Genealogist Role

The Genealogist tracks ancestry across DreamNet.

It answers:

- Where did this capability come from?
- Which agent or species first discovered it?
- Which DreamLoop produced the original evidence?
- Which capsule carried it?
- Which cells adopted it?
- Which mutations improved it?
- Which descendants inherited it?
- Which branch became harmful and should be quarantined?
- Which version is the stable ancestor?

The Genealogist turns emergence into an inspectable family tree.

## Capsule Lineage

Capsules need ancestry, not just version numbers.

Example:

```text
ahap.relationship-memory.v1
  parent: ghostmintops-public-graph-learning
  adopted_by: neyclaw-dreamnet
  descendants:
    ahap.creator-response-timing.v1
    ahap.no-action-discipline.v1
    ahap-farcaster-warm-start.v1
```

This is where DreamNet differs from a normal plugin marketplace.

Plugins are installed.

Capsules are inherited, expressed, tested, mutated, and sometimes quarantined.

## DreamObject Genome

Every reusable thing in DreamNet can become a DreamObject.

```text
DreamObject
├── identity
├── species
├── purpose
├── genome
├── current expression
├── DreamLoop refs
├── capsule refs
├── lineage
├── receipts
├── fitness
├── risk state
├── owner
├── offspring
└── marketplace expression
```

DreamObjects can be:

- agents
- skills
- workflows
- prompts
- MCP servers
- APIs
- mini apps
- courses
- campaigns
- capsules
- social behaviors
- proof systems

## Tuatara's Job In This Stack

Tuatara does not replace capsules or DreamLoops.

It governs their evolution.

Tuatara asks:

- Is this DreamLoop still safe?
- Is this capsule beneficial across more than one cell?
- Does this trait deserve to become a gene?
- Has adoption improved fitness?
- Is this lineage drifting?
- Should this branch be archived, restored, forked, or quarantined?
- Can this internal capability become an external product?

## Internal To External Productization

Internal capabilities should mirror into external products only after evidence.

```text
Internal behavior
→ DreamLoop proves repeatability
→ Capsule packages capability
→ Genealogist tracks lineage
→ Tuatara validates fitness
→ Forge creates external expression
```

Examples:

| Internal Capability | Capsule | External Expression |
| --- | --- | --- |
| Proof Drop receipt pattern | receipt.verification.v1 | Receipt API / mini app |
| AHAP social safety | ahap.relationship-memory.v1 | Social Safety MCP |
| Agentic IDE course | course.beginner-ide.v1 | Public course / certification |
| Sherlock search board | research.shadow-search.v1 | Provenance Lab |
| Deployment truth checks | ops.deployment-truth.v1 | Infra Audit Skill |

## Credit-Saving Operating Pattern

DreamLoops reduce repeated discovery cost.

Capsules reduce repeated training cost.

Genealogist reduces repeated provenance analysis.

Tuatara reduces repeated architecture debates.

Together:

```text
DreamLoop tells the agent what mission to run.
Capsule tells the agent what capability it can inherit.
Genealogist tells the agent where the capability came from.
Tuatara tells the agent whether it is stable enough to preserve or spread.
```

## Practical Rule For Agents

Do not load the whole DreamNet archive.

Load:

1. the active DreamLoop
2. directly referenced capsules
3. latest relevant receipts
4. current knowledge state
5. only the schema needed to validate output

This is the correct credit-saving pattern.

## Immediate Next Build Steps

1. Add `dreamloop_refs` to living skill and DreamObject schemas.
2. Add `capsule_lineage` to Synergy Capsule v2 planning.
3. Create a Genealogist receipt format.
4. Convert the IDE Course 1 template into `course.beginner-ide.v1` capsule.
5. Convert Tuatara Course 1 into `course.tuatara-preservation.v1` capsule.
6. Create a DreamLoop for capsule promotion:

```text
learning event
→ capsule proposal
→ safety scan
→ pilot adoption
→ receipt review
→ genealogy update
→ Tuatara preservation decision
```

## Boundary

DreamLoops, Capsules, Genealogist, and Tuatara can recommend, package, and preserve. They do not grant live authority by themselves.

Live posting, wallet actions, signer use, deployment mutation, database mutation, and public launch remain controlled by explicit permission tiers and receipt-backed approval.
