export const nutrientWeights = {
  calories: 25,
  protein: 20,
  carbs: 10,
  fat: 10,
  fiber: 10,
  iron: 6,
  calcium: 6,
  vitaminC: 4,
  vitaminA: 3,
  potassium: 3,
  sodium: 3,
} as const;

function piecewiseScore(R: number) {
  if (Number.isNaN(R) || !isFinite(R)) return 0;
  if (R >= 0.9 && R <= 1.1) return 100;
  if (R < 0.5) return Math.max(0, Math.round(R * 100));
  if (R < 0.7) return 50 + ((R - 0.5) / 0.2) * 30; // 50 -> 80
  if (R < 0.9) return 80 + ((R - 0.7) / 0.2) * 20; // 80 -> 100
  if (R <= 1.3) return 100 - ((R - 1.1) / 0.2) * 25; // 100 -> 75
  if (R <= 1.6) return 75 - ((R - 1.3) / 0.3) * 40; // 75 -> 35
  if (R <= 2.0) return 35 - ((R - 1.6) / 0.4) * 25; // 35 -> 10
  return 5;
}

export function calculateNutritionScore(consumed: Record<string, number>, targets: Record<string, number>) {
  let totalWeight = 0;
  let total = 0;
  (Object.keys(nutrientWeights) as Array<keyof typeof nutrientWeights>).forEach((k) => {
    const weight = nutrientWeights[k];
    const target = targets[k] ?? 0;
    if (!target) return;
    const value = consumed[k] ?? 0;
    const R = value / target;
    const score = piecewiseScore(R);
    total += score * weight;
    totalWeight += weight;
  });
  if (totalWeight === 0) return 0;
  return Math.round(total / totalWeight);
}
