import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
	addBranchAction,
	getBranchesAction,
} from "../../redux/actions/BranchesAction";
import { getAreasAction } from "../../redux/actions/AreasAction";
import { labels } from "../../utils/labels";
import ErrorMsg from "../ErrorMsg";
import Label from "../Label";
import "./admin.styles.scss";

function Manager({
	addBranchAction,
	getBranchesAction,
	getAreasAction,
	branches,
	areas,
}) {
	const [branchName, setBranchName] = useState("");
	const [areaName, setAreaName] = useState("");
	const [address, setAddress] = useState("");
	const [contact, setContact] = useState("");
	const [city, setCity] = useState("");
	const [pincode, setPincode] = useState("");
	const selectOption = useRef(null);
	const [error, setError] = useState("");

	useEffect(() => {
		getAreasAction();
		getBranchesAction();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		addBranchAction({ branchName, areaName, address, contact, city, pincode });
		setDefaults();
	};

	const setDefaults = () => {
		setBranchName("");
		setAreaName("");
		setAddress("");
		setContact("");
		setCity("");
		setPincode("");
		setError("");
		selectOption.current[0].selected = true;
	};

	const handleSelect = (e) => {
		let area = areas.find((item) => item.id === e.target.value);
		setAreaName(area.areaName);
		setCity(area.city);
		setPincode(area.pincode);
	};

	const displayAreas = () => {
		if (areas) {
			return areas.map((area) => {
				return (
					<option key={area.id} value={area.id}>
						{area.areaName}
					</option>
				);
			});
		}
	};

	return (
		<div className="container new-branch">
			<Label label="New Manager" />
			<div>{error ? <ErrorMsg message={error} /> : null}</div>

			<form onSubmit={handleSubmit}>
				<div className="field">
					<input
						id="branchName"
						type="text"
						value={branchName}
						onChange={(e) => setBranchName(e.target.value)}
						required
					/>
					<label htmlFor="branchName" className="label-text">
						BranchName:
					</label>
				</div>
				<div className="field">
					<label htmlFor="area">area</label>
					<select
						id="area"
						name="area"
						ref={selectOption}
						onChange={handleSelect}
					>
						<option selected disabled hidden>
							Select area
						</option>
						{displayAreas()}
					</select>
				</div>
				<div className="field">
					<input
						id="address"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
					<label htmlFor="address" className="label-text">
						Address:
					</label>
				</div>
				<div className="field">
					<input
						id="contact"
						type="text"
						value={contact}
						onChange={(e) => setContact(e.target.value)}
						required
					/>
					<label htmlFor="contact" className="label-text">
						Contact:
					</label>
				</div>
				<div className="field">
					<input
						id="city"
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						readOnly
					/>
					<label htmlFor="city" className="label-text">
						City:
					</label>
				</div>
				<div className="field">
					<input
						id="pincode"
						type="text"
						value={pincode}
						onChange={(e) => setPincode(e.target.value)}
						readOnly
					/>
					<label htmlFor="pincode" className="label-text">
						Pincode:
					</label>
				</div>

				<div className="field">
					<button className="btn">{labels.ADD_BRANCH}</button>
				</div>
			</form>
			<div>
				{branches.length > 0 && (
					<>
						Branches Added : {branches.length}
						{branches.map((branch) => (
							<div key={branch.id}>
								<span>{branch.branchName}</span> <span>{branch.city}</span>{" "}
								<span>{branch.pincode}</span>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({ branches, areas }) => {
	console.log(branches, areas);
	return {
		branches,
		areas,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addBranchAction: (branch) => {
			dispatch(addBranchAction(branch));
		},
		getBranchesAction: () => {
			dispatch(getBranchesAction());
		},
		getAreasAction: () => {
			dispatch(getAreasAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
