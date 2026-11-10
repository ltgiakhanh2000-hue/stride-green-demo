import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/src/components/common/ToastProvider";
import Header from "@/src/components/common/Header";
import Sidebar from "@/src/components/common/Sidebar";

// Font Inter có bộ ký tự tiếng Việt
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Stride Green - Operation Intelligence Platform",
  description: "Demo nền tảng báo cáo ESG, quản lý ticket sự cố và đối soát SLA cho điện mặt trời mái nhà.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased`}>
        <ToastProvider>
          <Header />
          <div className="flex">
            <Sidebar />
            {/* pb-24 trên điện thoại chừa chỗ cho thanh điều hướng đáy */}
            <main className="min-w-0 flex-1 p-4 pb-24 md:p-6 md:pb-6">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}