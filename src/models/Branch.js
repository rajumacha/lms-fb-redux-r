import db from "../firebase/init";

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
