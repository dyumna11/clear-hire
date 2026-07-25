from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    company,
    recruiter,
    campaign,
    candidate,
    assessment,
    evaluation,   # ← add this
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(company.router)
api_router.include_router(recruiter.router)
api_router.include_router(campaign.router)
api_router.include_router(candidate.router)
api_router.include_router(assessment.router)
api_router.include_router(evaluation.router)   # ← add this