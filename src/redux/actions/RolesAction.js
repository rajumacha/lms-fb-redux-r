import { addRole, getRoles } from "../../models/Role";
import { Types } from "../Types";

export const addRoleAction = (role) => {
	return async (dispatch) => {
		try {
			await addRole(role);
			dispatch({ type: Types.ADD_ROLE, payload: role });
		} catch (err) {
			console.log(err.message);
		}
	};
};

export const getRolesAction = () => {
	return async (dispatch) => {
		try {
			let roles = await getRoles();
			dispatch({ type: Types.GET_ROLES, payload: roles });
		} catch (err) {
			console.log(err.message);
		}
	};
};
