# DreamNet Capsule Specification v1.1

**Purpose:** Portable, inheritable, versioned capability bundles containing
knowledge, identity, memory references, traits, resources, and governed
DreamLoop contracts.

The machine-readable contract is DreamNet's existing
`dreamnet.synergy_capsule.v1` schema. A documentation-only package is a draft
Synergy Capsule. `dreamnet.clawcapsule.v1` is reserved for packages that include
the required runtime, permissions, health, receipt, and rollback implementation.

## Core Structure

```text
capsule-[name]-v[version]/
├── capsule.md
├── README.md                 # optional human orientation
├── dreamloops/               # optional governed loop contracts
├── memory/                   # optional references, never raw secrets
├── traits.yml                # optional declared traits
├── resources/                # optional supporting resources
└── manifest.json
```

## Required Editorial Fields In `capsule.md`

- type: AgentCapsule | KnowledgeCapsule | DreamCapsule | HybridCapsule
- title
- version
- lineage_id, when available
- parents
- status: draft | reviewed | deprecated
- lineage_review: pending | verified | rejected
- governance_status: pending | approved | rejected
- manifest
- timestamp

## Required Manifest Rules

- `manifest.json` is required, must validate as `dreamnet.synergy_capsule.v1`,
  and is the machine-readable authority for this package class.
- Promotion beyond `draft` requires a real content hash, a lineage receipt when
  lineage is claimed, and the policy or Quorum receipts required for adoption.
- The Genealogist verifies origin, inheritance, and provenance. It does not
  authorize deployment, spending, publication, or other external action.
- Capsules remain inert data until an authorized runtime loads them.
- Secrets, credentials, private reasoning, and unrestricted tool grants must
  not be embedded in a portable capsule.
- Missing or unverifiable receipts keep `activation` set to `blocked`.

## Compatibility

The package may export an OKF-compatible knowledge bundle. DreamNet-specific
lineage, permissions, DreamLoops, and receipt references remain explicit
extensions rather than implied capabilities.
