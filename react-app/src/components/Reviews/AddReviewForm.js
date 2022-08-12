import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetOneRestaurant } from "../../store/restaurants";
import { thunkGetReviews } from "../../store/reviews";

export default function AddReviewForm({ closeAddReviewForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { restaurantId } = useParams();
	const sessionUser = useSelector((state) => state.session.user);
	const [rating, setRating] = useState("1");
	const [review, setReview] = useState("");
	const [errors, setErrors] = useState([]);
	const [showErrors, SetShowErrors] = useState(false);
	const clearErrors = () => {
		SetShowErrors(false);
	};

	function onlySpaces(str) {
		return /^\s*$/.test(str);
	}

	useEffect(() => {
		const errors = [];
		if (onlySpaces(review)) errors.push("Restaurant must have a description");
		if (review.length > 201) errors.push("Review must be under 200 characters");

		setErrors(errors);
	}, [rating, review]);
	const onSubmit = async (e) => {
		e.preventDefault();
		SetShowErrors(true);
		if (!errors.length) {
			const newReview = {
				rating,
				review,
				userId: sessionUser.id,
				restaurantId: restaurantId,
			};

			const response = await dispatch(thunkAddReview(newReview));

			if (response === "Review Added") {
				dispatch(thunkGetOneRestaurant(restaurantId));
				dispatch(thunkGetReviews(restaurantId));
				closeAddReviewForm();
			}
		}
	};

	return (
		<div className="add-review-form-cont">
			{errors.length > 0 && showErrors && (
				<div className="add-review-errors">
					<div>
						{errors.map((error, ind) => (
							<div key={ind} className="add-review-error">
								{error}
							</div>
						))}
					</div>
					<i className="fa-solid fa-xmark fa-xl" onClick={clearErrors}></i>
				</div>
			)}
			<form className="add-review-form" onSubmit={onSubmit}>
				<div className="add-review-rating">
					<select value={rating} onChange={(e) => setRating(e.target.value)}>
						<option value={"1"}>1 ⭐</option>
						<option value={"2"}>2 ⭐</option>
						<option value={"3"}>3 ⭐</option>
						<option value={"4"}>4 ⭐</option>
						<option value={"5"}>5 ⭐</option>
					</select>
				</div>
				<div className="add-review-textarea">
					<textarea
						placeholder="Review"
						value={review}
						required={true}
						onChange={(e) => setReview(e.target.value)}
					/>
				</div>
				<div className="each-review-btn">
					<button>Submit</button>
					<button onClick={closeAddReviewForm}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
