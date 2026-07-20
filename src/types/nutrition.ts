export type NutritionTotals = {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  iron?: number;
  calcium?: number;
  vitaminC?: number;
  vitaminA?: number;
  potassium?: number;
  sodium?: number;
};

export type FoodItem = {
  name: string;
  quantity?: string;
  nutrition?: NutritionTotals;
};

export type MealLog = {
  id?: string;
  foods?: FoodItem[];
  aggregates?: NutritionTotals;
  imageUrl?: string;
  notes?: string;
  createdAt?: any;
};
