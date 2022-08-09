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

export default function SingleRestaurant() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { restaurantId } = useParams();
	const restaurant = useSelector((state) => state.restaurants[restaurantId]);
	const [editRestaurant, setEditRestaurant] = useState(false);
	const [addReview, setAddReview] = useState(false);
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		dispatch(thunkGetReviews(restaurantId))
			.then(() => dispatch(thunkGetOneRestaurant(restaurantId)))
			.then(() => setLoaded(true));
	}, [restaurantId, dispatch]);

	const openEditForm = () => {
		setEditRestaurant(true);
	};
	const closeEditForm = () => {
		setEditRestaurant(false);
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
			<div>
				<p>
					name: {restaurant?.name} -- created by: {restaurant?.user.username}
					<img width="100" src={restaurant?.image} />
				</p>
				<button onClick={openEditForm}>Edit</button>
				<button onClick={onDelete}>Delete</button>
				{editRestaurant && <EditRestaurantForm closeEditForm={closeEditForm} />}
				<div>
					<button onClick={openAddReviewForm}>Add Review</button>
					{addReview && (
						<AddReviewForm closeAddReviewForm={closeAddReviewForm} />
					)}
					<AllReviews />
				</div>
			</div>
		)
	);
}
