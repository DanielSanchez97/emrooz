from fastapi import FastAPI

app = FastAPI(title="Language Learning API")


@app.get("/health")
async def health():
    return {"status": "ok"}
