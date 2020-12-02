import {
	addManager,
	getManagers,
	getManagerUsers,
	getManagerCustomers,
	getDurationManagerCustomers,
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

export const getManagerUsersAction = (managerName) => {
	return async (dispatch) => {
		let managerUsers = await getManagerUsers(managerName);
		dispatch({ type: Types.GET_MANAGER_USERS, payload: managerUsers });
	};
};
export const getManagerCustomersAction = (managerName) => {
	return async (dispatch) => {
		let managerCustomers = await getManagerCustomers(managerName);
		dispatch({ type: Types.GET_MANAGER_CUSTOMERS, payload: managerCustomers });
	};
};
export const getDurationManagerCustomersAction = (
	{ fromDate, toDate },
	managerName
) => {
	return async (dispatch) => {
		let durationManagerCustomers = await getDurationManagerCustomers(
			{ fromDate, toDate },
			managerName
		);
		dispatch({
			type: Types.GET_DURATION_MANAGER_CUSTOMERS,
			payload: durationManagerCustomers,
		});
	};
};
