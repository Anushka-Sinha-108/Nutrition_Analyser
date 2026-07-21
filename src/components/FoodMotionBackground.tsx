const foods = [
  {
    icon: '🥑',
    className: 'left-[7%] top-[12%] text-5xl [animation-delay:-2s]',
  },
  {
    icon: '🥕',
    className: 'right-[9%] top-[12%] text-5xl [animation-delay:-5s]',
  },
  {
    icon: '🍓',
    className: 'left-[13%] bottom-[14%] text-4xl [animation-delay:-8s]',
  },
  {
    icon: '🥗',
    className: 'right-[12%] bottom-[13%] text-5xl [animation-delay:-3s]',
  },
  {
    icon: '🍋',
    className: 'left-[38%] top-[7%] text-3xl [animation-delay:-6s]',
  },
  {
    icon: '🥜',
    className: 'right-[35%] bottom-[7%] text-3xl [animation-delay:-1s]',
  },
];

export default function FoodMotionBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/35 blur-3xl" />

      <div className="absolute -bottom-36 -right-24 h-[30rem] w-[30rem] rounded-full bg-orange-200/45 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-[28px] border-white/30" />

      {foods.map((food) => (
        <span
          key={food.icon}
          className={`food-float absolute select-none drop-shadow-lg ${food.className}`}
        >
          {food.icon}
        </span>
      ))}
    </div>
  );
}