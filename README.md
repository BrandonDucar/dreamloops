# DreamLoops

## Governed operating loops and portable capability Capsules for persistent AI agents

DreamLoops is an open specification, runtime, and starter ecosystem for transferring agent capability without surrendering identity, human authority, provenance, or rollback.

The architecture has four connected primitives:

| Primitive | Purpose |
| --- | --- |
| **DreamLoops** | Versioned, bounded operating contracts for repeatable agent work |
| **Capsules** | Portable, versioned, inheritable packages of governed capability |
| **Receipts** | Hashable evidence connecting claimed work to an execution, actor, checks, approvals, and result |
| **Lineage** | Provenance for capability ancestry, adoption, mutation, descendants, rollback, and quarantine |

> **DreamLoops govern behavior. Capsules carry capability. Receipts prove execution.**

DreamLoops define when work starts, what context may be loaded, which typed handlers may run, what is forbidden, what approvals are required, and which evidence and receipts must be produced. Capsules carry identity or persona overlays, capabilities, knowledge, policies, memory references, resource ceilings, evaluation criteria, lineage, and rollback information.

The project is useful without DreamNet or Warper Keeper. It contains a dependency-free runtime, a CLI, a complete persistent-agent starter kit, a broad human-readable DreamLoop library, optional adapters, and experimental work promoted from Grok Labs.

## Start here

- [What Capsules are](CAPSULES.md)
- [DreamLoop specification](specs/DREAMLOOP_SPEC.md)
- [Capsule specification](specs/CAPSULE_SPEC.md)
- [DreamLoops and Capsules origin paper](docs/origins/dreamloops-and-capsules-origin-paper.md)
- [Complete generated catalog](CATALOG.md)
- [ZOL integration example](examples/zol/)

## Install

```bash
git clone https://github.com/BrandonDucar/dreamloops.git
cd dreamloops
npm install
npm run verify
```

Initialize a starter agent:

```bash
npx dreamloops init ./my-agent
npx dreamloops validate-all
npx dreamloops list
```

## Core model

```text
Base Capsule
  + identity or persona overlay
  + domain overlay
  + optional connector overlay
  -> bounded DreamLoop runtime
  -> durable local state
  -> evidence and receipts
  -> lineage and governed improvement
```

A Capsule is inert data. A DreamLoop manifest is inert data. Neither may execute Markdown, evaluate manifest text, install software, reveal secrets, publish content, spend funds, or mutate production merely because it was loaded. Application code must register each typed handler and grant each permission explicitly.

## Why Capsules

Agent intelligence is usually scattered across prompts, skills, workflow code, memory databases, tool permissions, policies, deployment configuration, and logs.

Without Capsules, builders transfer capability by copying those pieces manually, cloning an entire agent, retraining a model, or rebuilding the system in a new environment.

Capsules make developed capability one governed unit that can be:

- validated and hashed
- versioned and compared
- installed into an existing agent without replacing its identity
- evaluated before activation
- activated, disabled, retired, or rolled back
- linked to parents, descendants, and adoption receipts
- improved through governed mutation
- quarantined when unsafe

See [CAPSULES.md](CAPSULES.md) for the full overview.

## Public origin record

DreamNet publicly documented the combined DreamLoops and Capsules architecture through dated design notes, specifications, schemas, examples, and runtime code.

Version `0.1.0`, published July 14, 2026, included Capsule and DreamLoop specifications, canonical hashing, Capsule composition, durable state, bounded execution, receipts, seven generalized persistent-agent Capsules, eighteen stable DreamLoops, and the public ZOL integration profile.

The [origin paper](docs/origins/dreamloops-and-capsules-origin-paper.md) records the architecture and chronology. It states the supported authorship claim precisely:

> By July 14, 2026, DreamNet had publicly specified and implemented DreamLoops and Capsules as a unified system for portable, bounded, inheritable, receipt-backed agent intelligence.

## Repository map

| Path | Purpose |
| --- | --- |
| `specs/` | Canonical human-readable Capsule and DreamLoop contracts |
| `schemas/` | Machine-readable core and extension schemas |
| `packages/runtime/` | Validation, hashing, composition, state, and bounded execution |
| `packages/cli/` | Initialize, validate, seal, list, and dry-run commands |
| `packages/warper-keeper/` | Optional assignment-bound Warper Keeper client |
| `starter-kits/persistent-agent/` | General daily-life persistent-agent stack |
| `library/dreamnet/` | Complete existing DreamNet DreamLoop library |
| `library/capsules/` | Existing reusable Capsule examples |
| `labs/grok/` | Experimental Capsules, Loops, Fish Swarm, Genealogist, DNA, and Persistent Dream work |
| `examples/zol/` | ZOL profile overlay and integration guide |
| `docs/origins/` | Public design history, architecture papers, and origin record |

See [CATALOG.md](CATALOG.md) for the complete generated inventory.

## Persistent Agent Starter

The starter kit covers:

- bootstrap and restart recovery
- heartbeat and runtime health
- daily planning, inbox triage, and task capture
- context grounding before action
- relationship and project continuity
- research with citations
- creative work sessions
- communication drafts and approval requests
- memory consolidation, expiration, and forgetting
- budget and model-use review
- component discovery and proposal-only self-improvement
- checkpoints, rollback, and failure receipts
- an optional Warper Keeper work cycle

## Stable, Library, and Labs

- **Stable** code and manifests pass automated validation and tests.
- **Library** content preserves useful human-readable DreamNet loops and templates.
- **Labs** content is experimental and does not imply production readiness or factual endorsement.

Grok Labs is a public innovation lane. Work may graduate from `labs/grok/` into the stable specification only through review, tests, provenance, and a release.

## Public Adoption

DreamLoops is already being exercised outside the DreamNet monorepo.

[ZOL](https://github.com/bettercallzaal/zol), an independently operated Farcaster agent, has publicly merged:

- a [persistent-agent DreamLoops graft with green tests](https://github.com/bettercallzaal/zol/pull/19),
- a [Bonfire memory adapter for DreamLoops state](https://github.com/bettercallzaal/zol/pull/16),
- a [weekly curator loop](https://github.com/bettercallzaal/zol/pull/21),
- an [artist spotlight loop](https://github.com/bettercallzaal/zol/pull/22), and
- [dry-run registration for those recurring loops](https://github.com/bettercallzaal/zol/pull/23).

ZOL remains a separate project under its own operator and review process. These links are public implementation evidence, not a claim that DreamNet controls the project.

## Security

- Unknown handlers fail closed.
- Blocked permissions override allowed permissions.
- The runtime enforces wall-time, step, and retry ceilings.
- Durable receipts omit full working state.
- Connector packages default to disabled mode.
- Public, wallet, signer, purchase, deployment, package-install, and production actions require authority outside a Capsule.
- Never place secrets, private reasoning, raw private user data, or unrestricted tool grants in a portable Capsule.

See [SECURITY.md](SECURITY.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Apache License 2.0. See [LICENSE](LICENSE).
