import { firebaseAuth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';

export async function signup(email: string, password: string, displayName?: string) {
  const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  if (displayName) await updateProfile(cred.user as User, { displayName });
  return cred.user;
}

export async function login(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return cred.user;
}

export function logout() {
  return signOut(firebaseAuth);
}
