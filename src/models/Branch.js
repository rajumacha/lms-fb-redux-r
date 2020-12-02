import db from "../firebase/init";
import { getUsers } from "./User";
import { getDurationCustomers } from "./Customer";

export const addBranch = async (branch) => {
	try {
		await db.collection("branches").add({ ...branch });
	} catch (err) {
		console.log(err.message);
	}
};

export const getBranches = async () => {
	try {
		let branches = [];
		let branchRef = await db.collection("branches").get();
		branchRef.forEach((branch) => {
			branches.push({ ...branch.data(), id: branch.id });
		});
		return branches;
	} catch (err) {
		console.log(err.message);
	}
};

export const getBranchManagers = async (branchName) => {
	//get managers of branch
	try {
		let managers = [];
		let managersRef = await db
			.collection("managers")
			.where("branchName", "==", branchName);
		let managersDocs = await managersRef.get();
		managersDocs.forEach((mng) => {
			managers.push({ ...mng.data(), id: mng.id });
		});
		return managers;
	} catch (err) {
		console.log(err.message);
	}
};

export const getBranchUsers = async (branchName) => {
	//get managers of branch
	//get users of all managers of all branches
	//filter users of this branch managers

	try {
		let branchManagers = await getBranchManagers(branchName);
		let users = await getUsers();

		//filter users of this branch managers
		let branchUsers = [];
		users.forEach((usr) => {
			branchManagers.forEach((mng) => {
				if (usr.managerName === mng.managerName) {
					branchUsers.push({ ...usr, id: usr.id });
				}
			});
		});
		return branchUsers;
	} catch (err) {
		console.log(err.message);
	}
};

export const getDurationBranchCustomers = async (
	{ fromDate, toDate },
	branchName
) => {
	//get customers based on duration - we get all customers of all managers of all branches
	// get managers of branch
	// get users - of all managers of all branches
	// filter users based on branch managers - we get users of all managers of this branch
	// filter customers based on these filtered users
	try {
		let durationBranchCustomers = [];

		//get duration customers
		let durationCustomers = await getDurationCustomers(fromDate, toDate);

		//filter users belongs to this branch managers
		let branchUsers = await getBranchUsers(branchName);

		//filter duration customers belongs to this branch users
		durationCustomers.forEach((cust) => {
			branchUsers.forEach((usr) => {
				if (cust.addedBy === usr.userName) {
					durationBranchCustomers.push({ ...cust });
				}
			});
		});

		return durationBranchCustomers;
	} catch (err) {
		console.log(err.message);
	}
};
