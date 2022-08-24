import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { thunkGetRestaurants } from "../../store/restaurants";
import "./HomePage.css";
import homePageImage from "../assets/home-page-image.avif";
export default function HomePage() {
	const history = useHistory();
	return (
		<div className="home-page">
			<div className="home-page-image">{/* <img src={homePageImage}/> */}</div>
			<div className="home-page-categories">
				<div className="categories-div categories-div-all" onClick={()=>history.push('/restaurants')}><p>🍴</p> Restaurants </div>
				<div className="categories-div" onClick={()=>history.push('/search/korean')}><p>🥘</p> Korean </div>
				<div className="categories-div" onClick={()=>history.push('/search/brunch')}><p>🍳</p> Brunch </div>
				<div className="categories-div" onClick={()=>history.push('/search/italian')}><p>🍝</p> Italian </div>
				<div className="categories-div" onClick={()=>history.push('/search/bakery')}><p>🧁</p> Bakery </div>
				<div className="categories-div" onClick={()=>history.push('/search/seafood')}><p>🦞</p> Seafood </div>
				<div className="categories-div" onClick={()=>history.push('/search/mexican')}><p>🌮</p> Mexican </div>
				<div className="categories-div" onClick={()=>history.push('/search/chinese')}><p>🥡</p> Chinese </div>
			</div>
		</div>
	);
}
