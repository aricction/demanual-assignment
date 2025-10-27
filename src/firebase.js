// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMKSpF4aiXjeOOB39btErQ1xaWMPEuKRQ",
  authDomain: "demanual-assignment.firebaseapp.com",
  projectId: "demanual-assignment",
  storageBucket: "demanual-assignment.firebasestorage.app",
  messagingSenderId: "685895847979",
  appId: "1:685895847979:web:d1d1a57ddb0fac6dc11a6e",
  measurementId: "G-S4PDY4R47F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
