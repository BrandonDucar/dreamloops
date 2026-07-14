# Developer Docker Deploy DreamLoop

loop_id: developer-docker-deploy
title: Developer Docker Deploy
version: 0.1.0
status: template
owner: DreamNet Operations
stewards:
  - Antigravity
  - Infrastructure Regent
  - Security Auditor
permission_tier: live_guarded_action
last_reviewed: 2026-06-23

## Trigger

Run this loop when introducing a new backend microservice, upgrading container architectures, or deploying modifications to the Docker Compose orchestrator.

## Inputs

- service directory path
- port mapping requirements (e.g. avoiding existing ranges)
- env variable definitions

## Context Sources

- service package files (`package.json`, `tsconfig.json`)
- `docker-compose.yml` (existing network mappings)
- active Docker daemon context

## Allowed Actions

- write and modify isolated multi-stage Dockerfiles
- declare ports, network scopes, and volumes in compose files
- build images locally (`docker build` or `docker compose build`)
- start and stop target containers (`docker compose up -d`)
- run container health checks and fetch runtime logs

## Blocked Actions

- do not execute destructive system purges (`docker system prune -a --volumes` or `wsl --unregister`) without explicit permission
- do not bind conflicting ports on the host machine (check active ports first)
- do not bake secrets or API credentials into container layers (always inject via environment variables or secret mounts)
- do not expose debug ports (e.g. 9229) to public interfaces

## Checks

1. Does the Dockerfile compile using cached multi-stage builders?
2. Does the service execute under a secure, non-root user?
3. Is a healthcheck block declared in the Dockerfile or Compose file?
4. Are host-side ports verified free before mapping?
5. Does the container start successfully and return Status `200 OK` on `/healthz`?

## Evidence Outputs

- Docker build log.
- Local `docker-compose.<name>.yml` config.
- Uptime/health response verification.

## Receipt Outputs

```bash
pnpm receipts:add --type container_deploy --actor antigravity --subject <service_name> --intent "Deploy multi-stage container mapping to conflict-free host port" --source docker-compose.species.yml
pnpm receipts:proof-ledger
```

## Memory Routes

- Local git index
- Swarm proof ledger
- Infrastructure inventory

## Cooldown

Re-run when service codebase updates, dependencies change, or orchestrator parameters need tuning.

## Failure Modes

- port conflicts on host
- permission errors in Docker socket communication
- container start failure (crashing on boot due to missing env variables)
- oversized image payload (missing multi-stage optimization)

## Promotion Path

```text
write Dockerfile
  -> add to compose configuration
  -> verify free ports
  -> run local build & compose up
  -> verify health endpoint
  -> receipt generation
  -> audit logs
```
