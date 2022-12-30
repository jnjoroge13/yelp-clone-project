import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import NewRestaurantForm from "./components/NewRestaurantForm/NewRestaurantForm";
import { EditRestaurantForm } from "./components/EditRestaurantForm/EditRestaurantForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage"
import SingleRestaurant from "./components/singleRestaurant/singleRestaurant";
import EditReviewForm from "./components/Reviews/EditReviewPage";
import User from "./components/User";
import SearchPage from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import { authenticate } from "./store/session";
import { thunkGetAllReviews } from "./store/reviews";
import { thunkGetKey } from "./store/maps";
import { thunkGetRestaurants } from "./store/restaurants";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkGetKey())
		dispatch(thunkGetRestaurants())
	})
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
				<ProtectedRoute path="/restaurants/edit/:restaurantId" exact={true}>
					<EditRestaurantForm />
				</ProtectedRoute>
				<ProtectedRoute path="/reviews/:reviewId" exact={true}>
					<EditReviewForm />
				</ProtectedRoute>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/profiles/:userId" exact={true}>
					<ProfilePage />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<Route path="/search/:searchValue" exact={true}>
					<SearchPage />
				</Route>
				<Route path="/" exact={true}>
					<HomePage />
				</Route>
			</Switch>
			<Footer/>
		</BrowserRouter>
	);
}

export default App;
