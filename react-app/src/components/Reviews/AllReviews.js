import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { thunkDeleteReview } from "../../store/reviews";
import { thunkGetReviews } from "../../store/reviews";
import "./Reviews.css";
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

export default function AllReviews() {
	// const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const { restaurantId } = useParams();
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
			return Math.floor((now - addtime) / 1000 / 60 / 60) + " hrs ago";
		}
		if (hourDiff >= 24) {
			return Math.floor((now - addtime) / 1000 / 60 / 60 / 24) + " days ago";
		}
	};
	useEffect(() => {
		setReviewsArray(Object.values(reviewsSelector).reverse());
	}, [reviewsSelector]);

	const getRatingImg = (rating) => {
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
		<div className="all-reviews-cont">
			{/* <div className="all-reviews-header">Reviews:</div> */}
			<div className="all-reviews-list-cont">
				{reviewsArray &&
					reviewsArray.map((review) => (
						<div key={review.id} className="each-review-cont">
							<div className="each-review-top">
								<div>
									<img src={review.user.profileImage} />
								</div>
								<div className="each-review-top-username">{review.user.username}</div>
							</div>
							<div className="each-review-rating">
							<img
							className="biz-star-rating"
							src={getRatingImg(review.rating)}
						/>  {convertDate(review.createdAt)}
							</div>
							<div>
								{review.review}
							</div>
							<div  className="each-review-btn">
								{review.user.id == sessionUser?.id && (
									<Link to={`/reviews/${review.id}`}>Edit</Link>
								)}
								{review.user.id == sessionUser?.id && (
									<button
										onClick={async (e) => {
											e.preventDefault();
											await dispatch(thunkDeleteReview(review.id));
										}}
									>
										Delete
									</button>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
