from .db import db


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(355), nullable=False)
    description = db.Column(db.Text, nullable=False)
    cuisine = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(355), nullable=False)
    lat = db.Column(db.String(355), nullable=False)
    lng = db.Column(db.String(355), nullable=False)
    zipCode = db.Column(db.String(10), nullable=False)
    phoneNumber = db.Column(db.String(15), nullable=False)
    priceRange = db.Column(db.String(4), nullable=False)
    hours = db.Column(db.String(100), nullable=False)

    user = db.relationship('User', back_populates='restaurants')
    reviews = db.relationship(
        'Review', back_populates='restaurant', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'name': self.name,
            'description': self.description,
            'cuisine': self.cuisine,
            'image': self.image,
            'address': self.address,
            'lat': self.lat,
            'lng': self.lng,
            'zipCode': self.zipCode,
            'phoneNumber': self.phoneNumber,
            'priceRange': self.priceRange,
            'hours': self.hours,
        }
