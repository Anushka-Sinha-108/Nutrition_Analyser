import { firestoreDb } from '../../firebase';
import { collection, query, where, getDocs, limit, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const dailyMenuCol = collection(firestoreDb, 'daily_menus');

export interface DailyMenu {
  id?: string;
  dateStr: string; // e.g., "2026-07-20"
  meals: {
    breakfast: Array<{ name: string; calories: number; protein: number; portionQuantity: string }>;
    lunch: Array<{ name: string; calories: number; protein: number; portionQuantity: string }>;
    snacks: Array<{ name: string; calories: number; protein: number; portionQuantity: string }>;
    dinner: Array<{ name: string; calories: number; protein: number; portionQuantity: string }>;
  };
  messName: string; // e.g., "Gargi Mess"
  createdAt?: any;
}

// 1. Fetch Today's Menu for a specific mess
export const getTodaysMenu = async (messName: string = "Gargi Mess"): Promise<DailyMenu | null> => {
  const todayStr = new Date().toISOString().split('T')[0]; // Gets "YYYY-MM-DD"

  const q = query(
    dailyMenuCol,
    where('messName', '==', messName),
    where('dateStr', '==', todayStr),
    limit(1)
  );

  try {
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() } as DailyMenu;
  } catch (error) {
    console.error("Error fetching today's menu:", error);
    return null;
  }
};

// 2. Seeder Helper (Optional): Add Sample Menu to test User Dashboard
export const seedSampleMenu = async () => {
    const todayStr = new Date().toISOString().split('T')[0]; 
    const sampleDailyMenu: Omit<DailyMenu, 'id'> = {
        dateStr: todayStr,
        messName: "Gargi Mess",
        createdAt: serverTimestamp(),
        meals: {
            breakfast: [
                { name: 'Aloo Paratha', calories: 250, protein: 5, portionQuantity: '1 large' },
                { name: 'Curd', calories: 100, protein: 8, portionQuantity: '1 cup' },
                { name: 'Boiled Eggs', calories: 150, protein: 12, portionQuantity: '2 eggs' },
                { name: 'Tea/Coffee', calories: 50, protein: 1, portionQuantity: '1 cup' }
            ],
            lunch: [
                { name: 'Dal Makhani', calories: 350, protein: 15, portionQuantity: '1 bowl' },
                { name: 'Jeera Rice', calories: 200, protein: 4, portionQuantity: '1 plate' },
                { name: 'Roti', calories: 80, protein: 3, portionQuantity: '1 unit' },
                { name: 'Mix Veg Salad', calories: 50, protein: 2, portionQuantity: '1 cup' }
            ],
            snacks: [
                { name: 'Samosa', calories: 200, protein: 4, portionQuantity: '1 unit' },
                { name: 'Chai', calories: 40, protein: 1, portionQuantity: '1 cup' },
                { name: 'Fruit (Apple)', calories: 80, protein: 1, portionQuantity: '1 unit' }
            ],
            dinner: [
                { name: 'Paneer Butter Masala', calories: 400, protein: 14, portionQuantity: '1 bowl' },
                { name: 'Chapati', calories: 80, protein: 3, portionQuantity: '1 unit' },
                { name: 'Jeera Rice', calories: 200, protein: 4, portionQuantity: '1 plate' },
                { name: 'Kheer', calories: 180, protein: 5, portionQuantity: '1 cup' }
            ]
        }
    };

    try {
        await addDoc(dailyMenuCol, sampleDailyMenu);
        console.log("Sample menu seeded for today:", todayStr);
    } catch (e) {
        console.error("Error seeding sample menu:", e);
    }
};