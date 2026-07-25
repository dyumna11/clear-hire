from datetime import datetime

from sqlalchemy import ForeignKey, String, Text, DateTime, Float
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

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.now,
    )

    assessment = relationship(
        "Assessment",
        back_populates="evaluation",
    )