import type { FoodCatalogueItem } from '../types/food';
import type { MessMenuItem } from '../types/menu';

export function validateFoods(foods: FoodCatalogueItem[]): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  foods.forEach((food, index) => {
    const row = index + 2;

    if (!food.foodId) {
      errors.push(`Food CSV row ${row}: food_id is missing.`);
    }

    if (!food.foodName) {
      errors.push(`Food CSV row ${row}: food_name is missing.`);
    }

    if (food.nutrition.caloriesKcal <= 0) {
      errors.push(`Food CSV row ${row}: calories_kcal must be greater than 0.`);
    }

    if (seenIds.has(food.foodId)) {
      errors.push(`Food CSV row ${row}: duplicate food_id "${food.foodId}".`);
    }

    seenIds.add(food.foodId);
  });

  return errors;
}

export function validateMenu(
  menuItems: MessMenuItem[],
  foods: FoodCatalogueItem[],
): string[] {
  const errors: string[] = [];
  const knownFoodIds = new Set(foods.map((food) => food.foodId));

  menuItems.forEach((menuItem, index) => {
    const row = index + 2;

    if (!menuItem.menuId) {
      errors.push(`Menu CSV row ${row}: menu_id is missing.`);
    }

    if (!menuItem.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      errors.push(`Menu CSV row ${row}: date must use YYYY-MM-DD.`);
    }

    if (!['breakfast', 'lunch', 'snacks', 'dinner'].includes(menuItem.mealTime)) {
      errors.push(`Menu CSV row ${row}: invalid meal_time.`);
    }

    if (!knownFoodIds.has(menuItem.foodId)) {
      errors.push(
        `Menu CSV row ${row}: food_id "${menuItem.foodId}" does not exist in food_catalogue.csv.`,
      );
    }
  });

  return errors;
}
