# Docker Spike Health Truth DreamLoop

Status: pilot
Owner: Hermes
Spike: `spike:docker.health.v1`

## Mission

Normalize Docker runtime evidence into `dreamnet.event.v1` events without mutating containers.

This loop exists to keep deployment truth clean:

- Docker-internal health is not the same as host-tool reachability.
- A running container without a healthcheck is not proven healthy.
- A port exposed inside Docker is not proven reachable from `127.0.0.1`.
- A narrative manifest is lower priority than `docker inspect`.

## Load Policy

Selective only.

Load this DreamLoop when the active task is about Docker health, ports, container state, image drift, or the Event Universe Docker Spike.

Do not load unrelated DreamLoops unless this file directly references them.

## Direct Capsule Reference

Capsule: `ops.health-port-mapping.v1`

Role:

```text
Keep Docker-internal health, host port bindings, and external endpoint reachability separate in every report and event.
```

## Allowed Inputs

- `docker ps`
- `docker inspect`
- `docker stats --no-stream`
- existing Docker health artifacts
- local host port mapping evidence

## Blocked Actions

- `docker restart`
- `docker rm`
- `docker compose up`
- `docker compose down`
- image pulls
- volume deletion
- port publishing changes
- edits to compose files during a spike scan

## Output Contract

Write:

- normalized `dreamnet.event.v1` events
- local spike board JSON
- local spike board Markdown
- latest pointer artifacts

Events should describe:

- unhealthy containers
- exited containers
- missing healthchecks
- exposed-but-unpublished ports
- evidence gaps

## Risk Rules

Low risk:

- read-only inspection
- local artifact write
- event normalization

Medium risk:

- restart recommendation
- healthcheck recommendation
- host-port mapping recommendation

High risk:

- actual restart
- compose mutation
- volume mutation
- public endpoint exposure

High-risk actions require Quorum and human approval.

## Receipt Rule

Every spike run writes a local receipt with:

- run timestamp
- Docker context
- event count
- count summary
- read-only boundary counters
- artifact paths

## Credit-Saving Rule

For Docker health tasks, load this DreamLoop plus the directly referenced `ops.health-port-mapping.v1` capsule note if available. Do not load social, wallet, Farcaster, or partner-research context unless a generated event explicitly requires cross-domain escalation.
