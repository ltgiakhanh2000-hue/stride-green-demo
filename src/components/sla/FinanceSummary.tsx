"use client";

import React from "react";
import { financeData } from "@/src/data/mockData";
import { Wallet, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";

export default function FinanceSummary() {
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const netBenefit = financeData.savingsAmount - financeData.installmentAmount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Thẻ 1: Tiền tiết kiệm điện */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Tiết kiệm điện {financeData.period}
          </span>
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-slate-800">
            {formatVND(financeData.savingsAmount)}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Đã tối ưu so với điện lưới</span>
          </div>
        </div>
      </div>

      {/* Thẻ 2: Tiền trả góp kỳ tới */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Trả góp kỳ tới ({financeData.nextDueDate})
          </span>
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-slate-800">
            {formatVND(financeData.installmentAmount)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Nghĩa vụ hợp đồng hàng tháng
          </p>
        </div>
      </div>

      {/* Thẻ 3: Thặng dư dòng tiền */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-xl shadow-sm p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">
            Thặng dư dòng tiền ròng
          </span>
          <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-white">
            +{formatVND(netBenefit)}
          </p>
          <p className="text-xs text-emerald-100 mt-1">
            Lợi ích tài chính thực nhận của SME
          </p>
        </div>
      </div>
    </div>
  );
}
