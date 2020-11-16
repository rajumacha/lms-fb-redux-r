import { Types } from "../../Types";

const INITIAL_STATE = null;

const LoginStatusReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.LOGIN_STATUS:
			return action.payload;
		default:
			return state;
	}
};

export default LoginStatusReducer;
