import React from "react";

export default function ErrorMsg({ message }) {
	console.log(message);
	return <div className="red-text text-darken-2">{message}</div>;
}
