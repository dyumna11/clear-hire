from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.auth import RecruiterLogin

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.models.recruiter import Recruiter
from app.repositories.auth_repository import (
    create_recruiter,
    get_recruiter_by_email,
)
from app.schemas.auth import RecruiterRegister


def register_recruiter(
    db: Session,
    recruiter: RecruiterRegister,
):
    existing = get_recruiter_by_email(
        db,
        recruiter.email,
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    db_recruiter = Recruiter(
        company_id=recruiter.company_id,
        name=recruiter.name,
        email=recruiter.email,
        password_hash=hash_password(
            recruiter.password
        ),
        role="recruiter",
    )

    return create_recruiter(
        db,
        db_recruiter,
    )


def login_recruiter(
    db: Session,
    recruiter: RecruiterLogin,
):
    db_recruiter = get_recruiter_by_email(
        db,
        recruiter.email,
    )

    if not db_recruiter:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not verify_password(
        recruiter.password,
        db_recruiter.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    token = create_access_token(
        {
            "sub": db_recruiter.email,
            "id": db_recruiter.id,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }