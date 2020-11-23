import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { getBranchesAction } from "../../redux/actions/BranchesAction";
import {
	getManagersAction,
	getBranchManagersAction,
} from "../../redux/actions/ManagersAction";
import { getRolesAction } from "../../redux/actions/RolesAction";
import { addUserAction, getUsersAction } from "../../redux/actions/UsersAction";
import { labels } from "../../utils/labels";
import ErrorMsg from "../ErrorMsg";
import Label from "../Label";
import "./admin.styles.scss";

function User({
	addUserAction,
	getUsersAction,
	getBranchesAction,
	getManagersAction,
	getBranchManagersAction,
	getRolesAction,
	users,
	branches,
	managers,
	roles,
}) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [branchName, setBranchName] = useState("");
	const [managerName, setManagerName] = useState("");
	const [role, setRole] = useState("");
	const selectBranchOption = useRef(null);
	const selectManagerOption = useRef(null);
	const selectRoleOption = useRef(null);
	const [error, setError] = useState("");

	useEffect(() => {
		getUsersAction();
		getBranchesAction();
		getRolesAction();
	}, []);

	useEffect(() => {
		getBranchManagersAction(branchName);
	}, [branchName]);

	const handleSubmit = (e) => {
		e.preventDefault();
		addUserAction({ userName, password, branchName, managerName, role });
		setDefaults();
	};

	const setDefaults = () => {
		setUserName("");
		setPassword("");
		setBranchName("");
		setManagerName("");
		setRole("");
		setError("");
		selectBranchOption.current[0].selected = true;
		selectManagerOption.current[0].selected = true;
		selectRoleOption.current[0].selected = true;
	};

	const handleBranchSelect = (e) => {
		let branch = branches.find((item) => item.id === e.target.value);
		setBranchName(branch.branchName);
	};

	const handleManagerSelect = (e) => {
		let manager = managers.find((item) => item.id === e.target.value);
		setManagerName(manager.managerName);
	};

	const handleRoleSelect = (e) => {
		let role = roles.find((item) => item.id === e.target.value);
		setRole(role.name);
	};

	const displayBranches = () => {
		if (branches) {
			return branches.map((branch) => {
				return (
					<option key={branch.id} value={branch.id}>
						{branch.branchName}
					</option>
				);
			});
		}
	};

	const displayManagers = () => {
		if (managers) {
			return managers.map((manager) => {
				return (
					<option key={manager.id} value={manager.id}>
						{manager.managerName}
					</option>
				);
			});
		}
	};

	const displayRoles = () => {
		if (roles) {
			return roles.map((role) => {
				return (
					<option key={role.id} value={role.id}>
						{role.name}
					</option>
				);
			});
		}
	};

	return (
		<div className="container new-branch">
			<Label label="New User" />
			<div>{error ? <ErrorMsg message={error} /> : null}</div>

			<form onSubmit={handleSubmit}>
				<div className="field">
					<input
						id="userName"
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						required
					/>
					<label htmlFor="userName" className="label-text">
						UserName:
					</label>
				</div>
				<div className="field">
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<label htmlFor="password" className="label-text">
						Password:
					</label>
				</div>

				<div className="field">
					<label htmlFor="branch">Branch: </label>
					<select
						id="branch"
						name="branch"
						ref={selectBranchOption}
						onChange={handleBranchSelect}
					>
						<option selected disabled hidden>
							Select Branch
						</option>
						{displayBranches()}
					</select>
				</div>
				<div className="field">
					<label htmlFor="branch">Manager: </label>
					<select
						id="manager"
						name="manager"
						ref={selectManagerOption}
						onChange={handleManagerSelect}
					>
						<option selected disabled hidden>
							Select Manager
						</option>
						{displayManagers()}
					</select>
				</div>
				<div className="field">
					<label htmlFor="role">Role</label>
					<select
						id="role"
						name="role"
						ref={selectRoleOption}
						onChange={handleRoleSelect}
					>
						<option selected disabled hidden>
							Select Role
						</option>
						{displayRoles()}
					</select>
				</div>

				<div className="field">
					<button className="btn">{labels.ADD_BRANCH}</button>
				</div>
			</form>
			<div>
				{users.length > 0 && (
					<>
						<h5> Users Added : {users.length}</h5>
						<table class="bordered">
							<thead>
								<tr>
									<th>User</th>
									<th>Branch</th>
									<th>Manager</th>
									<th>Role</th>
								</tr>
							</thead>
							<tbody>
								<>
									{users.map((user) => (
										<tr key={user.id}>
											<td>{user.userName}</td>
											<td>{user.branchName}</td>
											<td>{user.managerName}</td>
											<td>{user.role}</td>
										</tr>
									))}
								</>
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({ users, branches, managers, roles }) => {
	console.log(branches, managers, roles, users);
	return {
		users,
		branches,
		managers,
		roles,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addUserAction: (user) => {
			dispatch(addUserAction(user));
		},
		getUsersAction: () => {
			dispatch(getUsersAction());
		},
		getBranchesAction: () => {
			dispatch(getBranchesAction());
		},
		getManagersAction: () => {
			dispatch(getManagersAction());
		},
		getRolesAction: () => {
			dispatch(getRolesAction());
		},
		getBranchManagersAction: (branchName) => {
			dispatch(getBranchManagersAction(branchName));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
