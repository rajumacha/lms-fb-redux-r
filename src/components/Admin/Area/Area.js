import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	addAreaAction,
	getAreasAction,
} from "../../../redux/actions/AreasAction";
import { labels } from "../../../utils/labels";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import Label from "../../Label/Label";
import "./area.styles.scss";

function Area({ addAreaAction, getAreasAction, areas }) {
	const [area, setArea] = useState("");
	const [city, setCity] = useState("");
	const [pincode, setPincode] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		getAreasAction();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		addAreaAction({ area, city, pincode });
		setDefaults();
	};

	const setDefaults = () => {
		setArea("");
		setCity("");
		setPincode("");
		setError("");
	};

	return (
		<div className="container new-area">
			<Label label="New Area" />
			<div>{error ? <ErrorMsg message={error} /> : null}</div>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<input
						id="area"
						type="text"
						value={area}
						onChange={(e) => setArea(e.target.value)}
						required
					/>
					<label htmlFor="area" className="label-text">
						Area:
					</label>
				</div>
				<div className="field">
					<input
						id="city"
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
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
						required
					/>
					<label htmlFor="pincode" className="label-text">
						Pincode:
					</label>
				</div>

				<div className="field">
					<button className="btn">{labels.ADD_AREA}</button>
				</div>
			</form>
			<div>
				{areas.length > 0 && (
					<>
						Areas Added : {areas.length}
						{areas.map((area) => (
							<div>
								<span>{area.area}</span> <span>{area.city}</span>{" "}
								<span>{area.pincode}</span>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({ areas }) => {
	console.log(areas);
	return {
		areas,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addAreaAction: (area) => {
			dispatch(addAreaAction(area));
		},
		getAreasAction: () => {
			dispatch(getAreasAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Area);
