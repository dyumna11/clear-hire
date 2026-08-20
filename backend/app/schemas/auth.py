from pydantic import BaseModel, EmailStr


class RecruiterRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    company_id: int | None = None
    company_name: str | None = None
    company_industry: str | None = None


class RecruiterLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class RecruiterResponse(BaseModel):
    id: int
    company_id: int
    name: str
    email: str
    role: str

    model_config = {
        "from_attributes": True
    }