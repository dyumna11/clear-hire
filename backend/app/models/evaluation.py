from datetime import datetime

from sqlalchemy import ForeignKey, String, Text, DateTime, Float, JSON, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Evaluation(Base):
    __tablename__ = "evaluations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    assessment_id: Mapped[int] = mapped_column(
        ForeignKey("assessments.id"),
        unique=True,
        nullable=False,
    )

    technical_rating: Mapped[float]
    problem_solving_rating: Mapped[float]
    communication_rating: Mapped[float]

    strengths: Mapped[str] = mapped_column(Text)
    weaknesses: Mapped[str] = mapped_column(Text)

    recommendation: Mapped[str] = mapped_column(String(30))
    reasoning: Mapped[str] = mapped_column(Text)

    confidence_score: Mapped[float]

    match_percentage: Mapped[float] = mapped_column(
        Float,
        default=0.0,
    )

    matched_skills: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    missing_skills: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    mandatory_requirements_met: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    rubric_version: Mapped[int | None] = mapped_column(
        Integer,
        default=1,
    )

    personalized_feedback: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    suggested_topics: Mapped[list | None] = mapped_column(
        JSON,
        nullable=True,
        default=list,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.now,
    )

    assessment = relationship(
        "Assessment",
        back_populates="evaluation",
    )