"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "@/src/data/mockData";
import type { ChartPoint } from "@/src/data/mockData";

// ===== Cấu hình (chỉnh tại đây) =====
const COLOR_ACTUAL = "#10b981"; // cột thực tế (brand-500)
const COLOR_INCIDENT = "#ef4444"; // cột ngày sự cố
const COLOR_COMMIT = "#334155"; // đường cam kết (slate-700)
const INCIDENT_RATIO = 0.85; // thực tế < 85% cam kết (sụt hơn 15%) thì coi là ngày sự cố

// Định dạng số kiểu Việt Nam: 0.5 -> "0,50"
const fmt = (n: number, digits = 2) => n.toFixed(digits).replace(".", ",");
const isIncident = (p: ChartPoint) => p.thucTe < p.camKet * INCIDENT_RATIO;

// ----- Khung tooltip khi rê chuột vào từng ngày -----
interface TipProps {
  active?: boolean;
  payload?: { payload: ChartPoint }[];
}

function ChartTooltip({ active, payload }: TipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload;
  const pct = (p.thucTe / p.camKet) * 100;
  const incident = isIncident(p);

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-slate-800">Ngày {p.day}</p>
      <p className="text-slate-600">
        Thực tế: <span className="font-semibold text-slate-900">{fmt(p.thucTe)} MWh</span>
      </p>
      <p className="text-slate-600">
        Cam kết: <span className="font-semibold text-slate-900">{fmt(p.camKet)} MWh</span>
      </p>
      <p className={`mt-1 font-semibold ${incident ? "text-red-600" : "text-brand-700"}`}>
        {fmt(pct, 1)}% so với cam kết
      </p>
      {incident && <p className="mt-0.5 text-red-600">Sự cố: lỏng cáp RS485</p>}
    </div>
  );
}

export default function ChartSection() {
  // Số liệu tóm tắt tính từ dữ liệu
  const totalActual = chartData.reduce((sum, p) => sum + p.thucTe, 0);
  const totalCommit = chartData.reduce((sum, p) => sum + p.camKet, 0);
  const achievement = (totalActual / totalCommit) * 100;
  const incidentDays = chartData.filter(isIncident);

  const summary = [
    { label: "Tổng thực tế", value: `${fmt(totalActual)} MWh`, tone: "text-slate-900" },
    { label: "Tổng cam kết", value: `${fmt(totalCommit)} MWh`, tone: "text-slate-900" },
    { label: "Đạt so với cam kết", value: `${fmt(achievement, 1)}%`, tone: "text-brand-700" },
    {
      label: "Ngày sụt > 15%",
      value: `${incidentDays.length} ngày`,
      tone: incidentDays.length > 0 ? "text-red-600" : "text-slate-900",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div>
        <h2 className="text-base font-bold text-slate-900">Sản lượng cam kết và thực tế theo ngày</h2>
        <p className="mt-0.5 text-xs text-slate-500">Tháng 10/2026 · Đơn vị: MWh/ngày</p>
      </div>

      {/* Dải số liệu tóm tắt */}
      <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="rounded-xl bg-slate-50 px-3 py-2">
            <dt className="text-[11px] font-medium text-slate-500">{s.label}</dt>
            <dd className={`mt-0.5 text-base font-bold ${s.tone}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* Biểu đồ */}
      <div className="mt-4 h-72 w-full md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              interval="preserveStartEnd"
              minTickGap={14}
            />
            <YAxis
              domain={[0, 0.6]}
              tickCount={7}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => fmt(v, 1)}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f1f5f9" }} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="plainline"
              wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
            />

            <Bar dataKey="thucTe" name="Thực tế" fill={COLOR_ACTUAL} radius={[3, 3, 0, 0]} maxBarSize={18}>
              {chartData.map((p) => (
                <Cell key={p.day} fill={isIncident(p) ? COLOR_INCIDENT : COLOR_ACTUAL} />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="camKet"
              name="Cam kết"
              stroke={COLOR_COMMIT}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chú thích ngày sự cố (Legend của recharts không hiện được màu cột đỏ) */}
      <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: COLOR_INCIDENT }} />
        Cột đỏ: ngày sản lượng sụt hơn 15% so với cam kết (15/10 · lỏng cáp tín hiệu RS485, đã khắc phục trong 6 giờ 15 phút).
      </p>
    </section>
  );
}