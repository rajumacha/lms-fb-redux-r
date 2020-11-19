import db from "../firebase/init";

export const addArea = async (area) => {
	try {
		await db.collection("areas").add({ ...area });
	} catch (err) {
		console.log(err.message);
	}
};

export const getAreas = async () => {
	try {
		let areas = [];
		let areaRef = await db.collection("areas").get();
		areaRef.forEach((area) => {
			areas.push(area.data());
		});
		return areas;
	} catch (err) {
		console.log(err.message);
	}
};
