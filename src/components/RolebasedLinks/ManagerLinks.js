import React from "react";
import { Link } from "react-router-dom";
import "../styles/admin-links-styles.scss";

export default function ManagerLinks() {
	return (
		<div className="sidebar">
			<ul className="sidebar-items">
				<li className="sidebar-item">
					<Link to="/add-user" className="white-text">
						<i className="material-icons left">add</i>User
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/user-task" className="white-text">
						<i className="material-icons left">add_to_queue</i>Task Plan
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/list-customers" className="white-text">
						<i className="material-icons small left">contacts</i>Customers
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/reports" className="white-text">
						<i className="material-icons small left">grid_on</i>Reports
					</Link>
				</li>
			</ul>
		</div>
	);
}
