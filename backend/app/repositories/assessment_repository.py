from sqlalchemy.orm import Session

from app.models.assessment import Assessment


def create_assessment(db: Session, assessment: Assessment):
    db.add(assessment)
    db.commit()
    db.refresh(assessment)
    return assessment


from app.models.candidate import Candidate
from app.models.campaign import Campaign


def get_assessments(
    db: Session,
    company_id: int,
):
    return (
        db.query(Assessment)
        .join(Candidate)
        .join(Campaign)
        .filter(Campaign.company_id == company_id)
        .all()
    )


def get_assessment_by_id(
    db: Session,
    assessment_id: int,
    company_id: int,
):
    return (
        db.query(Assessment)
        .join(Candidate)
        .join(Campaign)
        .filter(
            Assessment.id == assessment_id,
            Campaign.company_id == company_id,
        )
        .first()
    )


def update_assessment(db: Session, assessment: Assessment):
    db.commit()
    db.refresh(assessment)
    return assessment


def delete_assessment(db: Session, assessment: Assessment):
    db.delete(assessment)
    db.commit()