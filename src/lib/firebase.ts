// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBP2cUglvp0ycklCX52gVAWqAAjuI9Jjm0",
  authDomain: "aimhigh-a1748.firebaseapp.com",
  projectId: "aimhigh-a1748",
  storageBucket: "aimhigh-a1748.appspot.com",
  messagingSenderId: "351800148348",
  appId: "1:351800148348:web:83e888b1f7fed6b45624f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);