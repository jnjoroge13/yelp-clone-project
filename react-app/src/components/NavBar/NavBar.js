import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import "./NavBar.css";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
	console.log(sessionUser);
	return (
		<nav className="nav-bar-cont">
			<NavLink to="/" exact={true}>
				<img className="navbar-logo" src={logo} />
			</NavLink>
			{!sessionUser && (
				<ul>
					<li>
						<NavLink to="/login" exact={true} activeClassName="active">
							Login
						</NavLink>
					</li>
					<li>
						<NavLink to="/sign-up" exact={true} activeClassName="active">
							Sign Up
						</NavLink>
					</li>
					<li>
						<NavLink to="/users" exact={true} activeClassName="active">
							Users
						</NavLink>
					</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			)}
			{sessionUser && (
				<div className="nav-bar-right">
					<NavLink className="nav-bar-restaurants" to="/restaurants">
						Restaurants
					</NavLink>
					<img className="navbar-profile-pic" src={sessionUser?.profileImage} />
				</div>
			)}
		</nav>
	);
};

export default NavBar;
