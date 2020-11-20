import { addPermission, getPermissions } from "../../models/Permission";
import { Types } from "../Types";

export const addPermissionAction = (permission) => {
	return async (dispatch) => {
		await addPermission(permission);
		dispatch({ type: Types.ADD_PERMISSION, payload: permission });
	};
};

export const getPermissionsAction = () => {
	return async (dispatch) => {
		let permissions = await getPermissions();
		dispatch({ type: Types.GET_PERMISSIONS, payload: permissions });
	};
};
