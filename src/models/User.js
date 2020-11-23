import db from "../firebase/init";

export const addUser = async (user) => {
	try {
		await db.collection("users").add({ ...user });
	} catch (err) {
		console.log(err.message);
	}
};

export const getUsers = async () => {
	try {
		let users = [];
		let userRef = await db.collection("users").get();
		userRef.forEach((user) => {
			users.push({ ...user.data(), id: user.id });
		});
		return users;
	} catch (err) {
		console.log(err.message);
	}
};
