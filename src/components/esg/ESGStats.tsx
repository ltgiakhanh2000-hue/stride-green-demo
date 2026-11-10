import { Cloud, Leaf, Plug, Sun, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { esgStatsData } from "@/src/data/mockData";

// Định dạng số kiểu Việt Nam: 14.5 -> "14,50"
const fmt = (n: number, digits = 2) => n.toFixed(digits).replace(".", ",");

// Bảng màu từng thẻ. Viết đầy đủ tên class để Tailwind nhận diện được.
const tones = {
  amber: { icon: "bg-amber-100 text-amber-600", bar: "bg-amber-400" },
  brand: { icon: "bg-brand-100 text-brand-700", bar: "bg-brand-500" },
  slate: { icon: "bg-slate-200 text-slate-700", bar: "bg-slate-400" },
  teal: { icon: "bg-teal-100 text-teal-700", bar: "bg-teal-500" },
  red: { icon: "bg-red-100 text-red-600", bar: "bg-red-400" },
};

interface KpiCard {
  label: string;
  value: string;
  unit: string;
  note: string;
  icon: LucideIcon;
  tone: keyof typeof tones;
  badge?: { text: string; ok: boolean };
}

export default function ESGStats() {
  const d = esgStatsData;
  const selfRatio = (d.selfConsumed / d.totalGeneration) * 100;
  const uptimeOk = d.uptimeRate >= d.uptimeThreshold;

  const cards: KpiCard[] = [
    {
      label: "Sản lượng điện mặt trời",
      value: fmt(d.totalGeneration),
      unit: "MWh",
      note: `Tổng phát tháng ${d.monthYear}`,
      icon: Sun,
      tone: "amber",
    },
    {
      label: "Điện tự dùng",
      value: fmt(d.selfConsumed),
      unit: "MWh",
      note: `${fmt(selfRatio, 1)}% sản lượng phát`,
      icon: Plug,
      tone: "brand",
    },
    {
      label: "Phát thải Scope 2",
      value: fmt(d.scope2Emissions),
      unit: "tCO₂e",
      note: `${fmt(d.gridPurchased)} MWh điện lưới × ${fmt(d.emissionFactor, 4)}`,
      icon: Cloud,
      tone: "slate",
    },
    {
      label: "Phát thải tránh được",
      value: fmt(d.avoidedEmissions),
      unit: "tCO₂e",
      note: `${fmt(d.selfConsumed)} MWh tự dùng × ${fmt(d.emissionFactor, 4)} (chỉ số đối chiếu)`,
      icon: Leaf,
      tone: "teal",
    },
    {
      label: "Uptime dữ liệu",
      value: fmt(d.uptimeRate, 1),
      unit: "%",
      note: `Ngưỡng ≥ ${fmt(d.uptimeThreshold, 1)}% (M3)`,
      icon: Activity,
      tone: uptimeOk ? "brand" : "red",
      badge: { text: uptimeOk ? "Đạt" : "Không đạt", ok: uptimeOk },
    },
  ];

  return (
    <section aria-label="Chỉ số ESG tháng" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map(({ label, value, unit, note, icon: Icon, tone, badge }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          {/* Vạch màu mảnh phía trên mỗi thẻ */}
          <span className={`absolute inset-x-0 top-0 h-1 ${tones[tone].bar}`} />

          <div className="flex items-start justify-between gap-2">
            <div className={`rounded-xl p-2.5 ${tones[tone].icon}`}>
              <Icon className="h-5 w-5" />
            </div>
            {badge && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  badge.ok ? "bg-brand-100 text-brand-700" : "bg-red-100 text-red-700"
                }`}
              >
                {badge.text}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">{value}</span>
            <span className="text-sm font-semibold text-slate-500">{unit}</span>
          </p>
          <p className="mt-2 text-xs leading-snug text-slate-400">{note}</p>
        </div>
      ))}
    </section>
  );
}