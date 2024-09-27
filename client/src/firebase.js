// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6V32YcU97V5Rp6FfCNAKWk_SsU1cD87c",
  authDomain: "ezrental-8ae6d.firebaseapp.com",
  projectId: "ezrental-8ae6d",
  storageBucket: "ezrental-8ae6d.appspot.com",
  messagingSenderId: "447127700213",
  appId: "1:447127700213:web:10fb3f4402d0305fd53bbc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);