import { getMealLogs } from './mealTrackerService';
import { calculateNutritionScore } from '../utils/score';

export async function getUserNutritionScore(userId: string) {
  const logs = await getMealLogs(userId);
  // Very small example aggregation: last day's totals vs example targets
  // callers should pass real targets per-user
  const consumedTotals: Record<string, number> = {};

  logs.forEach((l: any) => {
    const agg = l.aggregates ?? l.nutritionTotals ?? {};
    Object.entries(agg).forEach(([k, v]) => {
      consumedTotals[k] = (consumedTotals[k] ?? 0) + Number(v ?? 0);
    });
  });

  const exampleTargets: Record<string, number> = {
    calories: 2200,
    protein: 60,
    carbs: 300,
    fat: 70,
    fiber: 30,
    iron: 18,
    calcium: 1000,
    vitaminC: 75,
    vitaminA: 700,
    potassium: 3500,
    sodium: 2300,
  };

  const score = calculateNutritionScore(consumedTotals, exampleTargets);
  return { score, consumedTotals, targets: exampleTargets };
}
