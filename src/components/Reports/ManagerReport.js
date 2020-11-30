import React, { useState, useEffect, useRef } from "react";
import "./reports.styles.scss";
import SummaryReport from "./SummaryReport";

export default function ManagerReport({ users, customers, manager, duration }) {
	//users = [{userName,branchName, managerName,...}]
	//customers = [{name,shopName,mobile,location,gender,interested,followupDate,comments,addedBy: this.props.curUser.name,createdAt: Date.parse(new Date()),}]
	//manager - [{ managerName, password, contact, branchName, role }]
	const [musers, setMUsers] = useState([]);
	const [mcustomers, setMCustomers] = useState([]);
	let { managerName, branchName } = manager;

	const selectOption = useRef(null);

	useEffect(() => {
		setMUsers(users);
		setMCustomers(customers);
		selectOption.current[0].selected = true;
	}, [users, customers]);

	//displays users in dropdown
	const displayUsers = () => {
		let options = [];
		if (users) {
			options = users.map((usr, idx) => {
				return (
					<>
						{idx === 0 && (
							<option key={"all_users"} value={"All Users"} selectedIndex="1">
								All Users
							</option>
						)}
						<option key={usr.id} value={usr.userName}>
							{usr.userName}
						</option>
					</>
				);
			});
		}
		return options;
	};

	//displays all the customers created by a specific user, displays in user column
	const displayFilteredCustomers = (filteredCustomers, userName, id) => {
		if (filteredCustomers.length === 0) {
			return (
				<tr key={id}>
					<td>{userName}</td>
					<td>xxx</td>
					<td>xxx</td>
					<td>xxx</td>
					<td>xxx</td>
					<td>xxx</td>
				</tr>
			);
		}
		return filteredCustomers.map((cust, idx) => {
			let { name, mobile, interested, followupDate } = cust;
			return (
				<>
					<tr key={id}>
						{idx === 0 ? (
							<>
								<td>{userName}</td>
								<td>{filteredCustomers.length}</td>
							</>
						) : (
							<>
								<td>{""}</td>
								<td>{""}</td>
							</>
						)}
						<td>{name}</td>
						<td>{mobile}</td>
						<td>{interested}</td>
						<td>{followupDate}</td>
					</tr>
				</>
			);
		});
	};

	//filter customers based on userName
	//setMUser -
	const handleSelectedUserOption = (e) => {
		let userName = e.target.value;

		if (userName === "All Users") {
			setMUsers(users);
			setMCustomers(customers);
			return;
		}

		let muser = users.find((usr) => usr.userName === userName);
		let filteredCustomers = customers.filter(
			(cust) => cust.addedBy === userName
		);
		setMUsers([muser]);
		setMCustomers(filteredCustomers);
	};

	const managerSummaryDetails = (mcustomers) => {
		return <SummaryReport results={mcustomers} />;
	};

	const displayReportContent = (users, customers) => {
		return (
			<table class="bordered">
				<thead>
					<tr>
						<th>Users</th>
						<th>Total</th>
						<th>Customers</th>
						<th>Mobile</th>
						<th>Interested</th>
						<th>Followup Date</th>
					</tr>
				</thead>
				<tbody>
					{users.map((usr) => {
						let { id, userName } = usr;
						let filteredCustomers = customers.filter(
							(cust) => cust.addedBy === userName
						);
						{
							return displayFilteredCustomers(filteredCustomers, userName, id);
						}
					})}
				</tbody>
			</table>
		);
	};

	return (
		<div className="manager-report">
			{/**manager details */}
			<div className="manager-details">
				<div className="manager-info">
					<h5>{managerName}'s Report </h5>
					<h6>Branch: {branchName}</h6>
					<div className="selectOption">
						<span>Users: </span>
						<select
							name="results"
							onChange={handleSelectedUserOption}
							ref={selectOption}
						>
							<option selected disabled hidden>
								Select...
							</option>
							{displayUsers()}
						</select>
					</div>
					<h6>
						Duration : {duration.fromDate} to {duration.toDate}
					</h6>
				</div>
				<div className="manager-summary">
					{managerSummaryDetails(mcustomers)}
				</div>
			</div>
			{/**report content */}
			<div className="report-content">
				{displayReportContent(musers, mcustomers)}
			</div>
		</div>
	);
}
