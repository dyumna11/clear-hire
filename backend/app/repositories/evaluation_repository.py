from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.campaign import Campaign
from app.models.candidate import Candidate
from app.models.evaluation import Evaluation


def create_evaluation(db: Session, evaluation: Evaluation):
    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)
    return evaluation


def get_evaluations(db: Session, company_id: int):
    return (
        db.query(Evaluation)
        .join(Assessment)
        .join(Candidate)
        .join(Campaign)
        .filter(Campaign.company_id == company_id)
        .all()
    )


def get_evaluation_by_id(
    db: Session,
    evaluation_id: int,
    company_id: int,
):
    return (
        db.query(Evaluation)
        .join(Assessment)
        .join(Candidate)
        .join(Campaign)
        .filter(
            Evaluation.id == evaluation_id,
            Campaign.company_id == company_id,
        )
        .first()
    )


def update_evaluation(
    db: Session,
    evaluation: Evaluation,
):
    db.commit()
    db.refresh(evaluation)
    return evaluation


def delete_evaluation(
    db: Session,
    evaluation: Evaluation,
):
    db.delete(evaluation)
    db.commit()