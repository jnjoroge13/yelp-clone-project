import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);

	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
	};

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
					<div className="drop-down">
						<button className="navbar-profile-pic-btn">
							<img
								className="navbar-profile-pic"
								src={sessionUser?.profileImage}
							/>
						</button>

						<div className="drop-down-menu">
							<div className="drop-down-divs">
								<div className="drop-down-icons">
									<i className="fa-regular fa-circle-user fa-xl"></i>
								</div>
								<p>About Me</p>
							</div>
							<div className="drop-down-divs" onClick={onLogout}>
								<div className="drop-down-icons">
									<i className="fa fa-arrow-right-from-bracket fa-lg"></i>
								</div>
								<p>Logout</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
