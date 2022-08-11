import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditReview } from "../../store/reviews";
import { Link, useHistory, useParams } from "react-router-dom";
import { thunkGetOneReview } from "../../store/reviews";

export default function EditReviewForm({ closeAddReviewForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { reviewId } = useParams();
	const sessionUser = useSelector((state) => state.session.user);
	useEffect(() => {
		dispatch(thunkGetOneReview(reviewId));
	}, [reviewId]);
	const currentReview = useSelector((state) => state.reviews[reviewId]);
	const isOwner = currentReview?.user.id == sessionUser?.id
	const [rating, setRating] = useState(currentReview?.rating);
	const [review, setReview] = useState(currentReview?.review);
	const [errors, setErrors] = useState([]);
	const [showErrors, SetShowErrors] = useState(false);

	useEffect(() => {
		setReview(currentReview?.review);
		setRating(currentReview?.rating);
	}, [currentReview]);

	const onSubmit = async (e) => {
		e.preventDefault();
		SetShowErrors(true);
		if (!errors.length) {
			const editReview = {
				rating,
				review,
				id: currentReview.id,
			};

			const response = await dispatch(thunkEditReview(editReview));

			if (response === "Review Updated") {
				history.push(`/restaurants/${currentReview?.restaurant.id}`);
			}
		}
	};
	if (!isOwner) {
		return(<h1>NOT AUTHORIZED</h1>)
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<select value={rating} onChange={(e) => setRating(e.target.value)}>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
				<div>
					<textarea
						placeholder="review"
						value={review}
						onChange={(e) => setReview(e.target.value)}
					/>
				</div>
				<div>
					<button>Submit</button>
					<Link to={`/restaurants/${currentReview?.restaurant.id}`}>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
