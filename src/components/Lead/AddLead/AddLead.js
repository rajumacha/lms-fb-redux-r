import React, { Component } from "react";
import { LeadsContext } from "../../../context/Leads";
import { UsersContext } from "../../../context/Users";
import "./add-lead-styles.scss";

export default class AddLead extends Component {
	static contextType = LeadsContext;
	constructor() {
		super();
		this.state = {
			name: "",
			shopName: "",
			mobile: "",
			gender: "male",
			location: "",
			interested: "yes",
			followupDate: "",
			comments: "",
			showfollowupDate: false,
			alertMessage: "",
			leadsCtxt: null,
		};
	}

	componentDidMount() {
		const value = this.context;
		this.setState({ leadsCtxt: value });
	}

	handleChange = (e) => {
		let { name, value } = e.target;
		name =
			name === "group1" ? "gender" : name === "group2" ? "interested" : name;

		this.setState((state) => {
			if (name === "interested" && value === "followup") {
				return { [name]: value, showfollowupDate: true };
			}
			return { [name]: value, showfollowupDate: false };
		});
	};

	handleAdd = async (e) => {
		e.preventDefault();
		const {
			name,
			shopName,
			mobile,
			location,
			gender,
			interested,
			followupDate,
			comments,
		} = this.state;
		try {
			this.state.leadsCtxt.setLead({
				name,
				shopName,
				mobile,
				location,
				gender,
				interested,
				followupDate,
				comments,
			});
			this.showMessage("Lead Added");
		} catch (err) {
			console.log(err);
		}
	};

	showMessage = (message) => {
		this.setState({ alertMessage: message });
		setTimeout(() => {
			this.clearState();
		}, 2000);
	};

	clearState = () => {
		this.setState((state) => {
			return {
				name: "",
				shopName: "",
				mobile: "",
				gender: "male",
				location: "",
				interested: "yes",
				followupDate: "",
				comments: "",
				showfollowupDate: false,
				alertMessage: "",
			};
		});
	};

	render() {
		const {
			name,
			shopName,
			mobile,
			location,
			followupDate,
			comments,
			showfollowupDate,
			alertMessage,
		} = this.state;
		console.log(this.state.leadsCtxt);
		return (
			<div className="container new-lead">
				{alertMessage && <div className="showMessage">{alertMessage}</div>}
				<h4 className="teal-text darken-2 center-align">New Lead</h4>
				<form className="card" onSubmit={this.handleAdd}>
					<div className="card-content">
						<div className="lead-info">
							<div>
								<label htmlFor="name">
									Name:
									<input
										type="text"
										id="name"
										name="name"
										className="field"
										value={name}
										onChange={this.handleChange}
									/>
								</label>
							</div>
							<div>
								<label htmlFor="shopname">
									Shopname:
									<input
										type="text"
										id="shopname"
										name="shopName"
										className="field"
										value={shopName}
										onChange={this.handleChange}
									/>
								</label>
							</div>
							<div>
								<label htmlFor="mobile">Mobile:</label>
								<div className="country-code">
									<input type="text" value="+91" className="code" readOnly />
									<input
										type="tel"
										id="mobile"
										name="mobile"
										placeholder="12345-67890"
										className="field mobile"
										value={mobile}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div>
								<label>Gender: </label>
								<label>
									<input
										name="group1"
										type="radio"
										className="with-gap"
										value="male"
										onChange={this.handleChange}
									/>
									<span>Male</span>
								</label>
								<label>
									<input
										name="group1"
										type="radio"
										className="with-gap"
										value="female"
										onChange={this.handleChange}
									/>
									<span>Female</span>
								</label>
							</div>
							<div>
								<label htmlFor="location">
									Location:
									<input
										type="text"
										id="location"
										name="location"
										className="field"
										value={location}
										onChange={this.handleChange}
									/>
								</label>
							</div>
							<div>
								<label>Interested: </label>
								<p></p>
								<label>
									<input
										name="group2"
										type="radio"
										className="with-gap"
										value="yes"
										onChange={this.handleChange}
									/>
									<span>Yes</span>
								</label>
								<label>
									<input
										name="group2"
										type="radio"
										className="with-gap"
										value="no"
										onChange={this.handleChange}
									/>
									<span>No</span>
								</label>
								<label>
									<input
										name="group2"
										type="radio"
										className="with-gap"
										value="followup"
										onChange={this.handleChange}
									/>
									<span>Followup</span>
								</label>

								<input
									type="date"
									id="date"
									name="followupDate"
									className={`field ${showfollowupDate ? "" : "show"}`}
									value={followupDate}
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor="comments">Comments: </label>
								<textarea
									name="comments"
									rows="5"
									cols="30"
									value={comments}
									onChange={this.handleChange}
								></textarea>
							</div>
						</div>
						<div className="center-align">
							<button className="btn field">Add</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
