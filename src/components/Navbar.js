import React from "react";
import { connect } from "react-redux";
import { setCurUser, setLoginStatus } from "../redux/actions/UsersAction";
import { Link } from "react-router-dom";
import { labels } from "../utils/labels";

import "./styles/navbar.styles.scss";

function Navbar({ curUser, loginStatus, setLoginStatus, setCurUser }) {
	const signout = () => {
		setCurUser(null);
		setLoginStatus(false);
	};

	return (
		<nav>
			<div className="nav-wrapper">
				<Link to="/" className="logo">
					<i className="large material-icons">home</i>
				</Link>
				<ul className="nav-items">
					{loginStatus ? (
						<Link to="" onClick={signout}>
							<li className="nav-item right">
								{`Welcome ${curUser.name}`} {labels.SIGNOUT}
							</li>
						</Link>
					) : (
						<Link to="/sign-in" className="nav-item right">
							{labels.SIGNIN}
						</Link>
					)}
				</ul>
			</div>
		</nav>
	);
}

const mapStateToProps = ({ curUser, loginStatus }) => {
	return {
		loginStatus,
		curUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurUser: (user) => {
			dispatch(setCurUser(user));
		},
		setLoginStatus: (status) => {
			dispatch(setLoginStatus(status));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
