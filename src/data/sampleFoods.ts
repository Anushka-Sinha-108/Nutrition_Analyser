import type { FoodItem } from '../types/nutrition';

export const sampleFoods: FoodItem[] = [
  { id: 'dal-tadka', name: 'Dal Tadka', category: 'Pulse', servingSizeG: 150, servingLabel: '1 bowl', costInr: 20, dietaryPreference: 'vegetarian', nutrition: { calories: 180, protein: 9, carbs: 24, fat: 5, fiber: 6, iron: 2.5, calcium: 45 } },
  { id: 'roti', name: 'Whole-wheat Roti', category: 'Grain', servingSizeG: 40, servingLabel: '1 roti', costInr: 4, dietaryPreference: 'vegetarian', nutrition: { calories: 90, protein: 3, carbs: 18, fat: 1, fiber: 2.5, iron: 1 } },
  { id: 'rice', name: 'Steamed Rice', category: 'Grain', servingSizeG: 180, servingLabel: '1 serving', costInr: 10, dietaryPreference: 'vegetarian', nutrition: { calories: 230, protein: 4, carbs: 50, fat: 0.5, fiber: 0.7, iron: 0.3 } },
  { id: 'mix-veg', name: 'Mixed Vegetable Sabzi', category: 'Vegetable', servingSizeG: 120, servingLabel: '1 bowl', costInr: 15, dietaryPreference: 'vegetarian', nutrition: { calories: 110, protein: 3, carbs: 14, fat: 5, fiber: 4, iron: 1.5, vitaminC: 20 } },
  { id: 'curd', name: 'Plain Curd', category: 'Dairy', servingSizeG: 150, servingLabel: '1 bowl', costInr: 20, dietaryPreference: 'vegetarian', nutrition: { calories: 98, protein: 5.2, carbs: 7, fat: 4.8, calcium: 180 } },
  { id: 'egg', name: 'Boiled Egg', category: 'Protein', servingSizeG: 50, servingLabel: '1 egg', costInr: 8, dietaryPreference: 'eggitarian', nutrition: { calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, iron: 0.9 } },
  { id: 'milk', name: 'Toned Milk', category: 'Dairy', servingSizeG: 250, servingLabel: '250 ml', costInr: 16, dietaryPreference: 'vegetarian', nutrition: { calories: 145, protein: 8, carbs: 12, fat: 7.5, calcium: 300 } },
  { id: 'banana', name: 'Banana', category: 'Fruit', servingSizeG: 100, servingLabel: '1 medium', costInr: 10, dietaryPreference: 'vegetarian', nutrition: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, iron: 0.3, potassium: 358 } },
  { id: 'chana', name: 'Roasted Chana', category: 'Snack', servingSizeG: 40, servingLabel: '1 handful', costInr: 10, dietaryPreference: 'vegetarian', nutrition: { calories: 145, protein: 7.5, carbs: 24, fat: 2.4, fiber: 6.8, iron: 2.4 } },
  { id: 'paneer', name: 'Paneer Curry', category: 'Protein', servingSizeG: 150, servingLabel: '1 bowl', costInr: 35, dietaryPreference: 'vegetarian', nutrition: { calories: 290, protein: 16, carbs: 10, fat: 20, fiber: 2, calcium: 350 } },
];
