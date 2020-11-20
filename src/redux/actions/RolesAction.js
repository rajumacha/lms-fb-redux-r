import { addRole, getRoles } from "../../models/Role";
import { Types } from "../Types";

export const addRoleAction = (role) => {
	return async (dispatch) => {
		await addRole(role);
		dispatch({ type: Types.ADD_ROLE, payload: role });
	};
};

export const getRolesAction = () => {
	return async (dispatch) => {
		let roles = await getRoles();
		dispatch({ type: Types.GET_ROLES, payload: roles });
	};
};
