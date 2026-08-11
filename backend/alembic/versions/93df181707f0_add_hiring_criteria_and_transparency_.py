"""add_hiring_criteria_and_transparency_fields

Revision ID: 93df181707f0
Revises: acc2f426b41d
Create Date: 2026-08-12 02:09:18.475303

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '93df181707f0'
down_revision: Union[str, Sequence[str], None] = 'acc2f426b41d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add columns to campaigns
    op.add_column('campaigns', sa.Column('evaluation_parameters', sa.JSON(), nullable=True))
    op.add_column('campaigns', sa.Column('rubric_status', sa.String(length=50), nullable=True, server_default='draft'))
    op.add_column('campaigns', sa.Column('rubric_version', sa.Integer(), nullable=True, server_default='0'))
    op.add_column('campaigns', sa.Column('rubric_approved_at', sa.DateTime(timezone=True), nullable=True))

    # Add columns to evaluations
    op.add_column('evaluations', sa.Column('personalized_feedback', sa.Text(), nullable=True))
    op.add_column('evaluations', sa.Column('suggested_topics', sa.JSON(), nullable=True))

    # Create candidate_access_tokens table
    op.create_table(
        'candidate_access_tokens',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('candidate_id', sa.Integer(), sa.ForeignKey('candidates.id', ondelete='CASCADE'), nullable=False),
        sa.Column('assessment_id', sa.Integer(), sa.ForeignKey('assessments.id', ondelete='CASCADE'), nullable=False),
        sa.Column('token_hash', sa.String(length=255), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_candidate_access_tokens_token_hash', 'candidate_access_tokens', ['token_hash'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('ix_candidate_access_tokens_token_hash', table_name='candidate_access_tokens')
    op.drop_table('candidate_access_tokens')
    op.drop_column('evaluations', 'suggested_topics')
    op.drop_column('evaluations', 'personalized_feedback')
    op.drop_column('campaigns', 'rubric_approved_at')
    op.drop_column('campaigns', 'rubric_version')
    op.drop_column('campaigns', 'rubric_status')
    op.drop_column('campaigns', 'evaluation_parameters')
