import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	addRoleAction,
	getRolesAction,
} from "../../../redux/actions/RolesAction";
import { labels } from "../../../utils/labels";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import Label from "../../Label/Label";
import "./role.styles.scss";

function Role({ addRoleAction, getRolesAction, roles, permissions }) {
	const [role, setRole] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		getRolesAction();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		addRoleAction({ name: role });
		setDefaults();
	};

	const setDefaults = () => {
		setRole("");
		setError("");
	};

	return (
		<div className="container new-role">
			<Label label="+ Role" />
			<div>{error ? <ErrorMsg message={error} /> : null}</div>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<input
						id="role"
						type="text"
						value={role}
						onChange={(e) => setRole(e.target.value)}
						required
					/>
					<label htmlFor="role" className="label-text">
						Role:
					</label>
				</div>

				<div className="field permissions">
					{permissions.map((permission) => {
						return (
							<p>
								<label>
									<input type="checkbox" />
									<span>{permission.name}</span>
								</label>
							</p>
						);
					})}
				</div>
				<div className="field">
					<button className="btn">{labels.ADD_ROLE}</button>
				</div>
			</form>
			<div>
				{roles.length > 0 && (
					<>
						Roles Created : {roles.length}
						{roles.map((role) => (
							<div>
								<span>{role.name}</span>{" "}
							</div>
						))}
					</>
				)}
			</div>
			<div>
				<table class="bordered">
					<thead>
						<tr>
							<th>Role</th>
							<th>permissions</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Atul</td>
							<td>2</td>
						</tr>
						<tr>
							<td>Aman</td>
							<td>4</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

const mapStateToProps = ({ roles, permissions }) => {
	console.log(roles);
	return {
		roles,
		permissions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addRoleAction: (role) => {
			dispatch(addRoleAction(role));
		},
		getRolesAction: () => {
			dispatch(getRolesAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
