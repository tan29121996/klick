// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUr_3JEEFlab9O8ceXwoQ_S9OIjroVknQ",
  authDomain: "klick-d6cea.firebaseapp.com",
  projectId: "klick-d6cea",
  storageBucket: "klick-d6cea.appspot.com",
  messagingSenderId: "860270821976",
  appId: "1:860270821976:web:8797713e45f087b07c002d",
  measurementId: "G-98FB6S9KB9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage(app);

export { app, db, storage };
