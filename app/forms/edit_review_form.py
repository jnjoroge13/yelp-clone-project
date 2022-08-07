from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class EditReview(FlaskForm):

    rating = IntegerField('Rating', validators=[DataRequired()])
    review = TextAreaField('Review', validators=[DataRequired()])
    submit = SubmitField('Submit')
