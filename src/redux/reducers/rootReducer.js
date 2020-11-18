import { combineReducers } from "redux";
import UsersReducer from "./User/UsersReducer";
import CurUserReducer from "./User/CurUserReducer";
import LoginStatusReducer from "./User/LoginStatusReducer";
import CustomersReducer from "./Customer/CustomersReducer";

const rootReducer = combineReducers({
	users: UsersReducer, //[]
	curUser: CurUserReducer, //{name,role} / null
	loginStatus: LoginStatusReducer, //true/false
	customers: CustomersReducer, //[]
	// lead: LeadReducer
});

export default rootReducer;
