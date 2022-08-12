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
        userId=2,
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
        hours='4:00 PM - 1:00 AM')

    rays = Restaurant(
        userId=3,
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
        userId=4,
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

    granville = Restaurant(
        userId=5,
        name="GRANVILLE",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/znY6Wq1711cPvOtfKxWZZg/o.jpg',
        description="LA's Favorite Neighborhood Spot Since 2006. Come As You Are!",
        cuisine='American',
        address='8701 Beverly Blvd West Hollywood, CA 90048',
        zipCode='90048',
        lat='34.077160',
        lng='-118.380650',
        phoneNumber='(424) 522-5161',
        priceRange='$$',
        hours='11:30 AM - 9:00 PM')

    haneuem = Restaurant(
        userId=6,
        name="HanEuem",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/pYgM0JZicgZJcXK-xw11sQ/o.jpg',
        description="Truly Authentic Korean cuisine by Chef Kang. Variety of fascinating and tasteful dishes will amaze you.",
        cuisine='Korean',
        address='539 S Western Ave Los Angeles, CA 90020',
        zipCode='90020',
        lat='34.064240',
        lng='-118.309150',
        phoneNumber='(213) 463-5360',
        priceRange='$$',
        hours='5:00 PM - 10:00 PM')

    providence = Restaurant(
        userId=7,
        name="Providence",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/TOVt8ih7yD6-V8SN1bwUAQ/o.jpg',
        description="Fine Dining",
        cuisine='Seafood',
        address='5955 Melrose Ave Los Angeles, CA 90038',
        zipCode='90038',
        lat='34.083649',
        lng='-118.330200',
        phoneNumber='(323) 460-4170',
        priceRange='$$$$',
        hours='6:00 PM - 9:00 PM')

    eggslut = Restaurant(
        userId=8,
        name="Eggslut",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/MgkGV_YW91JoE5iQBxF7sQ/o.jpg',
        description="Eggslut is a chef driven, gourmet food concept founded in 2011, by chef Alvin Cailan. It began as a food truck that roamed the streets of Los Angeles, eventually turning into a food stall in the historic Grand Central Market in Downtown L.A. which opened in November 2013.",
        cuisine='Brunch',
        address='317 S Broadway Grand Central Market Los Angeles, CA 90013',
        zipCode='90013',
        lat='34.050690',
        lng='-118.248790',
        phoneNumber='(213) 625-0292',
        priceRange='$$',
        hours='8:00 AM - 2:00 PM')

    bjc = Restaurant(
        userId=9,
        name="Blu Jam Café",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/W3j6aLTVb_nH8k6nN8qPTg/o.jpg',
        description="The name Blu Jam was taken from the location's original history, where it was used as an underground blues and jazz club where patrons would enter through it's secret entrance to listen to musicians jam. ",
        cuisine='Brunch',
        address='7371 Melrose Ave Los Angeles, CA 90046',
        zipCode='90046',
        lat='34.083610',
        lng='-118.350540',
        phoneNumber='(323) 951-9191',
        priceRange='$$',
        hours='9:00 AM - 2:00 PM')

    leo = Restaurant(
        userId=10,
        name="Leo's Tacos Truck",
        image='https://s3-media0.fl.yelpcdn.com/bphoto/bth2LMdF7OABNU6Uv2M__w/o.jpg',
        description="Truly Authentic Mexican cuisine by Chef Kang. Variety of fascinating and tasteful dishes will amaze you.",
        cuisine='Mexican',
        address='1515 S La Brea Ave Los Angeles, CA 90019',
        zipCode='90019',
        lat='34.046396',
        lng='-118.345684',
        phoneNumber='(323) 346-2001',
        priceRange='$',
        hours='10:00 AM - 2:00 AM')


    db.session.add(bottegaLouie)
    db.session.add(portos)
    db.session.add(perch)
    db.session.add(rays)
    db.session.add(bestia)
    db.session.add(granville)
    db.session.add(haneuem)
    db.session.add(providence)
    db.session.add(eggslut)
    db.session.add(bjc)
    db.session.add(leo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the restaurants table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
