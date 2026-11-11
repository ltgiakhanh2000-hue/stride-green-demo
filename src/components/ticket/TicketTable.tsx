"use client";

import React, { useState } from "react";
import { ticketListData, ticketStatusLabel, Ticket } from "@/src/data/mockData";
import { AlertTriangle, CheckCircle2, Clock, Wrench, Filter, Eye } from "lucide-react";

interface TicketTableProps {
  onSelectTicket: (ticket: Ticket) => void;
  selectedTicketId?: string;
}

export default function TicketTable({ onSelectTicket, selectedTicketId }: TicketTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredTickets = filterStatus === "All"
    ? ticketListData
    : ticketListData.filter((t) => t.status === filterStatus);

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "Alert":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <AlertTriangle className="w-3.5 h-3.5" />
            {ticketStatusLabel[status]}
          </span>
        );
      case "Accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <Clock className="w-3.5 h-3.5" />
            {ticketStatusLabel[status]}
          </span>
        );
      case "InProgress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            <Wrench className="w-3.5 h-3.5" />
            {ticketStatusLabel[status]}
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {ticketStatusLabel[status]}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header & Filter */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-800">Danh sách Sự cố & Ticket</h2>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="Alert">Cảnh báo</option>
            <option value="Accepted">Đã tiếp nhận</option>
            <option value="InProgress">Đang sửa</option>
            <option value="Completed">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
            <tr>
              <th className="px-4 py-3">Mã Ticket</th>
              <th className="px-4 py-3">Nội dung lỗi</th>
              <th className="px-4 py-3">Nguồn</th>
              <th className="px-4 py-3">Thời gian</th>
              <th className="px-4 py-3">EPC Phụ trách</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.map((ticket) => {
              const isSelected = ticket.id === selectedTicketId;
              return (
                <tr
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                    isSelected ? "bg-emerald-50/50" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-mono font-medium text-emerald-700">{ticket.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{ticket.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      ticket.source === "IoT" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-700"
                    }`}>
                      {ticket.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{ticket.detectedAt}</td>
                  <td className="px-4 py-3 text-slate-700">{ticket.epcName}</td>
                  <td className="px-4 py-3">{getStatusBadge(ticket.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTicket(ticket);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-800"
                    >
                      <Eye className="w-3.5 h-3.5" /> Chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}