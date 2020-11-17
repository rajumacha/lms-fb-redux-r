import { Types } from "../Types";
import { addCustomer } from "../../models/AddCustomer";

export const addCustomerAction = (customer) => {
	return async (dispatch) => {
		try {
			await addCustomer(customer); //adding to db thru model
			dispatch({ type: Types.ADD_CUSTOMER, payload: customer });
		} catch (error) {
			console.log(error);
		}
	};
};
