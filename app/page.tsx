const swatches = [
  { name: "50", className: "bg-brand-50" },
  { name: "100", className: "bg-brand-100" },
  { name: "300", className: "bg-brand-300" },
  { name: "500", className: "bg-brand-500" },
  { name: "600", className: "bg-brand-600" },
  { name: "700", className: "bg-brand-700" },
  { name: "900", className: "bg-brand-900" },
];

export default function Home() {
  return (
    <main className="p-8">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Stride Green" className="h-12 w-12" />
        <h1 className="text-2xl font-bold text-brand-700">Stride Green Demo</h1>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {swatches.map((s) => (
          <div key={s.name} className="text-center text-xs text-slate-600">
            <div className={`h-14 w-14 rounded-lg border border-slate-200 ${s.className}`} />
            brand-{s.name}
          </div>
        ))}
      </div>

      <img src="/esg-stamp.svg" alt="Dấu xác nhận" className="mt-8 h-40 w-40" />
    </main>
  );
}