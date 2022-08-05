import imp
from app.models import Business, business
from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required, current_user
from app.forms.new_business_form import AddBusiness
from app.s3 import (allowed_file, get_unique_filename, upload_file_to_s3, delete_object_from_bucket)


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

@business_routes.route("/image", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        print('----------error #1-----------')
        return {"errors": "image required"}, 400

    print('line50',request.files)

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
