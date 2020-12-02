import { Types } from "../../Types";

// const INITIAL_STATE = [];
const INITIAL_STATE = {
	new_user: [],
	all_users: [],
	user_customers: [],
	duration_user_customers: [],
	cur_user: null,
	login_status: null,
};

const UsersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_USER:
			// return [...state, action.payload];
			return { ...state, new_user: [action.payload] };
		case Types.GET_USERS:
			// return action.payload ? [...action.payload] : state;
			return action.payload
				? { ...state, all_users: [...action.payload] }
				: { ...state };
		case Types.GET_USER_CUSTOMERS:
			return action.payload
				? { ...state, user_customers: [...action.payload] }
				: { ...state };
		case Types.GET_DURATION_USER_CUSTOMERS:
			return action.payload
				? { ...state, duration_user_customers: [...action.payload] }
				: { ...state };
		case Types.CUR_USER:
			// return action.payload ? [...action.payload] : state;
			return action.payload
				? { ...state, cur_user: action.payload }
				: { ...state };
		case Types.LOGIN_STATUS:
			// return action.payload ? [...action.payload] : state;
			return action.payload
				? { ...state, login_status: action.payload }
				: { ...state };
		default:
			return state;
	}
};

export default UsersReducer;
