from fastapi import FastAPI

app = FastAPI(
    title="ClearHire API",
    version="1.0.0",
    description="Explainable Hiring Platform"
)


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