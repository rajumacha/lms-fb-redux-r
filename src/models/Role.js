import db from "../firebase/init";

export const addRole = async (role) => {
	try {
		await db.collection("roles").add({ ...role });
	} catch (err) {
		console.log(err.message);
	}
};

export const getRoles = async () => {
	try {
		let roles = [];
		let roleRef = await db.collection("roles").get();
		roleRef.forEach((role) => {
			roles.push(role.data());
		});
		return roles;
	} catch (err) {
		console.log(err.message);
	}
};
