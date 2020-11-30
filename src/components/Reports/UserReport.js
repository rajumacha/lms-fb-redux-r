import React from "react";
import "./reports.styles.scss";
import SummaryReport from "./SummaryReport";

export default function UserReport({ results, user, duration }) {
	//results = [{name,shopName,mobile,location,gender,interested,followupDate,addedBy,createdAt,comments}]
	//{userName,branchName, managerName,...}
	return (
		<div className="user-report">
			<div className="user-details">
				<div className="user-info">
					<h5>Customers Created by : {user.userName}</h5>
					<h6>Manager: {user.managerName}</h6>
					<h6>Branch: {user.branchName}</h6>
					<h6>
						Duration : {duration.fromDate} to {duration.toDate}
					</h6>
				</div>
				<div className="user-summary">
					{<SummaryReport results={results} />}
				</div>
			</div>
			<div className="report-content">
				<table class="bordered">
					<thead>
						<tr>
							<th>Customer</th>
							<th>Shop</th>
							<th>Mobile</th>
							<th>Interested</th>
							<th>Followup Date</th>
						</tr>
					</thead>
					<tbody>
						{results.map((cust) => {
							let {
								id,
								name,
								shopName,
								mobile,
								interested,
								followupDate,
							} = cust;
							return (
								<tr key={id}>
									<td>{name}</td>
									<td>{shopName}</td>
									<td>{mobile}</td>
									<td>{interested}</td>
									<td>{followupDate}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
