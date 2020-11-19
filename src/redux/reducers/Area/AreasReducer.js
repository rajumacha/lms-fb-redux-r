import { Types } from "../../Types";

const INITIAL_STATE = []; //[{area,city,pincode}]

const AreasReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_AREA:
			return [...state, action.payload];
		case Types.GET_AREAS:
			return action.payload ? [...action.payload] : [];
		default:
			return state;
	}
};

export default AreasReducer;
