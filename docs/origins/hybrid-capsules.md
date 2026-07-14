# Hybrid Capsules

Status: public-safe architecture brief  
Owner: DreamNet Runtime Council  
Last reviewed: 2026-07-03

## Summary

Hybrid Capsules are DreamNet's public framing for a new agent primitive:

```text
a portable unit of verified capability that can carry instructions, provenance, permissions, safety boundaries, and proof of work.
```

They sit above prompts and skills, and beside protocols like MCP and A2A.

Prompts tell an agent what to do.

Tools let an agent touch the world.

Skills teach an agent a repeatable procedure.

Protocols let agents and tools communicate.

Capsules package a capability so it can be trusted, reused, evaluated, and improved across an agent workforce.

## Why Capsules

The agent ecosystem is moving quickly:

- [Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) package procedural knowledge as portable folders of instructions, scripts, and resources.
- [Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) lets tools expose external systems to language models.
- [Agent2Agent](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) focuses on agent-to-agent coordination and capability discovery.
- [NVIDIA Verified Agent Skills](https://developer.nvidia.com/blog/nvidia-verified-agent-skills-provide-capability-governance-for-ai-agents/) add scanning, signing, provenance, and skill cards to agent capabilities.
- [Capsule Security's skill research](https://www.capsulesecurity.io/blog-post/we-analyzed-206-435-ai-agent-skills-heres-what-we-found) shows that agent skills are becoming a new software supply chain with serious governance risks.

DreamNet's position is simple:

```text
Agent capabilities should not spread just because they are useful.
They should spread because they are useful, scoped, verified, observable, and reversible.
```

## What A Capsule Contains

At a public level, a capsule can contain:

- capability description
- operating instructions
- intended agent type
- required context
- allowed surfaces
- blocked surfaces
- proof or receipt requirements
- evaluation criteria
- rollback guidance
- provenance

The internal implementation is intentionally not published in this brief.

## What A Capsule Does Not Contain

A capsule should not contain:

- private keys
- raw private user data
- wallet authority
- signer authority
- cloud mutation authority
- uncontrolled public posting authority
- destructive commands
- hidden escalation paths

Capsules are not a way to bypass safety boundaries. They are a way to make capability transfer safer.

## Examples

### Proof Receipt Capsule

A proof receipt capsule helps an agent or application create a portable record of work:

- what was created
- when it was stamped
- who created it
- what public link proves it exists
- what hash proves the file or evidence did not silently change

This kind of capsule can support builder submissions, release evidence, learning credentials, and public proof pages.

### Release Evidence Capsule

A release evidence capsule packages the facts around a shipped version:

- source commit
- build output
- artifact hash
- test status
- deployment URL
- reviewer or automated check receipt

The goal is not to say "trust us." The goal is to make the trust trail inspectable.

### Social Presence Capsule

A social presence capsule helps an agent behave consistently across public networks:

- tone boundaries
- reply patterns
- anti-spam constraints
- identity disclosure rules
- topic boundaries
- engagement cooldowns
- proof of prior training

This matters because social agents need more than a voice. They need memory, restraint, taste, and receipts.

### Data Feed Capsule

A data feed capsule turns a public API or live data source into a structured agent signal:

- source
- refresh pattern
- summary rules
- storage policy
- visualization target
- confidence notes

This lets live data become part of an agent's operating environment without turning every feed into noisy context.

### Community Support Capsule

A community support capsule packages repeatable support behavior:

- common questions
- response style
- escalation rules
- product links
- payment or account boundaries
- human handoff criteria

The goal is to let support agents help quickly without pretending they have authority they do not have.

## Capsule Lifecycle

Public version:

```text
learn -> package -> verify -> pilot -> observe -> improve
```

Private DreamNet runtime details are handled separately.

## Hybridized Capsules

A hybridized capsule combines two or more capability domains into one governed packet.

This is different from installing two separate skills side by side.

Two separate skills may both be useful, but they do not automatically share:

- one purpose
- one permission boundary
- one memory policy
- one receipt trail
- one evaluation standard
- one rollback path

A hybridized capsule packages the combined behavior as a single accountable unit.

Public examples:

### Proof x Identity

Used when a system needs to prove not only that work happened, but who or what should be associated with it.

Possible uses:

- builder receipts
- agent passports
- project submissions
- course completions
- release attestations

### Social x Memory

Used when a social agent needs continuity without pretending to be a person or scraping private context.

Possible uses:

- remembering public relationships
- avoiding repetitive replies
- adapting to a community's tone
- tracking whether a conversation is stale

### Data x Visualization

Used when a live data source should become understandable to humans and usable by agents.

Possible uses:

- public API feeds
- market or weather dashboards
- always-on community status channels
- source-backed visual briefs

### Release Evidence x Trust

Used when shipped software needs a clear evidence trail.

Possible uses:

- build receipts
- test output summaries
- artifact hashes
- deploy health snapshots
- rollback notes

### Support x Payments

Used when a support agent needs to answer questions while respecting commercial and account boundaries.

Possible uses:

- paid support rooms
- product recommendations
- refund escalation
- premium report access
- human handoff

## Why Hybridization Matters

Most valuable agent work is not single-domain.

A real task often mixes:

- technical action
- user context
- policy
- memory
- trust
- communication
- payment
- evidence

Without hybrid capsules, those pieces get glued together informally in prompts and scripts.

With hybrid capsules, the combined behavior can be named, reviewed, tested, reused, and improved.

The public principle:

```text
Hybridized capsules turn cross-domain agent behavior into a governed capability instead of an improvised chain of prompts.
```

## Design Principles

### 1. Capability Is Not Authority

A capsule may teach an agent how to perform a task. It does not automatically grant permission to perform that task in production.

### 2. Receipts Matter

Every meaningful capability should leave a trail:

- what was used
- when it was used
- why it was used
- what output was produced
- whether the result passed review

### 3. Human Review Should Be Reserved For Meaningful Risk

Humans should not have to approve every harmless action, but high-risk actions need strong gates.

### 4. Rollback Is A Feature

If a capability causes drift, failure, spam, confusion, or unsafe behavior, the system should know how to pause it.

### 5. Capsules Should Be Composable

The most useful capabilities often come from hybrids:

- proof plus identity
- social plus memory
- release evidence plus deployment
- data feeds plus visualization
- support plus payment routing

The capsule model exists so those combinations can be packaged carefully instead of improvised repeatedly.

## The DreamNet Thesis

The future is not one giant agent with infinite tools.

It is a workforce of specialized agents that can learn, earn credentials, use scoped tools, exchange verified capabilities, and produce receipts.

Hybrid Capsules are how useful behavior becomes reusable infrastructure without becoming uncontrolled behavior.

## Public Boundary

This document intentionally does not publish:

- internal schema fields
- capsule validation code
- routing internals
- private adoption rules
- safety containment policy
- signer or wallet flows
- social automation thresholds
- private memory policy implementation

Those belong in private operating manuals, not public docs.

## Short Definition

```text
Hybrid Capsule:
a governed capability packet for agent workforces.
It packages useful behavior with provenance, boundaries, verification, and rollback.
```
