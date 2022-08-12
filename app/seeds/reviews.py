from app.models import db, Review
# import datetime

# Adds a demo review, you can add other reviews here if you want
def seed_reviews():
    u2r1 = Review(
        userId=2, restaurantId=1, rating=5, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u2r2 = Review(
        userId=2, restaurantId=2, rating=4, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u2r4 = Review(
        userId=2, restaurantId=4, rating=2, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u2r5 = Review(
        userId=2, restaurantId=5, rating=2, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u2r6 = Review(
        userId=2, restaurantId=6, rating=2, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u2r7 = Review(
        userId=2, restaurantId=7, rating=2, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u2r8 = Review(
        userId=2, restaurantId=8, rating=2, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u2r9 = Review(
        userId=2, restaurantId=9, rating=2, review='They had live music playing and the ambiance was on point. Will definitely come back for dinner.')
    u3r1 = Review(
        userId=3, restaurantId=1, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r2 = Review(
        userId=3, restaurantId=2, rating=4, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r3 = Review(
        userId=3, restaurantId=3, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r5 = Review(
        userId=3, restaurantId=5, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r6 = Review(
        userId=3, restaurantId=6, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r7 = Review(
        userId=3, restaurantId=7, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r8 = Review(
        userId=3, restaurantId=8, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r9 = Review(
        userId=3, restaurantId=9, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u3r10 = Review(
        userId=3, restaurantId=10, rating=5, review='Cheap, delicious and fast! What more can you ask for?!')
    u4r1 = Review(
        userId=4, restaurantId=1, rating=5, review="This place does NOT play! I've been here three times now and am still amazed at how  delicious the food is.")
    u4r2 = Review(
        userId=4, restaurantId=2, rating=4, review="This place does NOT play! I've been here three times now and am still amazed at how  delicious the food is.")


    db.session.add(u2r1)
    db.session.add(u2r2)
    db.session.add(u2r4)
    db.session.add(u2r5)
    db.session.add(u2r6)
    db.session.add(u2r7)
    db.session.add(u2r8)
    db.session.add(u3r1)
    db.session.add(u3r2)
    db.session.add(u3r3)
    db.session.add(u3r5)
    db.session.add(u3r6)
    db.session.add(u3r7)
    db.session.add(u3r8)
    db.session.add(u3r9)
    db.session.add(u3r10)
    db.session.add(u4r1)
    db.session.add(u4r2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
