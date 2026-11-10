"use client";

import { useToast } from "@/src/components/common/ToastProvider";

export default function Home() {
  const { showToast } = useToast();

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-bold text-brand-700">Thử nghiệm Toast</h1>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => showToast("Đã tải Báo cáo PDF thành công", "success")}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Success
        </button>
        <button
          onClick={() => showToast("Đang chuẩn bị dữ liệu báo cáo...", "info")}
          className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Info
        </button>
        <button
          onClick={() => showToast("Sản lượng thấp hơn mức cam kết", "warning")}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Warning
        </button>
        <button
          onClick={() => showToast("Không thể gửi Ticket, thử lại sau", "error")}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Error
        </button>
      </div>
    </main>
  );
}