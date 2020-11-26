import { Types } from "../Types";
import { addUser, getUsers } from "../../models/User";

export const addUserAction = (user) => {
	return async (dispatch) => {
		await addUser(user);
		dispatch({ type: Types.ADD_USER, payload: user });
	};
};

export const getUsersAction = () => {
	return async (dispatch) => {
		let users = await getUsers();
		dispatch({ type: Types.GET_USERS, payload: users });
	};
};

//calls from sing-in page
export const setCurUserAction = (user) => {
	return {
		type: Types.CUR_USER,
		payload: user, //{id,name,role}/null
	};
};

export const setLoginStatusAction = (status) => {
	return {
		type: Types.LOGIN_STATUS,
		payload: status, //true/false/null
	};
};
