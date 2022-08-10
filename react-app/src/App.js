import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import NewRestaurantForm from "./components/NewRestaurantForm/NewRestaurantForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import HomePage from "./components/HomePage/HomePage";
import SingleRestaurant from "./components/singleRestaurant/singleRestaurant";
import EditReviewForm from "./components/Reviews/EditReviewPage";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/restaurants" exact={true}>
					<RestaurantList />
				</Route>
				<ProtectedRoute path="/restaurants/new" exact={true}>
					<NewRestaurantForm />
				</ProtectedRoute>
				<Route path="/restaurants/:restaurantId" exact={true}>
					<SingleRestaurant />
				</Route>
				<ProtectedRoute path="/reviews/:reviewId" exact={true}>
					<EditReviewForm />
				</ProtectedRoute>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					<HomePage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
