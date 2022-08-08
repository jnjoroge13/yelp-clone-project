from app.models import db, Restaurant


# Adds a demo user, you can add other restaurants here if you want
def seed_restaurants():
    demo = Restaurant(
        username='Demo', email='demo@aa.io', password='password')
    marnie = Restaurant(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = Restaurant(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the restaurants table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
