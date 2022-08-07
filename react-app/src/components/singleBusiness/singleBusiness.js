import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
	thunkGetOneBusiness,
	thunkDeleteBusiness,
} from "../../store/businesses";
import EditBusinessForm from "../EditBusinessForm/EditBusinessForm";
import AddReviewForm from "../Reviews/AddReviewForm";
import { thunkGetReviews } from "../../store/reviews";

export default function SingleBusiness() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { businessId } = useParams();
	useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId));
        dispatch(thunkGetReviews(businessId))
	}, [businessId]);
	const business = useSelector((state) => state.businesses[businessId]);
	const [editBusiness, setEditBusiness] = useState(false);
	const [addReview, setAddReview] = useState(false);

	const openEditForm = () => {
		setEditBusiness(true);
	};
	const closeEditForm = () => {
		setEditBusiness(false);
	};
	const openAddReviewForm = () => {
		setAddReview(true);
	};
	const closeAddReviewForm = () => {
		setAddReview(false);
	};
	const onDelete = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("image", business.image);

		const awsRes = await fetch("/api/businesses/image", {
			method: "DELETE",
			headers: {
				Content_Type: "application/json",
			},
			body: formData,
		});
		console.log(awsRes);
		if (awsRes.ok) {
			const res = await dispatch(thunkDeleteBusiness(businessId));

			if (res === "Business Deleted") {
				history.push("/businesses");
			}
		}
	};

	return (
		<div>
			<h1>b</h1>
			<p>
				name: {business?.name} -- created by: {business?.user.username}
				<img width="100" src={business?.image} />
			</p>
			<button onClick={openEditForm}>Edit</button>
			<button onClick={onDelete}>Delete</button>
			{editBusiness && <EditBusinessForm closeEditForm={closeEditForm} />}
			<div>
				<button onClick={openAddReviewForm}>Add Review</button>
				{addReview && <AddReviewForm closeAddReviewForm={closeAddReviewForm} />}
			</div>
		</div>
	);
}
