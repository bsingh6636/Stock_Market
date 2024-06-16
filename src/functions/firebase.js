// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiNQ5rKItayBs8xDQjWe6b5vhyfLlEpoQ",
  authDomain: "stockmarket-5f32f.firebaseapp.com",
  projectId: "stockmarket-5f32f",
  storageBucket: "stockmarket-5f32f.appspot.com",
  messagingSenderId: "541950094455",
  appId: "1:541950094455:web:b0b66e10ee33676df7aa72",
  measurementId: "G-GJ0STVF8TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

//npm install -g firebase-tools