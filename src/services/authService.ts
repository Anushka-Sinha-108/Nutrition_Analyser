import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    User
  } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestoreDb } from '../firebase';
  
  // 1. Create an Account (Signup)
  export const signup = async (email: string, password: string, displayName: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
  
      // Update the user profile with their real name immediately after signup
      await updateProfile(user, { displayName: displayName });
      await setDoc(doc(firestoreDb, 'users', user.uid), {
        id: user.uid,
        displayName,
        email: user.email,
        role: 'student',
        profileComplete: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return user;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; // Let the UI handle displaying the error
    }
  };
  
  // 2. Sign In (Login)
  export const login = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  // 3. Sign Out (Logout)
  export const logout = async (): Promise<void> => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
