from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Recruiter(Base):
    __tablename__ = "recruiters"

    id: Mapped[int] = mapped_column(primary_key=True)

    company_id: Mapped[int] = mapped_column(
        ForeignKey("companies.id")
    )

    name: Mapped[str] = mapped_column(String(255))

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True
    )

    password_hash: Mapped[str] = mapped_column(String(255))

    role: Mapped[str] = mapped_column(
        String(50),
        default="recruiter"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    company = relationship(
        "Company",
        back_populates="recruiters"
    )