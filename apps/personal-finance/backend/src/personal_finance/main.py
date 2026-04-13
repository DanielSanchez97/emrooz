from fastapi import FastAPI

app = FastAPI(title="Personal Finance API")


@app.get("/health")
async def health():
    return {"status": "ok"}
