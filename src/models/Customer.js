import db from "../firebase/init";
import { getUsersBasedOnManager, getUsersBasedOnBranch } from "./User";
import { getBranchManagers } from "./Manager";

export const addCustomer = async ({ ...customer }) => {
	let resp = await db.collection("customers").add(customer);
};

export const getCustomers = async () => {
	let customers = [];
	const results = await db.collection("customers").get();
	results.forEach((res) => {
		customers.push({ ...res.data(), id: res.id });
	});
	return customers;
};

//filter customers based on fromDate - toDate
export const getCustomersBasedOnDateFilters = async ({
	fromDate,
	toDate,
	name,
	reportFor,
}) => {
	let customers = [];
	const resRef = await db
		.collection("customers")
		.where("createdAt", ">=", Date.parse(fromDate))
		.where("createdAt", "<=", Date.parse(toDate));
	const custRes = await resRef.get();
	switch (reportFor) {
		case "user":
			custRes.forEach((doc) => {
				if (doc.data().addedBy === name) {
					customers.push({ ...doc.data(), id: doc.id });
				}
			});
			return customers;
		case "manager":
			let users = await getUsersBasedOnManager(name);
			custRes.forEach((cust) => {
				let usr = users.find((usr) => usr.userName === cust.data().addedBy);
				if (usr) {
					customers.push({ ...cust.data(), id: cust.id });
				}
			});
			return customers;
		case "branch":
			let managers = await getBranchManagers(name);
			let usersBasedOnBranch = await getUsersBasedOnBranch(name);
			custRes.forEach((cust) => {
				let usr = usersBasedOnBranch.find(
					(usr) => usr.userName === cust.data().addedBy
				);
				if (usr) {
					customers.push({ ...cust.data(), id: cust.id });
				}
			});
			return customers;
		default:
			return;
	}
};
