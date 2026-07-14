# DreamLoop Personalization, Capsule, and Trapper Bootstrap

## Decision

Do not copy a complete `DreamLoop.md` into every agent product's personalization field. Personalization should contain a small bootstrap projection that identifies the agent, points to its current approved DreamLoop, lists allowed Capsules, and states the retrieval and safety policy.

The canonical roles are:

- **DreamLoop:** living mission DNA and compressed operating memory.
- **Capsule:** signed, versioned, transferable capability organism produced from an approved DreamLoop state plus skills, policies, evidence, and rollback metadata.
- **Genealogist:** lineage and inheritance authority for loops, Capsules, agents, and descendants.
- **Agent Bootstrap Profile:** small product-specific personalization projection.
- **Keeper:** living collaborative knowledge workspace.
- **Trapper:** portable context package assembled from sources, Memory Envelopes, Capsules, receipts, graph references, permissions, and a frozen update boundary.

A Trapper is not a replacement name for a Capsule. A Capsule carries governed capability. A Trapper carries a working context and may contain several Capsules.

## Canonical Host

The NUC/Master Vault holds the canonical bootstrap registry next to Super Spine, Memory Fabric, Genealogist, NATS, and Redis. Cloudflare may cache signed public or edge-safe projections, but it does not become the lineage authority.

```text
NUC / Master Vault
  DreamLoop registry
  Capsule registry
  Genealogist lineage
  Memory Fabric
  Super Spine bootstrap service
          |
          +-- Codex / ChatGPT adapter
          +-- Goose adapter
          +-- Antigravity adapter
          +-- Docker agent adapter
          +-- Cloudflare/serverless adapter
          +-- Farcaster Droid adapter
```

## Bootstrap Profile

```yaml
bootstrap_version: "1"
agent_ref: ghostgooseops
passport_ref: dreamnet://passports/ghostgooseops
dreamloop_ref: dreamnet://loops/ghostgooseops/current
dreamloop_hash: sha256:...
capsule_refs:
  - dreamnet://capsules/social-field-operator/v3
  - dreamnet://capsules/proof-drop-publicist/v2
load_policy: selective
memory_policy_ref: dreamnet://policies/memory/shared-safe/v1
tool_policy_ref: dreamnet://policies/tools/ghostgooseops/v4
update_channel: dreamnet.agent.bootstrap.ghostgooseops
rollback_ref: dreamnet://loops/ghostgooseops/v12
```

Only the bootstrap profile belongs in a personalization field. At task start, the adapter loads the current DreamLoop summary and only the directly relevant Capsules. This is the credit-saving behavior: agents avoid repeatedly loading the whole history and unrelated capabilities.

## Publication Lifecycle

```text
DreamLoop changes
  -> schema and secret scan
  -> canonical hash
  -> capability and policy extraction
  -> Capsule snapshot
  -> Genealogist lineage record
  -> Quorum or human approval when required
  -> signed registry publication
  -> Super Spine update signal
  -> agent adapter refresh
  -> bootstrap receipt
```

Every agent reports the loop hash and Capsule versions it actually loaded. That produces an explainable answer to: which identity, mission state, policies, skills, and inherited knowledge shaped this action?

## Adapter Strategy

### Codex

Project-level `AGENTS.md`, skills, and the DreamNet memory bridge carry the bootstrap projection. A managed adapter can refresh workspace context, but it must not silently overwrite user-owned global instructions.

### ChatGPT

Use a small custom-instruction projection or a DreamNet connected app/MCP that resolves the bootstrap profile. Automatic mutation of ChatGPT personalization settings requires an officially supported settings API; until one exists, DreamNet generates a reviewed projection rather than automating the UI.

### Goose and Antigravity

Generate native instruction/config projections from the same bootstrap profile. Manual paste is an initial fallback, not the final distribution mechanism.

### Container and Serverless Agents

Containers receive a read-only bootstrap file or authenticated registry URL. Cloudflare/serverless agents receive a signed, sensitivity-filtered projection through edge storage and refresh on a Super Spine version event.

### Farcaster Droids

The Droid passport points to the approved DreamLoop and Capsule set. Wallet/FID ownership remains separate from the personality and capability snapshot.

## Warper Keeper Mapping

Warper Keeper is the product surface over this infrastructure:

- A Keeper is a living workspace.
- A Trapper is a versioned, shareable context handoff.
- Memory Envelopes supply canonical source units.
- Graphiti supplies relationship and chronology references.
- Genealogist supplies remix and contributor lineage.
- Capsules supply installed agent capabilities.
- AetherSafe supplies permissions, secret filtering, hall passes, and trust policy.
- Proof Drop receipts supply visible evidence without exposing private internals.

The first vertical slice is:

```text
Create Keeper
  -> trap one Farcaster cast or URL
  -> normalize it into a Memory Envelope
  -> organize it into a Trapper
  -> ask one cited question
  -> share a signed read-only Trapper
  -> open or remix it through a Farcaster Mini App
```

Sites can build the visual product and interaction shell. The NUC-hosted Memory Fabric, Super Spine, Genealogist, and policy services remain the canonical backend.

## Safety Rules

- No secrets, credentials, private prompts, or unrestricted memories in bootstrap profiles or public Trappers.
- Every projection is scoped by agent, audience, sensitivity, tools, and expiry.
- Capsule installation and loop promotion are separate actions with separate receipts.
- Public Trappers carry references and approved summaries, not internal chain-of-thought or raw private memory.
- Every update is versioned and rollbackable.
- Agents with stale or unverifiable loop hashes enter read-only mode until refreshed.

## Next Implementation

Build a provider-neutral `AgentBootstrapProfile` schema and compiler that accepts an agent passport, a DreamLoop reference, approved Capsule references, and policy references. The compiler should emit adapter projections for Codex, ChatGPT, Goose, Antigravity, Docker, Cloudflare, and Farcaster Droids from the same signed source.

