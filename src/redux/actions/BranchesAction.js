import { addBranch, getBranches } from "../../models/Branch";
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
		dispatch({ type: Types.GET_BRANCHES, payload: branches });
	};
};
