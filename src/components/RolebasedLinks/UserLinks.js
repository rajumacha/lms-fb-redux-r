import React from "react";
import { Link } from "react-router-dom";
import "../styles/non-admin-links-styles.scss";

export default function UserLinks() {
	return (
		<div className="sidebar">
			<ul className="sidebar-items">
				<li className="sidebar-item">
					<Link to="/add-customer" className="white-text">
						<i className="material-icons left">add</i> Customer
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/view-user-task" className="white-text">
						<i className="material-icons small left">assignment</i>View Task
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/list-customers" className="white-text">
						<i className="material-icons small left">contacts</i> Customers
					</Link>
				</li>
			</ul>
		</div>
	);
}
