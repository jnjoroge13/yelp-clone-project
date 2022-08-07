import imp
from app.models import Review
from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required, current_user
from app.forms.new_review_form import AddReview
from app.forms.edit_review_form import EditReview


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def all_reviews():
    reviews = Review.query.all()
    return{'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/', methods=['POST'])
@login_required
def add_review():
    form = AddReview()

    review = Review(
        userId = form.data['userId'],
        businessId = form.data['businessId'],
        rating = form.data['rating'],
        review = form.data['review']
    )
    db.session.add(review)
    db.session.commit()
    # print('PLAY LIST!!!!!!!!!!!!!!!!!!', review.to_dict())
    return review.to_dict()


@review_routes.route('/businessId/<int:business_id>')
# @login_required
def reviews(business_id):
    # print(search_value)
    reviews = Review.query.filter(Review.businessId==business_id).all()
    # (print('---------------------------------',review, '---------------------------------') for review in reviews)
    return {'reviews':[review.to_dict() for review in reviews]}


@review_routes.route('/reviewId/<int:review_id>')
@login_required
def one_review(review_id):
    review = Review.query.get(review_id)
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', review)

    return review.to_dict()


@review_routes.route('/reviewId/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', review_id)
    review = Review.query.get(review_id)
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', playlist.to_dict())
    form = EditReview()
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', form.data)
    review.rating = form.data['rating'],
    review.review = form.data['review'],
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    db.session.delete(review)
    db.session.commit()
