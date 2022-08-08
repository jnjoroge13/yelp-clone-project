import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import whiteLogo from "../assets/logo-white.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../store/session";
import "./NavBar.css";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const [showDropdown, setShowDropdown] = useState(false);
	const location = useLocation();

	const openDropdown = () => {
		if (showDropdown) return;
		setShowDropdown(true);
	};

	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
		setShowDropdown(!showDropdown);
	};
	useEffect(() => {
		if (!showDropdown) return;
		const closeDropdown = () => {
			setShowDropdown(false);
		};
		document.addEventListener("click", closeDropdown);

		return () => document.removeEventListener("click", closeDropdown);
	}, [showDropdown]);
	if (location.pathname == "/login" || location.pathname == "/sign-up") {
		return (
			<nav className="nav-bar-cont-login-signup">
				<NavLink to="/" exact={true}>
					<img className="navbar-logo" src={whiteLogo} />
				</NavLink>
			</nav>
		);
	}
	return (
		<nav className="nav-bar-cont">
			<NavLink to="/" exact={true}>
				<img className="navbar-logo" src={logo} />
			</NavLink>
			{!sessionUser && (
				<div className="nav-bar-right">
					<NavLink className="nav-bar-restaurants" to="/restaurants">
						Restaurants
					</NavLink>
					<button
						className="nav-bar-login-btn"
						onClick={async (e) => {
							e.preventDefault();
							const data = await dispatch(login('demo@aa.io', 'password'));
							if (data) {
								console.log(data);
							}
						}}
					>
						Demo User
					</button>
					<NavLink
						className="nav-bar-login-btn"
						to="/login"
						exact={true}
						activeClassName="active"
					>
						Log In
					</NavLink>
					<NavLink
						className="nav-bar-signup-btn"
						to="/sign-up"
						exact={true}
						activeClassName="active"
					>
						Sign Up
					</NavLink>
					{/* <NavLink to="/users" exact={true} activeClassName="active">
						Users
					</NavLink> */}
				</div>
			)}
			{sessionUser && (
				<div className="nav-bar-right">
					<NavLink className="nav-bar-restaurants" to="/restaurants">
						Restaurants
					</NavLink>
					<div className="drop-down">
						<img
							className="navbar-profile-pic"
							src={sessionUser?.profileImage}
							onClick={openDropdown}
						/>
						{showDropdown && (
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
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
