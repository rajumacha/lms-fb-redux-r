import { Types } from "../Types";
import db from "../../firebase/init";

//async action createPortal, returns function
export const getUsers = () => {
	return async (dispatch) => {
		let users = [];
		let usersResult = await db.collection("users").get();
		usersResult.forEach((user) => {
			users.push(user.data());
		});
		dispatch({ type: Types.GET_USERS, payload: users });
	};
};

export const setCurUser = (user) => {
	return {
		type: Types.CUR_USER,
		payload: user, //{name,email}/null
	};
};

export const setLoginStatus = (status) => {
	return {
		type: Types.LOGIN_STATUS,
		payload: status, //true/false/null
	};
};
