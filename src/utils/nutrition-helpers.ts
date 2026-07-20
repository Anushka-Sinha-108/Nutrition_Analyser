import { NutrientKey, NutritionTotals } from '../types/nutrition';

export function aggregateFoods(foods: any[] = []): NutritionTotals {
  const totals: NutritionTotals = {};
  foods.forEach(f => {
    const n = f.nutrition ?? {};
    (Object.keys(n) as NutrientKey[]).forEach((k) => {
      totals[k] = (totals[k] ?? 0) + Number(n[k] ?? 0);
    });
  });
  return totals;
}

export function mergeTotals(a: NutritionTotals = {}, b: NutritionTotals = {}) {
  const out: NutritionTotals = { ...a };
  (Object.keys(b) as NutrientKey[]).forEach((k) => {
    out[k] = (out[k] ?? 0) + (b as any)[k];
  });
  return out;
}
