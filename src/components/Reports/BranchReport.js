import React, { useState, useEffect, useRef } from "react";
import "./reports.styles.scss";
import SummaryReport from "./SummaryReport";

export default function BranchReport({
	users,
	customers,
	managers,
	branch,
	duration,
}) {
	//users = [{userName,branchName, managerName,...}]
	//customers = [{name,shopName,mobile,location,gender,interested,followupDate,comments,addedBy: this.props.curUser.name,createdAt: Date.parse(new Date()),}]
	//managers - [{ managerName, password, contact, branchName, role }]
	//branch = {branchName, area,addr, contact,city,pincode}
	const [busers, setBUsers] = useState([]);
	const [bmanagers, setBManagers] = useState([]);
	const [bcustomers, setBCustomers] = useState([]);
	let { branchName } = branch;

	console.log(users, managers, customers);
	const selectOption = useRef(null);

	useEffect(() => {
		setBUsers(users);
		setBManagers(managers);
		setBCustomers(customers);
		selectOption.current[0].selected = true;
	}, [users, customers, managers]);

	//displays managers in dropdown
	const displayManagers = () => {
		let options = [];
		if (managers) {
			options = managers.map((mng, idx) => {
				return (
					<>
						{idx === 0 && (
							<option
								key={"all_managers"}
								value={"All Managers"}
								selectedIndex="1"
							>
								All Managers
							</option>
						)}
						<option key={mng.id} value={mng.managerName}>
							{mng.managerName}
						</option>
					</>
				);
			});
		}
		return options;
	};

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

	//filter customers based on managerName
	//setBManager
	const handleSelectedManagerOption = (e) => {
		let managerName = e.target.value;

		if (managerName === "All Managers") {
			setBManagers(managers);
			setBUsers(users);
			setBCustomers(customers);
			return;
		}

		let bManager = managers.find((mng) => mng.managerName === managerName);
		let filteredUsers = busers.filter(
			(usr) => usr.managerName === bManager.managerName
		);
		let filteredCustomers = customers.map((cust) => {
			let user = filteredUsers.find((usr) => usr.userName === cust.addedBy);
			if (user) {
				return cust;
			}
		});
		setBUsers(filteredUsers);
		setBManagers(managers);
		setBCustomers(filteredCustomers);
	};

	const branchSummaryDetails = (brcustomers) => {
		return <SummaryReport results={brcustomers} />;
	};

	const displayReportContent = (managers, users, customers) => {
		return (
			<table class="bordered">
				<thead>
					<tr>
						<th>Managers</th>
						<th>Users</th>
						<th>Customers</th>
						<th>Interested-Yes</th>
						<th>Interested-No</th>
						<th>Interested-Followup</th>
					</tr>
				</thead>
				<tbody>
					{managers.map((mng) => {
						let { id, managerName } = mng;
						{
							return displayFilteredCustomers(
								customers,
								users,
								managerName,
								id
							);
						}
					})}
				</tbody>
			</table>
		);
	};

	//displays all the customers created by a specific user, displays in user column
	const displayFilteredCustomers = (customers, users, managerName, id) => {
		let musers = users.filter((usr) => usr.managerName === managerName);

		let mcustomers = [];
		customers.map((cust) => {
			let usr = musers.find((u) => u.userName === cust.addedBy);
			if (usr) mcustomers.push(cust);
		});
		console.log(mcustomers, musers, managerName);
		if (musers.length === 0) {
			return (
				<tr key={id}>
					<td>{managerName}</td>
					<td>{musers.length}</td>
					<td>{mcustomers.length}</td>
					<td>xxx</td>
					<td>xxx</td>
					<td>xxx</td>
				</tr>
			);
		}
		return musers.map((usr, idx) => {
			let { userName } = usr;
			let totalCutomersOfAUser = mcustomers.reduce((total, cust) => {
				if (cust.addedBy === userName) {
					total += 1;
				}
				return total;
			}, 0);
			let totalCutomersYesOfAUser = mcustomers.reduce((total, cust, idx) => {
				if (cust.addedBy === userName && cust.interested === "yes") {
					total += 1;
				}
				return total;
			}, 0);
			let totalCutomersNoOfAUser = mcustomers.reduce((total, cust) => {
				if (cust.addedBy === userName && cust.interested === "no") {
					total += 1;
				}
				return total;
			}, 0);
			let totalCutomersFollowupOfAUser = mcustomers.reduce((total, cust) => {
				if (cust.addedBy === userName && cust.interested === "followup") {
					total += 1;
				}
				return total;
			}, 0);
			return (
				<tr>
					{idx === 0 ? (
						<>
							<td>{managerName}</td>
						</>
					) : (
						<>
							<td>{""}</td>
						</>
					)}
					<td>{userName}</td>
					<td>{totalCutomersOfAUser}</td>
					<td>{totalCutomersYesOfAUser}</td>
					<td>{totalCutomersNoOfAUser}</td>
					<td>{totalCutomersFollowupOfAUser}</td>
				</tr>
			);
		});
	};

	return (
		<div className="branch-report">
			{/**branch details */}
			<div className="branch-details">
				<div className="branch-info">
					<h5>{branchName}'s Report </h5>
					<div className="selectOption">
						<span>Managers: </span>
						<select
							name="results"
							onChange={handleSelectedManagerOption}
							ref={selectOption}
						>
							<option selected disabled hidden>
								Select...
							</option>
							{displayManagers()}
						</select>
					</div>
					<h6>
						Duration : {duration.fromDate} to {duration.toDate}
					</h6>
				</div>
				<div className="branch-summary">{branchSummaryDetails(bcustomers)}</div>
			</div>
			{/**report content */}
			<div className="report-content">
				{displayReportContent(bmanagers, busers, bcustomers)}
			</div>
		</div>
	);
}
