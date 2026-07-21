import type { ReactNode } from 'react';
import { Coffee, MoonStar, Sandwich, Sun } from 'lucide-react';
import type { MealSource, MealType } from '../types/nutrition';

const mealMeta: Record<
  MealType,
  { label: string; hint: string; icon: typeof Coffee }
> = {
  breakfast: {
    label: 'Breakfast',
    hint: 'Start your day well',
    icon: Coffee,
  },
  lunch: {
    label: 'Lunch',
    hint: 'Your midday meal',
    icon: Sun,
  },
  snacks: {
    label: 'Snacks',
    hint: 'A quick energy top-up',
    icon: Sandwich,
  },
  dinner: {
    label: 'Dinner',
    hint: 'Close the day balanced',
    icon: MoonStar,
  },
};

type MealCardProps = {
  meal: MealType;
  source: MealSource;
  score: number;
  onSourceChange: (source: MealSource) => void;
  children: ReactNode;
};

export default function MealCard({
  meal,
  source,
  score,
  onSourceChange,
  children,
}: MealCardProps) {
  const { label, hint, icon: Icon } = mealMeta[meal];

  return (
    <section className="health-card rounded-3xl p-5 transition duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">{label}</h2>
            <p className="text-xs text-slate-500">{hint}</p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 px-2.5 py-1 text-right">
          <p className="text-xs text-slate-500">Meal score</p>
          <p className="text-sm font-bold text-slate-800">{score}/100</p>
        </div>
      </div>

      <div
        className="mt-4 grid grid-cols-3 gap-2"
        role="group"
        aria-label={`${label} source`}
      >
        {(['mess', 'outside', 'skipped'] as MealSource[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSourceChange(option)}
            className={`rounded-xl px-2 py-2 text-sm font-bold capitalize transition ${
              source === option
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}