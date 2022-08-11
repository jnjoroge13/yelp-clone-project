import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { thunkGetRestaurants } from "../../store/restaurants";
import './HomePage.css'
import homePageImage from '../assets/home-page-image.avif'
export default function HomePage() {
	const history = useHistory();
	return (
		<div className="home-page">
			<div className="home-page-image">
				{/* <img src={homePageImage}/> */}
			</div>
			<div className="home-page-categories">

			</div>
		</div>
	);
}
