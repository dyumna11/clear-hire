from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.candidate import Candidate
from app.models.campaign import Campaign
from app.models.recruiter import Recruiter

from app.repositories.assessment_repository import (
    create_assessment,
    get_assessment_by_id,
    get_assessments,
    update_assessment,
    delete_assessment,
)

from app.schemas.assessment import (
    AssessmentCreate,
    AssessmentUpdate,
)


def create_new_assessment(
    db: Session,
    assessment: AssessmentCreate,
    recruiter: Recruiter,
):
    # Verify candidate belongs to the recruiter's company
    candidate = (
        db.query(Candidate)
        .join(Campaign)
        .filter(
            Candidate.id == assessment.candidate_id,
            Campaign.company_id == recruiter.company_id,
        )
        .first()
    )

    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found",
        )

    # Prevent duplicate assessments for the same round
    existing = (
        db.query(Assessment)
        .filter(
            Assessment.candidate_id == assessment.candidate_id,
            Assessment.assessment_round == assessment.assessment_round,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Assessment for this round already exists.",
        )

    # Calculate overall score on the backend
    overall_score = round(
        (
            assessment.coding_score * 0.50
            + assessment.mcq_score * 0.20
            + assessment.problem_solving_score * 0.20
            + assessment.communication_score * 0.10
        )
    )

    new_assessment = Assessment(
        **assessment.model_dump(exclude={"overall_score"}),
        overall_score=overall_score,
    )

    return create_assessment(db, new_assessment)


def get_all_assessments(
    db: Session,
    recruiter: Recruiter,
):
    return get_assessments(
        db,
        recruiter.company_id,
    )


def get_single_assessment(
    db: Session,
    assessment_id: int,
    recruiter: Recruiter,
):
    assessment = get_assessment_by_id(
    db,
    assessment_id,
    recruiter.company_id,
)

    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    return assessment


def update_existing_assessment(
    db: Session,
    assessment_id: int,
    assessment_update: AssessmentUpdate,
    recruiter: Recruiter,
):
    assessment = get_assessment_by_id(
    db,
    assessment_id,
    recruiter.company_id,
)

    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    for key, value in assessment_update.model_dump(
        exclude_unset=True
    ).items():
        setattr(assessment, key, value)

    return update_assessment(db, assessment)


def delete_existing_assessment(
    db: Session,
    assessment_id: int,
    recruiter: Recruiter,
):
    assessment = get_assessment_by_id(
    db,
    assessment_id,
    recruiter.company_id,
)

    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    delete_assessment(db, assessment)

    return {"message": "Assessment deleted successfully"}