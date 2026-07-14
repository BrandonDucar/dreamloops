---
type: Playbook
title: DreamLoop to OKF Bridge
description: Converts DreamLoops M.D. files into OKF Playbook concepts so outside agents can discover DreamNet operating loops.
resource: scripts/okf-export-dreamloops.mjs
tags: [dreamnet, okf, dreamloops, playbook, interoperability]
timestamp: 2026-06-20T00:00:00-04:00
---

# Trigger

Run this bridge when DreamLoops are added, updated, or need to be exported into an agent-readable knowledge bundle.

# Steps

1. Read `docs/dreamloops` and `docs/dreamloops/templates`.
2. Parse DreamLoop frontmatter where available.
3. Create OKF concept documents under `docs/okf/dreamloops`.
4. Generate `docs/okf/dreamloops/index.md`.
5. Validate the bundle with `pnpm okf:validate`.
6. Refresh the proof ledger when integration receipts are created.

# Commands

```powershell
pnpm okf:export:dreamloops
pnpm okf:validate
pnpm receipts:proof-ledger
```

# Output Contract

Every generated DreamLoop OKF concept should include:

```yaml
type: DreamLoop Playbook
title:
description:
resource:
tags:
timestamp:
dreamnet_loop_id:
dreamnet_status:
dreamnet_permission_tier:
```

# Boundary

This bridge writes only local Markdown bundle files. It does not call Google Cloud, upload to Google Drive, mutate Memory Grid, publish to social accounts, deploy, sign, spend, or write to production systems.

