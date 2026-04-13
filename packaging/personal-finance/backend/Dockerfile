FROM python:3.12-slim

RUN pip install uv

WORKDIR /app

COPY libs/python/emrooz_common /app/libs/python/emrooz_common
COPY apps/personal-finance/backend /app/backend

WORKDIR /app/backend
RUN uv sync --frozen

EXPOSE 8002
CMD ["uv", "run", "uvicorn", "personal_finance.main:app", "--host", "0.0.0.0", "--port", "8002"]
