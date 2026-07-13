from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Company(Base):
    __tablename__ = "companies"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    name: Mapped[str] = mapped_column(String(255), nullable=False)

    industry: Mapped[str] = mapped_column(String(255), nullable=False)

    website: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    recruiters = relationship(
        "Recruiter",
        back_populates="company",
        cascade="all, delete-orphan"
    )

    campaigns = relationship(
        "Campaign",
        back_populates="company",
        cascade="all, delete-orphan"
    )