import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { thunkGetRestaurants } from "../../store/restaurants";

export default function HomePage() {
	const history = useHistory();
	return (
		<div className="home-page">
			<h1>Home Page</h1>
		</div>
	);
}
