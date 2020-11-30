import React, { useRef } from "react";
import "../admin.styles.scss";

export default function ReportOptions({ optionSelected }) {
	const selectOption = useRef(null);

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

	return (
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
	);
}
