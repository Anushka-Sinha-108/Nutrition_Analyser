import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import FoodMotionBackground from './FoodMotionBackground';

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  children,
}: AuthShellProps) {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-orange-50 lg:grid-cols-[1fr_0.92fr]">
      <FoodMotionBackground />

      <section className="relative z-10 hidden flex-col justify-between p-12 lg:flex xl:p-16">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4" />
          Smart Nutrition Analyser
        </div>

        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
            Eat well. Feel better.
          </p>

          <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-slate-900">
            Small food choices,{' '}
            <span className="text-emerald-600">smarter days.</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Track your meals, understand your nutrition, and build habits that
            fit student life.
          </p>
        </div>

        <p className="text-sm font-medium text-slate-500">
          Made for better campus meals, one plate at a time.
        </p>
      </section>

      <section className="relative z-10 flex items-center justify-center p-5 sm:p-8 lg:p-12">
        <div className="w-full max-w-md rounded-[2rem] border border-white/80 bg-white/85 p-7 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl sm:p-9">
          <div className="mb-7 lg:hidden">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Smart Nutrition Analyser
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {subtitle}
          </p>

          {children}
        </div>
      </section>
    </main>
  );
}