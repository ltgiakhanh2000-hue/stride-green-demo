import Image from "next/image";
import Link from "next/link";
import { Bell, Building2 } from "lucide-react";
import { customerInfo, esgStatsData, ticketListData } from "@/src/data/mockData";

export default function Header() {
  // Uptime đạt ngưỡng M3 (98,5%) thì hiển thị xanh, không đạt thì cảnh báo vàng
  const uptimeOk = esgStatsData.uptimeRate >= esgStatsData.uptimeThreshold;
  const uptimeText = esgStatsData.uptimeRate.toFixed(1).replace(".", ",");

  // Số ticket chưa hoàn thành, hiển thị trên chuông thông báo
  const openTickets = ticketListData.filter((t) => t.status !== "Completed").length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
      {/* Logo + tên nền tảng */}
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo.svg" alt="Stride Green" width={36} height={36} priority />
        <div className="leading-tight">
          <p className="text-base font-bold text-brand-700">Stride Green</p>
          <p className="hidden text-[11px] text-slate-500 sm:block">Operation Intelligence Platform</p>
        </div>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Tên doanh nghiệp khách hàng (chỉ hiện trên màn hình lớn) */}
        <div className="hidden items-center gap-2 text-sm text-slate-700 lg:flex">
          <Building2 className="h-4 w-4 text-slate-400" />
          <span className="font-semibold">{customerInfo.name}</span>
          <span className="text-slate-300">-</span>
          <span>{customerInfo.area}</span>
        </div>

        {/* Thẻ trạng thái hệ thống */}
        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
            uptimeOk
              ? "border-brand-200 bg-brand-50 text-brand-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${uptimeOk ? "bg-brand-500" : "bg-amber-500"}`} />
          <span>Uptime {uptimeText}%</span>
          <span className="hidden sm:inline">- {uptimeOk ? "Hoạt động tốt" : "Cần kiểm tra"}</span>
        </div>

        {/* Chuông thông báo: bấm để sang trang Ticket */}
        <Link
          href="/ticket"
          aria-label={`${openTickets} ticket đang mở`}
          className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
          {openTickets > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {openTickets}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}