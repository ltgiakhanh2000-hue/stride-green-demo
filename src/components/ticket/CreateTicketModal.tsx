"use client";

import React, { useState } from "react";
import { ticketIssueTypes } from "@/src/data/mockData";
import { useToast } from "@/src/components/common/ToastProvider";
import { X, Upload, Send } from "lucide-react";

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const { showToast } = useToast();
  const [issueType, setIssueType] = useState(ticketIssueTypes[0]);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Tạo ticket báo sự cố thành công! Stride QA đang xử lý.", "success");
    setDescription("");
    setFileName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg">Báo sự cố tại hiện trường</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Loại sự cố</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ticketIssueTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Mô tả sự cố</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả chi tiết hiện tượng lỗi (ví dụ: Biến tần báo lỗi RS485, đèn đỏ nhấp nháy)..."
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Ảnh hiện trường</label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs text-slate-600 font-medium">
                  {fileName ? fileName : "Bấm để tải ảnh lên"}
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-xs rounded-lg hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Gửi Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}