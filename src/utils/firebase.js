// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdVY-vkA6bvUpfz9YOmJ2WP9aJ_bjCW1s",
  authDomain: "pwfellowship-app.firebaseapp.com",
  projectId: "pwfellowship-app",
  storageBucket: "pwfellowship-app.appspot.com",
  messagingSenderId: "1045781923241",
  appId: "1:1045781923241:web:0dc1491e05a2a0b8bc70b8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// auth
const auth = getAuth();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };

// db
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

export { db };

// functions
import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions();

const sendScheduleMessage = httpsCallable(functions, 'sendScheduleMessage');

export { functions, sendScheduleMessage };