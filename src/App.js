import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Error from "./components/Error";
import AddCustomer from "./components/Customer/AddCustomer";
import ListCustomers from "./components/Customer/ListCustomers";
import { getUsers } from "./redux/actions/UsersAction";
import SideNav from "./components/SideNav";
import "./App.css";
import Area from "./components/Admin/Area";
import Permission from "./components/Admin/Permission";
import Role from "./components/Admin/Role";
import Branch from "./components/Admin/Branch";
import Manager from "./components/Admin/Manager";
import User from "./components/Admin/User";

class App extends Component {
	componentDidMount() {
		this.props.getUsers();
	}
	render() {
		return (
			<div className="grid-container">
				<div className="topbar-nav">
					<Navbar />
				</div>
				<div className="sidebar-nav">
					<SideNav />
				</div>
				<div class="content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/sign-in" component={SignIn} />
						{this.props.loginStatus && (
							<>
								<Route path="/add-customer" component={AddCustomer} />
								<Route path="/list-customers" component={ListCustomers} />
								<Route path="/add-area" component={Area} />
								<Route path="/add-permission" component={Permission} />
								<Route path="/add-role" component={Role} />
								<Route path="/add-branch" component={Branch} />
								<Route path="/add-manager" component={Manager} />
								<Route path="/add-user" component={User} />
							</>
						)}
						<Route component={Error} />
					</Switch>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUsers: () => {
			dispatch(getUsers());
		},
	};
};

const mapStateToProps = ({ loginStatus }) => {
	return {
		loginStatus,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
