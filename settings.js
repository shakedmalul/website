// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyDukZh29Uk8aJISSuGyBDRgMYfu4NrNmVQ",
    authDomain: "html-firebase-34ba4.firebaseapp.com",
    databaseURL: "https://html-firebase-34ba4-default-rtdb.firebaseio.com",
    projectId: "html-firebase-34ba4",
    storageBucket: "html-firebase-34ba4.appspot.com",
    messagingSenderId: "162378750231",
    appId: "1:162378750231:web:bc71c70cea473b8604ff52",
    measurementId: "G-F31ZQ47EEY"
};
function authenticateUser(action) {

const app = firebase.initializeApp(firebaseConfig);
const userId = userCredential.user.uid; // Get the unique user ID
const database = firebase.database();
console.log(userId)
console.log("printed")


}