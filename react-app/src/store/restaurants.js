const GET_Restaurants = "restaurants/GET_Restaurants";
const GET_ONE_Restaurant = "restaurants/GET_ONE_Restaurant";
const ADD_Restaurant = "restaurants/ADD_Restaurant";
const EDIT_Restaurant = "restaurants/EDIT_Restaurant";
const DELETE_Restaurant = "restaurants/DELETE_Restaurant";

const actionGetRestaurants = (restaurants) => {
	return {
		type: GET_Restaurants,
		restaurants,
	};
};
const actionGetOneRestaurants = (restaurant) => {
	return {
		type: GET_ONE_Restaurant,
		restaurant,
	};
};

const actionAddRestaurant = (restaurant) => {
	return {
		type: ADD_Restaurant,
		restaurant,
	};
};

const actionEditRestaurant = (restaurant) => {
	return {
		type: EDIT_Restaurant,
		restaurant,
	};
};

const actionDeleteRestaurant = (restaurantId) => {
	return {
		type: DELETE_Restaurant,
		restaurantId,
	};
};

export const thunkGetRestaurants = () => async (dispatch) => {
	const res = await fetch("/api/restaurants/");
	const restaurants = await res.json();
	dispatch(actionGetRestaurants(restaurants));
	return res;
};

export const thunkGetOneRestaurant = (restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${restaurantId}`);
	const restaurant = await res.json();
	dispatch(actionGetOneRestaurants(restaurant));
	return res;
};

export const thunkAddRestaurant = (restaurant) => async (dispatch) => {
	const response = await fetch("/api/restaurants/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(restaurant),
	});
	const data = await response.json();
	dispatch(actionAddRestaurant(data));
	return "Restaurant Added";
};

export const thunkEditRestaurant = (restaurant) => async (dispatch) => {
	const response = await fetch(`/api/restaurants/${restaurant.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(restaurant),
	});

	const data = await response.json();
	dispatch(actionEditRestaurant(data));
	return "Restaurant Updated";
};

export const thunkDeleteRestaurant = (restaurantId) => async (dispatch) => {
	const response = await fetch(`/api/restaurants/${restaurantId}`, {
		method: "DELETE",
	});
	dispatch(actionDeleteRestaurant(restaurantId));
	return "Restaurant Deleted";
};

const restaurantReducer = (state = {}, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_Restaurants:
			action.restaurants.restaurants.forEach((restaurant) => {
				newState[restaurant.id] = restaurant;
			});
			return newState;

		case GET_ONE_Restaurant:
			newState[action.restaurant.id] = action.restaurant;
			return newState;

		case ADD_Restaurant:
			newState[action.restaurant.id] = action.restaurant;
			return newState;

		case DELETE_Restaurant:
			delete newState[action.restaurantId];
			return newState;

		default:
			return state;
	}
};

export default restaurantReducer;
