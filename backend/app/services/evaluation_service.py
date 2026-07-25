from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.campaign import Campaign
from app.models.candidate import Candidate
from app.models.evaluation import Evaluation
from app.models.recruiter import Recruiter

from app.repositories.evaluation_repository import (
    create_evaluation,
    get_evaluations,
    get_evaluation_by_id,
    update_evaluation,
    delete_evaluation,
)

from app.schemas.evaluation import (
    EvaluationCreate,
    EvaluationUpdate,
)
def create_new_evaluation(
    db: Session,
    evaluation: EvaluationCreate,
    recruiter: Recruiter,
):
    assessment = (
        db.query(Assessment)
        .join(Candidate)
        .join(Campaign)
        .filter(
            Assessment.id == evaluation.assessment_id,
            Campaign.company_id == recruiter.company_id,
        )
        .first()
    )

    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    existing = (
        db.query(Evaluation)
        .filter(
            Evaluation.assessment_id == evaluation.assessment_id
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Evaluation already exists for this assessment.",
        )

    new_evaluation = Evaluation(
        **evaluation.model_dump()
    )

    return create_evaluation(db, new_evaluation)
def get_all_evaluations(
    db: Session,
    recruiter: Recruiter,
):
    return get_evaluations(db, recruiter.company_id)
def get_single_evaluation(
    db: Session,
    evaluation_id: int,
    recruiter: Recruiter,
):
    evaluation = get_evaluation_by_id(
        db,
        evaluation_id,
        recruiter.company_id,
    )

    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )

    return evaluation
def update_existing_evaluation(
    db: Session,
    evaluation_id: int,
    evaluation_update: EvaluationUpdate,
    recruiter: Recruiter,
):
    evaluation = get_evaluation_by_id(
        db,
        evaluation_id,
        recruiter.company_id,
    )

    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )

    for key, value in evaluation_update.model_dump(
        exclude_unset=True
    ).items():
        setattr(evaluation, key, value)

    return update_evaluation(db, evaluation)
def delete_existing_evaluation(
    db: Session,
    evaluation_id: int,
    recruiter: Recruiter,
):
    evaluation = get_evaluation_by_id(
        db,
        evaluation_id,
        recruiter.company_id,
    )

    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )

    delete_evaluation(db, evaluation)