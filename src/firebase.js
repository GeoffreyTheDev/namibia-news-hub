import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "firebase/auth";

// 1. YOUR UNIQUE FIREBASE CONFIGURATION GOES HERE
const firebaseConfig = {
  apiKey: "AIzaSyCU6oMxh4cVvUpX6gsYD8eaFCiBh1ahJRw",
  authDomain: "news-4ab39.firebaseapp.com",
  projectId: "news-4ab39",
  storageBucket: "news-4ab39.firebasestorage.app",
  messagingSenderId: "799257491918",
  appId: "1:799257491918:web:4a413d668d2f5dfa84939f",
  measurementId: "G-96KV1C953V"
};

// 2. THIS IS THE MISSING LINE CAUSING THE ERROR
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 3. AUTHENTICATION EXPORTS
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign In Helper
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

// Email Sign Up Helper
export const registerWithEmail = async (email, password) => {
  // Enforce password complexity
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase || !hasSpecialChar) {
    alert("Password must contain at least one uppercase letter and one special character.");
    return null;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    alert("Verification email sent! Please check your inbox.");
    return userCredential.user;
  } catch (error) {
    console.error("Email Registration Error:", error);
    alert(error.message);
  }
};

// Email Login Helper
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed. Please check your email and password.");
  }
};