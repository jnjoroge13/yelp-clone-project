const GET_Businesses = "businesses/GET_Businesses";
const GET_One_Business = "businesses/GET_One_Business";
const ADD_Business = "businesses/ADD_Business";
const EDIT_Business = "businesses/EDIT_Business";
const DELETE_Business = "businesses/DELETE_Business";

const actionGetBusinesses = (businesses) => {
	return {
		type: GET_Businesses,
		businesses,
	};
};
const actionGetOneBusinesses = (business) => {
	return {
		type: GET_One_Business,
		business,
	};
};

const actionAddBusiness = (business) => {
	return {
		type: ADD_Business,
		business,
	};
};

const actionEditBusiness = (business) => {
	return {
		type: EDIT_Business,
		business,
	};
};

const actionDeleteBusiness = (businessId) => {
	return {
		type: DELETE_Business,
		businessId,
	};
};

export const thunkGetBusinesses = () => async (dispatch) => {
	const res = await fetch("/api/businesses/");
	const businesses = await res.json();
	dispatch(actionGetBusinesses(businesses));
	return res;
};

export const thunkGetOneBusiness = (businessId) => async (dispatch) => {
	const res = await fetch(`/api/businesses/${businessId}`);
	const business = await res.json();
	dispatch(actionGetOneBusinesses(business));
	return res;
};


export const thunkAddBusiness = (business) => async (dispatch) => {
	const response = await fetch("/api/businesses/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(business),
	});
	const data = await response.json();
	dispatch(actionAddBusiness(data));
	return 'Business Added';
};

export const thunkEditBusiness = (business) => async (dispatch) => {
	const response = await fetch(`/api/businesses/${business.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(business),
	});

	const data = await response.json();
	dispatch(actionEditBusiness(data));
	return 'Business Updated';
};

export const thunkDeleteBusiness = (businessId) => async (dispatch) => {
	const response = await fetch(`/api/businesses/${businessId}`, {
		method: "DELETE",
	});
	dispatch(actionDeleteBusiness(businessId));
	return 'Business Deleted';
};

const businessReducer = (state = {}, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_Businesses:
			action.businesses.businesses.forEach((business) => {
				newState[business.id] = business;
			});
			return newState;

		case GET_One_Business:
			newState[action.business.id] = action.business;
			return newState;

		case ADD_Business:
			newState[action.business.id] = action.business;
			return newState;

		case DELETE_Business:
			delete newState[action.businessId];
			return newState;

		default:
			return state;
	}
};

export default businessReducer;
