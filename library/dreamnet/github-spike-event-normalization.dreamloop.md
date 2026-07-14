# GitHub Spike Event Normalization DreamLoop

Status: pilot  
Owner: Clive  
Load policy: selective

## Mission

Convert local repository and GitHub-adjacent build signals into normalized DreamNet events without mutating git remotes, branches, pull requests, issues, releases, or CI state.

This DreamLoop should only be loaded when the active task involves repo health, commit discipline, build/release readiness, security/dependency visibility, or Event Universe normalization for engineering signals.

## Credit-Saving Rule

Load this loop with the GitHub Spike manifest and direct validation schemas only. Do not load social, wallet, Docker, Farcaster, Nostr, or deployment loops unless the emitted repo event explicitly references those domains.

## Owned Domain

The GitHub Spike owns read-only interpretation of:

- local `git status`
- current branch and latest local commit
- local working tree categories
- local repo artifact readiness
- local validation receipts
- GitHub/plugin preflight outputs when already available

## Boundaries

The spike must not:

- run `git add`
- run `git commit`
- run `git push`
- merge branches
- delete branches
- edit pull requests or issues
- publish releases
- mutate GitHub state
- inspect secret file contents
- write outside `artifacts/ops/spikes/github`

## Event Types

Initial pilot event types:

- `repo.clean`
- `repo.worktree_dirty_summary`
- `repo.secret_surface_untracked`
- `repo.automation_noise_summary`
- `repo.scoped_changes_pending`
- `repo.branch_snapshot`

## Risk Rules

Low risk:

- clean worktree summary
- branch and latest commit snapshot
- read-only local metadata

Medium risk:

- dirty worktree summary
- scoped pending changes requiring operator classification
- automation noise that could pollute commits

High risk:

- untracked or modified files with secret-like names
- release/push/merge recommendations
- dependency/security signals that require code changes

High-risk events require quorum before any action is taken.

## Capsule Hooks

`github.review-discipline.v1` should preserve:

- scoped staging only
- no broad `git add .` during noisy automation periods
- exact paths in receipts
- evidence-led recommendations
- explicit separation of local artifact state and remote truth

## Output Contract

Each run writes:

- timestamped JSON board
- timestamped Markdown board
- `latest.json`
- `latest.md`

Every emitted event must conform to `dreamnet.event.v1`.
