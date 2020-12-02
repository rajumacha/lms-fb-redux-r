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
	users: UsersReducer, //{new_user: [], all_users: [], user_customers: [], duration_user_customers: [], cur_user: null, login_status: null,};
	//[{ userName, password, branchName, managerName, role }]
	curUser: CurUserReducer, //{id,name,role} / null
	loginStatus: LoginStatusReducer, //true/false
	customers: CustomersReducer, // {new_customer: [], all_customers: [], duration_customers: [], user_customers: [], manager_customers: [], branch_customers: [],};
	//[{name, shopName, mobile, location, gender, interested,followupDate,comments,addedBy: this.props.curUser,}]
	areas: AreasReducer, //[{areaName,city,pincode}]
	permissions: PermissionsReducer, //[{name}]
	roles: RolesReducer, //[{name, permissions: []}],
	branches: BranchesReducer, // {new_branch: [], all_branches: [], branch_managers: [], branch_users: [], duration_branch_customers: [],};
	//[{branchName, area,addr, contact,city,pincode}]
	managers: ManagersReducer, // {new_manager: [], all_managers: [], manager_users: [], manager_customers: [], duration_manager_customers: [],};
	//[{ managerName, password, contact, branchName, role }][{ managerName, password, contact, branchName, role }]
});

export default rootReducer;
