import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getBranchesAction } from "../../redux/actions/BranchesAction";
import { getUsersAction } from "../../redux/actions/UsersAction";
import { getManagersAction } from "../../redux/actions/ManagersAction";
import {
	getCustomersAction,
	getCustomersBasedOnDateFiltersAction,
} from "../../redux/actions/CustomersAction";
import "./admin.styles.scss";
import UserReport from "../Reports/UserReport";

function Reports({
	curUser,
	users,
	managers,
	customers,
	branches,
	getBranchesAction,
	getUsersAction,
	getManagersAction,
	getCustomersAction,
	getCustomersBasedOnDateFiltersAction,
}) {
	const [names, setNames] = useState("");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [dates, setDates] = useState(null);
	const [user, setUser] = useState(null);
	const [manager, setManager] = useState(null);
	const [branch, setBranch] = useState(null);
	const [showReport, setShowReport] = useState(false);
	const [showDatesFilter, setShowDatesFilter] = useState(false);
	const [optionSelected, setOptionSelected] = useState("");
	const selectOption = useRef(null);

	useEffect(() => {
		getBranchesAction();
		getUsersAction();
		getManagersAction();
		getCustomersAction();
	}, []);

	useEffect(() => {
		if (user) {
			getCustomersBasedOnDateFiltersAction({
				fromDate,
				toDate,
				name: user.userName,
			});
		}
	}, [dates]);

	//users, managers, branches radio buttons
	const handleOptions = (e) => {
		let { value } = e.target;

		//set to defaults
		selectOption.current[0].selected = true;
		setUser(null);
		setManager(null);
		setBranch(null);
		setShowReport(false);
		setShowDatesFilter(false);
		setFromDate("");
		setToDate("");
		setDates(null);

		//set option selected
		setOptionSelected(value);

		let names = [];
		switch (value) {
			case "users":
				users.map((usr) => {
					names.push({ name: usr.userName, id: usr.id });
				});
				setNames([...names]);
				return;
			case "managers":
				managers.map((mng) => {
					names.push({ name: mng.managerName, id: mng.id });
				});
				setNames(names);
				return;
			case "branches":
				branches.map((brn) => {
					names.push({ name: brn.branchName, id: brn.id });
				});
				setNames(names);
				return;
			case "customers":
				customers.map((cust) => {
					names.push({ name: cust.name, id: cust.id });
				});
				setNames(names);
				return;
			default:
				return;
		}
	};

	//dropdown selection
	const handleSelect = (e) => {
		let name = e.target.value;
		switch (optionSelected) {
			case "users":
				let user = users.find((usr) => usr.userName === name);
				setUser(user);
				setShowDatesFilter(true);
				return;
			default:
				return;
		}
	};

	const displayResults = () => {
		let options = [];
		if (names) {
			options = names.map((res) => {
				return (
					<option key={res.id} value={res.name}>
						{res.name}
					</option>
				);
			});
		}
		return options;
	};

	//datesFilter show button handler
	const handleDateFilter = () => {
		setDates({ fromDate, toDate });
		setShowReport(true);
	};

	//datesFilter show button will be displayed based on conditions
	const showSend = () => {
		let feedback = "";
		if (fromDate && toDate) {
			if (fromDate < toDate) {
				return (
					<span className="sendbtn" onClick={handleDateFilter}>
						<i class="material-icons right">send</i>
					</span>
				);
			} else {
				feedback = "Please select correct dates...";
				return <div className="red-text feedback">{feedback}</div>;
			}
		}
		return feedback;
	};

	return (
		<div className="report">
			{/** filters section */}
			<div className="controls">
				<div className="selectOption">
					<select name="results" onChange={handleSelect} ref={selectOption}>
						<option selected disabled hidden>
							Select...
						</option>
						{displayResults()}
					</select>
				</div>
				<div className="options">
					<label className="option">
						<input
							name="options"
							type="radio"
							className="with-gap"
							value="branches"
							onClick={handleOptions}
						/>
						<span>Branches</span>
					</label>
					<label className="option">
						<input
							name="options"
							type="radio"
							className="with-gap"
							value="managers"
							onClick={handleOptions}
						/>
						<span>Managers</span>
					</label>
					<label className="option">
						<input
							name="options"
							type="radio"
							className="with-gap"
							value="users"
							onClick={handleOptions}
						/>
						<span>Users</span>
					</label>
				</div>
			</div>
			{showDatesFilter && (
				<div className="datesFilter">
					<label className="fromDate option">
						<input
							type="date"
							name="fromDate"
							value={fromDate}
							onChange={(e) => setFromDate(e.target.value)}
						/>
						<span>From: </span>
					</label>
					<label className="toDate option">
						<input
							type="date"
							name="toDate"
							value={toDate}
							onChange={(e) => setToDate(e.target.value)}
						/>
						<span>To: </span>
					</label>
					{showSend()}
				</div>
			)}
			{/** results section*/}
			<div className="report-content">
				{showReport && (
					<UserReport
						results={customers}
						user={user}
						duration={{ fromDate, toDate }}
					/>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({ curUser, users, branches, managers, customers }) => {
	return {
		curUser,
		users,
		managers,
		customers,
		branches,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBranchesAction: () => {
			dispatch(getBranchesAction());
		},
		getUsersAction: () => {
			dispatch(getUsersAction());
		},
		getManagersAction: () => {
			dispatch(getManagersAction());
		},
		getCustomersAction: () => {
			dispatch(getCustomersAction());
		},
		getCustomersBasedOnDateFiltersAction: (dates) => {
			dispatch(getCustomersBasedOnDateFiltersAction(dates));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
