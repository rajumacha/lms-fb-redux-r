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

class App extends Component {
	componentDidMount() {
		this.props.getUsers();
	}
	render() {
		console.log(this.props);
		return (
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route
						path="/add-customer"
						render={() =>
							this.props.loginStatus ? <AddCustomer /> : <Error />
						}
					/>
					<Route path="/sign-in" component={SignIn} />
					<Route
						path="/list-customers"
						render={() =>
							this.props.loginStatus ? <ListCustomers /> : <Error />
						}
					/>
					<Route component={Error} />
				</Switch>
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
