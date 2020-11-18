import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCustomersAction } from "../../../redux/actions/CustomersAction";
import ShowCustomer from "../ShowCustomer/ShowCustomer";

function ListCustomers({ getCustomersAction, customers }) {
	useEffect(() => {
		getCustomersAction();
	}, []);

	return (
		<div className="container">
			<h3 className="teal-text draken-4 center">{customers.length}</h3>
			<ul className="collection">
				{customers.map((customer) => (
					<ShowCustomer key={customer.id} lead={{ ...customer }} />
				))}
			</ul>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCustomersAction: () => dispatch(getCustomersAction()),
	};
};

const mapStateToProps = ({ customers }) => {
	console.log(customers);
	return {
		customers,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomers);
