import { Types } from "../Types";

const INITIAL_STATE = []; //[{branchName, area,addr, contact,city,pincode}]

const BranchesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_BRANCH:
			return [...state, action.payload];
		case Types.GET_BRANCHES:
			return action.payload ? [...action.payload] : [];
		default:
			return state;
	}
};

export default BranchesReducer;
