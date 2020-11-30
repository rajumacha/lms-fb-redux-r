import React from "react";

export default function SummaryReport({ results }) {
	return (
		<div>
			<h5>
				<u>Summary: </u>
			</h5>
			<h6>
				Total Customers <span>{results.length}</span>
			</h6>

			<h6>
				Interested - Yes
				<span>
					{results.reduce((tot, cus, idx) => {
						if (cus.interested === "yes") {
							return (tot += 1);
						}
						return tot;
					}, 0)}
				</span>
			</h6>
			<h6>
				Interested - No
				<span>
					{results.reduce((tot, cus, idx) => {
						if (cus.interested === "no") {
							return (tot += 1);
						}
						return tot;
					}, 0)}
				</span>
			</h6>
			<h6>
				Interested - Followup
				<span>
					{results.reduce((tot, cus, idx) => {
						if (cus.interested === "followup") {
							return (tot += 1);
						}
						return tot;
					}, 0)}
				</span>
			</h6>
		</div>
	);
}
