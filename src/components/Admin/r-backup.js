import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getBranchesAction } from "../../redux/actions/BranchesAction";
import {
	getUsersAction,
	getUsersBasedOnBranchAction,
} from "../../redux/actions/UsersAction";
import {
	getManagersAction,
	getBranchManagersAction,
} from "../../redux/actions/ManagersAction";
import {
	getCustomersAction,
	getCustomersBasedOnDateFiltersAction,
} from "../../redux/actions/CustomersAction";
import "./admin.styles.scss";
import UserReport from "../Reports/UserReport";
import ManagerReport from "../Reports/ManagerReport";
import BranchReport from "../Reports/BranchReport";

function Reports({
	curUser,
	users,
	managers,
	customers,
	branches,
	getBranchesAction,
	getBranchManagersAction,
	getUsersAction,
	getUsersBasedOnBranchAction,
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
	const [showReportFlag, setshowReportFlag] = useState(false);
	const [showDatesFilterFlag, setshowDatesFilterFlag] = useState(false);
	const [optionSelected, setOptionSelected] = useState(""); //radiobutton options - 'users', 'managers', 'customers','branches'
	const selectOption = useRef(null);

	useEffect(() => {
		getCustomersAction();
		getBranchesAction();
		getUsersAction();
		getManagersAction();
	}, []);

	useEffect(() => {
		if (user) {
			getCustomersBasedOnDateFiltersAction({
				fromDate,
				toDate,
				name: user.userName,
				reportFor: "user",
			});
		} else if (manager) {
			getCustomersBasedOnDateFiltersAction({
				fromDate,
				toDate,
				name: manager.managerName,
				reportFor: "manager",
			});
		} else if (branch) {
			getCustomersBasedOnDateFiltersAction({
				fromDate,
				toDate,
				name: branch.branchName,
				reportFor: "branch",
			});
			getBranchManagersAction(branch.branchName);
			getUsersBasedOnBranchAction(branch.branchName);
		}
	}, [dates, user, manager, branch]);

	//users, managers, branches radio buttons
	//based on selected option - the dropdon will be populated accordingly either with users/managers/branches etc
	const handleOptions = (e) => {
		let { value } = e.target;

		//set to defaults
		selectOption.current[0].selected = true;
		setUser(null);
		setManager(null);
		setBranch(null);
		setshowReportFlag(false);
		setshowDatesFilterFlag(false);
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
				setNames([...names]);
				return;
			case "branches":
				branches.map((brn) => {
					names.push({ name: brn.branchName, id: brn.id });
				});
				setNames([...names]);
				return;
			default:
				return;
		}
	};

	//dropdown selection
	//users - selected user will be set
	//managers - selected manager will be set
	//branches - selected branch will be set
	const handleSelect = (e) => {
		let name = e.target.value;
		switch (optionSelected) {
			case "users":
				let user = users.find((usr) => usr.userName === name);
				setUser(user);
				setshowDatesFilterFlag(true);
				return;
			case "managers":
				let manager = managers.find((mng) => mng.managerName === name);
				setManager(manager);
				setshowDatesFilterFlag(true);
				return;
			case "branches":
				let branch = branches.find((brn) => brn.branchName === name);
				setBranch(branch);
				setshowDatesFilterFlag(true);
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
	//when click on datesFilter send button, set both fromDate, toDate
	//set setshowReportFlag flag true - display reports section based on this flag
	//get customers of all users of all branches based on dates selected
	const handleDateFilter = () => {
		setDates({ fromDate, toDate });
		setshowReportFlag(true);
	};

	//datesFilter show button will be displayed based on conditions
	//conditions - both fromDate & toDate should be selected
	//fromDate < toDate
	//then only - enable send button
	//otherwise - display error message
	const showSendButton = () => {
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

	//reports section
	//dislay reports based on radio button options selected - users/managers/branches
	//UserReport - displays customers created by user during the selected fromDate & toDate
	//ManagerReport - displays users/customers created by those users during seleced dates
	//BranchReport - displays managers/users/customers during selected dates
	const showReport = () => {
		if (showReportFlag) {
			switch (optionSelected) {
				case "users":
					return (
						<UserReport
							results={customers}
							user={user}
							duration={{ fromDate, toDate }}
						/>
					);
				case "managers":
					let filteredUsers = users.filter(
						(usr) => usr.managerName === manager.managerName
					);
					let filteredCustomers = customers.filter((cust) => {
						let usr = filteredUsers.find(
							(usr) => usr.userName === cust.addedBy
						);
						if (usr) return cust;
					});
					return (
						<ManagerReport
							users={filteredUsers}
							customers={filteredCustomers}
							manager={manager}
							duration={{ fromDate, toDate }}
						/>
					);
				case "branches":
					return (
						<BranchReport
							users={users}
							customers={customers}
							managers={managers}
							branch={branch}
							duration={{ fromDate, toDate }}
						/>
					);
				default:
					return;
			}
		}
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
			{showDatesFilterFlag && (
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
					{showSendButton()}
				</div>
			)}
			{/** results section*/}
			<div className="report-content">{showReport()}</div>
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
		getUsersBasedOnBranchAction: (branchName) => {
			dispatch(getUsersBasedOnBranchAction(branchName));
		},
		getManagersAction: () => {
			dispatch(getManagersAction());
		},
		getBranchManagersAction: (branchName) => {
			dispatch(getBranchManagersAction(branchName));
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
