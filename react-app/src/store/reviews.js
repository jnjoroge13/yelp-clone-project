const GET_REVIEWS = "reviews/GET_REVIEWS";
const GET_ONE_REVIEW = "reviews/GET_ONE_REVIEW";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const actionGetReviews = (reviews) => {
	return {
		type: GET_REVIEWS,
		reviews,
	};
};
const actionGetOneReview = (review) => {
	return {
		type: GET_ONE_REVIEW,
		review,
	};
};

const actionAddReview = (review) => {
	return {
		type: ADD_REVIEW,
		review,
	};
};

const actionEditReview = (review) => {
	return {
		type: EDIT_REVIEW,
		review,
	};
};

const actionDeleteReview = (reviewId) => {
	return {
		type: DELETE_REVIEW,
		reviewId,
	};
};

export const thunkGetReviews = (restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/reviews/restaurantId/${restaurantId}`);
	const resData = await res.json();
	dispatch(actionGetReviews(resData.reviews));
	return res;
};

export const thunkGetOneReview = (reviewId) => async (dispatch) => {
	const res = await fetch(`/api/reviews/reviewId/${reviewId}`);
	const review = await res.json();
	dispatch(actionGetOneReview(review));
	return res;
};

export const thunkAddReview = (review) => async (dispatch) => {
	const response = await fetch("/api/reviews/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(review),
	});
	const data = await response.json();
	dispatch(actionAddReview(data));
	return "Review Added";
};

export const thunkEditReview = (review) => async (dispatch) => {
	const response = await fetch(`/api/reviews/reviewId/${review.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
	});

	const data = await response.json();
	dispatch(actionEditReview(data));
	return "Review Updated";
};

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
	dispatch(actionDeleteReview(reviewId));
	return "Review Deleted";
};

const reviewReducer = (state = {}, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_REVIEWS:
			action.reviews.forEach((review) => {
				newState[review.id] = review;
			});
			return newState;

		case GET_ONE_REVIEW:
			const State = {};
			State[action.review.id] = action.review;
			return State;

		case ADD_REVIEW:
			newState[action.review.id] = action.review;
			return newState;

		case DELETE_REVIEW:
			delete newState[action.reviewId];
			return newState;

		default:
			return state;
	}
};

export default reviewReducer;
