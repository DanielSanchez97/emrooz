# Emrooz App Ideas

Monorepo for personal application projects.

## Structure

```
apps/           Full-stack applications (backend + frontend)
sites/          Static sites and landing pages
libs/           Shared libraries (Python + TypeScript)
packaging/      Docker configurations
scripts/        Internal tooling and shell scripts
docs/           Architecture and guides
```

## Apps

| App | Backend | Frontend | Description |
|-----|---------|----------|-------------|
| language-learning | :8001 | :3001 | Reading/writing-based language learning |
| personal-finance | :8002 | :3002 | Privacy-first personal finance tracking |

## Sites

| Site | Port | Description |
|------|------|-------------|
| emrooz | :4321 | Landing page and project portfolio |

## Quick Start

```bash
source set_env
make help
```

## Tech Stack

- **Backend**: Python (uv, FastAPI, Pydantic)
- **Frontend**: React (Vite, axios, TanStack Query)
- **Sites**: Astro (and any other static site framework)
- **Tooling**: Docker, Make, Shell Scripts
