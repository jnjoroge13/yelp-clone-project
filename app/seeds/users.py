from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username='Demo', email='demo@aa.io', password='password')
    user2 = User(
        username='marnie', email='marnie@aa.io', password='password')
    user3 = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    user4 = User(
        username='jesse', email='jesse@aa.io', password='password')
    user5 = User(
        username='mike', email='mike@aa.io', password='password')
    user6 = User(
        username='michelle', email='michelle@aa.io', password='password')
    user7 = User(
        username='iman', email='iman@aa.io', password='password')
    user8 = User(
        username='joy', email='joy@aa.io', password='password')
    user9 = User(
        username='george', email='george@aa.io', password='password')
    user10 = User(
        username='esther', email='esther@aa.io', password='password')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
