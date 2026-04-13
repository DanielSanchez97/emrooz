FROM node:22-slim AS build

WORKDIR /app
COPY apps/personal-finance/frontend/package*.json ./
RUN npm ci
COPY apps/personal-finance/frontend ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
