import React, { useState } from "react";
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
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			}
		}
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
      <form className="login-signup-form-cont" onSubmit={onSignUp}>
      <div className="login-signup-header">
          <h3>Sign Up for BKS</h3>
          <p className="signup-text">Connect with great local restaurants</p>
				</div>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div className="form-email">
					<input
						type="text"
            name="username"
            placeholder="Username"

						onChange={updateUsername}
						value={username}
					></input>
				</div>
				<div className="form-email">
					<input
						type="text"
            name="email"
            placeholder="Email"

						onChange={updateEmail}
						value={email}
					></input>
				</div>
				<div className="form-email">
					<input
						type="password"
            name="password"
            placeholder="Password"
						onChange={updatePassword}
						value={password}
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
          <p>Already on BKS? <Link to='/login'>Log in</Link></p>
				</div>
			</form>
			<div className="login-signup-image-cont">
				<img src={signinImage} />
			</div>
		</div>
	);
};

export default SignUpForm;
