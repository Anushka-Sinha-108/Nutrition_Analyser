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

export type NutrientKey = keyof NutritionTotals;

export type DietaryPreference = 'vegetarian' | 'eggitarian' | 'non_vegetarian';

export type FoodItem = {
  id?: string;
  name: string;
  category?: string;
  servingSizeG?: number;
  servingLabel?: string;
  costInr?: number;
  dietaryPreference?: DietaryPreference;
  allergens?: string[];
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
