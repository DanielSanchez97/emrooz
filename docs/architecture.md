# Architecture

## Repository Layout

```
apps/           Full-stack applications with backend + frontend
sites/          Static sites (any framework: Astro, Ember, Hugo, etc.)
libs/           Shared libraries (Python + TypeScript)
packaging/      Dockerfiles organized by service
infrastructure/ Terraform — AWS hosting for the static sites
scripts/        Shell scripts and internal tooling
docs/           This directory
```

## apps/ vs sites/

- **apps/** are full-stack products with API backends, databases, auth, etc. Each app has `backend/` and `frontend/` subdirectories.
- **sites/** are static or mostly-static sites that deploy as static assets. Each site is self-contained with its own framework and config.

## Dependency Management

- **Python**: Each app has its own `pyproject.toml` managed by `uv`. Shared code in `libs/python/` is referenced via `[tool.uv.sources]` path dependencies.
- **TypeScript**: Each app has its own `package.json`. Shared code in `libs/typescript/` is referenced via `file:` dependencies.

## Port Allocation

| App                | Backend | Frontend |
|--------------------|---------|----------|
| language-learning  | 8001    | 3001     |
| personal-finance   | 8002    | 3002     |
| instagram-analyzer | -       | 3003     |
| emrooz (site)      | -       | 4321     |

`instagram-analyzer` is frontend-only — all data processing happens client-side on uploaded Instagram exports.

New apps should increment: 8004/3004, 8005/3005, etc.

## Makefile Conventions

- All targets are namespaced by app abbreviation to avoid collisions
- Sub-makefiles are explicitly included in the root Makefile
- Common pattern: `{prefix}-backend-run`, `{prefix}-frontend-dev`, `{prefix}-docker-build`

| App                | Prefix |
|--------------------|--------|
| language-learning  | ll     |
| personal-finance   | pf     |
| instagram-analyzer | ia     |
| emrooz (site)      | emrooz |

## Infrastructure (AWS)

Static sites are hosted on AWS via S3 + CloudFront + ACM, with DNS in
Route53. Terraform configuration lives in `infrastructure/`.

| Site               | Domain          | Bucket                 | Notes                       |
|--------------------|-----------------|------------------------|-----------------------------|
| emrooz             | `emrooz.io`     | `emrooz-io-site`       | Astro static build          |
| instagram-analyzer | `iga.emrooz.io` | `iga-emrooz-io-site`   | Vite static build, no API   |

Remote Terraform state lives in S3 (`emrooz-tf-state-prod`, manually
managed) with DynamoDB (`emrooz-tflock`) for locking. See `infrastructure/README.md` for the full
setup and deploy workflow.

The full-stack apps (`language-learning`, `personal-finance`) are not yet
deployed — they need their own infra (ECS / Lambda / RDS) added later.
