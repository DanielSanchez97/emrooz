# Architecture

## Repository Layout

```
apps/           Full-stack applications with backend + frontend
sites/          Static sites (any framework: Astro, Ember, Hugo, etc.)
libs/           Shared libraries (Python + TypeScript)
packaging/      Dockerfiles organized by service
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

| App               | Backend | Frontend |
|-------------------|---------|----------|
| language-learning | 8001    | 3001     |
| personal-finance  | 8002    | 3002     |
| emrooz (site)     | -       | 4321     |

New apps should increment: 8003/3003, 8004/3004, etc.

## Makefile Conventions

- All targets are namespaced by app abbreviation to avoid collisions
- Sub-makefiles are explicitly included in the root Makefile
- Common pattern: `{prefix}-backend-run`, `{prefix}-frontend-dev`, `{prefix}-docker-build`

| App               | Prefix |
|-------------------|--------|
| language-learning | ll     |
| personal-finance  | pf     |
| emrooz (site)     | emrooz |
