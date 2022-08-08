import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import signinImage from "../assets/yelp-signin-image.png";
import "./auth.css";
const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-signup-cont">
			<form className="login-signup-form-cont" onSubmit={onLogin}>
				<div className="login-signup-header">
          <h3>Log in to BKS</h3>
          <p>New to BKS? <Link to='/sign-up'>Sign up</Link></p>
				</div>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div className="form-email">
					<input
						name="email"
						type="text"
						placeholder="Email"
						value={email}
						onChange={updateEmail}
					/>
				</div>
				<div className="form-password">
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={updatePassword}
					/>
				</div>
				<div className="form-submit">
					<button type="submit">Log In</button>
        </div>
        <div className="login-signup-footer">
          <p>New to BKS? <Link to='/sign-up'>Sign up</Link></p>
				</div>
			</form>
			<div className="login-signup-image-cont">
				<img src={signinImage} />
			</div>
		</div>
	);
};

export default LoginForm;
