import { Types } from "../Types";

// const INITIAL_STATE = []; //customers
const INITIAL_STATE = {
	new_customer: [],
	all_customers: [],
	duration_customers: [],
	user_customers: [],
	manager_customers: [],
	branch_customers: [],
}; //customers

const CustomersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Types.ADD_CUSTOMER:
			// return [...state, action.payload]; //adds customer to db and update customers in redux
			return { ...state, new_customer: [...action.payload] }; //adds customer to db and update customers in redux
		case Types.GET_CUSTOMERS:
			// return action.payload ? [...action.payload] : []; //gets customers []
			return action.payload
				? { ...state, all_customers: [...action.payload] }
				: { ...state }; //get all customers []
		case Types.GET_DURATION_CUSTOMERS:
			// return action.payload ? [...action.payload] : []; //gets customers []
			return action.payload
				? { ...state, duration_customers: [...action.payload] }
				: { ...state }; //get all customers based on duration period []
		case Types.GET_USER_CUSTOMERS:
			// return action.payload ? [...action.payload] : []; //gets customers []
			return action.payload
				? { ...state, user_customers: [...action.payload] }
				: { ...state }; //get user based customers []
		case Types.GET_MANAGER_CUSTOMERS:
			// return action.payload ? [...action.payload] : []; //gets customers []
			return action.payload
				? { ...state, manager_customers: [...action.payload] }
				: { ...state }; //get manager based customers []
		case Types.GET_BRANCH_CUSTOMERS:
			// return action.payload ? [...action.payload] : []; //gets customers []
			return action.payload
				? { ...state, branch_users: [...action.payload] }
				: { ...state }; //get branch based customers []
		default:
			return state;
	}
};

export default CustomersReducer;
