pf-docker-build-backend:
	docker build -f packaging/personal-finance/backend/Dockerfile -t pf-backend .

pf-docker-build-frontend:
	docker build -f packaging/personal-finance/frontend/Dockerfile -t pf-frontend .

pf-docker-build: pf-docker-build-backend pf-docker-build-frontend
