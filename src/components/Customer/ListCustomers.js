import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCustomersAction } from "../../redux/actions/CustomersAction";

function ListCustomers({ getCustomersAction, customers }) {
	useEffect(() => {
		getCustomersAction();
	}, []);

	return (
		<div className="container">
			<h5 className="teal-text draken-4 center">
				Total Customers: {customers.length}
			</h5>
			<table class="bordered">
				<thead>
					<tr>
						<th>User</th>
						<th>Name</th>
						<th>Gender</th>
						<th>Mobile</th>
						<th>ShopName</th>
						<th>Location</th>
						<th>Interested</th>
						<th>Comments</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customer) => (
						<tr key={customer.id}>
							<td>{customer.addedBy}</td>
							<td>{customer.name}</td>
							<td>{customer.gender}</td>
							<td>{customer.mobile}</td>
							<td>{customer.shopName}</td>
							<td>{customer.location}</td>
							<td>{customer.interested}</td>
							<td>{customer.comments}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCustomersAction: () => dispatch(getCustomersAction()),
	};
};

const mapStateToProps = ({ customers: { all_customers: customers } }) => {
	console.log(customers);
	return {
		customers,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomers);
