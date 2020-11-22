import { combineReducers } from "redux";
import UsersReducer from "./User/UsersReducer";
import CurUserReducer from "./User/CurUserReducer";
import LoginStatusReducer from "./User/LoginStatusReducer";
import CustomersReducer from "./CustomersReducer";
import AreasReducer from "./AreasReducer";
import PermissionsReducer from "./PermissionsReducer";
import RolesReducer from "./RolesReducer";
import BranchesReducer from "./BranchesReducer";

const rootReducer = combineReducers({
	users: UsersReducer, //[{name,password,role}]
	curUser: CurUserReducer, //{name,role} / null
	loginStatus: LoginStatusReducer, //true/false
	customers: CustomersReducer, //[]
	areas: AreasReducer, //[{areaName,city,pincode}]
	permissions: PermissionsReducer, //[{name}]
	roles: RolesReducer, //[{name, permissions: []}],
	branches: BranchesReducer, //[{branchName, area,addr, contact,city,pincode}]
});

export default rootReducer;
