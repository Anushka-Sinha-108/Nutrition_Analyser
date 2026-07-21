import type { MealType, NutritionTotals } from '../types/nutrition';

/** Daily college-student nutrition targets. Units: kcal, grams, or milligrams as appropriate. */
export const DAILY_TARGETS: Required<Pick<NutritionTotals, 'calories' | 'protein' | 'fiber' | 'iron' | 'calcium' | 'vitaminC' | 'vitaminA' | 'potassium'>> = {
  calories: 2200,
  protein: 55,
  fiber: 25,
  iron: 14,
  calcium: 1000,
  vitaminC: 65,
  vitaminA: 600,
  potassium: 3500,
};

/** Weights total 100. A nutrient can earn no more than its assigned weight. */
export const SCORE_WEIGHTS = {
  calories: 10,
  protein: 25,
  fiber: 20,
  iron: 15,
  calcium: 10,
  vitaminC: 10,
  vitaminA: 5,
  potassium: 5,
} as const;

export const MEAL_PERCENTAGES: Record<MealType, number> = {
  breakfast: 0.25,
  lunch: 0.35,
  snacks: 0.15,
  dinner: 0.25,
};

type ScoreNutrient = keyof typeof SCORE_WEIGHTS;

export function calculateNutritionScore(nutrition: NutritionTotals, targets: NutritionTotals = DAILY_TARGETS): number {
  return Math.round((Object.keys(SCORE_WEIGHTS) as ScoreNutrient[]).reduce((score, nutrient) => {
    const actual = Number(nutrition[nutrient] ?? 0);
    const target = Number(targets[nutrient] ?? 0);
    if (target <= 0) return score;
    return score + Math.min(Math.max(actual / target, 0), 1) * SCORE_WEIGHTS[nutrient];
  }, 0));
}

export function getMealTargets(meal: MealType): NutritionTotals {
  const percentage = MEAL_PERCENTAGES[meal];
  return (Object.keys(DAILY_TARGETS) as ScoreNutrient[]).reduce<NutritionTotals>((targets, nutrient) => {
    targets[nutrient] = DAILY_TARGETS[nutrient] * percentage;
    return targets;
  }, {});
}

export function calculateMealScore(nutrition: NutritionTotals, meal: MealType): number {
  return calculateNutritionScore(nutrition, getMealTargets(meal));
}

export function getScoreMessage(score: number) {
  if (score >= 80) return { label: 'Excellent', message: 'Your nutrition intake is well balanced today.' };
  if (score >= 60) return { label: 'Good', message: 'Your nutrition is fairly balanced, with some room for improvement.' };
  if (score >= 40) return { label: 'Needs improvement', message: 'Some important nutrients may be missing from your intake today.' };
  return { label: 'Low', message: 'Your intake is low in several important nutrients.' };
}
