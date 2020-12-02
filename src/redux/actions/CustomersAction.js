import { Types } from "../Types";
import {
	addCustomer,
	getCustomers,
	getDurationCustomers,
} from "../../models/Customer";

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

export const getCustomersAction = () => {
	return async (dispatch) => {
		let customers = await getCustomers();
		dispatch({ type: Types.GET_CUSTOMERS, payload: customers });
	};
};
export const getDurationCustomersAction = (dates) => {
	return async (dispatch) => {
		let customers = await getDurationCustomers(dates);
		dispatch({ type: Types.GET_DURATION_CUSTOMERS, payload: customers });
	};
};
