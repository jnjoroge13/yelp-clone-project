import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetRestaurants } from "../../store/restaurants";
import { thunkGetAllReviews } from "../../store/reviews";
import zeroStars from '../assets/0-stars.png'
import oneStars from '../assets/1-stars.png'
import twoStars from '../assets/2-stars.png'
import threeStars from '../assets/3-stars.png'
import fourStars from '../assets/4-stars.png'
import fiveStars from '../assets/5-stars.png'
import oneandOneHalfStars from '../assets/1.5-stars.png'
import twoandOneHalfStars from '../assets/2.5-stars.png'
import threeandOneHalfStars from '../assets/3.5-stars.png'
import fourandOneHalfStars from '../assets/4.5-stars.png'

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
		const restaurantReviews = allReviews.filter(
			(review) => review.restaurant.id == restaurantId
		);
		const restaurantRatings = restaurantReviews.map((review) => review.rating);
		const averageRating =
			restaurantRatings.reduce((a, b) => a + b, 0) / restaurantRatings.length;
		const roundAverageRating = +averageRating.toFixed(2);
		return roundAverageRating;
	};
	const getRatingImg = (restaurantId) => {
		const rating = getAverageRating(restaurantId)
		if (rating == 0) {
			return zeroStars
		} else if (rating>0 && rating<=1){
			return oneStars
		} else if (rating>1 && rating<=1.5){
			return oneandOneHalfStars
		} else if (rating>1.5 && rating<=2){
			return twoStars
		} else if (rating>2 && rating<=2.5){
			return twoandOneHalfStars
		} else if (rating>2.5 && rating<=3){
			return threeStars
		} else if (rating>3 && rating<=3.5){
			return threeandOneHalfStars
		} else if (rating>3.5 && rating<=4){
			return fourStars
		} else if (rating>4 && rating<=4.5){
			return fourandOneHalfStars
		} else if (rating>4.5 && rating<=5){
			return fiveStars
		}
	}
	const newRestaurantBtn = () => {
		history.push("/restaurants/new");
	};
	let i = 1;
	return (
		<div>
			<button onClick={newRestaurantBtn}>New Restaurant</button>
			{restaurantArray &&
				restaurantArray.map((restaurant) => (
					<div>
						<NavLink to={`/restaurants/${restaurant.id}`}>
							<div biz-image>
								<img width="200" src={restaurant.image} />
								</div>
							<div biz-info-cont>
								{i++}; name: {restaurant.name} cuisine: {restaurant.cuisine}{" "}
								description: {restaurant.description} hours: {restaurant.hours}{" "}
								 price:{" "}
								{restaurant.priceRange} id:{restaurant.id} averageRating:
								{getAverageRating(restaurant.id)} <img width='108' height='20' src={getRatingImg(restaurant.id)} />
							</div>
						</NavLink>
					</div>
				))}
		</div>
	);
}
