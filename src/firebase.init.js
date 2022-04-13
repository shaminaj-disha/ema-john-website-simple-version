// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYRKJBzenE4ceyHnq3B-sZHMAfj2nF_-Q",
  authDomain: "ema-john-simple-e363e.firebaseapp.com",
  projectId: "ema-john-simple-e363e",
  storageBucket: "ema-john-simple-e363e.appspot.com",
  messagingSenderId: "6979551281",
  appId: "1:6979551281:web:0bccded30b3285093dd510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;