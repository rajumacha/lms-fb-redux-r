import { Types } from "../Types";

const INITIAL_STATE = []; //[{name}];

const PermissionsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_PERMISSION:
			return action.payload ? [...state, action.payload] : state;
		case Types.GET_PERMISSIONS:
			return [...action.payload];
		default:
			return state;
	}
};

export default PermissionsReducer;
