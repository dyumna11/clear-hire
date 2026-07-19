from sqlalchemy.orm import Session

from app.models.candidate import Candidate


def create_candidate(db: Session, candidate: Candidate):
    db.add(candidate)
    db.commit()
    db.refresh(candidate)
    return candidate


def get_candidates(db: Session, campaign_id: int):
    return (
        db.query(Candidate)
        .filter(Candidate.campaign_id == campaign_id)
        .all()
    )


def get_candidate_by_id(
    db: Session,
    candidate_id: int,
    campaign_id: int,
):
    return (
        db.query(Candidate)
        .filter(
            Candidate.id == candidate_id,
            Candidate.campaign_id == campaign_id,
        )
        .first()
    )


def update_candidate(
    db: Session,
    candidate_id: int,
    campaign_id: int,
    data: dict,
):
    candidate = get_candidate_by_id(
        db,
        candidate_id,
        campaign_id,
    )

    if not candidate:
        return None

    for key, value in data.items():
        setattr(candidate, key, value)

    db.commit()
    db.refresh(candidate)

    return candidate


def delete_candidate(
    db: Session,
    candidate_id: int,
    campaign_id: int,
):
    candidate = get_candidate_by_id(
        db,
        candidate_id,
        campaign_id,
    )

    if not candidate:
        return False

    db.delete(candidate)
    db.commit()

    return True