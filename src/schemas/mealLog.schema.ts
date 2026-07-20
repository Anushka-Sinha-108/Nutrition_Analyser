import { z } from 'zod';

export const NutritionSchema = z.object({
  calories: z.number().nonnegative().optional(),
  protein: z.number().nonnegative().optional(),
  carbs: z.number().nonnegative().optional(),
  fat: z.number().nonnegative().optional(),
  fiber: z.number().nonnegative().optional(),
  iron: z.number().nonnegative().optional(),
  calcium: z.number().nonnegative().optional(),
  vitaminC: z.number().nonnegative().optional(),
  vitaminA: z.number().nonnegative().optional(),
  potassium: z.number().nonnegative().optional(),
  sodium: z.number().nonnegative().optional(),
});

export const FoodItemSchema = z.object({
  name: z.string(),
  quantity: z.string().optional(),
  nutrition: NutritionSchema.optional(),
});

const MealLogSchema = z.object({
  id: z.string().optional(),
  foods: z.array(FoodItemSchema).optional(),
  aggregates: NutritionSchema.optional(),
  imageUrl: z.string().url().optional(),
  notes: z.string().optional(),
  createdAt: z.any().optional(),
});

export type MealLog = z.infer<typeof MealLogSchema>;
export default MealLogSchema;
