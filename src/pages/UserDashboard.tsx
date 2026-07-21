import { useMemo, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import DailyProgress from '../components/DailyProgress';
import FoodSelector from '../components/FoodSelector';
import MealCard from '../components/MealCard';
import NutritionSummary from '../components/NutritionSummary';
import { sampleFoods, sampleMessMenu } from '../data/sampleFoods';
import type {
  DailyMealSelections,
  MealSource,
  MealType,
} from '../types/nutrition';
import {
  aggregateDailySelections,
  aggregateSelectedFoods,
} from '../utils/nutrition-helpers';
import {
  calculateMealScore,
  calculateNutritionScore,
} from '../utils/score';
import { useAuth } from '../context/AuthContext';

const meals: MealType[] = ['breakfast', 'lunch', 'snacks', 'dinner'];

const initialSelections: DailyMealSelections = {
  breakfast: { source: 'mess', foods: [] },
  lunch: { source: 'mess', foods: [] },
  snacks: { source: 'mess', foods: [] },
  dinner: { source: 'mess', foods: [] },
};

export default function UserDashboard() {
  const { user } = useAuth();

  const [selections, setSelections] =
    useState<DailyMealSelections>(initialSelections);

  const updateSource = (meal: MealType, source: MealSource) => {
    setSelections((current) => ({
      ...current,
      [meal]: {
        source,
        foods: [],
      },
    }));
  };

  const toggleFood = (meal: MealType, foodId?: string) => {
    setSelections((current) => {
      const currentMeal = current[meal];

      const alreadySelected = currentMeal.foods.some(
        (selected) => selected.food.id === foodId,
      );

      const food = [...sampleMessMenu[meal], ...sampleFoods].find(
        (item) => item.id === foodId,
      );

      if (!food) return current;

      return {
        ...current,
        [meal]: {
          ...currentMeal,
          foods: alreadySelected
            ? currentMeal.foods.filter(
                (selected) => selected.food.id !== foodId,
              )
            : [...currentMeal.foods, { food, quantity: 1 }],
        },
      };
    });
  };

  const updateQuantity = (
    meal: MealType,
    foodId: string,
    quantity: number,
  ) => {
    setSelections((current) => ({
      ...current,
      [meal]: {
        ...current[meal],
        foods: current[meal].foods.map((selected) =>
          selected.food.id === foodId
            ? { ...selected, quantity }
            : selected,
        ),
      },
    }));
  };

  const totals = useMemo(
    () => aggregateDailySelections(selections),
    [selections],
  );

  const dailyScore = useMemo(
    () => calculateNutritionScore(totals),
    [totals],
  );

  const mealScores = useMemo(
    () =>
      meals.reduce(
        (scores, meal) => ({
          ...scores,
          [meal]: calculateMealScore(
            aggregateSelectedFoods(selections[meal].foods),
            meal,
          ),
        }),
        {} as Record<MealType, number>,
      ),
    [selections],
  );

  const date = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
    <div className="space-y-6 py-2">
      <section className="soft-grid relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white shadow-xl shadow-emerald-900/15 sm:p-8">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border-[24px] border-white/10" />

        <div className="relative">
          <p className="text-sm font-bold text-emerald-100">
            SMART NUTRITION ANALYSER
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
            Good to see you, {user?.displayName || 'Student'}.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
            Record only what you ate today. Your selections are private to this
            dashboard and will be connected to your account in Phase 4.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-emerald-50">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/15 px-3 py-1.5 backdrop-blur">
              <CalendarDays className="h-4 w-4" />
              {date}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/15 px-3 py-1.5 backdrop-blur">
              <MapPin className="h-4 w-4" />
              Main Mess · Sample menu
            </span>
          </div>
        </div>
      </section>

      <NutritionSummary totals={totals} score={dailyScore} />

      <DailyProgress selections={selections} />

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            What did you eat?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose Mess, Outside, or Skipped for every meal. Adjust each
            selected serving with the + and − buttons.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {meals.map((meal) => {
            const selection = selections[meal];

            return (
              <MealCard
                key={meal}
                meal={meal}
                source={selection.source}
                score={mealScores[meal]}
                onSourceChange={(source) => updateSource(meal, source)}
              >
                {selection.source === 'skipped' ? (
                  <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                    No food selection is needed for this meal.
                  </div>
                ) : (
                  <>
                    <p className="mb-3 text-sm text-slate-600">
                      {selection.source === 'mess'
                        ? 'Select the items you actually ate from today’s mess menu.'
                        : 'Search and select foods from the temporary local catalogue.'}
                    </p>

                    <FoodSelector
                      foods={
                        selection.source === 'mess'
                          ? sampleMessMenu[meal]
                          : sampleFoods
                      }
                      selectedFoods={selection.foods}
                      onToggle={(food) => toggleFood(meal, food.id)}
                      onQuantityChange={(foodId, quantity) =>
                        updateQuantity(meal, foodId, quantity)
                      }
                      searchable={selection.source === 'outside'}
                    />
                  </>
                )}
              </MealCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}