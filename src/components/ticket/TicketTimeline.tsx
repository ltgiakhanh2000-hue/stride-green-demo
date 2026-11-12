"use client";

import React from "react";
import { Ticket } from "@/src/data/mockData";
import { useToast } from "@/src/components/common/ToastProvider";
import { Check, Clock, Circle, CheckCircle } from "lucide-react";

interface TicketTimelineProps {
  ticket: Ticket;
}

export default function TicketTimeline({ ticket }: TicketTimelineProps) {
  const { showToast } = useToast();

  const handleAcceptance = () => {
    showToast(`Đã nghiệm thu sự cố thành công cho ticket ${ticket.id}!`, "success");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-2">
        <div>
          <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            {ticket.id}
          </span>
          <h3 className="text-base font-bold text-slate-800 mt-1">{ticket.title}</h3>
        </div>
        
        {ticket.status === "InProgress" && (
          <button
            onClick={handleAcceptance}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Xác nhận Nghiệm thu
          </button>
        )}
      </div>

      {/* 4-Step Timeline */}
      <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 my-2">
        {ticket.timeline.map((step, idx) => {
          const isDone = step.state === "done";
          const isCurrent = step.state === "current";

          return (
            <div key={idx} className="relative pl-6">
              {/* Dot Icon */}
              <div
                className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 ${
                  isDone
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : isCurrent
                    ? "bg-amber-500 border-amber-500 text-white animate-pulse"
                    : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
              </div>

              {/* Step Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-semibold ${isCurrent ? "text-amber-600" : isDone ? "text-slate-800" : "text-slate-400"}`}>
                    Bước {idx + 1}: {step.title}
                  </h4>
                  {step.time && (
                    <span className="text-xs text-slate-400 font-mono">({step.time})</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{step.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}