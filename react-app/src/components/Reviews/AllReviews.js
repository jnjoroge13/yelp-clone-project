import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { thunkDeleteReview } from "../../store/reviews";
import { thunkGetReviews } from "../../store/reviews";
import './Reviews.css'

export default function AllReviews() {
	// const history = useHistory();
	const dispatch = useDispatch();
	const { restaurantId } = useParams()
	useEffect(() => {
		dispatch(thunkGetReviews(restaurantId));
	}, [restaurantId]);
	const [reviewsArray, setReviewsArray] = useState("");
	const reviewsSelector = useSelector((state) => state.reviews);
	function addHours(numOfHours, date = new Date()) {
		date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

		return date;
	}
	const convertDate = (createdAt) => {
		const d = new Date(createdAt);
		const addtime = addHours(4, d);
		const now = Date.now();

		const hourDiff = Math.floor((now - addtime) / 1000 / 60 / 60);
		if (hourDiff < 1) {
			return Math.floor((now - addtime) / 1000 / 60) + " mins ago";
		}
		if (hourDiff < 24) {
			return Math.floor((now - addtime) / 1000 / 60 / 60) + " hr ago";
		}
		if (hourDiff >= 24) {
			return Math.floor((now - addtime) / 1000 / 60 / 60 / 24) + " day ago";
		}
	};
	useEffect(() => {
		setReviewsArray(Object.values(reviewsSelector));
	}, [reviewsSelector]);

	// const onDelete = async (e)=>(reviewId)=> {
	// 	e.preventDefault();
	// 	const res = await dispatch(thunkDeleteReview(reviewId));

	// };

	return (
        <div>
			<h3>Reviews:</h3>
			{reviewsArray &&
				reviewsArray.map((review) => (
					<div>
						<p>
							id: {review.id} ; userId: {review.userId} ; rating:{" "}
							{review.rating} ; review: {review.review} ; created:{" "}
							{convertDate(review.createdAt)}
						</p>
                        <Link to={`/reviews/${review.id}`}>Edit</Link>
                        <button onClick={async(e) => {
                            e.preventDefault();
                            await dispatch(thunkDeleteReview(review.id));
                        }}>Delete</button>
					</div>
				))}
		</div>
	);
}
