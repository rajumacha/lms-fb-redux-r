import { Types } from "../Types";
import {
	addCustomer,
	getCustomers,
	getCustomersBasedOnDateFilters,
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
		console.log(customers);
		dispatch({ type: Types.GET_CUSTOMERS, payload: customers });
	};
};

export const getCustomersBasedOnDateFiltersAction = (dates) => {
	return async (dispatch) => {
		let customers = await getCustomersBasedOnDateFilters(dates);
		console.log(customers);
		dispatch({ type: Types.GET_CUSTOMERS, payload: customers });
	};
};
