FROM python:3.12-slim

RUN pip install uv

WORKDIR /app

COPY libs/python/emrooz_common /app/libs/python/emrooz_common
COPY apps/language-learning/backend /app/backend

WORKDIR /app/backend
RUN uv sync --frozen

EXPOSE 8001
CMD ["uv", "run", "uvicorn", "language_learning.main:app", "--host", "0.0.0.0", "--port", "8001"]
