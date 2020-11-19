import { combineReducers } from "redux";
import UsersReducer from "./User/UsersReducer";
import CurUserReducer from "./User/CurUserReducer";
import LoginStatusReducer from "./User/LoginStatusReducer";
import CustomersReducer from "./Customer/CustomersReducer";
import AreasReducer from "./Area/AreasReducer";

const rootReducer = combineReducers({
	users: UsersReducer, //[{name,password,role}]
	curUser: CurUserReducer, //{name,role} / null
	loginStatus: LoginStatusReducer, //true/false
	customers: CustomersReducer, //[]
	areas: AreasReducer, //[{area,city,pincode}]
});

export default rootReducer;
