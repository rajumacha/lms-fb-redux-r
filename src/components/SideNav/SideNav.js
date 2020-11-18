import React from "react";
import { Link } from "react-router-dom";
import "./sidebar-styles.scss";

export default function SideNav() {
	return (
		<div className="sidebar">
			<ul className="sidebar-items">
				<li className="sidebar-item">
					<Link to="/add-customer" className="white-text">
						<i className="material-icons left">add</i> Branch
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/add-customer" className="white-text">
						<i className="material-icons left">add</i> User
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/add-customer" className="white-text">
						<i className="material-icons left">add</i> Customer
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/list-customers" className="white-text">
						<i className="material-icons small left">contacts</i> Customers
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/list-customers" className="white-text">
						<i className="material-icons small left">grid_on</i> Branches
					</Link>
				</li>
			</ul>
		</div>
	);
}
