import { Types } from "../Types";

const INITIAL_STATE = []; //[{ managerName, password, contact, branchName, role }]

const ManagersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_MANAGER:
			console.log(action.payload);
			return [...state, action.payload];
		case Types.GET_MANAGERS:
			return action.payload ? [...action.payload] : [];
		case Types.GET_BRANCH_MANAGERS:
			return action.payload ? [...action.payload] : [];
		default:
			return state;
	}
};

export default ManagersReducer;
