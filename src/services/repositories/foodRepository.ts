import { collection, doc, getDocs, serverTimestamp, writeBatch } from 'firebase/firestore';
import { firestoreDb } from '../../firebase';
import type { FoodCatalogueItem } from '../../types/food';
import type { MessMenuItem } from '../../types/menu';

const foodCatalogueCol = collection(firestoreDb, 'food_catalogue');
const messMenusCol = collection(firestoreDb, 'mess_menus');
const batchSize = 450;

/** Upserts CSV catalogue rows by food_id, so importing an updated CSV does not create duplicates. */
export async function publishFoodCatalogue(foods: FoodCatalogueItem[]) {
  for (let start = 0; start < foods.length; start += batchSize) {
    const batch = writeBatch(firestoreDb);
    foods.slice(start, start + batchSize).forEach((food) => {
      batch.set(doc(foodCatalogueCol, food.foodId), { ...food, updatedAt: serverTimestamp() }, { merge: true });
    });
    await batch.commit();
  }
}

/** Upserts date-specific menu rows by menu_id. */
export async function publishMessMenu(menuItems: MessMenuItem[]) {
  for (let start = 0; start < menuItems.length; start += batchSize) {
    const batch = writeBatch(firestoreDb);
    menuItems.slice(start, start + batchSize).forEach((menuItem) => {
      batch.set(doc(messMenusCol, menuItem.menuId), { ...menuItem, updatedAt: serverTimestamp() }, { merge: true });
    });
    await batch.commit();
  }
}

export async function listFoodCatalogue(): Promise<FoodCatalogueItem[]> {
  const snapshot = await getDocs(foodCatalogueCol);
  return snapshot.docs.map((entry) => entry.data() as FoodCatalogueItem);
}

/** Client-side name search is reliable for a small college catalogue and needs no Firestore composite index. */
export async function searchFoods(query: string): Promise<FoodCatalogueItem[]> {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const foods = await listFoodCatalogue();
  if (!normalizedQuery) return foods;
  return foods.filter((food) => food.foodName.toLocaleLowerCase().includes(normalizedQuery));
}
