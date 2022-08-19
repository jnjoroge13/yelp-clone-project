import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import whiteLogo from "../assets/logo-white.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const [showDropdown, setShowDropdown] = useState(false);
	const [showMobileDropdown, setShowMobileDropdown] = useState(false);
	const location = useLocation();
	const history = useHistory();
	const openDropdown = () => {
		if (showDropdown) return;
		setShowDropdown(true);
	};

	const openMobileDropdown = () => {
		if (showMobileDropdown) return;
		setShowMobileDropdown(true);
	};

	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const onLogout = async (e) => {
		await dispatch(logout());
		setShowDropdown(!showDropdown);
		setShowMobileDropdown(!showMobileDropdown);
		history.push("/");
	};
	useEffect(() => {
		if (!showDropdown) return;
		const closeDropdown = () => {
			setShowDropdown(false);
		};
		document.addEventListener("click", closeDropdown);

		return () => document.removeEventListener("click", closeDropdown);
	}, [showDropdown]);

	useEffect(() => {
		if (!showMobileDropdown) return;
		const closeMobileDropdown = () => {
			setShowMobileDropdown(false);
		};
		document.addEventListener("click", closeMobileDropdown);

		return () => document.removeEventListener("click", closeMobileDropdown);
	}, [showMobileDropdown]);

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
			{/* Desktop Logo */}
			<NavLink className="logo-cont" to="/" exact={true}>
				<img className="navbar-logo" src={logo} />
			</NavLink>

			{/* Mobile Logo */}
			<NavLink className="logo-cont-mobile" to="/" exact={true}>
				<img className="navbar-logo" src={whiteLogo} />
			</NavLink>
			<div className="search-bar-cont">
				<form className="search-bar">
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Search by Cuisine or Restaurant Name"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<div className="search-bar-icon">
						<i className=" search-icon fa fa-search fa-xl"></i>
					</div>
				</form>
			</div>

			{/* Mobile Dropdown */}
			<div className="mobile-menu-cont">
				<i class="fa-solid fa-bars fa-xl" onClick={openMobileDropdown}></i>
			</div>
			{showMobileDropdown && (<div className="mobile-menu-dropdown-cont">
				<NavLink className="mobile-dropdown-restaurants" to="/restaurants">
					Restaurants
				</NavLink>
			</div>)}

			{/* Logged out User Nav Right */}
			{!sessionUser && (
				<div className="nav-bar-right">
					<NavLink className="nav-bar-restaurants" to="/restaurants">
						Restaurants
					</NavLink>
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
				</div>
			)}

			{/* Logged in User Nav Right */}
			{sessionUser && (
				<div className="nav-bar-right">
					<NavLink className="nav-bar-restaurants" to="/restaurants/new">
						New Restaurant
					</NavLink>
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
								{/* <div className="drop-down-divs">
									<div className="drop-down-icons">
										<i className="fa-regular fa-circle-user fa-xl"></i>
									</div>
									<p>About Me</p>
								</div> */}
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
