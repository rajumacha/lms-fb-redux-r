import {
	addManager,
	getManagers,
	getBranchManagers,
} from "../../models/Manager";
import { Types } from "../Types";

export const addManagerAction = (manager) => {
	console.log(manager);
	return async (dispatch) => {
		await addManager(manager);
		dispatch({ type: Types.ADD_MANAGER, payload: manager });
	};
};

export const getManagersAction = () => {
	return async (dispatch) => {
		let managers = await getManagers();
		dispatch({ type: Types.GET_MANAGERS, payload: managers });
	};
};

export const getBranchManagersAction = (branchName) => {
	console.log(branchName);
	return async (dispatch) => {
		let managers = await getBranchManagers(branchName);
		dispatch({ type: Types.GET_BRANCH_MANAGERS, payload: managers });
	};
};
