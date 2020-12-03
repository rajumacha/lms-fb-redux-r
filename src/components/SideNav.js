import React from "react";
import { connect } from "react-redux";
import { labels } from "../utils/labels";
import AdminLinks from "./RolebasedLinks/AdminLinks";
import ManagerLinks from "./RolebasedLinks/ManagerLinks";
import UserLinks from "./RolebasedLinks/UserLinks";
import "./styles/sidebar-styles.scss";

function displayLinks(roleName) {
	switch (roleName) {
		case labels.ADMIN:
			return <AdminLinks />;
		case labels.MANAGER:
			return <ManagerLinks />;
		case labels.LMS_USER:
			return <UserLinks />;
		default:
			return;
	}
}

function SideNav({ role }) {
	return <>{displayLinks(role)}</>;
}

const mapStateToProps = ({ curUser }) => {
	return { role: curUser ? curUser.role : null };
};

export default connect(mapStateToProps)(SideNav);
