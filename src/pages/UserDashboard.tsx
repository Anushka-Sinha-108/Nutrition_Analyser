import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface MealSelection {
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
}

export default function UserDashboard() {
  const { user } = useAuth();
  const [selectedMeals, setSelectedMeals] = useState<MealSelection>({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  });

  const sampleMenu = {
    breakfast: ['Aloo Paratha', 'Curd', 'Boiled Eggs', 'Tea/Coffee'],
    lunch: ['Dal Makhani', 'Jeera Rice', 'Roti', 'Mix Veg Salad'],
    snacks: ['Samosa', 'Chai', 'Fruit'],
    dinner: ['Paneer Butter Masala', 'Chapati', 'Rice', 'Kheer'],
  };

  const handleToggle = (mealType: keyof MealSelection, item: string) => {
    setSelectedMeals((prev) => {
      const current = prev[mealType];
      const exists = current.includes(item);
      return {
        ...prev,
        [mealType]: exists ? current.filter((i) => i !== item) : [...current, item],
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold">Welcome back, {user?.displayName || 'Student'}! 👋</h1>
        <p className="text-emerald-100 text-sm mt-1">
          Select what you ate today from the mess menu to track your daily nutrition score.
        </p>
      </div>

      {/* Mess Menu Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(sampleMenu) as (keyof MealSelection)[]).map((meal) => (
          <div key={meal} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="capitalize text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
              {meal}
            </h2>
            <div className="space-y-2">
              {sampleMenu[meal].map((item) => {
                const isSelected = selectedMeals[meal].includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => handleToggle(meal, item)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex justify-between items-center ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-medium'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AI Nutrition Summary Button */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Analyze Daily Intake</h3>
          <p className="text-sm text-gray-500">
            Get personalized Gemini AI feedback based on your selected daily meals.
          </p>
        </div>
        <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 font-medium shadow-sm transition-all">
          Generate Insights ✨
        </button>
      </div>
    </div>
  );
}