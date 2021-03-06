import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Error from "./components/Error";
import AddCustomer from "./components/Customer/AddCustomer";
import ListCustomers from "./components/Customer/ListCustomers";
import { getUsersAction } from "./redux/actions/UsersAction";
import { getManagersAction } from "./redux/actions/ManagersAction";
import SideNav from "./components/SideNav";
import "./App.css";
import Area from "./components/Admin/Area";
import Permission from "./components/Admin/Permission";
import Role from "./components/Admin/Role";
import Branch from "./components/Admin/Branch";
import Manager from "./components/Admin/Manager";
import User from "./components/Admin/User";
import Reports from "./components/Admin/Reports";
import CreateUserTask from "./components/User/CreateUserTask";
import ViewUserTask from "./components/User/ViewUserTask";

class App extends Component {
	componentDidMount() {
		this.props.getUsersAction();
		this.props.getManagersAction();
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
				<div className="content">
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
								<Route path="/create-user-task" component={CreateUserTask} />
								<Route path="/view-user-task" component={ViewUserTask} />
								{/* <Route path="/reports" component={Reports} /> */}
								<Route path="/reports" component={Reports} />
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
		getUsersAction: () => {
			dispatch(getUsersAction());
		},
		getManagersAction: () => dispatch(getManagersAction()),
	};
};

const mapStateToProps = ({ loginStatus }) => {
	return {
		loginStatus,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
