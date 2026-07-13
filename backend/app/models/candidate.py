from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id: Mapped[int] = mapped_column(primary_key=True)

    campaign_id: Mapped[int] = mapped_column(
        ForeignKey("campaigns.id"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(String(255))

    email: Mapped[str] = mapped_column(
        String(255),
        index=True
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="Pending"
    )

    scores: Mapped[dict] = mapped_column(
        JSON,
        default=dict
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    campaign = relationship(
        "Campaign",
        back_populates="candidates"
    )