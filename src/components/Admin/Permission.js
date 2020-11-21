import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	addPermissionAction,
	getPermissionsAction,
} from "../../redux/actions/PermissionsAction";
import { labels } from "../../utils/labels";
import ErrorMsg from "../ErrorMsg";
import Label from "../Label";
import "./admin.styles.scss";

function Permission({
	addPermissionAction,
	getPermissionsAction,
	permissions,
}) {
	const [permission, setPermission] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		getPermissionsAction();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		addPermissionAction({ name: permission.toUpperCase() });
		setDefaults();
	};

	const setDefaults = () => {
		setPermission("");
		setError("");
	};

	return (
		<div className="container new-permission">
			<Label label="+ Permission" />
			<div>{error ? <ErrorMsg message={error} /> : null}</div>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<input
						id="permission"
						type="text"
						value={permission}
						onChange={(e) => setPermission(e.target.value)}
						required
					/>
					<label htmlFor="permission" className="label-text">
						Permission:
					</label>
				</div>

				<div className="field">
					<button className="btn">{labels.ADD_PERMISSION}</button>
				</div>
			</form>
			<div>
				{permissions.length > 0 && (
					<>
						<table class="bordered">
							<thead>
								<tr>
									<th>Permissions Created : {permissions.length}</th>
								</tr>
							</thead>

							<tbody>
								{permissions.map((perm) => (
									<tr>
										<td>{perm.name}</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({ permissions }) => {
	return {
		permissions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addPermissionAction: (permission) => {
			dispatch(addPermissionAction(permission));
		},
		getPermissionsAction: () => {
			dispatch(getPermissionsAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
