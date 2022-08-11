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


export default function SingleRestaurant() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const { restaurantId } = useParams();
	const restaurant = useSelector((state) => state.restaurants[restaurantId]);
	const isOwner = sessionUser?.id == restaurant?.user.id
	const [addReview, setAddReview] = useState(false);
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		dispatch(thunkGetReviews(restaurantId))
			.then(() => dispatch(thunkGetOneRestaurant(restaurantId)))
			.then(() => setLoaded(true));
	}, [restaurantId, dispatch]);

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
			<div>
				<p>
					name: {restaurant?.name} -- created by: {restaurant?.user.username}
					<img width="100" src={restaurant?.image} />
				</p>
				{isOwner && <button onClick={()=>history.push(`/restaurants/edit/${restaurantId}`)}>Edit</button>}
				{isOwner && <button onClick={onDelete}>Delete</button>}
				<div>
					{sessionUser && <button onClick={openAddReviewForm}>Add Review</button>}
					{addReview && (
						<AddReviewForm closeAddReviewForm={closeAddReviewForm} />
					)}
					<AllReviews />
				</div>
				<div>
					<SingleRestaurantMap/>
				</div>
			</div>
		)
	);
}
