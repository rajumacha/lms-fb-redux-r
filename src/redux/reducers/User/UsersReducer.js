import { Types } from "../../Types";

const INITIAL_STATE = [];

const UsersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_USER:
			return [...state, action.payload];
		case Types.GET_USERS:
			return action.payload ? [...action.payload] : state;
		default:
			return state;
	}
};

export default UsersReducer;
