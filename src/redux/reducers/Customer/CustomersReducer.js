import { Types } from "../../Types";

const INITIAL_STATE = []; //customers

const CustomersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_CUSTOMER:
			return [...state, action.payload]; //adds customer to db and update customers in redux
		case Types.GET_CUSTOMERS:
			return [...action.payload]; //gets customers []
		default:
			return state;
	}
};

export default CustomersReducer;
