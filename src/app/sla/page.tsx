"use client";

import React from "react";
import FinanceSummary from "@/src/components/sla/FinanceSummary";
import SLACountdown from "@/src/components/sla/SLACountdown";
import GuaranteeFundStatus from "@/src/components/sla/GuaranteeFundStatus";

export default function SLAPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Theo dõi SLA & Dòng tiền Trả góp
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Đối soát tự động giữa tiền tiết kiệm điện, thời gian sửa chữa sự cố và Quỹ Bảo lãnh
        </p>
      </div>

      {/* 1. Finance Cards */}
      <FinanceSummary />

      {/* 2. SLA 48h Countdown */}
      <SLACountdown />

      {/* 3. Guarantee Fund Status & Scenarios */}
      <GuaranteeFundStatus />
    </div>
  );
}