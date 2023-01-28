"""empty message

Revision ID: 3d6a7189519a
Revises: 
Create Date: 2023-01-28 22:06:35.023999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3d6a7189519a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('idFav', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(length=100), nullable=True),
    sa.Column('annonce_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['annonce_id'], ['annonces.annonce_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['personnes.id'], ),
    sa.PrimaryKeyConstraint('idFav')
    )
    with op.batch_alter_table('annonces', schema=None) as batch_op:
        batch_op.drop_column('favorite')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('annonces', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite', sa.BOOLEAN(), nullable=True))

    op.drop_table('favorites')
    # ### end Alembic commands ###
