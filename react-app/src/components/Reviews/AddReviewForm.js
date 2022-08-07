import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../store/businesses";

export default function AddReviewForm({closeAddReviewForm}) {
	const dispatch = useDispatch();
    const history = useHistory();
    const {businessId} = useParams()
	const sessionUser = useSelector((state) => state.session.user);
	const [rating, setRating] = useState("1");
	const [review, setReview] = useState("");
    const [errors, setErrors] = useState([])
    const [showErrors,SetShowErrors] = useState(false)

    const onSubmit = async(e) => {
        e.preventDefault();
        SetShowErrors(true)
        if (!errors.length) {

                const newReview = {
                    rating,
                    review,
                    userId:sessionUser.id,
                    businessId: businessId
                };

                const response = await dispatch(thunkAddReview(newReview));

                if (response === 'Review Added') {
                    dispatch(thunkGetOneBusiness(businessId));
                    closeAddReviewForm()
                }
        }
    };


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
					<button onClick={closeAddReviewForm}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
