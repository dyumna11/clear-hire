from sqlalchemy.orm import Session

from app.models.candidate import Candidate
from app.models.recruiter import Recruiter
from app.repositories.campaign_repository import get_campaign_by_id
from app.repositories.candidate_repository import (
    create_candidate,
    delete_candidate,
    get_candidate_by_id,
    get_candidates,
    update_candidate,
)


def create_candidate_service(
    db: Session,
    candidate,
    recruiter: Recruiter,
):
    # Ensure the campaign belongs to the recruiter's company
    campaign = get_campaign_by_id(
        db,
        candidate.campaign_id,
        recruiter.company_id,
    )

    if not campaign:
        return None

    new_candidate = Candidate(
        campaign_id=candidate.campaign_id,
        name=candidate.name,
        email=candidate.email,
        resume_url=candidate.resume_url,
    )

    return create_candidate(db, new_candidate)


def get_candidates_service(
    db: Session,
    campaign_id: int,
    recruiter: Recruiter,
):
    campaign = get_campaign_by_id(
        db,
        campaign_id,
        recruiter.company_id,
    )

    if not campaign:
        return []

    return get_candidates(db, campaign_id)


def get_candidate_service(
    db: Session,
    candidate_id: int,
    campaign_id: int,
    recruiter: Recruiter,
):
    campaign = get_campaign_by_id(
        db,
        campaign_id,
        recruiter.company_id,
    )

    if not campaign:
        return None

    return get_candidate_by_id(
        db,
        candidate_id,
        campaign_id,
    )


def update_candidate_service(
    db: Session,
    candidate_id: int,
    campaign_id: int,
    candidate,
    recruiter: Recruiter,
):
    campaign = get_campaign_by_id(
        db,
        campaign_id,
        recruiter.company_id,
    )

    if not campaign:
        return None

    return update_candidate(
        db,
        candidate_id,
        campaign_id,
        candidate.model_dump(exclude_unset=True),
    )


def delete_candidate_service(
    db: Session,
    candidate_id: int,
    campaign_id: int,
    recruiter: Recruiter,
):
    campaign = get_campaign_by_id(
        db,
        campaign_id,
        recruiter.company_id,
    )

    if not campaign:
        return False

    return delete_candidate(
        db,
        candidate_id,
        campaign_id,
    )