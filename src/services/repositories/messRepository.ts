import { firestoreDb } from '../../../src/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// mess_database top-level collection
const messDbCol = () => collection(firestoreDb, 'mess_database');

export async function seedMessItem(item: { name: string; portionNutrition: Record<string, number>; tags?: string[] }) {
  const ref = await addDoc(messDbCol(), item);
  return ref.id;
}

export async function listMessItems() {
  const snap = await getDocs(messDbCol());
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
