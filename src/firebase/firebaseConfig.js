// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBENhgwFcuNSlAhNgL6zUX6aJEErFts4TY",
  authDomain: "yfiob-9337d.firebaseapp.com",
  projectId: "yfiob-9337d",
  storageBucket: "yfiob-9337d.appspot.com",
  messagingSenderId: "1082615855397",
  appId: "1:1082615855397:web:d0ddd90fc85ad4cf2ac2cc",
  measurementId: "G-VVPPCT9R90",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Authentication Services
export const auth = getAuth(app);

// Initialize Firestore database
export const db = getFirestore(app);

export default app;
