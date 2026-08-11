import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.candidate_access_token import CandidateAccessToken
from app.models.assessment import Assessment
from app.models.candidate import Candidate
from app.models.campaign import Campaign
from app.models.recruiter import Recruiter


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def generate_feedback_token_service(
    db: Session,
    assessment_id: int,
    recruiter: Recruiter
) -> dict:
    # Verify that assessment exists and belongs to the recruiter's company
    assessment = (
        db.query(Assessment)
        .join(Candidate)
        .join(Campaign)
        .filter(
            Assessment.id == assessment_id,
            Campaign.company_id == recruiter.company_id
        )
        .first()
    )
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found"
        )

    # Invalidate/revoke any previous tokens for this assessment
    db.query(CandidateAccessToken).filter(
        CandidateAccessToken.assessment_id == assessment_id
    ).delete()

    # Generate secure random token
    raw_token = secrets.token_urlsafe(32)
    token_hash = hash_token(raw_token)

    # Set expiration to 7 days from now
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)

    db_token = CandidateAccessToken(
        candidate_id=assessment.candidate_id,
        assessment_id=assessment_id,
        token_hash=token_hash,
        expires_at=expires_at
    )
    db.add(db_token)
    db.commit()

    return {
        "assessment_id": assessment_id,
        "token": raw_token,
        "expires_at": expires_at
    }


def verify_feedback_token_service(
    db: Session,
    assessment_id: int,
    raw_token: str
) -> CandidateAccessToken:
    if not raw_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized candidate feedback access"
        )

    token_hash = hash_token(raw_token)

    # Query token hash
    db_token = (
        db.query(CandidateAccessToken)
        .filter(CandidateAccessToken.token_hash == token_hash)
        .first()
    )

    # Verify token exists and matches the correct assessment
    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized candidate feedback access"
        )

    if db_token.assessment_id != assessment_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized candidate feedback access"
        )

    # Verify expiration
    expires_at = db_token.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized candidate feedback access"
        )

    return db_token
