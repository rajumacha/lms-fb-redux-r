import {
	addBranch,
	getBranches,
	getBranchManagers,
	getBranchUsers,
	getDurationBranchCustomers,
} from "../../models/Branch";
import { Types } from "../Types";

export const addBranchAction = (branch) => {
	return async (dispatch) => {
		await addBranch(branch);
		dispatch({ type: Types.ADD_BRANCH, payload: branch });
	};
};

export const getBranchesAction = () => {
	return async (dispatch) => {
		let branches = await getBranches();
		console.log(branches);
		dispatch({ type: Types.GET_BRANCHES, payload: [...branches] });
	};
};

export const getBranchManagersAction = (branchName) => {
	return async (dispatch) => {
		let branchManagers = await getBranchManagers(branchName);
		dispatch({ type: Types.GET_BRANCH_MANAGERS, payload: branchManagers });
	};
};

export const getBranchUsersAction = (branchName) => {
	return async (dispatch) => {
		let branchUsers = await getBranchUsers(branchName);
		dispatch({ type: Types.GET_BRANCH_USERS, payload: branchUsers });
	};
};

export const getDurationBranchCustomersAction = (dates, branchName) => {
	return async (dispatch) => {
		let customers = await getDurationBranchCustomers(dates, branchName);
		dispatch({ type: Types.GET_DURATION_BRANCH_CUSTOMERS, payload: customers });
	};
};
