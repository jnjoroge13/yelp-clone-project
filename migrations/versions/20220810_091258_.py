"""empty message

Revision ID: e85c6d528b97
Revises: 
Create Date: 2022-08-10 09:12:58.940375

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e85c6d528b97'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profileImage', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('restaurants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('image', sa.String(length=355), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('cuisine', sa.String(length=50), nullable=False),
    sa.Column('address', sa.String(length=355), nullable=False),
    sa.Column('lat', sa.String(length=355), nullable=False),
    sa.Column('lng', sa.String(length=355), nullable=False),
    sa.Column('zipCode', sa.String(length=10), nullable=False),
    sa.Column('phoneNumber', sa.String(length=15), nullable=False),
    sa.Column('priceRange', sa.String(length=4), nullable=False),
    sa.Column('hours', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('restaurantId', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('review', sa.Text(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['restaurantId'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('restaurants')
    op.drop_table('users')
    # ### end Alembic commands ###