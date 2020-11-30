import React from "react";

export default function UserReportContent() {
	return (
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
						let { id, name, shopName, mobile, interested, followupDate } = cust;
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
	);
}
