// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB11_Mtk0UxanEOSTxY4OtOBDqnsFZIZAo",
  authDomain: "nft-print-service.firebaseapp.com",
  projectId: "nft-print-service",
  storageBucket: "nft-print-service.appspot.com",
  messagingSenderId: "127956591109",
  appId: "1:127956591109:web:7507e48e89def1c46bb26c",
  measurementId: "G-X234N1DWY6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const database = firebase.database()
export const storage = firebase.storage()