from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from app.core.database import Base


class ExternalAssessment(Base):
    __tablename__ = "external_assessments"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    assessment_id: Mapped[int] = mapped_column(
        ForeignKey("assessments.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    candidate_name: Mapped[str] = mapped_column(String(255), nullable=False)
    assessment_name: Mapped[str] = mapped_column(String(255), nullable=False)
    overall_score: Mapped[int] = mapped_column(Integer, default=0)

    # List of questions with detailed scores and stats
    questions: Mapped[list] = mapped_column(JSON, default=list)

    # Generated follow-up questions
    interview_questions: Mapped[list | None] = mapped_column(JSON, nullable=True)

    # Evidence-backed recruiter report
    evaluation_report: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    assessment = relationship(
        "Assessment",
        back_populates="external_assessment",
    )
