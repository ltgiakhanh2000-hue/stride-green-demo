"use client";

import React, { useState, useEffect } from "react";
import { slaCountdownData } from "@/src/data/mockData";
import { Clock, Wrench } from "lucide-react";

export default function SLACountdown() {
  const [secondsLeft, setSecondsLeft] = useState<number>(
    slaCountdownData.remainingSeconds
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const formatDigits = (num: number) => String(num).padStart(2, "0");

  const deadline = (() => {
    const [datePart, timePart] = slaCountdownData.openedAt.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [h, m] = timePart.split(":").map(Number);
    const opened = new Date(year, month - 1, day, h, m);
    opened.setHours(opened.getHours() + slaCountdownData.totalHours);
    const dd = String(opened.getDate()).padStart(2, "0");
    const mm = String(opened.getMonth() + 1).padStart(2, "0");
    const yyyy = opened.getFullYear();
    const hh = String(opened.getHours()).padStart(2, "0");
    const min = String(opened.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} - ${hh}:${min}`;
  })();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              Đồng hồ Đếm ngược SLA Khắc phục Sự cố ({slaCountdownData.totalHours} giờ)
            </h3>
            <p className="text-xs text-slate-500">
              Cam kết thời gian sửa chữa tối đa của nhà thầu EPC
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
          <Wrench className="w-3.5 h-3.5" />
          Đang sửa chữa
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Detail ticket being tracked */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Mã Sự cố đang theo dõi:</span>
            <span className="font-mono font-bold text-emerald-700">
              {slaCountdownData.ticketId}
            </span>
          </div>
          <p className="font-bold text-slate-800 text-sm">
            {slaCountdownData.ticketTitle}
          </p>
          <div className="mt-3 space-y-1 text-xs text-slate-600">
            <div className="flex justify-between gap-4">
              <span>Đơn vị EPC phụ trách:</span>
              <span className="font-semibold text-slate-800 text-right">
                {slaCountdownData.epcName}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mở ticket lúc:</span>
              <span className="font-semibold text-slate-800">
                {slaCountdownData.openedAt}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hạn chót SLA ({slaCountdownData.totalHours}h):</span>
              <span className="font-semibold text-slate-800">{deadline}</span>
            </div>
            <div className="flex justify-between">
              <span>Phản hồi thực tế:</span>
              <span className="font-semibold text-slate-800">
                {slaCountdownData.responseActualMinutes} phút /{" "}
                {slaCountdownData.responseSlaHours}h SLA
              </span>
            </div>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl text-white">
          <span className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">
            Thời gian còn lại của EPC
          </span>
          <div className="flex items-center gap-3 font-mono text-3xl font-bold">
            <div className="flex flex-col items-center">
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                {formatDigits(hours)}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 font-sans">Giờ</span>
            </div>
            <span className="text-amber-500 pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                {formatDigits(minutes)}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 font-sans">Phút</span>
            </div>
            <span className="text-amber-500 pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                {formatDigits(seconds)}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 font-sans">Giây</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
