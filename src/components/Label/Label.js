import React from "react";
import "./label.styles.scss";

export default function Label({ label }) {
	return <h4 className="center-align indigo-text">{label}</h4>;
}
