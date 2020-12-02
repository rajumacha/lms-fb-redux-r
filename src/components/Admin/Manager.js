import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { getBranchesAction } from "../../redux/actions/BranchesAction";
import { getRolesAction } from "../../redux/actions/RolesAction";
import {
	addManagerAction,
	getManagersAction,
} from "../../redux/actions/ManagersAction";
import { labels } from "../../utils/labels";
import ErrorMsg from "../ErrorMsg";
import Label from "../Label";
import "./admin.styles.scss";

function Manager({
	getBranchesAction,
	getRolesAction,
	getManagersAction,
	addManagerAction,
	managers,
	branches,
	roles,
}) {
	const [managerName, setManagerName] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [branchName, setBranchName] = useState("");
	const [role, setRole] = useState("");
	const selectBranchOption = useRef(null);
	const selectRoleOption = useRef(null);
	const [error, setError] = useState("");

	useEffect(() => {
		getRolesAction();
		getBranchesAction();
		getManagersAction();
	}, []);

	useEffect(() => {
		getManagersAction();
	}, [managerName]);

	const handleSubmit = (e) => {
		e.preventDefault();
		addManagerAction({ managerName, password, contact, branchName, role });
		setDefaults();
	};

	const setDefaults = () => {
		setManagerName("");
		setPassword("");
		setContact("");
		setError("");
		selectBranchOption.current[0].selected = true;
		selectRoleOption.current[0].selected = true;
	};

	const handleRoleSelect = (e) => {
		let role = roles.find((item) => item.id === e.target.value);
		setRole(role.name);
	};

	const handleBranchSelect = (e) => {
		let branch = branches.find((item) => item.id === e.target.value);
		setBranchName(branch.branchName);
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

	return (
		<div className="container new-branch">
			<Label label="New Manager" />
			<div>{error ? <ErrorMsg message={error} /> : null}</div>

			<form onSubmit={handleSubmit}>
				<div className="field">
					<input
						id="managerName"
						type="text"
						value={managerName}
						onChange={(e) => setManagerName(e.target.value)}
						required
					/>
					<label htmlFor="managerName" className="label-text">
						ManagerName:
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
					<input
						id="contact"
						type="number"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
						required
					/>
					<label htmlFor="contact" className="label-text">
						Contact:
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
					<button className="btn">{labels.ADD_MANAGER}</button>
				</div>
			</form>
			<div>
				{managers.length > 0 && (
					<>
						<h5>Managers Created : {managers.length}</h5>
						<table class="bordered">
							<thead>
								<tr>
									<th>Manager</th>
									<th>Branch</th>
								</tr>
							</thead>
							<tbody>
								<>
									{managers.map((manager) => (
										<tr key={manager.id}>
											<td>{manager.managerName}</td>
											<td>{manager.branchName}</td>
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

const mapStateToProps = ({
	managers: { all_managers: managers },
	branches: { all_branches: branches },
	roles,
}) => {
	return {
		managers,
		branches,
		roles,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBranchesAction: () => {
			dispatch(getBranchesAction());
		},
		getRolesAction: () => {
			dispatch(getRolesAction());
		},
		getManagersAction: () => {
			dispatch(getManagersAction());
		},
		addManagerAction: (manager) => {
			dispatch(addManagerAction(manager));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
