import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQkVfclEUza4nptF6fj8suCoMT3PQphYQ",
  authDomain: "fit5032-89f2d.firebaseapp.com",
  projectId: "fit5032-89f2d",
  storageBucket: "fit5032-89f2d.firebasestorage.app",
  messagingSenderId: "1097868026347",
  appId: "1:1097868026347:web:7e23a7fee12904e6a0b9ae",
  measurementId: "G-BNXDRGKK9K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export default db