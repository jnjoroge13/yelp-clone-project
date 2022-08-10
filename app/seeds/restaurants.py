from app.models import db, Restaurant


# Adds a demo user, you can add other restaurants here if you want
def seed_restaurants():
    bottegaLouie = Restaurant(
        userId=1, name='Bottega Louie', image='https://s3-media0.fl.yelpcdn.com/bphoto/wnawBUv9WbnybmHfnpPexw/o.jpg', description="Bottega Louie Restaurant, Gourmet Market & Patisserie serves fine food daily. Please accept our apologies, but we do not accept reservations.", cuisine='Italian', address='700 S Grand Ave Los Angeles, CA 90017', zipCode='90017', lat='34.047250', lng='-118.256540', phoneNumber='(213) 802-1470', priceRange='$$', hours='8:00 AM - 11:00 PM')

    portos = Restaurant(
        userId=1,
        name="Porto's Bakery & Cafe",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/B3H9dsOSLLb6_yzbvheMew/o.jpg',
        description="Porto's Bakery was born out of Rosa's love for sharing her wonderful cakes and pastries with friends and family. Today the Porto family is still committed to using the finest ingredients from all over the world ensuring that quality remains the cornerstone of the Porto tradition.",
        cuisine='Bakery',
        address='315 N Brand Blvd Glendale, CA 91203',
        zipCode='91203',
        lat='34.150480',
        lng='-118.255470',
        phoneNumber='(818) 956-5996',
        priceRange='$',
        hours='6:30 AM - 8:00 PM')

    perch = Restaurant(
        userId=1,
        name="Perch",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/pmgh2uQYfwBlwqGu_1y8oA/o.jpg',
        description="Perch is an elevated resting place, a whimsical French-inspired rooftop bistro with unobstructed views of the Downtown Los Angeles skyline and mountains in the distance, two outdoor fireplaces and various fire pits. ",
        cuisine='Brunch',
        address='448 S Hill St Los Angeles, CA 90013',
        zipCode='91203',
        lat='34.048860',
        lng='-118.251340',
        phoneNumber='(213) 802-1770',
        priceRange='$$$',
        hours='4:00 PM - 1:00 AM (Next day)')

    rays = Restaurant(
        userId=1,
        name="Howlin' Ray's",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/MJUkD3lWR3-2hO7fZsg_0g/o.jpg',
        description="Nashville Hot Chicken.",
        cuisine='American',
        address='727 N Broadway St 128 Los Angeles, CA 90012',
        zipCode='90012',
        lat='34.061310',
        lng='-118.239326',
        phoneNumber='(213) 935-8399',
        priceRange='$$',
        hours='10:00 AM - 7:00 PM')

    bestia = Restaurant(
        userId=1,
        name="Bestia",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/G_AziiJiP5-KxsMelOtk5A/o.jpg',
        description="Italian fine dining.",
        cuisine='Italian',
        address='2121 E 7th Pl Los Angeles, CA 90021',
        zipCode='91203',
        lat='34.033738',
        lng='-118.2293095',
        phoneNumber='(213) 802-1770',
        priceRange='$$$',
        hours='5:00 PM - 11:00 PM')

    perch = Restaurant(
        userId=1,
        name="Perch",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/pmgh2uQYfwBlwqGu_1y8oA/o.jpg',
        description="Perch is an elevated resting place, a whimsical French-inspired rooftop bistro with unobstructed views of the Downtown Los Angeles skyline and mountains in the distance, two outdoor fireplaces and various fire pits. ",
        cuisine='Brunch',
        address='448 S Hill St Los Angeles, CA 90013',
        zipCode='91203',
        lat='34.048860',
        lng='-118.251340',
        phoneNumber='(213) 802-1770',
        priceRange='$$$',
        hours='4:00 PM - 1:00 AM (Next day)')

    perch = Restaurant(
        userId=1,
        name="Perch",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/pmgh2uQYfwBlwqGu_1y8oA/o.jpg',
        description="Perch is an elevated resting place, a whimsical French-inspired rooftop bistro with unobstructed views of the Downtown Los Angeles skyline and mountains in the distance, two outdoor fireplaces and various fire pits. ",
        cuisine='Brunch',
        address='448 S Hill St Los Angeles, CA 90013',
        zipCode='91203',
        lat='34.048860',
        lng='-118.251340',
        phoneNumber='(213) 802-1770',
        priceRange='$$$',
        hours='4:00 PM - 1:00 AM (Next day)')

    perch = Restaurant(
        userId=1,
        name="Perch",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/pmgh2uQYfwBlwqGu_1y8oA/o.jpg',
        description="Perch is an elevated resting place, a whimsical French-inspired rooftop bistro with unobstructed views of the Downtown Los Angeles skyline and mountains in the distance, two outdoor fireplaces and various fire pits. ",
        cuisine='Brunch',
        address='448 S Hill St Los Angeles, CA 90013',
        zipCode='91203',
        lat='34.048860',
        lng='-118.251340',
        phoneNumber='(213) 802-1770',
        priceRange='$$$',
        hours='4:00 PM - 1:00 AM (Next day)')

    perch = Restaurant(
        userId=1,
        name="Perch",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/pmgh2uQYfwBlwqGu_1y8oA/o.jpg',
        description="Perch is an elevated resting place, a whimsical French-inspired rooftop bistro with unobstructed views of the Downtown Los Angeles skyline and mountains in the distance, two outdoor fireplaces and various fire pits. ",
        cuisine='Brunch',
        address='448 S Hill St Los Angeles, CA 90013',
        zipCode='91203',
        lat='34.048860',
        lng='-118.251340',
        phoneNumber='(213) 802-1770',
        priceRange='$$$',
        hours='4:00 PM - 1:00 AM (Next day)')

    db.session.add(bottegaLouie)
    db.session.add(portos)
    db.session.add(perch)
    db.session.add(rays)
    db.session.add(bestia)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the restaurants table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
