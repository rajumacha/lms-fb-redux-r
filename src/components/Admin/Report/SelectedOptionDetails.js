import React from "react";

export default function SelectedOptionDetails() {
	return (
		<div className="user-details">
			<div className="user-info">
				<h5>Customers Created by : {user.userName}</h5>
				<h6>Manager: {user.managerName}</h6>
				<h6>Branch: {user.branchName}</h6>
				<h6>
					Duration : {duration.fromDate} to {duration.toDate}
				</h6>
			</div>
			<div className="user-summary">{<SummaryReport results={results} />}</div>
		</div>
	);
}
