import React, { useRef, useState } from 'react';
import { FileUp, Plus, Search, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { sampleFoods } from '../data/sampleFoods';
import type { DietaryPreference, FoodItem } from '../types/nutrition';

const emptyFood = { name: '', category: 'Mess dish', servingLabel: '1 serving', calories: '', protein: '', carbs: '', fat: '', fiber: '', iron: '', costInr: '', dietaryPreference: 'vegetarian' as DietaryPreference };

function numberValue(value: string) { return value.trim() ? Number(value) : undefined; }

export default function AdminDashboard() {
  const [foods, setFoods] = useState<FoodItem[]>(sampleFoods);
  const [draft, setDraft] = useState(emptyFood);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('Demo catalogue loaded. Connect Firebase to publish it for all students.');
  const fileInput = useRef<HTMLInputElement>(null);

  const addFood = (event: React.FormEvent) => {
    event.preventDefault();
    const food: FoodItem = {
      id: crypto.randomUUID(), name: draft.name.trim(), category: draft.category, servingLabel: draft.servingLabel,
      costInr: numberValue(draft.costInr), dietaryPreference: draft.dietaryPreference,
      nutrition: { calories: numberValue(draft.calories), protein: numberValue(draft.protein), carbs: numberValue(draft.carbs), fat: numberValue(draft.fat), fiber: numberValue(draft.fiber), iron: numberValue(draft.iron) },
    };
    setFoods((current) => [food, ...current]);
    setDraft(emptyFood);
    setNotice(`${food.name} added to the local catalogue.`);
  };

  const importCsv = async (file: File) => {
    const text = await file.text();
    const [headerLine, ...rows] = text.trim().split(/\r?\n/);
    const headers = headerLine.split(',').map((header) => header.trim().toLowerCase());
    if (!headers.includes('food_name') || !headers.includes('calories_kcal')) {
      setNotice('CSV needs at least food_name and calories_kcal columns.');
      return;
    }
    const index = (name: string) => headers.indexOf(name);
    const value = (cells: string[], name: string) => cells[index(name)]?.trim();
    const imported = rows.filter(Boolean).map((row): FoodItem => {
      const cells = row.split(',');
      return {
        id: crypto.randomUUID(), name: value(cells, 'food_name') || 'Unnamed food', category: value(cells, 'category') || 'Imported',
        servingLabel: value(cells, 'serving_label') || '1 serving', costInr: numberValue(value(cells, 'cost_inr') || ''),
        dietaryPreference: (value(cells, 'dietary_preference') as DietaryPreference) || 'vegetarian',
        nutrition: { calories: numberValue(value(cells, 'calories_kcal') || ''), protein: numberValue(value(cells, 'protein_g') || ''), carbs: numberValue(value(cells, 'carbs_g') || ''), fat: numberValue(value(cells, 'fat_g') || ''), fiber: numberValue(value(cells, 'fiber_g') || ''), iron: numberValue(value(cells, 'iron_mg') || '') },
      };
    });
    setFoods((current) => [...imported, ...current]);
    setNotice(`${imported.length} food items imported locally. Review them before publishing.`);
  };

  const visibleFoods = foods.filter((food) => food.name.toLowerCase().includes(query.toLowerCase()));

  return <div className="space-y-6">
    <section className="rounded-3xl bg-slate-900 p-7 text-white shadow-sm">
      <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Administrator workspace</p><h1 className="mt-2 text-3xl font-bold">MessMate HQ</h1><p className="mt-2 max-w-2xl text-sm text-slate-300">Control food data, portions and the mess menu from one place.</p></div><ShieldCheck className="h-10 w-10 text-sky-300" /></div>
    </section>

    <div className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-900">{notice}</div>

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2"><Plus className="h-5 w-5 text-emerald-700" /><h2 className="text-xl font-bold text-slate-900">Add food item</h2></div>
        <form onSubmit={addFood} className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Dish name" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} required />
          <Field label="Category" value={draft.category} onChange={(value) => setDraft({ ...draft, category: value })} />
          <Field label="Serving" value={draft.servingLabel} onChange={(value) => setDraft({ ...draft, servingLabel: value })} />
          <Field label="Cost (INR)" type="number" value={draft.costInr} onChange={(value) => setDraft({ ...draft, costInr: value })} />
          <Field label="Calories (kcal)" type="number" value={draft.calories} onChange={(value) => setDraft({ ...draft, calories: value })} required />
          <Field label="Protein (g)" type="number" value={draft.protein} onChange={(value) => setDraft({ ...draft, protein: value })} required />
          <Field label="Carbs (g)" type="number" value={draft.carbs} onChange={(value) => setDraft({ ...draft, carbs: value })} />
          <Field label="Fat (g)" type="number" value={draft.fat} onChange={(value) => setDraft({ ...draft, fat: value })} />
          <Field label="Fibre (g)" type="number" value={draft.fiber} onChange={(value) => setDraft({ ...draft, fiber: value })} />
          <Field label="Iron (mg)" type="number" value={draft.iron} onChange={(value) => setDraft({ ...draft, iron: value })} />
          <label className="text-sm font-medium text-slate-700"><span className="mb-1 block">Diet preference</span><select value={draft.dietaryPreference} onChange={(event) => setDraft({ ...draft, dietaryPreference: event.target.value as DietaryPreference })} className="w-full rounded-lg border border-slate-300 px-3 py-2.5"><option value="vegetarian">Vegetarian</option><option value="eggitarian">Eggitarian</option><option value="non_vegetarian">Non-vegetarian</option></select></label>
          <div className="flex items-end"><button className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white hover:bg-emerald-700">Add to catalogue</button></div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2"><FileUp className="h-5 w-5 text-sky-700" /><h2 className="text-xl font-bold text-slate-900">Bulk CSV import</h2></div>
        <p className="mt-3 text-sm leading-6 text-slate-600">Use a spreadsheet export to add foods quickly. Required columns: <code>food_name</code>, <code>calories_kcal</code>. Optional: protein_g, carbs_g, fat_g, fiber_g, iron_mg, cost_inr, category, serving_label, dietary_preference.</p>
        <input ref={fileInput} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importCsv(file); event.currentTarget.value = ''; }} />
        <button onClick={() => fileInput.current?.click()} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2.5 font-semibold text-white hover:bg-sky-800"><FileUp className="h-4 w-4" />Choose CSV file</button>
        <div className="mt-7 rounded-xl bg-slate-50 p-4 text-sm text-slate-600"><strong className="text-slate-800">Next:</strong> once Firebase is configured, imported items will be saved to Firestore and made available to menu planning.</div>
      </section>
    </div>

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><UtensilsCrossed className="h-5 w-5 text-emerald-700" /><h2 className="text-xl font-bold text-slate-900">Food catalogue</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{foods.length} items</span></div><label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search food" className="outline-none" /></label></div>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><tr><th className="pb-3">Food</th><th className="pb-3">Serving</th><th className="pb-3">Calories</th><th className="pb-3">Protein</th><th className="pb-3">Fibre</th><th className="pb-3">Iron</th><th className="pb-3">Cost</th></tr></thead><tbody>{visibleFoods.map((food) => <tr key={food.id} className="border-b border-slate-100 last:border-0"><td className="py-3 font-semibold text-slate-800"><div>{food.name}</div><div className="text-xs font-normal text-slate-500">{food.category} · {food.dietaryPreference?.replace('_', ' ')}</div></td><td className="py-3 text-slate-600">{food.servingLabel}</td><td className="py-3">{food.nutrition?.calories ?? '—'} kcal</td><td className="py-3">{food.nutrition?.protein ?? '—'} g</td><td className="py-3">{food.nutrition?.fiber ?? '—'} g</td><td className="py-3">{food.nutrition?.iron ?? '—'} mg</td><td className="py-3">{food.costInr ? `₹${food.costInr}` : '—'}</td></tr>)}</tbody></table></div>
    </section>
  </div>;
}

function Field({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="text-sm font-medium text-slate-700"><span className="mb-1 block">{label}</span><input required={required} type={type} min={type === 'number' ? '0' : undefined} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label>;
}
