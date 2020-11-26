import { combineReducers } from "redux";
import UsersReducer from "./User/UsersReducer";
import CurUserReducer from "./User/CurUserReducer";
import LoginStatusReducer from "./User/LoginStatusReducer";
import CustomersReducer from "./CustomersReducer";
import AreasReducer from "./AreasReducer";
import PermissionsReducer from "./PermissionsReducer";
import RolesReducer from "./RolesReducer";
import BranchesReducer from "./BranchesReducer";
import ManagersReducer from "./ManagersReducer";

const rootReducer = combineReducers({
	users: UsersReducer, //[{ userName, password, branchName, managerName, role }]
	curUser: CurUserReducer, //{id,name,role} / null
	loginStatus: LoginStatusReducer, //true/false
	customers: CustomersReducer, //[{name, shopName, mobile, location, gender, interested,followupDate,comments,addedBy: this.props.curUser,}]
	areas: AreasReducer, //[{areaName,city,pincode}]
	permissions: PermissionsReducer, //[{name}]
	roles: RolesReducer, //[{name, permissions: []}],
	branches: BranchesReducer, //[{branchName, area,addr, contact,city,pincode}]
	managers: ManagersReducer, //[{ managerName, password, contact, branchName, role }]
});

export default rootReducer;
