from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.auth import (
    RecruiterRegister,
    RecruiterResponse,
    RecruiterLogin,
    Token,
)

from app.services.auth_service import (
    register_recruiter,
    login_recruiter,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=RecruiterResponse,
)
def register(
    recruiter: RecruiterRegister,
    db: Session = Depends(get_db),
):
    return register_recruiter(
        db,
        recruiter,
    )
@router.post(
    "/login",
    response_model=Token,
)
def login(
    recruiter: RecruiterLogin,
    db: Session = Depends(get_db),
):
    return login_recruiter(
        db,
        recruiter,
    )