from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.database import get_db
from app.services.auth_service import (
    get_current_recruiter,
)
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
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    recruiter = RecruiterLogin(
        email=form_data.username,
        password=form_data.password,
    )

    return login_recruiter(
        db,
        recruiter,
    )
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)
@router.get(
    "/me",
    response_model=RecruiterResponse,
)
def me(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    return get_current_recruiter(
        db,
        token,
    )