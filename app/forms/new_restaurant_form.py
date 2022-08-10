from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class AddRestaurant(FlaskForm):

    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    cuisine = StringField('Cuisine', validators=[DataRequired()])
    image = StringField('Image', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    lat = StringField('lat', validators=[DataRequired()])
    lng = StringField('lng', validators=[DataRequired()])
    zipCode = StringField('Zip Code', validators=[DataRequired()])
    phoneNumber = StringField('Phone Number', validators=[DataRequired()])
    priceRange = StringField('Price Range', validators=[DataRequired()])
    hours = StringField('Hours', validators=[DataRequired()])
    submit = SubmitField('Submit')
