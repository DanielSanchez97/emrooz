include apps/language-learning/backend/Makefile
include apps/language-learning/frontend/Makefile
include apps/personal-finance/backend/Makefile
include apps/personal-finance/frontend/Makefile
include apps/instagram-analyzer/frontend/Makefile
include packaging/language-learning/Makefile
include packaging/personal-finance/Makefile
include packaging/instagram-analyzer/Makefile
include sites/emrooz/Makefile
include infrastructure/Makefile

SHELL := /bin/bash

###########################
# TOP LEVEL COMMANDS
###########################

help:
	@echo ""
	@echo "=== Language Learning ==="
	@echo "  ll-backend-run       Run backend (FastAPI :8001)"
	@echo "  ll-backend-install   Install Python deps"
	@echo "  ll-backend-lint      Lint backend"
	@echo "  ll-frontend-dev      Run frontend (Vite :3001)"
	@echo "  ll-frontend-install  Install Node deps"
	@echo "  ll-frontend-build    Build frontend"
	@echo ""
	@echo "=== Personal Finance ==="
	@echo "  pf-backend-run       Run backend (FastAPI :8002)"
	@echo "  pf-backend-install   Install Python deps"
	@echo "  pf-backend-lint      Lint backend"
	@echo "  pf-frontend-dev      Run frontend (Vite :3002)"
	@echo "  pf-frontend-install  Install Node deps"
	@echo "  pf-frontend-build    Build frontend"
	@echo ""
	@echo "=== Instagram Analyzer ==="
	@echo "  ia-frontend-dev      Run frontend (Vite :3003)"
	@echo "  ia-frontend-install  Install Node deps"
	@echo "  ia-frontend-build    Build frontend"
	@echo "  ia-frontend-lint     Lint frontend"
	@echo ""
	@echo "=== Sites ==="
	@echo "  emrooz-dev           Run emrooz site (Astro :4321)"
	@echo "  emrooz-build         Build emrooz site"
	@echo ""
	@echo "=== Docker ==="
	@echo "  ll-docker-build      Build language-learning containers"
	@echo "  pf-docker-build      Build personal-finance containers"
	@echo "  ia-docker-build      Build instagram-analyzer container"
	@echo ""
	@echo "=== Infrastructure (Terraform on AWS) ==="
	@echo "  tf-bootstrap-apply   One-time: create remote-state bucket + lock table"
	@echo "  tf-init              Init main Terraform root"
	@echo "  tf-plan              Plan changes"
	@echo "  tf-apply             Apply changes"
	@echo "  tf-output            Show outputs"
	@echo "  tf-fmt-check         Verify HCL formatting"
	@echo "  emrooz-deploy        Build + deploy emrooz.io"
	@echo "  ia-deploy            Build + deploy iga.emrooz.io"
	@echo "  deploy-all           Deploy both sites"
	@echo ""
	@echo "=== Utilities ==="
	@echo "  lint-all             Lint everything"
	@echo "  install-all          Install all dependencies"
	@echo ""

install-all: ll-backend-install ll-frontend-install pf-backend-install pf-frontend-install ia-frontend-install emrooz-install

lint-all:
	./scripts/lint-all.sh
