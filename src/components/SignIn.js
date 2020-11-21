import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurUser, setLoginStatus } from "../redux/actions/UsersAction";
import { getRolesAction } from "../redux/actions/RolesAction";
import ErrorMsg from "./ErrorMsg";
import { labels } from "../utils/labels";
import "./styles/signin.styles.scss";

function SignIn({
	history,
	users,
	roles,
	setCurUser,
	setLoginStatus,
	getRolesAction,
}) {
	const [name, setName] = useState(null);
	const [password, setPassword] = useState(null);
	const [role, setRole] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		getRolesAction();
	}, []);

	const verifyUserCredentials = async () => {
		let msg = "Credentials Are Not Valid!!!";

		let usr = users.find((usr) => usr.password === password);

		if (usr) {
			let userRole = "";
			let userRef = await usr.role.get();
			userRole = userRef.data().name;
			if (usr.name === name && usr.password === password && userRole === role) {
				return "";
			} else {
				return "Credentials Are Not Valid!!!";
			}
		} else {
			return msg;
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		let error;
		verifyUserCredentials().then((res) => {
			error = res;
			if (error === "") {
				setCurUser({ name, role });
				setLoginStatus(true);
				history.push("/");
			} else {
				if (!error) {
					error = "Credentials Are Not Valid!!!";
				}
				setError(error);
				setCurUser(null);
			}
		});
	}

	function displayRoles() {
		let rolesOptions = [];
		if (roles.length > 0) {
			rolesOptions = roles.map((role) => {
				return <option value={role.name}>{role.name}</option>;
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
		setCurUser: (user) => {
			dispatch(setCurUser(user));
		},
		setLoginStatus: (status) => {
			dispatch(setLoginStatus(status));
		},
		getRolesAction: () => {
			dispatch(getRolesAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
