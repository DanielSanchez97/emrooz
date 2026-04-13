#!/bin/bash
set -e

echo "=== Linting Language Learning Backend ==="
cd "$EMROOZ_ROOT/apps/language-learning/backend" && uv run ruff check src/ || true

echo "=== Linting Personal Finance Backend ==="
cd "$EMROOZ_ROOT/apps/personal-finance/backend" && uv run ruff check src/ || true

echo "=== Done ==="
