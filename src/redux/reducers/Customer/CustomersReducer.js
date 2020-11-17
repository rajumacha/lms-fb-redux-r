import { Types } from "../../Types";

const INITIAL_STATE = []; //customers

const CustomersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_CUSTOMER:
			return [...state, action.payload]; //adds customer to db and update customers in redux
		default:
			return state;
	}
};

export default CustomersReducer;
