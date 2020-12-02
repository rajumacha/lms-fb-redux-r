import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
	getBranchesAction,
	getBranchUsersAction,
	getBranchManagersAction,
	getDurationBranchCustomersAction,
} from "../../redux/actions/BranchesAction";
import {
	getUsersAction,
	getDurationUserCustomersAction,
} from "../../redux/actions/UsersAction";
import {
	getManagersAction,
	getManagerUsersAction,
	getDurationManagerCustomersAction,
} from "../../redux/actions/ManagersAction";
import "./admin.styles.scss";
import UserReport from "../Reports/UserReport";
import ManagerReport from "../Reports/ManagerReport";
import BranchReport from "../Reports/BranchReport";

function Reports(props) {
	let {
		users,
		durationUsrCustomers,
		managers,
		managerUsers,
		durationManagerCustomers,
		branches,
		branchUsers,
		branchManagers,
		durationBranchCustomers,
		getBranchesAction,
		getBranchUsersAction,
		getBranchManagersAction,
		getDurationBranchCustomersAction,
		getManagersAction,
		getManagerUsersAction,
		getDurationManagerCustomersAction,
		getUsersAction,
		getDurationUserCustomersAction,
	} = props;

	//radioButtons & dropDownBox state
	const options = ["Branches", "Managers", "Users"];
	const [selectedOption, setSelectedOption] = useState("");
	const setDropdownToDefault = useRef(null);
	const [user, setUser] = useState(""); //user
	const [manager, setManager] = useState(""); //manager
	const [branch, setBranch] = useState(""); //branch
	const [userName, setUserName] = useState(""); //userName
	const [managerName, setManagerName] = useState(""); //managerName
	const [branchName, setBranchName] = useState(""); //branchName

	//dateControls state
	const [showFromDateToDateControls, setShowFromDateToDateControls] = useState(
		false
	);
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [dates, setDates] = useState("");

	//showReport flag
	const [showReportFlag, setShowReportFlag] = useState(false);

	//fetch branches/managers/users based on selection
	//set dropdown to default option
	//hide dates control section whenever user selects different option
	useEffect(() => {
		switch (selectedOption) {
			case options[0]:
				getBranchesAction();
			case options[1]:
				getManagersAction();
			case options[2]:
				getUsersAction();
			default:
				setDefaults();
		}
	}, [selectedOption]);

	useEffect(() => {
		switch (selectedOption) {
			case options[0]:
				getBranchUsersAction(branchName);
				getBranchManagersAction(branchName);
				getDurationBranchCustomersAction(dates, branchName);
			case options[1]:
				getManagerUsersAction(managerName);
				getDurationManagerCustomersAction(dates, managerName);
			case options[2]:
				getDurationUserCustomersAction(dates, userName);
			default:
				// setDefaults();
				return;
		}
	}, [showReportFlag, userName, managerName, branchName, dates]);

	//setDefaults when user selects different radio option
	const setDefaults = () => {
		setShowFromDateToDateControls(false);
		setDropdownToDefault.current[0].selected = true;
		setUser("");
		setManager("");
		setBranch("");
		setUserName("");
		setManagerName("");
		setBranchName("");
		setFromDate("");
		setToDate("");
		setDates("");
		setShowReportFlag(false);
	};

	//users, managers, branches radio buttons
	//based on selected option - the dropdon will be populated accordingly either with users/managers/branches etc
	const handleOptions = (e) => {
		let { value } = e.target;
		setDefaults();
		setSelectedOption(value); //set seleced radio buttons options
	};

	//display results based on selected radio button option
	const displayResults = () => {
		switch (selectedOption) {
			case options[0]:
				return (
					<>
						{branches.map((branch) => {
							return <option>{branch.branchName}</option>;
						})}
					</>
				);
			case options[1]:
				return (
					<>
						{managers.map((manager) => {
							return <option>{manager.managerName}</option>;
						})}
					</>
				);
			case options[2]:
				return (
					<>
						{users.map((user) => {
							return <option>{user.userName}</option>;
						})}
					</>
				);
		}
	};

	//dropdown selection
	//users - selected user will be set
	//managers - selected manager will be set
	//branches - selected branch will be set
	//after selection, datesControls will be shown
	const handleSelect = (e) => {
		let name = e.target.value;
		switch (selectedOption) {
			case options[0]:
				setBranchName(name);
				let brn = branches.find((br) => br.branchName === name);
				setBranch(brn);
			case options[1]:
				setManagerName(name);
				let mng = managers.find((mg) => mg.managerName === name);
				setManager(mng);
			case options[2]:
				setUserName(name);
				let usr = users.find((us) => us.userName === name);
				setUser(usr);
			default:
				setShowFromDateToDateControls(true);
		}
	};

	//fromDateToDateControls show button handler
	//when click on datesFilter DatesControls button, set both fromDate, toDate
	//set setshowReportFlag flag true - display reports section based on this flag
	const handleDateFilter = () => {
		setDates({ fromDate, toDate });
		setShowReportFlag(true);
	};

	//datesControl button will be displayed based on conditions
	//conditions - both fromDate & toDate should be selected
	//fromDate < toDate
	//then only - enable DatesControls button
	//otherwise - display error message
	const showFromDateToDateControlsSendButton = () => {
		let feedback = "";
		if (fromDate && toDate) {
			if (fromDate < toDate) {
				return (
					<span className="datesControlsBtn" onClick={handleDateFilter}>
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
			switch (selectedOption) {
				case options[0]:
					return (
						<BranchReport
							users={branchUsers}
							customers={durationBranchCustomers}
							managers={branchManagers}
							branch={branch}
							duration={dates}
						/>
					);
				case options[1]:
					return (
						<ManagerReport
							users={managerUsers}
							customers={durationManagerCustomers}
							manager={manager}
							duration={dates}
						/>
					);
				case options[2]:
					return (
						<UserReport
							customers={durationUsrCustomers}
							user={user}
							duration={dates}
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
					<select
						name="results"
						onChange={handleSelect}
						ref={setDropdownToDefault}
					>
						<option selected disabled hidden>
							Select...
						</option>
						{displayResults()}
					</select>
				</div>
				<div className="options">
					{options.map((option) => {
						return (
							<label className="option">
								<input
									name="options"
									type="radio"
									className="with-gap"
									value={option}
									onClick={handleOptions}
								/>
								<span>{option}</span>
							</label>
						);
					})}
				</div>
			</div>
			{/**show dates controls section once the user selects option from dropdown */}
			{showFromDateToDateControls && (
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
					{showFromDateToDateControlsSendButton()}
				</div>
			)}
			{/** results section*/}
			<div className="report-content">{showReport()}</div>
		</div>
	);
}

const mapStateToProps = ({
	users: { all_users: users, duration_user_customers: durationUsrCustomers },
	managers: {
		all_managers: managers,
		manager_users: managerUsers,
		duration_manager_customers: durationManagerCustomers,
	},
	branches: {
		all_branches: branches,
		branch_users: branchUsers,
		branch_managers: branchManagers,
		duration_branch_customers: durationBranchCustomers,
	},
}) => {
	return {
		users,
		durationUsrCustomers,
		managers,
		managerUsers,
		durationManagerCustomers,
		branches,
		branchUsers,
		branchManagers,
		durationBranchCustomers,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBranchesAction: () => dispatch(getBranchesAction()),
		getBranchUsersAction: (branchName) =>
			dispatch(getBranchUsersAction(branchName)),
		getBranchManagersAction: (branchName) =>
			dispatch(getBranchManagersAction(branchName)),
		getDurationBranchCustomersAction: ({ fromDate, toDate }, branchName) =>
			dispatch(
				getDurationBranchCustomersAction({ fromDate, toDate }, branchName)
			),
		getManagersAction: () => dispatch(getManagersAction()),
		getManagerUsersAction: (managerName) =>
			dispatch(getManagerUsersAction(managerName)),
		getDurationManagerCustomersAction: ({ fromDate, toDate }, managerName) =>
			dispatch(
				getDurationManagerCustomersAction({ fromDate, toDate }, managerName)
			),
		getUsersAction: () => dispatch(getUsersAction()),
		getDurationUserCustomersAction: ({ fromDate, toDate }, userName) =>
			dispatch(getDurationUserCustomersAction({ fromDate, toDate }, userName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
