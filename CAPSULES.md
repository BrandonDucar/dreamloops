# Capsules

Capsules are the portable capability layer of DreamLoops.

A Capsule is a **versioned, inheritable, governed package of agent capability**. It can carry knowledge, identity or persona overlays, traits, memory references, policies, permissions, resources, evaluation criteria, rollback guidance, lineage, and one or more DreamLoops.

> **DreamLoops govern behavior. Capsules carry capability. Receipts prove execution.**

## Why Capsules exist

Agent intelligence is usually scattered across prompts, skills, workflow code, memory databases, tool permissions, policy files, deployment configuration, and logs.

Without a shared packaging layer, builders must transfer capability by copying those pieces manually or cloning an entire agent.

Capsules provide one inspectable unit that can be:

- validated and hashed
- versioned and compared
- installed into an existing agent
- evaluated before activation
- activated, disabled, deprecated, or rolled back
- traced to its parents and origin
- adopted with receipt-backed evidence
- improved through governed descendants
- quarantined when a branch becomes unsafe

## Capsule structure

The canonical specification supports packages such as:

```text
capsule-[name]-v[version]/
├── capsule.md
├── README.md
├── dreamloops/
├── memory/
├── traits.yml
├── resources/
└── manifest.json
```

A Capsule may declare:

- capability description
- intended agent or workforce type
- required context
- DreamLoop contracts
- allowed and blocked surfaces
- permission requirements
- proof and receipt requirements
- evaluation and mastery criteria
- provenance and content hashes
- lineage and parent Capsules
- rollback and retirement behavior

## Capability is not authority

Capsules remain inert until an authorized runtime loads them.

A Capsule must not grant itself:

- private keys or secrets
- wallet or signer authority
- unrestricted tool access
- uncontrolled public posting
- production deployment access
- hidden privilege escalation

Knowing how to perform an action does not authorize the action.

## Capsules versus adjacent concepts

| Concept | Primary role |
| --- | --- |
| Prompt | Requests or describes behavior |
| Tool | Allows an agent to interact with an external system |
| Skill | Teaches a repeatable procedure |
| Protocol | Lets systems communicate |
| Container image | Packages software and runtime dependencies |
| **Capsule** | Packages governed, portable, testable, lineage-aware agent capability |

Capsules can include or reference prompts, skills, tools, policies, resources, and DreamLoops, but they are not interchangeable with any one of them.

## Inheritance and lineage

Plugins are installed. Capsules are designed to be inherited, expressed, tested, mutated, promoted, retired, and sometimes quarantined.

Capsule lineage answers:

- Where did this capability originate?
- Which agent or team produced the first evidence?
- Which DreamLoop generated it?
- Which Capsule packaged it?
- Which agents adopted it?
- Which mutations improved or damaged it?
- Which descendants inherited it?
- Which version is the stable ancestor?

## Canonical resources

- [Capsule specification](specs/CAPSULE_SPEC.md)
- [DreamLoop specification](specs/DREAMLOOP_SPEC.md)
- [Capsule schema](schemas/capsule.schema.json)
- [Stable Capsule starter kit](starter-kits/persistent-agent/capsules/)
- [DreamNet Capsule library](library/capsules/)
- [Hybrid Capsules architecture brief](docs/origins/hybrid-capsules.md)
- [DreamLoops and Capsules origin paper](docs/origins/dreamloops-and-capsules-origin-paper.md)

## Public origin record

DreamNet architecture notes publicly documented the Capsule model in June and July 2026. Version `0.1.0` of this repository published the Capsule and DreamLoop specifications, schemas, runtime, composition rules, hashing, bounded execution, receipts, examples, and ZOL integration material on July 14, 2026.

The combined architecture is summarized as:

> **A Capsule carries developed intelligence. A DreamLoop makes that intelligence operate inside boundaries. A receipt proves what happened.**
