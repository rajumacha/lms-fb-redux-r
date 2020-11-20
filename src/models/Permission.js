import db from "../firebase/init";

export const addPermission = async (permission) => {
	try {
		await db.collection("permissions").add({ ...permission });
	} catch (err) {
		console.log(err.message);
	}
};

export const getPermissions = async () => {
	try {
		let permissions = [];
		let permRef = await db.collection("permissions").get();
		permRef.forEach((perm) => {
			permissions.push(perm.data());
		});
		return permissions;
	} catch (err) {
		console.log(err.message);
	}
};
