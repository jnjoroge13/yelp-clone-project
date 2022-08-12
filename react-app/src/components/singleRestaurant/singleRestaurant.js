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

export default function SingleRestaurant() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const { restaurantId } = useParams();
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
		backgroundImage: `url(${restaurant?.image})`,
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

		// const formData = new FormData();
		// formData.append("image", restaurant.image);

		// const awsRes = await fetch("/api/restaurants/image", {
		// 	method: "DELETE",
		// 	headers: {
		// 		Content_Type: "application/json",
		// 	},
		// 	body: formData,
		// });
		// if (awsRes.ok) {
		const res = await dispatch(thunkDeleteRestaurant(restaurantId));

		if (res === "Restaurant Deleted") {
			history.push("/restaurants");
		}
		// }
	};
	return (
		loaded && (
			<div className="single-biz-cont">
				<div className="single-biz-top-cont" style={style}></div>
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
					</div>
					<div className="single-biz-bottom-right-cont">
						<div className="single-biz-bottom-right-div">
							{sessionUser && (
								<button className="add-review-btn" onClick={openAddReviewForm}>
									<i class="fa-regular fa-star fa-lg"></i> Write a review
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
