"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ticket, Wallet } from "lucide-react";

// Danh sách 3 tab. Muốn đổi tên tab hoặc icon thì sửa tại đây.
const navItems = [
  { href: "/", label: "Dashboard ESG", shortLabel: "ESG", icon: LayoutDashboard },
  { href: "/ticket", label: "Quản lý Ticket", shortLabel: "Ticket", icon: Ticket },
  { href: "/sla", label: "Đối soát SLA & Dòng tiền", shortLabel: "SLA", icon: Wallet },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Trang chủ "/" chỉ sáng khi đúng "/", các tab khác sáng cả khi vào trang con
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* ===== Máy tính: thanh bên trái ===== */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col self-start border-r border-slate-200 bg-white p-3 md:flex">
        <nav className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive(href)
                  ? "bg-brand-50 font-semibold text-brand-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-auto px-3 pb-1 text-[11px] leading-snug text-slate-400">
          Bản demo - dữ liệu giả lập
        </p>
      </aside>

      {/* ===== Điện thoại: thanh điều hướng dưới đáy ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white md:hidden">
        {navItems.map(({ href, shortLabel, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition ${
              isActive(href) ? "text-brand-700" : "text-slate-500"
            }`}
          >
            <Icon className="h-5 w-5" />
            {shortLabel}
          </Link>
        ))}
      </nav>
    </>
  );
}