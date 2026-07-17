# DreamLoops and Capsules: A Public Origin Record for Portable Agent Intelligence

**Author:** Brandon Ducar, DreamNet  
**Publication date:** July 17, 2026  
**Status:** Public architecture paper and authorship record  
**Canonical implementation:** [`BrandonDucar/dreamloops`](../../README.md)

## Abstract

AI agents are usually assembled from scattered prompts, tool definitions, memory databases, workflow graphs, policy files, deployment configuration, and logs. That approach can produce useful agents, but it does not provide a coherent way to transfer developed intelligence from one agent to another while preserving identity, authority boundaries, provenance, evidence, and rollback.

DreamNet introduced **DreamLoops** and **Capsules** as a combined architecture for solving that problem.

A **DreamLoop** is a versioned, bounded operating circuit for repeatable agent work. It defines what triggers a mission, what knowledge may be loaded, what actions are allowed or blocked, which checks must run, what evidence must be produced, what approvals are required, and how the result is recorded and routed.

A **Capsule** is a portable, versioned, inheritable capability package. It can carry knowledge, traits, identity or persona overlays, memory references, policies, permissions, resources, evaluation criteria, rollback guidance, lineage, and governed DreamLoops.

A **receipt** is the accountability object that proves what occurred. It connects the claimed capability to a specific execution, actor, authorization state, evidence set, result, and timestamp.

Together:

> **DreamLoops govern behavior. Capsules carry capability. Receipts prove execution.**

This paper records the architecture, explains why the agent ecosystem needs it, and identifies the public DreamNet materials that document its development no later than July 14, 2026.

## 1. The problem: agent intelligence is fragmented

Most agent systems distribute an agent across several unrelated surfaces:

- a system prompt describing personality and goals
- tool schemas and API clients
- a vector database or memory service
- workflow code or a graph
- model-routing configuration
- permission and approval rules
- evaluation scripts
- deployment files
- logs and traces
- human knowledge about how the pieces fit together

This fragmentation creates five major failures.

### 1.1 Capabilities are difficult to transfer

A useful procedure learned by one agent cannot be cleanly installed into another. Developers typically copy prompts, clone repositories, reproduce databases, or rebuild workflows by hand.

### 1.2 Knowledge and authority become confused

Knowing how to perform an action is not the same as being authorized to perform it. Conventional agent packages frequently mix instructions, credentials, and live permissions in unsafe ways.

### 1.3 Improvement lacks provenance

When a behavior changes, it may be unclear where the change originated, which version introduced it, what evidence supported it, or which descendants inherited it.

### 1.4 Completion is self-reported

Agents often say that work is complete without producing structured evidence that the correct process ran, the expected checks passed, and the result stayed inside scope.

### 1.5 Rollback is incomplete

A prompt can be reverted and software can be redeployed, but a developed capability often spans prompts, tools, memory, workflow state, policies, and evaluations. There is rarely one governed unit that can be activated, disabled, compared, or rolled back.

DreamLoops and Capsules were created to make developed agent intelligence portable, bounded, inspectable, and reversible.

## 2. DreamLoops: mission DNA for repeatable work

A prompt is usually a request made once. A DreamLoop is a reusable operating contract.

A DreamLoop specifies:

- the trigger that starts the work
- the objective and expected outcome
- the knowledge and memory references that may be loaded
- the actor or agent identity
- the permission tier
- the tools and typed handlers that may run
- allowed and blocked actions
- checkpoints, timeouts, retry limits, and recovery behavior
- human approval boundaries
- validation and evaluation steps
- required evidence artifacts
- receipt outputs
- memory routes and the next safe action
- lifecycle state, including rehearsal, guarded activation, certification, and retirement

A useful summary is:

```text
knowledge state
  -> trigger
  -> selected DreamLoop
  -> scoped action
  -> execution trace
  -> validation
  -> evidence
  -> receipt
  -> memory routing
  -> next trigger, retry, rollback, or retirement
```

DreamLoops are not unrestricted self-executing Markdown. They remain inert until an authorized runtime validates the contract, maps its typed handlers to application code, and grants the required permissions.

This distinction is essential. A DreamLoop describes a governed capability. It does not create authority merely by being loaded.

## 3. Capsules: portable and inheritable capability packages

A Capsule is not merely a plugin, prompt bundle, model card, skill folder, container image, or configuration file.

A Capsule is the governed unit through which useful agent capability can move.

Depending on its type and authorization level, a Capsule may include:

- knowledge and reference material
- identity or persona overlays
- declared traits
- memory references and routing rules
- DreamLoop contracts
- tool and connector requirements
- policies and permission boundaries
- resource and cost ceilings
- evaluation and mastery criteria
- provenance and content hashes
- lineage and parent references
- adoption receipts
- compatibility information
- health requirements
- rollback instructions

A portable Capsule must not embed:

- private keys or secrets
- raw private user data
- unrestricted tool grants
- signer or wallet authority
- automatic public-posting authority
- destructive commands
- hidden privilege-escalation paths

Capsules remain inert until an authorized runtime installs, validates, evaluates, and activates them.

## 4. Installation is not inheritance

Traditional software plugins are installed. DreamNet Capsules are designed to be **inherited, expressed, tested, mutated, compared, promoted, deprecated, and sometimes quarantined**.

That difference matters because an intelligent capability has ancestry.

A Capsule lineage can answer:

- Which agent or team first developed this capability?
- Which DreamLoop produced the original evidence?
- Which Capsule packaged it?
- Which version is the stable ancestor?
- Which agents adopted it?
- Which mutations improved or damaged it?
- Which descendants inherited it?
- Which branch should be preserved, rolled back, or quarantined?

Version control records changes to files. Capsule lineage records changes to transferable capability.

## 5. Why DreamLoops belong inside Capsules

A Capsule without DreamLoops risks becoming a passive collection of knowledge and configuration.

A DreamLoop without a Capsule can become an isolated workflow with no portable package for its knowledge, policy, provenance, evaluations, or lineage.

Their combination solves both problems:

```text
Capsule
  carries knowledge, traits, policies, permissions, lineage, and resources

DreamLoop
  turns that capability into bounded repeatable action

Receipt
  proves what happened during a specific execution
```

This is the core architecture.

## 6. Receipts turn agent claims into accountable work

Logs are useful for debugging, but logs alone are not a proof model. They may be incomplete, mutable, excessively sensitive, or disconnected from authorization and evidence.

A DreamNet receipt is a canonical accountability object that can record:

- receipt identifier
- DreamLoop and Capsule references
- task and attempt identifiers
- actor identity
- authorization and approval state
- objective and trigger
- inputs and knowledge-state references
- tools used
- allowed and blocked actions
- outputs produced
- checks performed
- success or failure state
- evidence and trace references
- idempotency key
- previous-receipt link
- hashes and timestamp
- next safe action

Receipts can be chained so that a workflow has a tamper-evident history. Sensitive traces can remain private or redacted while the receipt exposes only the facts needed for accountability.

The rule is simple:

> An agent should not receive credit merely for saying that it completed a task. It should produce evidence that the correct loop ran inside the correct authority boundary.

## 7. What builders must do without Capsules

Without Capsules, the industry must continue transferring agent intelligence through combinations of:

1. copying system prompts
2. copying skill folders
3. cloning complete repositories
4. reproducing workflow graphs
5. exporting and rebuilding memory stores
6. duplicating policy configuration
7. reconnecting tools manually
8. fine-tuning models
9. rebuilding evaluations
10. reconstructing provenance from logs and team memory

Each of these methods transfers one part of an agent. None is a complete governed unit for developed capability.

The predictable result is that the industry will eventually create agent packages, cognitive modules, capability bundles, workforce images, or intelligence containers that attempt to combine these pieces.

Capsules identify that requirement directly: agents need a standard unit for acquiring, verifying, activating, evolving, and passing on capability without surrendering identity or human authority.

## 8. Proof through the ZOL upgrade

The ZOL persistent-agent upgrade provides a practical demonstration of the architecture.

ZOL already existed as an independent agent with:

- a distinct identity and public persona
- an existing repository and Raspberry Pi runtime
- a Farcaster signer and account
- OpenRouter model access
- cron and tmux processes
- a Telegram approval flow controlled by Zaal
- explicit boundaries around public posting, wallets, and tokens

The upgrade did not erase ZOL or replace his controller. DreamLoops and Capsules were used to add organized capabilities around:

- durable memory and state
- work routing
- restart recovery
- model-neutral access
- typed tool permissions
- artifact creation and verification
- Telegram-backed approvals
- chained receipts
- proof exports
- bounded ToolGym evaluation
- proposal-only self-improvement

This is the intended result of the architecture: an existing agent can inherit substantial new capability while preserving identity, controller authority, signer boundaries, and existing behavior.

The upgrade therefore serves as evidence that DreamLoops and Capsules are not only internal metaphors. They can function as portable architecture for upgrading an independent agent.

## 9. The novelty boundary

DreamNet does not claim to have invented loops, software modules, memory systems, workflow graphs, plugins, package managers, cryptographic hashes, or receipts as isolated ideas.

The authorship claim concerns the named and integrated architecture:

> **DreamLoops are governed, versioned mission-DNA contracts for repeatable agent action. Capsules are portable, versioned, inheritable capability packages that combine knowledge, traits, memory references, policies, permissions, resources, lineage, evaluations, rollback, and governed DreamLoops. Receipts connect those capabilities to verifiable executions.**

The distinguishing system includes:

- transferring capability into an existing agent while preserving its identity
- separating capability from live authority
- packaging DreamLoops with knowledge, policy, evaluation, and lineage
- validating and hashing Capsule contents
- testing an agent before capability promotion
- recording mastery and adoption with receipts
- tracking ancestors, mutations, and descendants
- supporting activation, disabling, rollback, retirement, and quarantine
- allowing self-improvement proposals without uncontrolled production self-modification

The public record should be evaluated against that complete architecture rather than against any single ingredient.

## 10. Public chronology

The repository preserves public design history and implementation artifacts predating this paper.

### June 30, 2026

DreamNet architecture notes described DreamLoops as a control plane for repeatable, version-controlled mission DNA and connected them to triggers, context, safety checks, execution, and receipt logging.

### July 3, 2026

The public-safe **Hybrid Capsules** brief defined a Capsule as a portable unit of verified capability carrying instructions, provenance, permissions, safety boundaries, and proof of work. It placed Capsules above prompts and skills and beside communication protocols.

### July 7, 2026

**DreamNet Evolution Engine: Genealogist, DreamLoops, and Capsules** documented the combined evolutionary model:

- DreamLoops as mission DNA
- Capsules as transferable capability organisms
- Genealogist as lineage and inheritance tracking
- Tuatara as long-term preservation and evolution governance

### July 14, 2026

Version `0.1.0` of the public `BrandonDucar/dreamloops` repository published:

- Capsule and DreamLoop specifications and schemas
- dependency-free validation
- canonical hashing
- Capsule composition
- durable state
- bounded execution
- receipts
- seven generalized persistent-agent Capsules
- eighteen stable daily-operation DreamLoops
- the broader DreamNet DreamLoop and Capsule libraries
- public ZOL integration material

These materials establish that the architecture was publicly documented and implemented by Brandon Ducar and DreamNet no later than July 14, 2026.

## 11. Authorship and priority statement

Brandon Ducar and DreamNet assert authorship of the **DreamLoops and Capsules architecture described in this repository**, including its terminology, combined operating model, inheritance framing, receipt-backed execution model, and public specifications.

This statement is an evidence-backed public origin record. It is not a substitute for patent, trademark, copyright, or other legal filings, and it does not make an unsupported claim that no earlier work anywhere contained any overlapping component.

The claim is narrower and stronger:

> By July 14, 2026, DreamNet had publicly specified and implemented DreamLoops and Capsules as a unified system for portable, bounded, inheritable, receipt-backed agent intelligence.

## 12. Open development

DreamLoops is published as open infrastructure so builders can test, challenge, extend, and adopt the architecture.

Open development does not erase origin. It makes origin inspectable.

The repository’s commit history, specifications, schemas, architecture papers, examples, runtime, and receipts provide the record.

## 13. Canonical definitions

### DreamLoop

A portable, versioned, bounded operating contract that turns a trigger and an authorized knowledge state into scoped action, execution trace, validation, evidence, receipt, and a next routing decision.

### Capsule

A portable, versioned, inheritable capability package containing some combination of knowledge, identity or persona overlays, traits, memory references, resources, policies, permissions, evaluations, rollback guidance, lineage, and governed DreamLoops.

### Receipt

A canonical, hashable accountability record that connects an actor, task, authorization state, execution, evidence, checks, outcome, and timestamp.

### DreamNet architecture statement

> **DreamLoops govern behavior. Capsules carry capability. Receipts prove execution. DreamNet connects, evaluates, and evolves the system.**

## Repository references

- [DreamLoops README](../../README.md)
- [DreamLoop specification](../../specs/DREAMLOOP_SPEC.md)
- [Capsule specification](../../specs/CAPSULE_SPEC.md)
- [Hybrid Capsules architecture brief](hybrid-capsules.md)
- [DreamNet Evolution Engine](dreamnet-evolution-engine-genealogist-dreamloops-capsules.md)
- [Public changelog](../../CHANGELOG.md)
- [ZOL integration example](../../examples/zol/)
