import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetRestaurants } from "../../store/restaurants";
import { thunkGetReviews } from "../../store/reviews";

export default function RestaurantList() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [restaurantArray, setRestaurantArray] = useState("");
	const restaurantSelector = useSelector((state) => state.restaurants);

	
	useEffect(() => {
		dispatch(thunkGetRestaurants());
	}, []);

	useEffect(() => {
		setRestaurantArray(Object.values(restaurantSelector));
	}, [restaurantSelector]);
	console.log(restaurantArray);

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
							{restaurant.priceRange} id:{restaurant.id}
						</p>
					</NavLink>
				))}
		</div>
	);
}
