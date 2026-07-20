import Papa from 'papaparse';
import type { FoodCatalogueItem } from '../types/food';
import type { MessMenuItem } from '../types/menu';

function numberOrZero(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseFoodCatalogue(file: File): Promise<FoodCatalogueItem[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const foods = result.data.map((row) => ({
            foodId: row.food_id?.trim() || '',
            foodName: row.food_name?.trim() || '',
            source: row.source?.trim() as FoodCatalogueItem['source'],
            servingLabel: row.serving_label?.trim() || '1 serving',
            dietaryType: row.dietary_type?.trim() as FoodCatalogueItem['dietaryType'],
            costInr: numberOrZero(row.cost_inr),
            nutrition: {
              caloriesKcal: numberOrZero(row.calories_kcal),
              proteinG: numberOrZero(row.protein_g),
              carbsG: numberOrZero(row.carbs_g),
              fatG: numberOrZero(row.fat_g),
              fiberG: numberOrZero(row.fiber_g),
              ironMg: numberOrZero(row.iron_mg),
              calciumMg: numberOrZero(row.calcium_mg),
            },
          }));

          resolve(foods);
        } catch {
          reject(new Error('Could not read the food catalogue CSV.'));
        }
      },
      error: () => reject(new Error('Could not read the food catalogue CSV.')),
    });
  });
}

export function parseMessMenu(file: File): Promise<MessMenuItem[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const menuItems = result.data.map((row) => ({
            menuId: row.menu_id?.trim() || '',
            date: row.date?.trim() || '',
            mealTime: row.meal_time?.trim() as MessMenuItem['mealTime'],
            foodId: row.food_id?.trim() || '',
            messName: row.mess_name?.trim() || 'Main Mess',
          }));

          resolve(menuItems);
        } catch {
          reject(new Error('Could not read the mess menu CSV.'));
        }
      },
      error: () => reject(new Error('Could not read the mess menu CSV.')),
    });
  });
}