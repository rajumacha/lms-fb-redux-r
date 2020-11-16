import React, { useState, useEffect } from "react";
import db from "../firebase/init";

const LeadsContext = React.createContext();

function LeadsProvider({ children }) {
	const [leads, setLeads] = useState([]);
	const [lead, setLead] = useState(null);

	useEffect(() => {
		let leadsCollection = [];
		(async () => {
			if (lead) {
				await db.collection("leads").add({ ...lead });
			}
			await db
				.collection("leads")
				.get()
				.then((leads) => {
					leads.forEach((lead) => {
						leadsCollection.push({ ...lead.data(), id: lead.id });
					});
				});
		})();
		setLeads(leadsCollection);
	}, [lead]);

	console.log(leads);
	return (
		<LeadsContext.Provider value={{ leads, setLead }}>
			{children}
		</LeadsContext.Provider>
	);
}

export { LeadsContext, LeadsProvider };
