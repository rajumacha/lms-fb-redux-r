import React, { Component } from "react";
// import BranchReportContent from "./BranchReportContent";
// import DatesFilter from "./DatesFilter";
// import ManagerReportContent from "./ManagerReportContent";
import ReportOptions from "./ReportOptions";
// import SelectedOptionDetails from "./SelectedOptionDetails";
// import SelectedOptionSummary from "./SelectedOptionSummary";
// import UserReportContent from "./UserReportContent";
import "../admin.styles.scss";

export default class Report extends Component {
	constructor() {
		super();
		this.state = {
			optionSelected: "",
			optionSelectedInDropdown: "",
			fromDate: "",
			toDate: "",
			showDatesFilterSendButton: false,
			allUsers: [],
			allManagers: [],
			allBranches: [],
			allCustomers: [],
			usersSpecificToManager: [],
			managersSpecificToBranch: [],
			optionSelectedInDetailsDropdown: "",
			customersSpecificToUser: [],
			customersSpecificToManager: [],
			customersSpecificToBranch: [],
		};
	}
	render() {
		return (
			<div className="report">
				<ReportOptions optionSelected={this.state.optionSelected} />
			</div>
		);
	}
}
