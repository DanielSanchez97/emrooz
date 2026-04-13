pf-backend-install:
	cd apps/personal-finance/backend && uv sync

pf-backend-run:
	cd apps/personal-finance/backend && uv run uvicorn personal_finance.main:app --reload --port 8002

pf-backend-lint:
	cd apps/personal-finance/backend && uv run ruff check src/

pf-backend-format:
	cd apps/personal-finance/backend && uv run ruff format src/
