import imp
from app.models import Business, business
from flask import Blueprint, jsonify
from app.models import db
from flask_login import login_required, current_user
from app.forms.new_business_form import AddBusiness


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
        address=form.data['address'],
        city=form.data['city'],
        state=form.data['state'],
        zipCode=form.data['zipCode'],
        phoneNumber=form.data['phoneNumber'],
        priceRange=form.data['priceRange'],
        hours=form.data['hours'],
        user_Id=current_user.id,
    )
    db.session.add(business)
    db.session.commit()
    # print('PLAY LIST!!!!!!!!!!!!!!!!!!', business.to_dict())
    return business.to_dict()
