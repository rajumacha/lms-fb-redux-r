import db from "../firebase/init";

export const addCustomer = async ({ ...customer }) => {
	let resp = await db.collection("customers").add(customer);
	console.log(resp);
};

export const getCustomers = async () => {
	let customers = [];
	const results = await db.collection("customers").get();
	results.forEach((res) => {
		customers.push(res.data());
	});
	console.log(customers);
	return customers;
};
