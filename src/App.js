import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Error from "./components/Error/Error";
import AddCustomer from "./components/Customer/AddCustomer/AddCustomer";
import ListCustomers from "./components/Customer/ListCustomers/ListCustomers";
import { getUsers } from "./redux/actions/UsersAction";
import SideNav from "./components/SideNav/SideNav";
import "./App.css";
import Area from "./components/Admin/Area/Area";

class App extends Component {
	componentDidMount() {
		this.props.getUsers();
	}
	render() {
		console.log(this.props);
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
	console.log(loginStatus);
	return {
		loginStatus,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
