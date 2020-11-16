import { combineReducers } from "redux";
import UsersReducer from "./User/UsersReducer";
import CurUserReducer from "./User/CurUserReducer";
import LoginStatusReducer from "./User/LoginStatusReducer";

const rootReducer = combineReducers({
	users: UsersReducer,
	curUser: CurUserReducer,
	loginStatus: LoginStatusReducer,
	// leads: LeadsReucer,
	// lead: LeadReducer
});

export default rootReducer;
