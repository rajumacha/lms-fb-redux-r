import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyDBcHE1EwoGDfLDXzd6-y6UYk_F3uXAwuA",
	authDomain: "lms-r-f43a5.firebaseapp.com",
	databaseURL: "https://lms-r-f43a5.firebaseio.com",
	projectId: "lms-r-f43a5",
	storageBucket: "lms-r-f43a5.appspot.com",
	messagingSenderId: "666905346820",
	appId: "1:666905346820:web:8c5a7c970d892ab6434651",
	measurementId: "G-ZJDCQCX227",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
