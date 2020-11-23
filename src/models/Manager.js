import db from "../firebase/init";

export const addManager = async (manager) => {
	try {
		await db.collection("managers").add({ ...manager });
	} catch (err) {
		console.log(err.message);
	}
};

export const getManagers = async () => {
	try {
		let managers = [];
		let managerRef = await db.collection("managers").get();
		managerRef.forEach((manager) => {
			managers.push({ ...manager.data(), id: manager.id });
		});
		return managers;
	} catch (err) {
		console.log(err.message);
	}
};

export const getBranchManagers = async (branchName) => {
	try {
		let branchManagers = [];
		let managerRef = await db
			.collection("managers")
			.where("branchName", "==", branchName);
		let managers = await managerRef.get();
		managers.forEach((manager) => {
			branchManagers.push({ ...manager.data(), id: manager.id });
		});
		return branchManagers;
	} catch (err) {
		console.log(err.message);
	}
};
