import { firestoreDb } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  setDoc,
} from 'firebase/firestore';
import type { MealLog } from '../types/nutrition';

const usersCol = () => collection(firestoreDb, 'users');
const mealLogsCol = (userId: string) => collection(firestoreDb, `users/${userId}/meal_logs`);

export async function addMealLog(userId: string, payload: Partial<MealLog>) {
  const ref = await addDoc(mealLogsCol(userId), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getMealLogs(userId: string, since?: Date) {
  let q = query(mealLogsCol(userId));
  // simple implementation; callers can refine
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function upsertUserProfile(userId: string, data: Record<string, any>) {
  const ref = doc(usersCol(), userId);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}
