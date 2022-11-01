// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_QywjDLMwjnjxTtNXCP4M9zo99zDuRR0",
  authDomain: "instashare-a8fe3.firebaseapp.com",
  projectId: "instashare-a8fe3",
  storageBucket: "instashare-a8fe3.appspot.com",
  messagingSenderId: "101176871971",
  appId: "1:101176871971:web:8e26470032a14e69a4f596",
  measurementId: "G-5V8Z843MZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
