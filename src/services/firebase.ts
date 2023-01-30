import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGO3yLXsLwCi2mpZiWDmq1D1Lc_LQwSYs",
  authDomain: "habits-efb43.firebaseapp.com",
  projectId: "habits-efb43",
  storageBucket: "habits-efb43.appspot.com",
  messagingSenderId: "464748705729",
  appId: "1:464748705729:web:e25b252365de172704e140"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }