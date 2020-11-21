import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
	return (
		<div>
			No Such Page.
			<p>
				<Link to="/">Back to Home</Link>
			</p>
		</div>
	);
}
