import db from "../firebase/init";

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
}) => {
	let customers = [];
	const resRef = await db
		.collection("customers")
		.where("createdAt", ">=", Date.parse(fromDate))
		.where("createdAt", "<=", Date.parse(toDate));
	const custRes = await resRef.get();
	custRes.forEach((doc) => {
		console.log(doc.data());
		if (doc.data().addedBy === name) {
			customers.push({ ...doc.data(), id: doc.id });
		}
	});
	return customers;
};
