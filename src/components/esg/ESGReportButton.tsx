"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import ESGReportModal from "@/src/components/esg/ESGReportModal";

export default function ESGReportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:w-auto"
      >
        <FileText className="h-4 w-4" />
        Xem &amp; Xuất Báo cáo ESG Tháng 10/2026
      </button>

      <ESGReportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}