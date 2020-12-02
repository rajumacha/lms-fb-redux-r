import { Types } from "../Types";

// const INITIAL_STATE = []; //[{branchName, area,addr, contact,city,pincode}]
const INITIAL_STATE = {
	new_branch: [],
	all_branches: [],
	branch_managers: [],
	branch_users: [],
	duration_branch_customers: [],
}; //[{branchName, area,addr, contact,city,pincode}]

const BranchesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_BRANCH:
			// return [...state, action.payload];
			return { ...state, new_branch: [action.payload] };
		case Types.GET_BRANCHES:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, all_branches: [...action.payload] }
				: { ...state };
		case Types.GET_BRANCH_MANAGERS:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, branch_managers: [...action.payload] }
				: { ...state };
		case Types.GET_BRANCH_USERS:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, branch_users: [...action.payload] }
				: { ...state };
		case Types.GET_DURATION_BRANCH_CUSTOMERS:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, duration_branch_customers: [...action.payload] }
				: { ...state };
		default:
			return state;
	}
};

export default BranchesReducer;
