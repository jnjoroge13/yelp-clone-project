import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetRestaurants } from "../../store/restaurants";
import { thunkGetAllReviews } from "../../store/reviews";

export default function RestaurantList() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [restaurantArray, setRestaurantArray] = useState("");
	const restaurantSelector = useSelector((state) => state.restaurants);
	const allReviews = Object.values(useSelector((state) => state.reviews));

	useEffect(() => {
		dispatch(thunkGetRestaurants());
		dispatch(thunkGetAllReviews());
	}, []);

	useEffect(() => {
		setRestaurantArray(Object.values(restaurantSelector));
	}, [restaurantSelector]);

	const getAverageRating = (restaurantId) => {
		const restaurantReviews = allReviews.filter(review => review.restaurant.id == restaurantId)
		const restaurantRatings = restaurantReviews.map(review => review.rating)
		const averageRating = (restaurantRatings.reduce((a, b) => a + b, 0) / restaurantRatings.length)
		const roundAverageRating = +averageRating.toFixed(2)
		return roundAverageRating
	}
	const newRestaurantBtn = () => {
		history.push("/restaurants/new");
	};

	return (
		<div>
			<button onClick={newRestaurantBtn}>New Restaurant</button>
			{restaurantArray &&
				restaurantArray.map((restaurant) => (
					<NavLink
						to={`/restaurants/${restaurant.id}`}
					>
						<p>
							name: {restaurant.name} cuisine: {restaurant.cuisine} description:{" "}
							{restaurant.description} hours: {restaurant.hours} image:{" "}
							<img width="100" src={restaurant.image} /> price:{" "}
							{restaurant.priceRange} id:{restaurant.id} averageRating:{getAverageRating(restaurant.id) }
						</p>
					</NavLink>
				))}
		</div>
	);
}
