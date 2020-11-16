import { Types } from "../../Types";

const INITIAL_STATE = [];

const UsersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.GET_USERS:
			return [...state, ...action.payload];
		default:
			return state;
	}
};

export default UsersReducer;
