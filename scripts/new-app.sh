#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: new-app.sh <app-name>"
    echo "Example: new-app.sh recipe-manager"
    exit 1
fi

APP_NAME="$1"
APP_DIR="apps/$APP_NAME"
PYTHON_MODULE=$(echo "$APP_NAME" | tr '-' '_')

if [ -d "$APP_DIR" ]; then
    echo "Error: $APP_DIR already exists"
    exit 1
fi

echo "Scaffolding new app: $APP_NAME"

# Backend
mkdir -p "$APP_DIR/backend/src/$PYTHON_MODULE"
touch "$APP_DIR/backend/src/$PYTHON_MODULE/__init__.py"

cat > "$APP_DIR/backend/src/$PYTHON_MODULE/main.py" << 'PYEOF'
from fastapi import FastAPI

app = FastAPI(title="APP_TITLE API")


@app.get("/health")
async def health():
    return {"status": "ok"}
PYEOF

sed -i '' "s/APP_TITLE/$APP_NAME/" "$APP_DIR/backend/src/$PYTHON_MODULE/main.py"

cat > "$APP_DIR/backend/pyproject.toml" << TOMLEOF
[project]
name = "$APP_NAME"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.30.0",
    "pydantic>=2.0.0",
]

[tool.uv.sources]
emrooz-common = { path = "../../../libs/python/emrooz_common", editable = true }

[tool.ruff]
src = ["src"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
TOMLEOF

# Frontend
mkdir -p "$APP_DIR/frontend/src"

cat > "$APP_DIR/frontend/src/App.tsx" << TSXEOF
function App() {
  return (
    <div>
      <h1>$APP_NAME</h1>
    </div>
  );
}

export default App;
TSXEOF

echo ""
echo "Created $APP_DIR with backend + frontend stubs."
echo "Next steps:"
echo "  1. Add Makefiles for the new app"
echo "  2. Add include lines to the root Makefile"
echo "  3. Pick ports (check docs/architecture.md for conventions)"
