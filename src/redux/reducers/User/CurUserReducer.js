import { Types } from "../../Types";

const INITIAL_STATE = null; //{name,role} / null

const CurUserReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.CUR_USER:
			return action.payload;
		default:
			return state;
	}
};

export default CurUserReducer;
