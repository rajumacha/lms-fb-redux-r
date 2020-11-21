import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addRoleAction, getRolesAction } from "../../redux/actions/RolesAction";
import { getPermissionsAction } from "../../redux/actions/PermissionsAction";
import { labels } from "../../utils/labels";
import ErrorMsg from "../ErrorMsg";
import Label from "../Label";
import "./admin.styles.scss";

function Role({
	addRoleAction,
	getRolesAction,
	getPermissionsAction,
	roles,
	permissions,
}) {
	const [role, setRole] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		getPermissionsAction();
		getRolesAction();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let rolePerms = {};
		permissions.map((p) => {
			rolePerms[p.name] = e.target[p.name].checked;
		});
		addRoleAction({ name: role.toUpperCase(), permissions: rolePerms });
		setDefaults();
	};

	const setDefaults = () => {
		setRole("");
		setError("");
	};

	const displayPermmissions = (permissions) => {
		//{create user: true}
		let perms = "";
		if (permissions) {
			perms = Object.entries(permissions).map(([key, value]) => {
				if (value) {
					return <p>{key}</p>;
				}
			});
		}
		return perms;
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
									<input type="checkbox" name={permission.name} />
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
					<table class="bordered">
						<thead>
							<tr>
								<th>Role</th>
								<th>permissions</th>
							</tr>
						</thead>
						<tbody>
							<>
								Roles Created : {roles.length}
								{roles.map((role) => (
									<tr>
										<td>{role.name}</td>
										<td>{displayPermmissions(role.permissions)}</td>
									</tr>
								))}
							</>
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({ roles, permissions }) => {
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
		getPermissionsAction: () => {
			dispatch(getPermissionsAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
