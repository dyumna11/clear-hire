from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.assessment import (
    AssessmentCreate,
    AssessmentResponse,
    AssessmentUpdate,
)
from app.services.assessment_service import (
    create_new_assessment,
    get_all_assessments,
    get_single_assessment,
    update_existing_assessment,
    delete_existing_assessment,
)
from app.services.auth_service import get_current_recruiter
from app.models.recruiter import Recruiter
from app.schemas.candidate_access_token import CandidateAccessTokenResponse
from app.services.candidate_token_service import generate_feedback_token_service

router = APIRouter(prefix="/assessments", tags=["Assessments"])


@router.post("/", response_model=AssessmentResponse)
def create_assessment(
    assessment: AssessmentCreate,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return create_new_assessment(
        db,
        assessment,
        recruiter,
    )


@router.get("/", response_model=List[AssessmentResponse])
def get_assessments(
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return get_all_assessments(
        db,
        recruiter,
    )


@router.get("/{assessment_id}", response_model=AssessmentResponse)
def get_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return get_single_assessment(
        db,
        assessment_id,
        recruiter,
    )


@router.put("/{assessment_id}", response_model=AssessmentResponse)
def update_assessment(
    assessment_id: int,
    assessment: AssessmentUpdate,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return update_existing_assessment(
        db,
        assessment_id,
        assessment,
        recruiter,
    )


@router.delete("/{assessment_id}")
def delete_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return delete_existing_assessment(
        db,
        assessment_id,
        recruiter,
    )


@router.post(
    "/{assessment_id}/feedback-token",
    response_model=CandidateAccessTokenResponse,
)
def generate_feedback_token(
    assessment_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return generate_feedback_token_service(
        db,
        assessment_id,
        recruiter,
    )