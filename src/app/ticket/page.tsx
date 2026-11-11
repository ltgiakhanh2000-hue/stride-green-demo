"use client";

import React, { useState } from "react";
import TicketTable from "@/src/components/ticket/TicketTable";
import TicketTimeline from "@/src/components/ticket/TicketTimeline";
import CreateTicketModal from "@/src/components/ticket/CreateTicketModal";
import { ticketListData, Ticket } from "@/src/data/mockData";
import { Plus } from "lucide-react";

export default function TicketPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket>(ticketListData[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Ticket & Sự cố 3 bên</h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi, điều phối tiến trình xử lý giữa SME, Stride và EPC
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Báo sự cố mới
        </button>
      </div>

      {/* Main Grid: Table & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TicketTable
            onSelectTicket={(t) => setSelectedTicket(t)}
            selectedTicketId={selectedTicket?.id}
          />
        </div>
        <div className="lg:col-span-1">
          {selectedTicket && <TicketTimeline ticket={selectedTicket} />}
        </div>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}