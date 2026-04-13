ll-backend-install:
	cd apps/language-learning/backend && uv sync

ll-backend-run:
	cd apps/language-learning/backend && uv run uvicorn language_learning.main:app --reload --port 8001

ll-backend-lint:
	cd apps/language-learning/backend && uv run ruff check src/

ll-backend-format:
	cd apps/language-learning/backend && uv run ruff format src/
