import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Error from "./components/Error/Error";
import AddLead from "./components/Lead/AddLead/AddLead";
import ListLeads from "./components/Lead/ListLeads/ListLeads";
import { getUsers } from "./redux/actions/UsersAction";

class App extends Component {
	componentDidMount() {
		this.props.getUsers();
	}
	render() {
		console.log(this.props.state);
		return (
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/add-lead" component={AddLead} />
					<Route path="/sign-in" component={SignIn} />
					<Route path="/list-leads" component={ListLeads} />
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

const mapStateToProps = (state) => {
	console.log(state);
	return {
		state,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
