import { Minus, Plus } from 'lucide-react';

type QuantityControlProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export default function QuantityControl({ quantity, onChange }: QuantityControlProps) {
  const changeBy = (amount: number) => onChange(Math.max(0.5, Number((quantity + amount).toFixed(1))));

  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white" aria-label="Serving quantity">
      <button type="button" onClick={() => changeBy(-0.5)} className="rounded-l-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Decrease quantity">
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-12 px-1 text-center text-sm font-semibold text-slate-700">{quantity}×</span>
      <button type="button" onClick={() => changeBy(0.5)} className="rounded-r-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Increase quantity">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
