import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvlxjTwTd2pxhbdEqYBp4oRqG81VY3mEE",
  authDomain: "tptr-markaanalizi.firebaseapp.com",
  projectId: "tptr-markaanalizi",
  storageBucket: "tptr-markaanalizi.firebasestorage.app",
  messagingSenderId: "715392797118",
  appId: "1:715392797118:web:a99ebc063e7d047fd491ef",
  measurementId: "G-EDMVG8B27H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
