import React from "react";
import { connect } from "react-redux";
import { labels } from "../utils/labels";
import AdminLinks from "./AdminLinks";
import NonAdminLinks from "./NonAdminLinks";
import "./styles/sidebar-styles.scss";

function SideNav({ role }) {
	return (
		<>
			{role === labels.ADMIN ? (
				<AdminLinks />
			) : role === labels.LMS_USER ? (
				<NonAdminLinks />
			) : (
				""
			)}
		</>
	);
}

const mapStateToProps = ({ curUser }) => {
	return { role: curUser ? curUser.role : null };
};

export default connect(mapStateToProps)(SideNav);