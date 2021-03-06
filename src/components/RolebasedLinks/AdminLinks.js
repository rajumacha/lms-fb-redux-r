import React from "react";
import { Link } from "react-router-dom";
import "../styles/admin-links-styles.scss";

export default function AdminLinks() {
	return (
		<div className="sidebar">
			<ul className="sidebar-items">
				<li className="sidebar-item">
					<Link to="/add-branch" className="white-text">
						<i className="material-icons left">add</i> Branch
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/add-user" className="white-text">
						<i className="material-icons left">add</i> User
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/add-manager" className="white-text">
						<i className="material-icons left">add</i> Manager
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/add-area" className="white-text">
						<i className="material-icons left">add</i> Area
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/add-permission" className="white-text">
						<i className="material-icons left">add</i> Permission
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/add-role" className="white-text">
						<i className="material-icons left">add</i> Role
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/list-customers" className="white-text">
						<i className="material-icons small left">contacts</i> Customers
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/list-branches" className="white-text">
						<i className="material-icons small left">grid_on</i> Branches
					</Link>
				</li>
				<li className="sidebar-item">
					<Link to="/reports" className="white-text">
						<i className="material-icons small left">grid_on</i> Reports
					</Link>
				</li>
			</ul>
		</div>
	);
}
