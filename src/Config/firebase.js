import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCsqq3YfUU-gmos2oTWRqJ0fNTwOQLGDNY",
  authDomain: "realtimechatapp-6ff5a.firebaseapp.com",
  projectId: "realtimechatapp-6ff5a",
  storageBucket: "realtimechatapp-6ff5a.appspot.com",
  messagingSenderId: "321861461214",
  appId: "1:321861461214:web:1b1e298d9f6eb7ef4c0e4f",
  measurementId: "G-VTHRCEBPXH",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
