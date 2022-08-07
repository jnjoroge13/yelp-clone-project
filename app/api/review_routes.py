import imp
from app.models import Review
from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required, current_user
from app.forms.new_review_form import AddReview


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def reviews():
    reviews = Review.query.all()
    return{'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/', methods=['POST'])
@login_required
def add_review():
    form = Addreview()

    review = Review(
        name=form.data['name'],
        description=form.data['description'],
        cuisine=form.data['cuisine'],
        image=form.data['image'],
        address=form.data['address'],
        city=form.data['city'],
        state=form.data['state'],
        zipCode=form.data['zipCode'],
        phoneNumber=form.data['phoneNumber'],
        priceRange=form.data['priceRange'],
        hours=form.data['hours'],
        userId=current_user.id,
    )
    db.session.add(review)
    db.session.commit()
    # print('PLAY LIST!!!!!!!!!!!!!!!!!!', review.to_dict())
    return review.to_dict()


@review_routes.route('/<int:review_id>')
# @login_required
def review(review_id):
    # print(search_value)
    review = Review.query.get(review_id)
    print('---------------------------------',
          review, '---------------------------------')
    return review.to_dict()


@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', review_id)
    review = Review.query.get(review_id)
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', playlist.to_dict())
    form = Addreview()
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', form.data)
    review.name = form.data['name'],
    review.description = form.data['description'],
    review.cuisine = form.data['cuisine'],
    review.image = form.data['image'],
    review.address = form.data['address'],
    review.city = form.data['city'],
    review.state = form.data['state'],
    review.zipCode = form.data['zipCode'],
    review.phoneNumber = form.data['phoneNumber'],
    review.priceRange = form.data['priceRange'],
    review.hours = form.data['hours'],
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    db.session.delete(review)
    db.session.commit()
