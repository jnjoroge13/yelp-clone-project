import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetRestaurants } from "../../store/restaurants";
import { thunkGetAllReviews } from "../../store/reviews";
import zeroStars from "../assets/0-stars.png";
import oneStars from "../assets/1-stars.png";
import twoStars from "../assets/2-stars.png";
import threeStars from "../assets/3-stars.png";
import fourStars from "../assets/4-stars.png";
import fiveStars from "../assets/5-stars.png";
import oneandOneHalfStars from "../assets/1.5-stars.png";
import twoandOneHalfStars from "../assets/2.5-stars.png";
import threeandOneHalfStars from "../assets/3.5-stars.png";
import fourandOneHalfStars from "../assets/4.5-stars.png";
import './RestaurantList.css'

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

	const getOneReview = (restaurantId) => {
		const restaurantReviews = allReviews.filter(
			(review) => review.restaurant.id == restaurantId
		);
		const firstReview = restaurantReviews[restaurantReviews.length - 1]?.review;

		if (firstReview?.length > 136) {
			return (firstReview.slice(0, 136) + "...");
		}
		return firstReview;
		// console.log(firstReview)
		// console.log(firstReview?.length)
	};
	const getNumberRatings = (restaurantId) => {
		const restaurantReviews = allReviews.filter(
			(review) => review.restaurant.id == restaurantId
		);
		return restaurantReviews.length;
	};
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
		const rating = getAverageRating(restaurantId);
		if (!rating) {
			return zeroStars;
		} else if (rating > 0 && rating <= 1) {
			return oneStars;
		} else if (rating > 1 && rating <= 1.5) {
			return oneandOneHalfStars;
		} else if (rating > 1.5 && rating <= 2) {
			return twoStars;
		} else if (rating > 2 && rating <= 2.5) {
			return twoandOneHalfStars;
		} else if (rating > 2.5 && rating <= 3) {
			return threeStars;
		} else if (rating > 3 && rating <= 3.5) {
			return threeandOneHalfStars;
		} else if (rating > 3.5 && rating <= 4) {
			return fourStars;
		} else if (rating > 4 && rating <= 4.5) {
			return fourandOneHalfStars;
		} else if (rating > 4.5 && rating <= 5) {
			return fiveStars;
		}
	};
	let i = 1;
	return (
		<div className="biz-cont">
			<div className="biz-list-cont">
				{restaurantArray &&
					restaurantArray.map((restaurant) => (
						<div key={restaurant.id} className="biz-list-single-cont">
							<NavLink className="biz-list-single" to={`/restaurants/${restaurant.id}`}>
								<div className="biz-image">
									<img src={restaurant.image} />
								</div>
								<div className="biz-info-cont">
									<h3>
										{i++}. <span>{restaurant.name}</span>
									</h3>
									<div className="biz-rating-cont">
										<img
											className="biz-star-rating"
											width="108"
											height="20"
											src={getRatingImg(restaurant.id)}
										/>
										{getNumberRatings(restaurant.id)}
									</div>
									<div className="biz-cuisine">
										<span className="biz-cuisine-tag">{restaurant.cuisine}</span> {restaurant.priceRange}<span className="interpunct">{" · "}</span>
										{restaurant.zipCode}
									</div>
									<div className="biz-hour"><span>Hours:</span> {restaurant.hours}</div>
									<div className="biz-message">
										<i className="fa-regular fa-message" />
										{getOneReview(restaurant.id) && <div>"{getOneReview(restaurant.id)}" {getOneReview(restaurant.id)?.length>136 && (<span className='biz-message-more'>more</span>)}</div>}
										{!getOneReview(restaurant.id) && <div>No Reviews</div>}
									</div>
								</div>
							</NavLink>
						</div>
					))}
			</div>
		</div>
	);
}
