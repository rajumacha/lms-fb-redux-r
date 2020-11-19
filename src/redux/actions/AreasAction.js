import { addArea, getAreas } from "../../models/Area";
import { Types } from "../Types";

export const addAreaAction = (area) => {
	return async (dispatch) => {
		await addArea(area);
		dispatch({ type: Types.ADD_AREA, payload: area });
	};
};

export const getAreasAction = () => {
	return async (dispatch) => {
		let areas = await getAreas();
		dispatch({ type: Types.GET_AREAS, payload: areas });
	};
};
