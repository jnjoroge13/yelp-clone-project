import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AllReviews() {
	// const history = useHistory();
	// const dispatch = useDispatch();
	const [reviewsArray, setReviewsArray] = useState("");
	const reviewsSelector = useSelector((state) => state.reviews);
    // console.log(Date.now().toUTCString())
    function addHours(numOfHours, date = new Date()) {
        date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

        return date;
      }
    const convertDate = (createdAt) => {
        const d = new Date(createdAt)
        const addtime = addHours(4,d)
        const saveConverted = addtime.toLocaleString();
        // return(saveConverted)
        // const date = createdAt.toLocaleString('en-US')
        // // console.log(date)
        const now = Date.now()
        // // console.log(now.getHours())
        // // console.log(new Date(date))
        const hourDiff = Math.floor((now - addtime) / 1000 / 60 / 60)
        if (hourDiff < 1) {
            return(Math.floor((now-addtime)/1000/60)+' mins ago')
        }
        if (hourDiff < 24) {
            return(Math.floor((now-addtime)/1000/60/60)+' hr ago')
        }
        if (hourDiff >= 24) {
            return(Math.floor((now-addtime)/1000/60/60/24)+' day ago')
        }
    }
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
							review: {review.review} ;
							created: {convertDate(review.createdAt)}
                        </p>
                        <button>Edit</button>
					</div>
				))}
		</div>
	);
}
