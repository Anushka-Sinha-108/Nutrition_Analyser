export type MealTime = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export interface MessMenuItem {
  menuId: string;
  date: string; // YYYY-MM-DD
  mealTime: MealTime;
  foodId: string;
  messName: string;
}