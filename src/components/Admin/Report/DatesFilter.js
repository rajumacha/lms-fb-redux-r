import React from "react";
import "../admin.styles.scss";

export default function DatesFilter() {
	return (
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
			{showSendButton()}
		</div>
	);
}
