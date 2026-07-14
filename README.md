# DreamLoops

Portable, bounded operating loops and capability Capsules for persistent AI agents.

DreamLoops turns recurring agent behavior into versioned, reviewable contracts. Capsules carry identity, capabilities, policies, resource ceilings, lineage, and rollback information. DreamLoops define when work starts, what context may be loaded, which typed handlers may run, what is forbidden, and which evidence and receipts must be produced.

The project is useful without DreamNet or Warper Keeper. It contains a dependency-free runtime, a CLI, a complete persistent-agent starter kit, a broad human-readable Loop library, optional adapters, and experimental work promoted from Grok Labs.

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

## Core Model

```text
Base Capsule
  + identity or persona overlay
  + domain overlay
  + optional connector overlay
  -> bounded DreamLoop runtime
  -> durable local state
  -> evidence and receipts
```

A Capsule is inert data. A DreamLoop manifest is inert data. Neither may execute Markdown, evaluate manifest text, install software, reveal secrets, publish content, spend funds, or mutate production merely because it was loaded. Application code must register each typed handler and grant each permission explicitly.

## Repository Map

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
| `docs/origins/` | Public design history and architecture papers |

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
