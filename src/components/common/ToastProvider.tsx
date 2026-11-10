"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";

// ===== Cấu hình (chỉnh tại đây) =====
const TOAST_DURATION_MS = 3500; // thời gian tự ẩn
const MAX_TOASTS = 4; // số toast tối đa hiển thị cùng lúc

export type ToastType = "success" | "info" | "warning" | "error";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Hook để các component khác gọi: const { showToast } = useToast();
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast phải được dùng bên trong <ToastProvider>");
  }
  return ctx;
}

const toastStyles: Record<ToastType, { box: string; icon: React.ReactNode }> = {
  success: {
    box: "border-brand-200 bg-brand-50 text-brand-900",
    icon: <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />,
  },
  info: {
    box: "border-slate-200 bg-white text-slate-800",
    icon: <Info className="h-5 w-5 shrink-0 text-slate-500" />,
  },
  warning: {
    box: "border-amber-200 bg-amber-50 text-amber-900",
    icon: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />,
  },
  error: {
    box: "border-red-200 bg-red-50 text-red-900",
    icon: <XCircle className="h-5 w-5 shrink-0 text-red-600" />,
  },
};

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: (id: number) => void }) {
  // Mỗi toast tự đặt hẹn giờ để ẩn đi
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const style = toastStyles[toast.type];

  return (
    <div
      className={`animate-toast-in pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${style.box}`}
    >
      {style.icon}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Đóng thông báo"
        className="rounded p-0.5 opacity-60 transition hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const closeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, type }].slice(-MAX_TOASTS));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Vùng hiển thị toast: góc trên phải, nằm trên mọi thứ (z-[100]) */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={closeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}