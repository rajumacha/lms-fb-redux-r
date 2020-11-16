import db from "../../firebase/init";

export const getUsersCollection = async () => {
	let usersDocs = [];
	let users = await db.collection("users").get();
	users.forEach((user) => {
		usersDocs.push(user.data());
	});
	return usersDocs;
};
