from .db import db
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=False)
    createdAt  = db.Column(db.DateTime, default=func.now())

    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'businessId': self.businessId,
            'rating': self.rating,
            'review': self.review,
            'createdAt': self.createdAt
        }
