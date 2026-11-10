import ESGStats from "@/src/components/esg/ESGStats";
import { esgStatsData } from "@/src/data/mockData";
import ChartSection from "@/src/components/esg/ChartSection";

export default function DashboardPage() {
  const d = esgStatsData;

  return (
    <div className="space-y-6">
      {/* ===== Tiêu đề trang ===== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
            Dashboard ESG &amp; Báo cáo Phát thải
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kỳ báo cáo: Tháng {d.monthYear} · Dữ liệu chốt lúc 23:59 ngày 31/10/2026
          </p>
        </div>

        {/* >>> BƯỚC 8: chèn nút "Xem & Xuất Báo cáo ESG" vào ngay dưới dòng này <<< */}
      </div>

      {/* ===== 5 thẻ KPI ===== */}
      <ESGStats />

      <ChartSection /> 

      {/* ===== Chú thích hệ số phát thải ===== */}
      <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs leading-relaxed text-slate-500">
        Hệ số phát thải lưới điện năm {d.emissionFactorYear}:{" "}
        <span className="font-semibold text-slate-700">
          {d.emissionFactor.toString().replace(".", ",")} tCO₂/MWh
        </span>{" "}
        (Công văn số 11232/BNNMT-BĐKH). Phát thải Scope 2 tính theo phương pháp dựa trên vị trí từ điện mua lưới.
        Phát thải tránh được chỉ là chỉ số đối chiếu, không thuộc kiểm kê Scope 2.
      </p>
    </div>
  );
}