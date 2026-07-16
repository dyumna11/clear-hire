from sqlalchemy.orm import Session

from app.models.recruiter import Recruiter


def get_recruiter_by_email(
    db: Session,
    email: str
):
    return (
        db.query(Recruiter)
        .filter(Recruiter.email == email)
        .first()
    )


def create_recruiter(
    db: Session,
    recruiter: Recruiter
):
    db.add(recruiter)
    db.commit()
    db.refresh(recruiter)

    return recruiter

def get_recruiter_by_id(
    db: Session,
    recruiter_id: int,
):
    return (
        db.query(Recruiter)
        .filter(Recruiter.id == recruiter_id)
        .first()
    )