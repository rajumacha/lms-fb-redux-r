import React, { useContext } from "react";
import { LeadsContext } from "../../../context/Leads";
import ShowCustomer from "../ShowCustomer/ShowCustomer";

export default function ListLeads() {
	const { leads } = useContext(LeadsContext);

	return (
		<div className="container">
			<h3 className="teal-text draken-4 center">{leads.length}</h3>
			<ul className="collection">
				{leads.map((lead) => (
					<ShowCustomer key={lead.id} lead={{ ...lead }} />
				))}
			</ul>
		</div>
	);
}
