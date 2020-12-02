import db from "../firebase/init";
import { getDurationCustomers } from "./Customer";

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
		let userDocs = await db.collection("users").orderBy("userName").get();
		userDocs.forEach((user) => {
			users.push({ ...user.data(), id: user.id });
		});
		return users;
	} catch (err) {
		console.log(err.message);
	}
};

export const getDurationUserCustomers = async (
	{ fromDate, toDate },
	userName
) => {
	//get duration customers
	//filter customers based on this userName

	//get duration customers
	let durationCustomers = await getDurationCustomers(fromDate, toDate);

	//filter duration customers based on this user
	let durationUserCustomers = [];
	durationCustomers.forEach((cust) => {
		if (cust.addedBy === userName) {
			durationUserCustomers.push(cust);
		}
	});
	return durationUserCustomers;
};

export const getUserCustomers = async (userName) => {
	let customers = [];
	const cusRef = await db
		.collection("customers")
		.where("addedBy", "==", userName);
	let results = cusRef.get();
	results.forEach((res) => {
		customers.push({ ...res.data(), id: res.id });
	});
	return customers;
};
