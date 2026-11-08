import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword // <-- ADD THIS IMPORT
} from "firebase/auth";

// ... (Keep your existing firebaseConfig and initialization) ...

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

// Email Sign Up Helper (Includes Verification)
export const registerWithEmail = async (email, password) => {
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

// NEW: Email Login Helper
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed. Please check your email and password.");
  }
};