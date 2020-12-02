import db from "../firebase/init";
import { getCustomers, getDurationCustomers } from "./Customer";

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

export const getManagerUsers = async (managerName) => {
	try {
		let managerUsers = [];

		//get all users of a manager
		let usersRef = await db
			.collection("users")
			.where("managerName", "==", managerName);
		let usersDocs = await usersRef.get();

		usersDocs.forEach((usr) => {
			managerUsers.push({ ...usr.data(), id: usr.id });
		});
		return managerUsers;
	} catch (err) {
		console.log(err.message);
	}
};

export const getManagerCustomers = async (managerName) => {
	//get manager users
	//get customers of all users of all managers of branches
	//filter customers based on this manager users
	try {
		let managerCustomers = [];

		//get all users of a manager
		let managerUsers = await getManagerUsers(managerName);

		//get all customers of all branches
		let customers = await getCustomers();

		customers.forEach((cust) => {
			managerUsers.forEach((usr) => {
				if (cust.addedBy === usr.userName) {
					managerCustomers.push({ ...cust });
				}
			});
		});
		return managerCustomers;
	} catch (err) {
		console.log(err.message);
	}
};

export const getDurationManagerCustomers = async (
	{ fromDate, toDate },
	managerName
) => {
	//get duration customers
	//get users of all managers of all branches
	//filter users of this manager
	//filter duration cuatomers of all users of this manager
	try {
		//get duration customers
		let durationCustomers = await getDurationCustomers(fromDate, toDate);

		//get manager users
		let managerUsers = await getManagerUsers(managerName);

		//filter durationCustomers of managerUsers
		let durationManagerCustomers = [];
		durationCustomers.forEach((cust) => {
			managerUsers.forEach((usr) => {
				if (cust.addedBy === usr.userName) {
					durationManagerCustomers.push({ ...cust });
				}
			});
		});
		return durationManagerCustomers;
	} catch (err) {
		console.log(err.message);
	}
};
