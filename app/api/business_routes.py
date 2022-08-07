import imp
from app.models import Business
from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required, current_user
from app.forms.new_business_form import AddBusiness
from app.s3 import (allowed_file, get_unique_filename,
                    upload_file_to_s3, delete_object_from_bucket)


business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
def businesses():
    businesses = Business.query.all()
    return{'businesses': [business.to_dict() for business in businesses]}


@business_routes.route('/', methods=['POST'])
@login_required
def add_business():
    form = AddBusiness()

    business = Business(
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
    db.session.add(business)
    db.session.commit()
    # print('PLAY LIST!!!!!!!!!!!!!!!!!!', business.to_dict())
    return business.to_dict()


@business_routes.route('/<int:business_id>')
# @login_required
def business(business_id):
    # print(search_value)
    business = Business.query.get(business_id)
    print('---------------------------------',
          business, '---------------------------------')
    return business.to_dict()


@business_routes.route('/<int:business_id>', methods=['PUT'])
@login_required
def update_business(business_id):
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', business_id)
    business = Business.query.get(business_id)
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', playlist.to_dict())
    form = AddBusiness()
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', form.data)
    business.name = form.data['name'],
    business.description = form.data['description'],
    business.cuisine = form.data['cuisine'],
    business.image = form.data['image'],
    business.address = form.data['address'],
    business.city = form.data['city'],
    business.state = form.data['state'],
    business.zipCode = form.data['zipCode'],
    business.phoneNumber = form.data['phoneNumber'],
    business.priceRange = form.data['priceRange'],
    business.hours = form.data['hours'],
    db.session.commit()
    return business.to_dict()


@business_routes.route('/<int:business_id>', methods=['DELETE'])
@login_required
def delete_business(business_id):
    business = Business.query.get(business_id)
    db.session.delete(business)
    db.session.commit()




@business_routes.route("/image", methods=["POST"])
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
        print('----------error #3-----------', upload, '--------')
        return upload, 400

    print('-------upload-Working-------', upload, '-----------------')

    url = upload["url"]

    return {"image": url}


@business_routes.route("/image", methods=["DELETE"])
@login_required
def delete_image():
    source = request.form["image"]
    splitsource = source.split('/')
    # print('------splitsource-------', splitsource[3])
    response = delete_object_from_bucket(splitsource[3])
    # print('------response-------', response)
    return response
