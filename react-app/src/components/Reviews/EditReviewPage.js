import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditReview } from "../../store/reviews";
import { Link, useHistory, useParams } from "react-router-dom";
import { thunkGetOneReview } from "../../store/reviews";
import "./EditReviewPage.css";
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
export default function EditReviewForm({ closeAddReviewForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { reviewId } = useParams();
	const sessionUser = useSelector((state) => state.session.user);
	useEffect(() => {
		dispatch(thunkGetOneReview(reviewId));
	}, [reviewId]);
	const currentReview = useSelector((state) => state.reviews[reviewId]);
	const isOwner = currentReview?.user.id == sessionUser?.id;
	const [rating, setRating] = useState(currentReview?.rating);
	const [review, setReview] = useState(currentReview?.review);
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
		if (review?.length > 201) errors.push("Review must be under 200 characters");
		setErrors(errors);
	}, [rating, review]);

	useEffect(() => {
		setReview(currentReview?.review);
		setRating(currentReview?.rating);
	}, [currentReview]);

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
		return <h1>NOT AUTHORIZED</h1>;
	}
	return (
		<div className="edit-review-cont">
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
			<form className="edit-review-form" onSubmit={onSubmit}>
				<div>
					<img src={getRatingImg(rating)} />
				</div>
				<div>
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
						placeholder="review"
						value={review}
						onChange={(e) => setReview(e.target.value)}
					/>
				</div>
				<div className="each-review-btn">
					<button>Submit</button>
					<Link to={`/restaurants/${currentReview?.restaurant.id}`}>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
