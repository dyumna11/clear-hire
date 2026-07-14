from pydantic import BaseModel, EmailStr


class RecruiterRegister(BaseModel):
    company_id: int
    name: str
    email: EmailStr
    password: str


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