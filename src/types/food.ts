export type FoodSource = 'mess' | 'canteen' | 'street' | 'home';

export type DietaryType =
  | 'vegetarian'
  | 'eggitarian'
  | 'non_vegetarian';

export interface Nutrition {
  caloriesKcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  ironMg: number;
  calciumMg: number;
  vitaminCMg?: number;
  vitaminAUg?: number;
  potassiumMg?: number;
}

export interface FoodCatalogueItem {
  foodId: string;
  foodName: string;
  source: FoodSource;
  servingLabel: string;
  dietaryType: DietaryType;
  costInr: number;
  nutrition: Nutrition;
}
