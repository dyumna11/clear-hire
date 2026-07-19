from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.auth_service import (
    get_current_recruiter,
    oauth2_scheme,
)
from app.schemas.candidate import (
    CandidateCreate,
    CandidateResponse,
    CandidateUpdate,
)
from app.services.candidate_service import (
    create_candidate_service,
    delete_candidate_service,
    get_candidate_service,
    get_candidates_service,
    update_candidate_service,
)

router = APIRouter(prefix="/candidates", tags=["Candidates"])


@router.post("/", response_model=CandidateResponse)
def create_candidate(
    candidate: CandidateCreate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    recruiter = get_current_recruiter(db, token)

    result = create_candidate_service(
        db,
        candidate,
        recruiter,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Campaign not found",
        )

    return result


@router.get(
    "/campaign/{campaign_id}",
    response_model=list[CandidateResponse],
)
def get_candidates(
    campaign_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    recruiter = get_current_recruiter(db, token)

    return get_candidates_service(
        db,
        campaign_id,
        recruiter,
    )


@router.get(
    "/{candidate_id}",
    response_model=CandidateResponse,
)
def get_candidate(
    candidate_id: int,
    campaign_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    recruiter = get_current_recruiter(db, token)

    candidate = get_candidate_service(
        db,
        candidate_id,
        campaign_id,
        recruiter,
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    return candidate


@router.put(
    "/{candidate_id}",
    response_model=CandidateResponse,
)
def update_candidate(
    candidate_id: int,
    campaign_id: int,
    candidate: CandidateUpdate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    recruiter = get_current_recruiter(db, token)

    result = update_candidate_service(
        db,
        candidate_id,
        campaign_id,
        candidate,
        recruiter,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    return result


@router.delete("/{candidate_id}")
def delete_candidate(
    candidate_id: int,
    campaign_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    recruiter = get_current_recruiter(db, token)

    success = delete_candidate_service(
        db,
        candidate_id,
        campaign_id,
        recruiter,
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    return {"success": True}