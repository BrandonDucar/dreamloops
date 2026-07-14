# Global Opportunity Grid DreamLoop

Status: pilot
Owner: Hermes / Tuatara oversight
Load policy: selective

## Mission

Merge normalized events from deterministic DreamNet spikes into one ranked attention grid without mutating the underlying domains.

The Global Opportunity Grid is the cross-domain nervous system view. Docker, GitHub, Farcaster, and future spikes stay isolated. The grid only compares their emitted events, ranks urgency, and identifies which items should go to quorum.

## Credit-Saving Rule

Load this loop only when the active task asks what needs attention across multiple spikes. Load the spike `latest.json` pointers and referenced run receipts only. Do not load each domain's full DreamLoop unless the operator drills into that domain.

## Owned Domain

The grid owns read-only interpretation of:

- `artifacts/ops/spikes/docker/latest.json`
- `artifacts/ops/spikes/github/latest.json`
- `artifacts/ops/spikes/farcaster/latest.json`
- future spike `latest.json` pointers added to the grid source list

## Boundaries

The grid must not:

- restart containers
- stage, commit, push, or mutate git
- post, reply, like, recast, follow, or DM
- drain queues
- write NATS
- write the database
- mutate cloud state
- inspect or output secrets
- call external APIs
- write outside `artifacts/ops/spikes/global-opportunity-grid`

## Ranking Rules

Each event is ranked from its own normalized shape:

- `priority`: the spike's local urgency score
- `confidence`: the spike's confidence in the observation
- `risk`: risk weight for blocked/high/medium/low
- `freshness`: source receipt age discount
- `quorum.required`: raises visibility because cross-domain attention is likely needed

The grid does not decide execution. It only produces a ranked operator view.

## Quorum Routing

Route to quorum when:

- event risk is `high` or `blocked`
- `event.quorum.required` is true
- recommended action implies mutation, public action, key handling, signer handling, deployment, money movement, or broad automation

Medium-risk items stay in operator review unless a domain spike explicitly asks for quorum.

## Output Contract

Each run writes:

- timestamped JSON grid
- timestamped Markdown grid
- `latest.json`
- `latest.md`

Every imported event must be treated as immutable evidence from its source spike.
