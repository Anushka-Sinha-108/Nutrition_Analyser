import { CheckCircle2, Circle } from 'lucide-react';
import type { DailyMealSelections, MealType } from '../types/nutrition';

const meals: MealType[] = ['breakfast', 'lunch', 'snacks', 'dinner'];

export default function DailyProgress({
  selections,
}: {
  selections: DailyMealSelections;
}) {
  const completed = meals.filter(
    (meal) =>
      selections[meal].source === 'skipped' ||
      selections[meal].foods.length > 0,
  ).length;

  return (
    <section className="health-card rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-slate-900">Daily progress</p>
          <p className="text-xs text-slate-500">
            {completed} of 4 meals recorded
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
          {completed}/4
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
          style={{ width: `${completed * 25}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {meals.map((meal) => {
          const selection = selections[meal];
          const done =
            selection.source === 'skipped' || selection.foods.length > 0;

          return (
            <div
              key={meal}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium capitalize ${
                done
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-slate-50 text-slate-700'
              }`}
            >
              {done ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <Circle className="h-4 w-4 text-slate-300" />
              )}

              {meal}
            </div>
          );
        })}
      </div>
    </section>
  );
}