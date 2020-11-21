import { Types } from "../Types";

const INITIAL_STATE = []; //[{name, permissions: {name: false, name: true}}];

const RolesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_ROLE:
			return action.payload ? [...state, action.payload] : state;
		case Types.GET_ROLES:
			return [...action.payload];
		default:
			return state;
	}
};

export default RolesReducer;
