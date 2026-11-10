"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Download, QrCode, X } from "lucide-react";
import { esgReportData } from "@/src/data/mockData";
import type { ReportRow } from "@/src/data/mockData";
import { useToast } from "@/src/components/common/ToastProvider";

// ===== Cấu hình (chỉnh tại đây) =====
const CLOSE_ANIM_MS = 180; // phải khớp thời gian animation "out" trong globals.css
const PDF_DELAY_MS = 1200; // thời gian giả lập "đang tạo PDF"

interface Props {
  open: boolean;
  onClose: () => void;
}

// Bảng số liệu dùng chung cho Phần A và Phần B
function ReportTable({ rows }: { rows: ReportRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
            <th className="w-10 border border-slate-300 px-2 py-2 text-center">STT</th>
            <th className="border border-slate-300 px-3 py-2">Chỉ tiêu</th>
            <th className="border border-slate-300 px-3 py-2 text-right">Giá trị</th>
            <th className="border border-slate-300 px-3 py-2">Đơn vị</th>
            <th className="border border-slate-300 px-3 py-2">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 1 ? "bg-slate-50" : ""}>
              <td className="border border-slate-300 px-2 py-2 text-center text-slate-500">{i + 1}</td>
              <td className="border border-slate-300 px-3 py-2">{row.label}</td>
              <td className="border border-slate-300 px-3 py-2 text-right font-semibold">{row.value}</td>
              <td className="border border-slate-300 px-3 py-2 text-slate-600">{row.unit}</td>
              <td className="border border-slate-300 px-3 py-2 text-xs text-slate-500">{row.note ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide text-slate-800">{children}</h3>;
}

export default function ESGReportModal({ open, onClose }: Props) {
  const r = esgReportData;
  const { showToast } = useToast();
  const [closing, setClosing] = useState(false);

  // Đóng có hiệu ứng: chạy animation "out" rồi mới báo cho component cha ẩn modal
  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, CLOSE_ANIM_MS);
  }, [closing, onClose]);

  // Khi modal mở: bấm Esc để đóng, và khóa cuộn trang phía sau
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleClose]);

  // Nút tải PDF: chỉ giả lập bằng hai Toast liên tiếp, không tạo file thật
  const handleDownload = () => {
    showToast("Đang tạo Báo cáo PDF...", "info");
    setTimeout(() => {
      showToast("Đã tải Báo cáo ESG tháng 10/2026 (PDF)", "success");
    }, PDF_DELAY_MS);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem trước báo cáo ESG tháng 10/2026"
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-sm sm:p-6 ${
        closing ? "animate-overlay-out" : "animate-overlay-in"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${
          closing ? "animate-modal-out" : "animate-modal-in"
        }`}
      >
        {/* ===== Thanh tiêu đề modal ===== */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Xem trước báo cáo</p>
            <p className="text-sm text-slate-500">Phụ lục B · Tháng 10/2026</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Đóng"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===== Nội dung báo cáo (cuộn được) ===== */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-3 sm:p-6">
          <article className="mx-auto bg-white px-4 py-6 font-serif text-slate-800 shadow sm:px-8">
            {/* Tiêu đề văn bản */}
            <header className="border-b-2 border-slate-800 pb-4 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Image src="/logo.svg" alt="Stride Green" width={28} height={28} />
                <span className="font-sans text-sm font-bold text-brand-700">Stride Green</span>
              </div>
              <h2 className="text-base font-bold uppercase leading-snug sm:text-lg">{r.title}</h2>
              <p className="mt-2 font-sans text-xs text-slate-500">
                Mã báo cáo: {r.reportCode} · Ngày phát hành: {r.issuedDate} · Dữ liệu chốt lúc {r.dataLockTime}
              </p>
            </header>

            {/* I. Thông tin dự án */}
            <SectionTitle>I. Thông tin dự án</SectionTitle>
            <dl className="grid border-l border-t border-slate-300 text-sm sm:grid-cols-2">
              {r.project.map((item) => (
                <div key={item.label} className="flex border-b border-r border-slate-300">
                  <dt className="w-2/5 shrink-0 bg-slate-50 px-3 py-2 text-slate-600">{item.label}</dt>
                  <dd className="flex-1 px-3 py-2 font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>

            {/* II. Phần A */}
            <SectionTitle>II. Phần A: Điện năng và phát thải Scope 2</SectionTitle>
            <ReportTable rows={r.partA} />

            {/* III. Phần B (tóm tắt) */}
            <SectionTitle>III. Phần B: Đối soát vận hành (tóm tắt)</SectionTitle>
            <ReportTable rows={r.partBSummary} />

            {/* IV. Căn cứ pháp lý */}
            <SectionTitle>IV. Căn cứ pháp lý và lưu ý</SectionTitle>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex-1 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold">Căn cứ: </span>
                  {r.legalBasis}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-600">
                  {r.disclaimers.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-1 self-center sm:self-start">
                <div className="rounded-lg border border-slate-300 p-2">
                  <QrCode className="h-16 w-16 text-slate-800" strokeWidth={1.5} />
                </div>
                <p className="max-w-[120px] text-center font-sans text-[10px] leading-tight text-slate-500">
                  {r.qrNote}
                </p>
              </div>
            </div>

            {/* V. Xác nhận điện tử */}
            <SectionTitle>V. Xác nhận điện tử của các bên</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-3">
              {r.signatories.map((s, i) => (
                <div key={s.party} className="relative rounded-lg border border-slate-300 p-3 text-center text-sm">
                  <p className="text-xs font-bold uppercase text-slate-500">{s.party}</p>
                  <p className="mt-1 flex items-center justify-center gap-1 font-sans text-xs font-semibold text-brand-700">
                    <CheckCircle2 className="h-4 w-4" /> Đã xác nhận điện tử
                  </p>
                  {/* Dấu của Stride đặt ở cột đầu tiên */}
                  <div className="my-2 flex h-24 items-center justify-center">
                    {i === 0 ? (
                      <Image src="/esg-stamp.svg" alt="Dấu xác nhận điện tử Stride" width={96} height={96} />
                    ) : (
                      <span className="font-sans text-xs italic text-slate-400">Chữ ký số</span>
                    )}
                  </div>
                  <p className="font-semibold">{s.representative}</p>
                  <p className="text-xs text-slate-500">{s.position}</p>
                  <p className="mt-1 font-sans text-[11px] text-slate-400">Ngày ký: {s.signedAt}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* ===== Thanh nút dưới cùng ===== */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-white px-4 py-3 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Download className="h-4 w-4" />
            Tải Báo cáo PDF
          </button>
        </div>
      </div>
    </div>
  );
}