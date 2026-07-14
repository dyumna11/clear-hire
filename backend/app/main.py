from fastapi import FastAPI
from app.api.router import api_router
app = FastAPI(
    title="ClearHire API",
    version="1.0.0",
    description="Explainable Hiring Platform"
)

app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to ClearHire 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }