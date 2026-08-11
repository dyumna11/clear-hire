from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, JSON, String, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from app.models.candidate import Candidate


from app.core.database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id: Mapped[int] = mapped_column(primary_key=True)

    company_id: Mapped[int] = mapped_column(
        ForeignKey("companies.id"),
        nullable=False
    )

    title: Mapped[str] = mapped_column(String(255), nullable=False)

    department: Mapped[str] = mapped_column(String(100))

    assessment_source: Mapped[str] = mapped_column(String(100))

    status: Mapped[str] = mapped_column(
        String(50),
        default="Draft"
    )

    transparency_policy: Mapped[dict] = mapped_column(
        JSON,
        default=dict
    )

    evaluation_mapping: Mapped[dict] = mapped_column(
        JSON,
        default=dict
    )

    job_description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    hiring_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    evaluation_parameters: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True
    )

    evaluation_rubric: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True
    )

    rubric_status: Mapped[str | None] = mapped_column(
        String(50),
        default="draft",
        nullable=True
    )

    rubric_version: Mapped[int | None] = mapped_column(
        Integer,
        default=0,
        nullable=True
    )

    rubric_generated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    rubric_approved_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    company = relationship(
        "Company",
        back_populates="campaigns"
    )

    candidates = relationship(
    "Candidate",
    back_populates="campaign",
    cascade="all, delete-orphan",
)