import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AllReviews() {
	// const history = useHistory();
	// const dispatch = useDispatch();
	const [reviewsArray, setReviewsArray] = useState("");
	const reviewsSelector = useSelector((state) => state.reviews);

	useEffect(() => {
		setReviewsArray(Object.values(reviewsSelector));
	}, [reviewsSelector]);

	return (
        <div>
            <h3>Reviews:</h3>
			{reviewsArray &&
				reviewsArray.map((review) => (
					<div>
						<p>
							id: {review.id} ;
							userId: {review.userId} ;
							rating: {review.rating} ;
							review: {review.review}
						</p>
					</div>
				))}
		</div>
	);
}
