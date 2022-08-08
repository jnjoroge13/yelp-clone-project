from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class AddReview(FlaskForm):

    userId = IntegerField('userId', validators=[DataRequired()])
    restaurantId = IntegerField('restaurantId', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    review = TextAreaField('Review', validators=[DataRequired()])
    submit = SubmitField('Submit')
