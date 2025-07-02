import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMgkppC-bTeXmnFdl5CLqqQpVIYjGzba4",
  authDomain: "smart-resume-builder-e20cc.firebaseapp.com",
  projectId: "smart-resume-builder-e20cc",
  storageBucket: "smart-resume-builder-e20cc.firebasestorage.app",
  messagingSenderId: "608147500485",
  appId: "1:608147500485:web:4d6ca2d207f05e0b446fac",
  measurementId: "G-NN4CN5F0RL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };