import { DailyMealSelections, NutrientKey, NutritionTotals, SelectedFood } from '../types/nutrition';

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

/** Creates a local nutrition preview from the foods selected on the dashboard. */
export function aggregateSelectedFoods(selectedFoods: SelectedFood[] = []): NutritionTotals {
  return selectedFoods.reduce<NutritionTotals>((totals, selected) => {
    const nutrition = selected.food.nutrition ?? {};
    (Object.keys(nutrition) as NutrientKey[]).forEach((key) => {
      totals[key] = (totals[key] ?? 0) + Number(nutrition[key] ?? 0) * selected.quantity;
    });
    return totals;
  }, {});
}

/** Calculates a complete day from local dashboard selections; persistence is added in Phase 4. */
export function aggregateDailySelections(selections: DailyMealSelections): NutritionTotals {
  return Object.values(selections).reduce(
    (totals, meal) => mergeTotals(totals, aggregateSelectedFoods(meal.foods)),
    {} as NutritionTotals,
  );
}
