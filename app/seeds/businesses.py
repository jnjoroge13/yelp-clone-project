from app.models import db, Business


# Adds a demo user, you can add other businesses here if you want
def seed_businesses():
    demo = Business(
        username='Demo', email='demo@aa.io', password='password')
    marnie = Business(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = Business(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the businesses table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
