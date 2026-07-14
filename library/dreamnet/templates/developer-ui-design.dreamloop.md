# Developer UI Design DreamLoop

loop_id: developer-ui-design
title: Developer UI Design
version: 0.1.0
status: template
owner: DreamNet Design Guild
stewards:
  - Antigravity
  - Design Regent
  - Frontend Auditor
permission_tier: artifact_draft_write
last_reviewed: 2026-06-23

## Trigger

Run this loop when building, refactoring, or optimizing user interface components, pages, or dashboards.

## Inputs

- component name and user requirements
- design system tokens (e.g. `index.css`)
- target files (HTML, Svelte, React, CSS)

## Context Sources

- `index.css` (primary design guidelines)
- master layout templates
- visual assets (icons, font bindings)

## Allowed Actions

- write semantic HTML5 markup
- design responsive flexbox and grid layouts
- construct dark-mode HSL color palettes and CSS gradients
- declare translucent glassmorphism blurs (`backdrop-filter`) and thin borders
- declare micro-animations on interactive states (`transition`, `transform`, `box-shadow`)
- write and modify local CSS/styling files

## Blocked Actions

- do not use Tailwind CSS class frameworks unless explicitly directed by operator
- do not use plain primary colors (e.g., pure red `#ff0000` or blue `#0000ff`)
- do not use image placeholders or mock text (always generate real assets or write descriptive labels)
- do not break semantic hierarchy (e.g., no multiple `h1` headings on a single page)
- do not write ad-hoc style overrides inside TS/JS files if they can live in stylesheets

## Checks

1. Are all custom colors mapped to coordinated, premium HSL tokens?
2. Does the layout use backdrop blurs and thin borders for glassmorphism layering?
3. Are all buttons, inputs, and anchors enhanced with smooth hover transitions?
4. Is there a single, clean `<h1>` heading on the page?
5. Does the page look visually premium and responsive across desktop, tablet, and mobile views?
6. Are all interactive elements configured with unique, descriptive IDs for browser validation?

## Evidence Outputs

- Component screenshot or rendering artifact (WebP/PNG).
- Local stylesheet file.

## Receipt Outputs

```bash
pnpm receipts:add --type ui_design --actor antigravity --subject <component_name> --intent "Implement premium, responsive, glassmorphic UI component using Vanilla HSL CSS" --source <css_file_path>
pnpm receipts:proof-ledger
```

## Memory Routes

- Local git index
- Swarm proof ledger
- Frontend component catalog

## Cooldown

Re-run when design guides are updated or component interface needs branding alignment.

## Failure Modes

- broken semantic structure
- generic colors (plain primaries) lacking premium harmony
- lack of responsiveness or layout breakage on mobile viewports
- missing interactive states or rigid, non-animated elements

## Promotion Path

```text
receive wireframe
  -> structure semantic HTML
  -> bind typography & layout
  -> apply HSL palettes & blurs
  -> implement micro-transitions
  -> verify local render (browser testing)
  -> receipt generation
```
