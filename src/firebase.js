import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "none",
  authDomain: "none",
  projectId: "none",
  storageBucket: "none",
  messagingSenderId: "none",
  appId: "none",
  measurementId: "none"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 
