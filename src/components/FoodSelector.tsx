import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FoodItem, SelectedFood } from '../types/nutrition';
import QuantityControl from './QuantityControl';

type FoodSelectorProps = {
  foods: FoodItem[];
  selectedFoods: SelectedFood[];
  onToggle: (food: FoodItem) => void;
  onQuantityChange: (foodId: string, quantity: number) => void;
  searchable?: boolean;
};

export default function FoodSelector({ foods, selectedFoods, onToggle, onQuantityChange, searchable = false }: FoodSelectorProps) {
  const [query, setQuery] = useState('');
  const visibleFoods = useMemo(
    () => foods.filter((food) => food.name.toLowerCase().includes(query.toLowerCase())),
    [foods, query],
  );

  return (
    <div className="space-y-3">
      {searchable && (
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full outline-none" placeholder="Search the sample food catalogue" />
        </label>
      )}
      <div className="space-y-2">
        {visibleFoods.map((food) => {
          const selected = selectedFoods.find((item) => item.food.id === food.id);
          return (
            <div key={food.id} className={`flex items-center gap-3 rounded-xl border p-3 transition ${selected ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              <button type="button" onClick={() => onToggle(food)} className="min-w-0 flex-1 text-left">
                <div className="flex items-center justify-between gap-3"><span className="font-semibold text-slate-800">{food.name}</span>{selected && <span className="text-emerald-700">Selected</span>}</div>
                <p className="mt-0.5 text-xs text-slate-500">{food.servingLabel ?? '1 serving'} · {food.nutrition?.calories ?? 0} kcal</p>
              </button>
              {selected && <QuantityControl quantity={selected.quantity} onChange={(quantity) => onQuantityChange(food.id!, quantity)} />}
            </div>
          );
        })}
      </div>
      {visibleFoods.length === 0 && <p className="py-4 text-center text-sm text-slate-500">No food matches “{query}”.</p>}
      {selectedFoods.length > 0 && <p className="flex items-center gap-1 text-xs text-slate-500"><X className="h-3.5 w-3.5" /> Tap a selected food again to remove it.</p>}
    </div>
  );
}
