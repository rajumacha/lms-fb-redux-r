import db from "../firebase/init";

export const addCustomer = async ({ ...customer }) => {
	let resp = await db.collection("customers").add(customer);
	console.log(resp);
};
