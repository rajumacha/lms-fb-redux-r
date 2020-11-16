import React, { useState } from "react";
import { connect } from "react-redux";
import { setCurUser, setLoginStatus } from "../../redux/actions/UsersAction";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { labels } from "../../utils/labels";
import "./signin.styles.scss";

function SignIn({ history, users, setCurUser, setLoginStatus }) {
	const [name, setName] = useState(null);
	const [password, setPassword] = useState(null);
	const [role, setRole] = useState("");
	const [error, setError] = useState(null);

	const verifyUserCredentials = () => {
		let usr = users.find((usr) => usr.password === password);
		let msg = "Credentials Are Not Valid!!!";

		if (usr) {
			if (usr.name !== name || usr.password !== password || usr.role !== role) {
				return msg;
			} else {
				return "";
			}
		} else {
			return msg;
		}
	};

	function handleSubmit(e) {
		e.preventDefault();

		let error = verifyUserCredentials();
		if (error === "") {
			setCurUser({ name, role });
			setLoginStatus(true);
			history.push("/");
		} else {
			setError(error);
			setCurUser(null);
		}
	}
	return (
		<div className="container signin">
			<h2 className="center-align indigo-text">{labels.SIGNIN}</h2>
			<div>{error ? <ErrorMsg message={error} /> : null}</div>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<input
						id="name"
						type="text"
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor="name" className="label-text">
						Name
					</label>
				</div>
				<div className="field">
					<input
						id="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password" className="label-text">
						Password
					</label>
				</div>
				{/*these roles should come from db*/}

				<div className="field">
					<label htmlFor="role">Role</label>
					<select
						id="role"
						name="role"
						onChange={(e) => setRole(e.target.value)}
					>
						<option selected disabled hidden>
							Select Role
						</option>
						<option value="lms-user">LmsUser</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				<div className="field">
					<button className="btn">{labels.SIGNIN}</button>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = ({ users }) => {
	return {
		users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurUser: (user) => {
			dispatch(setCurUser(user));
		},
		setLoginStatus: (status) => {
			dispatch(setLoginStatus(status));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
