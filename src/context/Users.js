import React, { useState, useEffect } from "react";
import db from "../firebase/init";

const UsersContext = React.createContext();

function UsersProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [curUser, setCurUser] = useState(null);
	const [loginStatus, setLoginStatus] = useState(null);

	useEffect(() => {
		let usersCollec = [];
		db.collection("users")
			.get()
			.then((usersSnap) => {
				usersSnap.forEach((userDoc) => {
					usersCollec.push(userDoc.data());
				});
			});
		setUsers(usersCollec);
	}, []);

	return (
		<UsersContext.Provider
			value={{ users, curUser, setCurUser, loginStatus, setLoginStatus }}
		>
			{children}
		</UsersContext.Provider>
	);
}

export { UsersContext, UsersProvider };
