# import imp
import os
from app.models import Restaurant
from flask import Blueprint, request
from app.models import db
from flask_login import login_required, current_user
from app.forms.new_restaurant_form import AddRestaurant
from app.s3 import (allowed_file, get_unique_filename,
                    upload_file_to_s3, delete_object_from_bucket)


restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/')
def restaurants():
    restaurants = Restaurant.query.all()
    return{'restaurants': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('/', methods=['POST'])
@login_required
def add_restaurant():
    form = AddRestaurant()

    restaurant = Restaurant(
        name=form.data['name'],
        description=form.data['description'],
        cuisine=form.data['cuisine'],
        image=form.data['image'],
        address=form.data['address'],
        lat=form.data['lat'],
        lng=form.data['lng'],
        zipCode=form.data['zipCode'],
        phoneNumber=form.data['phoneNumber'],
        priceRange=form.data['priceRange'],
        hours=form.data['hours'],
        userId=current_user.id,
    )
    db.session.add(restaurant)
    db.session.commit()
    # print('PLAY LIST!!!!!!!!!!!!!!!!!!', restaurant.to_dict())
    return restaurant.to_dict()


@restaurant_routes.route('/<int:restaurant_id>')
# @login_required
def restaurant(restaurant_id):
    # print(search_value)
    restaurant = Restaurant.query.get(restaurant_id)
    print('---------------------------------',
          restaurant, '---------------------------------')
    return restaurant.to_dict()


@restaurant_routes.route('/<int:restaurant_id>', methods=['PUT'])
@login_required
def update_restaurant(restaurant_id):
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', restaurant_id)
    restaurant = Restaurant.query.get(restaurant_id)
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', restaurant.to_dict())
    form = AddRestaurant()
    restaurant.name=form.data['name'],
    restaurant.description=form.data['description'],
    restaurant.cuisine=form.data['cuisine'],
    restaurant.image=form.data['image'],
    restaurant.address=form.data['address'],
    restaurant.lat=form.data['lat'],
    restaurant.lng=form.data['lng'],
    restaurant.zipCode=form.data['zipCode'],
    restaurant.phoneNumber=form.data['phoneNumber'],
    restaurant.priceRange=form.data['priceRange'],
    restaurant.hours=form.data['hours'],
    db.session.commit()
    return restaurant.to_dict()


@restaurant_routes.route('/<int:restaurant_id>', methods=['DELETE'])
@login_required
def delete_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    db.session.delete(restaurant)
    db.session.commit()

@restaurant_routes.route('/googlemapapi', methods=['GET'])
def get_google_map_api():
    # print('------------',os.environ.get('GOOGLE_MAPS_API_KEY'))
    return {'googleMapsAPIKey': os.environ.get('GOOGLE_MAPS_API_KEY')}






@restaurant_routes.route("/image", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        print('----------error #1-----------')
        return {"errors": "image required"}, 400

    print('line50', request.files)

    image = request.files["image"]
    print('--------image--------', image)

    if not allowed_file(image.filename):
        print('----------error #2-----------')
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print('----------error #3-----------', upload, '--------')
    if "url" not in upload:
        print('----------error #4-----------', upload, '--------')
        return upload, 400

    print('-------upload-Working-------', upload, '-----------------')

    url = upload["url"]

    return {"image": url}


# @restaurant_routes.route("/image", methods=["DELETE"])
# @login_required
# def delete_image():
#     source = request.form["image"]
#     splitsource = source.split('/')
#     # print('------splitsource-------', splitsource[3])
#     response = delete_object_from_bucket(splitsource[3])
#     # print('------response-------', response)
#     return response
