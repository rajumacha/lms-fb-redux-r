import React from "react";

export default function ShowCustomer({ lead }) {
	const {
		name,
		gender,
		shopName,
		mobile,
		location,
		interested,
		followupDate,
		comments,
	} = lead;
	return (
		<li className="collection-item avatar">
			<i className="material-icons circle	">account_box</i>
			<span className="title orange-text text-darken-4">{name}</span>
			<p>
				Gender: {gender}
				<br />
				ShopName: {shopName}
				<br />
				Mobile: {mobile}
				<br />
				Location: {location}
				<br />
				Interested: {interested}
				<br />
				FollowupDate: {followupDate}
				<br />
				Comments: {comments}
				<br />
			</p>
		</li>
	);
}
