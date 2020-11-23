import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	setCurUserAction,
	setLoginStatusAction,
	getUsersAction,
} from "../redux/actions/UsersAction";
import { getRolesAction } from "../redux/actions/RolesAction";
import ErrorMsg from "./ErrorMsg";
import { labels } from "../utils/labels";
import "./styles/signin.styles.scss";

function SignIn({
	history,
	users,
	roles,
	setCurUserAction,
	setLoginStatusAction,
	getUsersAction,
	getRolesAction,
}) {
	const [name, setName] = useState(null);
	const [password, setPassword] = useState(null);
	const [role, setRole] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		getRolesAction();
		getUsersAction();
	}, []);

	const verifyUserCredentials = () => {
		let msg = "Credentials Are Not Valid!!!";

		let usr = users.find(
			(usr) =>
				usr.password === password && usr.userName === name && usr.role === role
		);
		console.log(usr);
		if (usr) {
			return "";
		} else {
			return msg;
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		let error = verifyUserCredentials();

		if (error === "") {
			setCurUserAction({ name, role });
			setLoginStatusAction(true);
			history.push("/");
		} else {
			setError(error);
			setCurUserAction(null);
		}
	}

	function displayRoles() {
		let rolesOptions = [];
		if (roles.length > 0) {
			rolesOptions = roles.map((role) => {
				return (
					<option key={role.id} value={role.name}>
						{role.name}
					</option>
				);
			});
		}
		return rolesOptions;
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
						{displayRoles()}
					</select>
				</div>
				<div className="field">
					<button className="btn">{labels.SIGNIN}</button>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = ({ users, roles }) => {
	console.log(users);
	return {
		users,
		roles,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurUserAction: (user) => {
			dispatch(setCurUserAction(user));
		},
		setLoginStatusAction: (status) => {
			dispatch(setLoginStatusAction(status));
		},
		getRolesAction: () => {
			dispatch(getRolesAction());
		},
		getUsersAction: () => {
			dispatch(getUsersAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
