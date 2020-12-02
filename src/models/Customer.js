import db from "../firebase/init";

export const addCustomer = async ({ ...customer }) => {
	let resp = await db.collection("customers").add(customer);
};

export const getCustomers = async () => {
	let customers = [];
	const results = await db.collection("customers").orderBy("addedBy").get();
	results.forEach((res) => {
		customers.push({ ...res.data(), id: res.id });
	});
	return customers;
};

export const getDurationCustomers = async (fromDate, toDate) => {
	let durationCustomers = [];
	const cusRef = await db
		.collection("customers")
		.where("createdAt", ">=", Date.parse(fromDate))
		.where("createdAt", "<=", Date.parse(toDate));
	let cusDocs = await cusRef.get();
	cusDocs.forEach((res) => {
		durationCustomers.push({ ...res.data(), id: res.id });
	});
	return durationCustomers;
};
