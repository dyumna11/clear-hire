from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.recruiter import Recruiter
from app.schemas.evaluation import (
    EvaluationCreate,
    EvaluationUpdate,
    EvaluationResponse,
)
from app.services.auth_service import get_current_recruiter
from app.services.evaluation_service import (
    create_new_evaluation,
    get_all_evaluations,
    get_single_evaluation,
    update_existing_evaluation,
    delete_existing_evaluation,
)

router = APIRouter(
    prefix="/evaluations",
    tags=["Evaluations"],
)
@router.post("/", response_model=EvaluationResponse)
def create_evaluation(
    evaluation: EvaluationCreate,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return create_new_evaluation(db, evaluation, recruiter)
@router.get("/", response_model=list[EvaluationResponse])
def get_evaluations(
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return get_all_evaluations(db, recruiter)
@router.get("/{evaluation_id}", response_model=EvaluationResponse)
def get_evaluation(
    evaluation_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return get_single_evaluation(
        db,
        evaluation_id,
        recruiter,
    )
@router.put("/{evaluation_id}", response_model=EvaluationResponse)
def update_evaluation(
    evaluation_id: int,
    evaluation: EvaluationUpdate,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    return update_existing_evaluation(
        db,
        evaluation_id,
        evaluation,
        recruiter,
    )
@router.delete("/{evaluation_id}")
def delete_evaluation(
    evaluation_id: int,
    db: Session = Depends(get_db),
    recruiter: Recruiter = Depends(get_current_recruiter),
):
    delete_existing_evaluation(
        db,
        evaluation_id,
        recruiter,
    )
    return {
        "message": "Evaluation deleted successfully"
    }