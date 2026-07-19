from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id: Mapped[int] = mapped_column(primary_key=True)

    candidate_id: Mapped[int] = mapped_column(
        ForeignKey("candidates.id")
    )

    assessment_round: Mapped[str] = mapped_column(
        String(100)
    )

    assessment_source: Mapped[str] = mapped_column(
        String(100)
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="Pending",
    )

    coding_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    mcq_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    problem_solving_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    communication_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    overall_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    duration_minutes: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    submitted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    candidate = relationship(
        "Candidate",
        back_populates="assessments",
    )