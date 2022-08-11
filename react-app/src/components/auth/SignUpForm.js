import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import signinImage from "../assets/yelp-signin-image.png";
import "./auth.css";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [firstSubmit, setFirstSubmit] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const validateEmail = (email) => {
		let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
	const usernameNoSpaces = (username) => {
		let re = /^\S+$/;
		return re.test(username);
	};
	useEffect(() => {
		const errors = [];
		// if (!username) errors.push('A username is required.');
		// if (!email) errors.push('An email is required.');
		if (!validateEmail(email)) errors.push("Must be a valid email address.");
		if (!usernameNoSpaces(username))
			errors.push("Username cannot have spaces.");
		// if (!password) errors.push('A password is required.');
		if (password.length < 6)
			errors.push("Password length must be at least 6 characters.");
		// if (!repeatPassword) errors.push('Please repeat the password.');
		if (password !== repeatPassword)
			errors.push("Password and repeated password must match.");
		if (username.length > 25)
			errors.push("Username must be 25 characters or less.");
		if (email.length > 255)
			errors.push("Email length must be 255 characters or less.");
		if (password.length > 255)
			errors.push("Password length must be 255 characters or less.");
		console.log(errors);
		setErrors(errors);
	}, [username, email, password, repeatPassword]);

	// const checkErrors = () => {
	// 	const errors = [];
	// 	// if (!username) errors.push('A username is required.');
	// 	// if (!email) errors.push('An email is required.');
	// 	if (!validateEmail(email)) errors.push("Must be a valid email address.");
	// 	if (!usernameNoSpaces(username))
	// 		errors.push("Username cannot have spaces.");
	// 	// if (!password) errors.push('A password is required.');
	// 	if (password.length < 6)
	// 		errors.push("Password length must be at least 6 characters.");
	// 	// if (!repeatPassword) errors.push('Please repeat the password.');
	// 	if (password !== repeatPassword)
	// 		errors.push("Password and repeated password must match.");
	// 	if (username.length > 25)
	// 		errors.push("Username must be 25 characters or less.");
	// 	if (email.length > 255)
	// 		errors.push("Email length must be 255 characters or less.");
	// 	if (password.length > 255)
	// 		errors.push("Password length must be 255 characters or less.");
	// 	console.log(errors);
	// 	setErrors(errors);
	// };
	const onSignUp = async (e) => {
		e.preventDefault();
		setFirstSubmit(true);
		if (!errors.length) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				console.log(data)
				setErrors(data);
			}
		}
	};

	const clearErrors = () => {
		setFirstSubmit(false);
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-signup-cont">
			{errors.length > 0 && firstSubmit && (
				<div className="login-errors">
					<div>
						{errors.map((error, ind) => (
							<div key={ind} className="login-error">
								{error}
							</div>
						))}
					</div>
					<i className="fa-solid fa-xmark fa-xl" onClick={clearErrors}></i>
				</div>
			)}
			<form className="login-signup-form-cont" onSubmit={onSignUp}>
				<div className="login-signup-header">
					<h3>Sign Up for BKS</h3>
					<p className="signup-text">Connect with great local restaurants</p>
				</div>
				<div className="form-email">
					<input
						type="text"
						name="username"
						placeholder="Username"
						onChange={updateUsername}
						value={username}
						required={true}
					></input>
				</div>
				<div className="form-email">
					<input
						type="text"
						name="email"
						placeholder="Email"
						onChange={updateEmail}
						value={email}
						required={true}
					></input>
				</div>
				<div className="form-email">
					<input
						type="password"
						name="password"
						placeholder="Password"
						minLength="6"
						onChange={updatePassword}
						value={password}
						required={true}
					></input>
				</div>
				<div className="form-email">
					<input
						type="password"
						placeholder="Repeat Password"
						name="repeat_password"
						onChange={updateRepeatPassword}
						value={repeatPassword}
						required={true}
					></input>
				</div>
				<div className="form-submit">
					<button type="submit">Sign Up</button>
				</div>
				<div className="login-signup-footer">
					<p>
						Already on BKS? <Link to="/login">Log in</Link>
					</p>
				</div>
			</form>
			<div className="login-signup-image-cont">
				<img src={signinImage} />
			</div>
		</div>
	);
};

export default SignUpForm;
