"use client";

import React, { useState } from "react";
import {
  financeData,
  guaranteeFundInfo,
  guaranteeScenarios,
} from "@/src/data/mockData";
import {
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  Info,
  XCircle,
} from "lucide-react";

export default function GuaranteeFundStatus() {
  const [activeScenario, setActiveScenario] = useState<"pass" | "fail">(
    financeData.defaultScenario
  );

  const scenario =
    guaranteeScenarios.find((s) => s.id === activeScenario) ??
    guaranteeScenarios[0];

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const isPass = activeScenario === "pass";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              Trạng thái Quỹ Bảo lãnh Bảo hành (SLA Guarantee Fund)
            </h3>
            <p className="text-xs text-slate-500">
              Cơ chế bảo vệ dòng tiền trả góp của SME khi xảy ra sự cố kỹ thuật
            </p>
          </div>
        </div>

        {/* Tab switch demo scenario */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveScenario("pass")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              isPass
                ? "bg-white text-emerald-700 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Kịch bản Đạt SLA
          </button>
          <button
            type="button"
            onClick={() => setActiveScenario("fail")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              !isPass
                ? "bg-white text-red-700 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Kịch bản Vi phạm SLA
          </button>
        </div>
      </div>

      {/* Scenario Alert Box */}
      <div
        className={`p-4 rounded-xl border ${
          isPass
            ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
            : "bg-red-50/60 border-red-200 text-red-900"
        }`}
      >
        <div className="flex items-start gap-3">
          {isPass ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm">{scenario.title}</span>
              <span className="font-mono text-xs opacity-75">
                ({scenario.relatedTicketId})
              </span>
              <span
                className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded font-bold ${
                  isPass
                    ? "bg-emerald-200/70 text-emerald-800"
                    : "bg-red-200/70 text-red-800"
                }`}
              >
                {scenario.status}
              </span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              {scenario.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <div>
                EPC:{" "}
                <span className="font-bold">{scenario.epcName}</span>
              </div>
              <div>
                Trích quỹ đền bù:{" "}
                <span className={!isPass ? "text-red-600 font-bold" : "font-bold"}>
                  {formatVND(scenario.compensation)}
                </span>
              </div>
              <div>
                Kỳ trả góp sau điều chỉnh:{" "}
                <span className="font-bold">
                  {formatVND(scenario.installmentAfter)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditions checklist */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Điều kiện kích hoạt quỹ
        </p>
        <ul className="space-y-2">
          {scenario.conditions.map((condition) => (
            <li
              key={condition.text}
              className="flex items-start gap-2 text-sm text-slate-700"
            >
              {condition.met ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
              )}
              <span className={condition.met ? "font-medium" : "text-slate-500"}>
                {condition.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fund Info Banner */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Quỹ bảo lãnh được Stride giữ lại{" "}
            <strong>{guaranteeFundInfo.retentionRate}%</strong> trong{" "}
            <strong>{guaranteeFundInfo.retentionMonths} tháng</strong> từ giá trị
            hợp đồng EPC để đảm bảo cam kết vận hành.
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0 font-medium">
          <div>
            Số dư quỹ hiện tại:{" "}
            <strong className="text-slate-800">
              {formatVND(guaranteeFundInfo.balance)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
