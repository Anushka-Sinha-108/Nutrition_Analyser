import { Flame, Wheat, Drumstick, Droplets } from 'lucide-react';
import type { NutritionTotals } from '../types/nutrition';
import { getScoreMessage } from '../utils/score';

export default function NutritionSummary({ totals, score }: { totals: NutritionTotals; score: number }) {
  const scoreMessage = getScoreMessage(score);
  const items = [
    { label: 'Calories', value: Math.round(totals.calories ?? 0), unit: 'kcal', icon: Flame, color: 'text-orange-600 bg-orange-50' },
    { label: 'Protein', value: Number((totals.protein ?? 0).toFixed(1)), unit: 'g', icon: Drumstick, color: 'text-rose-600 bg-rose-50' },
    { label: 'Carbs', value: Number((totals.carbs ?? 0).toFixed(1)), unit: 'g', icon: Wheat, color: 'text-amber-700 bg-amber-50' },
    { label: 'Fat', value: Number((totals.fat ?? 0).toFixed(1)), unit: 'g', icon: Droplets, color: 'text-sky-700 bg-sky-50' },
  ];
  return <section className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm"><div className="flex items-baseline justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">Today’s local preview</p><h2 className="mt-1 text-xl font-bold">Nutrition summary</h2></div><span className="text-sm text-slate-300">Not saved yet</span></div><div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-500/15 p-3"><span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-400 text-lg font-bold text-slate-950">{score}</span><div><p className="font-bold text-emerald-200">{scoreMessage.label} nutrition score</p><p className="text-sm text-emerald-50">{scoreMessage.message}</p></div></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{items.map(({ label, value, unit, icon: Icon, color }) => <div key={label} className="rounded-xl bg-white p-3 text-slate-900"><div className={`inline-flex rounded-lg p-1.5 ${color}`}><Icon className="h-4 w-4" /></div><p className="mt-2 text-xl font-bold">{value}<span className="ml-1 text-xs font-medium text-slate-500">{unit}</span></p><p className="text-xs text-slate-500">{label}</p></div>)}</div></section>;
}
