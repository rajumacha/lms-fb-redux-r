import { Types } from "../Types";

// const INITIAL_STATE = []; //[{ managerName, password, contact, branchName, role }]
const INITIAL_STATE = {
	new_manager: [],
	all_managers: [],
	manager_users: [],
	manager_customers: [],
	duration_manager_customers: [],
}; //[{ managerName, password, contact, branchName, role }]

const ManagersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_MANAGER:
			console.log(action.payload);
			// return [...state, action.payload];
			return { ...state, new_manager: [action.payload] };
		case Types.GET_MANAGERS:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, all_managers: [...action.payload] }
				: { ...state };
		case Types.GET_MANAGER_USERS:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, manager_users: [...action.payload] }
				: { ...state };
		case Types.GET_MANAGER_CUSTOMERS:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, manager_customers: [...action.payload] }
				: { ...state };
		case Types.GET_DURATION_MANAGER_CUSTOMERS:
			// return action.payload ? [...action.payload] : [];
			return action.payload
				? { ...state, duration_manager_customers: [...action.payload] }
				: { ...state };
		default:
			return state;
	}
};

export default ManagersReducer;
