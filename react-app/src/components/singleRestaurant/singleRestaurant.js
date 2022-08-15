import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
	thunkGetOneRestaurant,
	thunkDeleteRestaurant,
} from "../../store/restaurants";
import EditRestaurantForm from "../EditRestaurantForm/EditRestaurantForm";
import AddReviewForm from "../Reviews/AddReviewForm";
import { thunkGetReviews } from "../../store/reviews";
import AllReviews from "../Reviews/AllReviews";
import SingleRestaurantMap from "../GoogleMaps/SingleRestaurantMap";
import "./singleBiz.css";
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

export default function SingleRestaurant() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const { restaurantId } = useParams();
	const allReviews = Object.values(useSelector((state) => state.reviews));
	const restaurant = useSelector((state) => state.restaurants[restaurantId]);
	const isOwner = sessionUser?.id == restaurant?.user.id;
	const [addReview, setAddReview] = useState(false);
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		dispatch(thunkGetReviews(restaurantId))
			.then(() => dispatch(thunkGetOneRestaurant(restaurantId)))
			.then(() => setLoaded(true));
	}, [restaurantId, dispatch]);
	console.log(restaurant);
	const style = {
		backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0,0),rgba(0, 0, 0,0),57%, rgba(0, 0, 0,0.9)), url(${restaurant?.image})`,
		backgroundPosition: "center",
		backgroundSize: "scale-down",
	};
	const openAddReviewForm = () => {
		setAddReview(true);
	};
	const closeAddReviewForm = () => {
		setAddReview(false);
	};
	const onDelete = async (e) => {
		e.preventDefault();

		const res = await dispatch(thunkDeleteRestaurant(restaurantId));

		if (res === "Restaurant Deleted") {
			history.push("/restaurants");
		}
		// }
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
	return (
		loaded && (
			<div className="single-biz-cont">
				<div className="single-biz-top-cont" style={style}>
					<div className="single-biz-top-name">{restaurant?.name}</div>
					<div className="single-biz-top-stars">
						<img
							className="biz-star-rating"
							src={getRatingImg(restaurant?.id)}
						/>
						{getNumberRatings(restaurant?.id)} reviews
					</div>
					<div className="single-biz-top-info">
						<i className="fa-solid fa-circle-check"></i>
						<span> Claimed</span>
						<>
							{" "}
							· {restaurant?.priceRange} · {restaurant?.cuisine}
						</>
						{isOwner && (
							<button
								onClick={() =>
									history.push(`/restaurants/edit/${restaurantId}`)
								}
							>
								Edit
							</button>
						)}
						{isOwner && <button onClick={onDelete}>Delete</button>}
					</div>
					<div className="single-biz-top-hours">
						<span>Open </span>
						{restaurant?.hours}
					</div>
					<div className="single-biz-top-hours">{restaurant?.phoneNumber}</div>
				</div>
				<div className="single-biz-bottom-cont">
					<div className="single-biz-bottom-left-cont">
						<h1>Location & Hours</h1>
						<div className="single-biz-bottom-left">
							<div className="single-biz-left-location">
								<SingleRestaurantMap />
								<div className="single-biz-left-address">
									{restaurant?.address}
								</div>
							</div>
							<div className="single-biz-left-hours">
								<div className="single-biz-left-hours-div">
									<div>Mon</div> <div>{restaurant?.hours}</div>
								</div>
								<div className="single-biz-left-hours-div">
									<div>Tue</div> <div>{restaurant?.hours}</div>
								</div>
								<div className="single-biz-left-hours-div">
									<div>Wed</div> <div>{restaurant?.hours}</div>
								</div>
								<div className="single-biz-left-hours-div">
									<div>Thu</div> <div>{restaurant?.hours}</div>
								</div>
								<div className="single-biz-left-hours-div">
									<div>Fri</div> <div>{restaurant?.hours}</div>
								</div>
								<div className="single-biz-left-hours-div">
									<div>Sat</div> <div>{restaurant?.hours}</div>
								</div>
								<div className="single-biz-left-hours-div">
									<div>Sun</div> <div>{restaurant?.hours}</div>
								</div>
							</div>
						</div>
						<div className="biz-description-div">
							<h1>About the Restaurant</h1>
							{restaurant?.description}
						</div>
					</div>
					<div className="single-biz-bottom-right-cont">
						<div className="single-biz-bottom-right-div">
							{sessionUser && !isOwner && (
								<button className="add-review-btn" onClick={openAddReviewForm}>
									<i className="fa-regular fa-star fa-lg"></i> Write a review
								</button>
							)}
							{addReview && (
								<AddReviewForm closeAddReviewForm={closeAddReviewForm} />
							)}
							<AllReviews />
						</div>
					</div>
				</div>
				{/* <p>
					name: {restaurant?.name} -- created by: {restaurant?.user.username}
					<img width="100" src={restaurant?.image} />
				</p>
				{isOwner && (
					<button
						onClick={() => history.push(`/restaurants/edit/${restaurantId}`)}
					>
						Edit
					</button>
				)}
				{isOwner && <button onClick={onDelete}>Delete</button>}
				<div>
					{sessionUser && (
						<button onClick={openAddReviewForm}>Add Review</button>
					)}
					{addReview && (
						<AddReviewForm closeAddReviewForm={closeAddReviewForm} />
					)}
					<AllReviews />
				</div>
				<div>
					<SingleRestaurantMap />
				</div> */}
			</div>
		)
	);
}
