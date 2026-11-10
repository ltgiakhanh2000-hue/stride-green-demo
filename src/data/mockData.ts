// =====================================================================
// MOCK DATA - Stride Green & Operation Intelligence Platform
// Chỉ Dev A được sửa file này. Dev B cần thêm trường thì nhờ Dev A.
// Mọi tên, số liệu là DỮ LIỆU GIẢ LẬP phục vụ demo.
// =====================================================================

// ---------------------------------------------------------------------
// 0. THÔNG TIN KHÁCH HÀNG (dùng cho Header, báo cáo)
// ---------------------------------------------------------------------
export const customerInfo = {
  name: "Công ty Cơ khí A",
  area: "KCN Tân Bình",
  address: "KCN Tân Bình, TP. Hồ Chí Minh",
  systemCapacity: "100 kW AC",
  inverterId: "LN000710",
  epcName: "Công ty Cổ phần Năng Lượng Xanh EPC",
};

// ---------------------------------------------------------------------
// 1. MÔ-ĐUN ESG: CHỈ SỐ KPI THÁNG 10/2026
// ---------------------------------------------------------------------
export interface EsgStats {
  monthYear: string;
  totalGeneration: number; // MWh
  selfConsumed: number; // MWh
  gridPurchased: number; // MWh
  gridExported: number; // MWh
  emissionFactor: number; // tCO2/MWh
  emissionFactorYear: number;
  scope2Emissions: number; // tCO2e
  avoidedEmissions: number; // tCO2e
  uptimeRate: number; // %
  uptimeThreshold: number; // % (M3)
}

export const esgStatsData: EsgStats = {
  monthYear: "10/2026",
  totalGeneration: 14.5,
  selfConsumed: 12.5,
  gridPurchased: 30.0,
  gridExported: 2.0,
  emissionFactor: 0.6187, // CV 11232/BNNMT-BĐKH (hệ số lưới điện năm 2024)
  emissionFactorYear: 2024,
  scope2Emissions: 18.56, // = gridPurchased x emissionFactor
  avoidedEmissions: 7.73, // = selfConsumed x emissionFactor
  uptimeRate: 99.6,
  uptimeThreshold: 98.5,
};

// ---------------------------------------------------------------------
// 2. BIỂU ĐỒ: SẢN LƯỢNG CAM KẾT vs THỰC TẾ THEO NGÀY (MWh/ngày)
//    Tổng thucTe = 14,50 MWh. Ngày 15/10 là ngày sự cố RS485.
// ---------------------------------------------------------------------
export interface ChartPoint {
  day: string;
  camKet: number;
  thucTe: number;
}

export const chartData: ChartPoint[] = [
  { day: "01/10", camKet: 0.48, thucTe: 0.47 },
  { day: "02/10", camKet: 0.48, thucTe: 0.49 },
  { day: "03/10", camKet: 0.48, thucTe: 0.45 },
  { day: "04/10", camKet: 0.48, thucTe: 0.5 },
  { day: "05/10", camKet: 0.48, thucTe: 0.49 },
  { day: "06/10", camKet: 0.48, thucTe: 0.43 },
  { day: "07/10", camKet: 0.48, thucTe: 0.48 },
  { day: "08/10", camKet: 0.48, thucTe: 0.51 },
  { day: "09/10", camKet: 0.48, thucTe: 0.46 },
  { day: "10/10", camKet: 0.48, thucTe: 0.5 },
  { day: "11/10", camKet: 0.48, thucTe: 0.47 },
  { day: "12/10", camKet: 0.48, thucTe: 0.45 },
  { day: "13/10", camKet: 0.48, thucTe: 0.49 },
  { day: "14/10", camKet: 0.48, thucTe: 0.5 },
  { day: "15/10", camKet: 0.48, thucTe: 0.25 }, // Ngày sự cố RS485
  { day: "16/10", camKet: 0.48, thucTe: 0.49 },
  { day: "17/10", camKet: 0.48, thucTe: 0.48 },
  { day: "18/10", camKet: 0.48, thucTe: 0.44 },
  { day: "19/10", camKet: 0.48, thucTe: 0.5 },
  { day: "20/10", camKet: 0.48, thucTe: 0.49 },
  { day: "21/10", camKet: 0.48, thucTe: 0.45 },
  { day: "22/10", camKet: 0.48, thucTe: 0.46 },
  { day: "23/10", camKet: 0.48, thucTe: 0.49 },
  { day: "24/10", camKet: 0.48, thucTe: 0.47 },
  { day: "25/10", camKet: 0.48, thucTe: 0.48 },
  { day: "26/10", camKet: 0.48, thucTe: 0.47 },
  { day: "27/10", camKet: 0.48, thucTe: 0.46 },
  { day: "28/10", camKet: 0.48, thucTe: 0.48 },
  { day: "29/10", camKet: 0.48, thucTe: 0.5 },
  { day: "30/10", camKet: 0.48, thucTe: 0.43 },
  { day: "31/10", camKet: 0.48, thucTe: 0.47 },
];

// ---------------------------------------------------------------------
// 3. NỘI DUNG BÁO CÁO THÁNG (PHỤ LỤC B) - dùng cho ESGReportModal
// ---------------------------------------------------------------------
export interface ReportRow {
  label: string;
  value: string;
  unit: string;
  note?: string;
}

export interface ReportSignatory {
  party: string;
  representative: string;
  position: string;
  signedAt: string;
}

export interface EsgReportData {
  title: string;
  reportCode: string;
  issuedDate: string;
  dataLockTime: string;
  project: { label: string; value: string }[];
  partA: ReportRow[];
  partBSummary: ReportRow[];
  legalBasis: string;
  qrNote: string;
  disclaimers: string[];
  signatories: ReportSignatory[];
}

export const esgReportData: EsgReportData = {
  title: "BÁO CÁO ĐIỆN NĂNG, PHÁT THẢI VÀ ĐỐI SOÁT VẬN HÀNH HẰNG THÁNG",
  reportCode: "RPT-ESG-202610-A001",
  issuedDate: "05/11/2026",
  dataLockTime: "23:59 ngày 31/10/2026",
  project: [
    { label: "Khách hàng", value: "Công ty Cơ khí A" },
    { label: "Địa điểm lắp đặt", value: "KCN Tân Bình, TP. Hồ Chí Minh" },
    { label: "Công suất hệ thống", value: "100 kW AC" },
    { label: "Mã biến tần", value: "LN000710" },
    { label: "Nhà thầu EPC phụ trách", value: "Công ty Cổ phần Năng Lượng Xanh EPC" },
    { label: "Kỳ báo cáo", value: "Tháng 10/2026" },
  ],
  partA: [
    { label: "Sản lượng điện mặt trời phát ra", value: "14,50", unit: "MWh" },
    { label: "Điện mặt trời tự dùng", value: "12,50", unit: "MWh" },
    { label: "Điện dư bán lên lưới", value: "2,00", unit: "MWh", note: "13,8% sản lượng phát (≤ 50%)" },
    { label: "Điện mua từ lưới (theo hóa đơn)", value: "30,00", unit: "MWh" },
    { label: "Hệ số phát thải lưới điện năm 2024", value: "0,6187", unit: "tCO₂/MWh" },
    { label: "Phát thải Scope 2 (dựa trên vị trí)", value: "18,56", unit: "tCO₂e", note: "= 30,00 × 0,6187" },
    { label: "Phát thải tránh được (chỉ số đối chiếu)", value: "7,73", unit: "tCO₂e", note: "= 12,50 × 0,6187" },
    { label: "Uptime dữ liệu biến tần", value: "99,6", unit: "%", note: "Đạt ngưỡng ≥ 98,5% (M3)" },
  ],
  partBSummary: [
    { label: "Số ticket phát sinh trong tháng", value: "1", unit: "ticket" },
    { label: "Số ticket đạt SLA", value: "1", unit: "ticket", note: "Xác nhận 38 phút; khắc phục 6 giờ 15 phút" },
    { label: "Khoản bù từ Quỹ Bảo lãnh", value: "0", unit: "VNĐ" },
  ],
  legalBasis:
    "Công văn số 11232/BNNMT-BĐKH ngày 30/9/2026 của Bộ Nông nghiệp và Môi trường về việc công bố kết quả tính toán hệ số phát thải của lưới điện Việt Nam năm 2024.",
  qrNote: "Mã QR dẫn đến văn bản nguồn của hệ số phát thải",
  disclaimers: [
    "Phát thải tránh được chỉ là chỉ số đối chiếu, không thuộc kiểm kê Scope 2.",
    "Chữ ký của các bên là xác nhận giữa các bên, không phải kiểm chứng độc lập.",
  ],
  signatories: [
    { party: "Stride Vietnam", representative: "Nguyễn Minh Quân", position: "Trưởng nhóm QA/QC", signedAt: "05/11/2026" },
    { party: "Nhà thầu EPC", representative: "Trần Hoàng Long", position: "Giám đốc kỹ thuật", signedAt: "05/11/2026" },
    { party: "Khách hàng SME", representative: "Lê Thị Thu Hà", position: "Giám đốc", signedAt: "05/11/2026" },
  ],
};

// ---------------------------------------------------------------------
// 4. MÔ-ĐUN TICKET (Dev B dùng)
// ---------------------------------------------------------------------
export type TicketStatus = "Alert" | "Accepted" | "InProgress" | "Completed";
export type SlaResult = "Pass" | "Fail" | "Pending";
export type TicketSource = "IoT" | "Manual";
export type StepState = "done" | "current" | "pending";

export const ticketStatusLabel: Record<TicketStatus, string> = {
  Alert: "Cảnh báo",
  Accepted: "Đã tiếp nhận",
  InProgress: "Đang sửa",
  Completed: "Đã hoàn thành",
};

export interface TimelineStep {
  step: 1 | 2 | 3 | 4;
  title: string;
  actor: string;
  time: string | null; // null = chưa diễn ra
  state: StepState;
  note: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  source: TicketSource;
  detectedAt: string;
  status: TicketStatus;
  epcName: string;
  responseTime: string;
  resolveTime: string;
  slaStatus: SlaResult;
  timeline: TimelineStep[];
}

export const ticketListData: Ticket[] = [
  {
    id: "TK-202611-0061",
    title: "Mất tín hiệu biến tần quá 60 phút",
    description: "Máy chủ Stride không nhận dữ liệu biến tần LN000710 trong khung giờ có bức xạ.",
    source: "IoT",
    detectedAt: "10/11/2026 15:05",
    status: "Alert",
    epcName: "Chờ phân công",
    responseTime: "-",
    resolveTime: "-",
    slaStatus: "Pending",
    timeline: [
      { step: 1, title: "IoT phát hiện", actor: "Hệ thống IoT Stride", time: "10/11/2026 15:05", state: "done", note: "Mất tín hiệu quá 60 phút, hệ thống tự khởi tạo ticket." },
      { step: 2, title: "QA Stride duyệt", actor: "Đội QA Stride", time: null, state: "current", note: "Đang chờ QA xác minh (SLA ≤ 15 phút trong giờ trực)." },
      { step: 3, title: "EPC nhận việc", actor: "Nhà thầu EPC", time: null, state: "pending", note: "Chưa phân công EPC." },
      { step: 4, title: "SME nghiệm thu", actor: "Công ty Cơ khí A", time: null, state: "pending", note: "Chờ khắc phục xong." },
    ],
  },
  {
    id: "TK-202611-0059",
    title: "Điện áp DC chuỗi PV số 3 thấp bất thường",
    description: "Cảnh báo điện áp DC của chuỗi PV số 3 thấp hơn các chuỗi còn lại.",
    source: "IoT",
    detectedAt: "10/11/2026 08:20",
    status: "Accepted",
    epcName: "Công ty TNHH Điện Mặt Trời Sài Gòn",
    responseTime: "41 phút (SLA < 2h)",
    resolveTime: "-",
    slaStatus: "Pending",
    timeline: [
      { step: 1, title: "IoT phát hiện", actor: "Hệ thống IoT Stride", time: "10/11/2026 08:20", state: "done", note: "Phát hiện điện áp DC chuỗi 3 lệch quá ngưỡng." },
      { step: 2, title: "QA Stride duyệt", actor: "Đội QA Stride", time: "10/11/2026 08:31", state: "done", note: "Duyệt sau 11 phút, giao EPC phụ trách khu vực." },
      { step: 3, title: "EPC nhận việc", actor: "Nhà thầu EPC", time: "10/11/2026 09:01", state: "current", note: "EPC đã tiếp nhận sau 41 phút, đang lên lịch đến hiện trường." },
      { step: 4, title: "SME nghiệm thu", actor: "Công ty Cơ khí A", time: null, state: "pending", note: "Chờ khắc phục xong." },
    ],
  },
  {
    id: "TK-202611-0057",
    title: "Sản lượng sụt giảm hơn 15% trong 3 ngày liên tiếp",
    description: "Sản lượng thực tế thấp hơn mức kỳ vọng đã hiệu chỉnh bức xạ quá 15% trong 3 ngày liên tiếp.",
    source: "IoT",
    detectedAt: "09/11/2026 09:00",
    status: "InProgress",
    epcName: "Công ty Cổ phần Năng Lượng Xanh EPC",
    responseTime: "52 phút (SLA < 2h)",
    resolveTime: "Đang xử lý (SLA < 48h)",
    slaStatus: "Pending",
    timeline: [
      { step: 1, title: "IoT phát hiện", actor: "Hệ thống IoT Stride", time: "09/11/2026 09:00", state: "done", note: "Sản lượng thấp hơn kỳ vọng quá 15% trong 3 ngày liên tiếp." },
      { step: 2, title: "QA Stride duyệt", actor: "Đội QA Stride", time: "09/11/2026 09:10", state: "done", note: "Duyệt sau 10 phút, giao EPC phụ trách khu vực Tân Bình." },
      { step: 3, title: "EPC nhận việc", actor: "Nhà thầu EPC", time: "09/11/2026 09:52", state: "current", note: "EPC xác nhận sau 52 phút, kỹ thuật viên đang sửa chữa tại hiện trường." },
      { step: 4, title: "SME nghiệm thu", actor: "Công ty Cơ khí A", time: null, state: "pending", note: "Chờ EPC hoàn tất sửa chữa." },
    ],
  },
  {
    id: "TK-202610-0842",
    title: "Lỏng cáp tín hiệu RS485 biến tần LN000710",
    description: "Cáp tín hiệu RS485 bị lỏng làm gián đoạn truyền dữ liệu của biến tần.",
    source: "IoT",
    detectedAt: "15/10/2026 14:00",
    status: "Completed",
    epcName: "Công ty Cổ phần Năng Lượng Xanh EPC",
    responseTime: "38 phút (SLA < 2h)",
    resolveTime: "6 giờ 15 phút (SLA < 48h)",
    slaStatus: "Pass",
    timeline: [
      { step: 1, title: "IoT phát hiện", actor: "Hệ thống IoT Stride", time: "15/10/2026 15:00", state: "done", note: "Mất dữ liệu từ 14:00, quá ngưỡng 60 phút nên hệ thống tự mở ticket." },
      { step: 2, title: "QA Stride duyệt", actor: "Đội QA Stride", time: "15/10/2026 15:12", state: "done", note: "Duyệt sau 12 phút, đẩy thông báo khẩn cho EPC phụ trách khu vực Tân Bình." },
      { step: 3, title: "EPC nhận việc", actor: "Nhà thầu EPC", time: "15/10/2026 15:38", state: "done", note: "Xác nhận sau 38 phút (đạt SLA 2h). Khắc phục xong lúc 21:15, sau 6 giờ 15 phút (đạt SLA 48h)." },
      { step: 4, title: "SME nghiệm thu", actor: "Công ty Cơ khí A", time: "16/10/2026 08:30", state: "done", note: "Khách hàng bấm Nghiệm thu sự cố. QA/QC xác nhận dữ liệu biến tần đã bình thường." },
    ],
  },
  {
    id: "TK-202609-0731",
    title: "Sản lượng giảm 16% do bám bụi tấm pin",
    description: "Sản lượng giảm hơn 15% so với mức kỳ vọng, nguyên nhân do bụi bẩn bám trên bề mặt tấm pin.",
    source: "Manual",
    detectedAt: "22/09/2026 08:10",
    status: "Completed",
    epcName: "Công ty Cổ phần Năng Lượng Xanh EPC",
    responseTime: "45 phút (SLA < 2h)",
    resolveTime: "19 giờ 40 phút (SLA < 48h)",
    slaStatus: "Pass",
    timeline: [
      { step: 1, title: "IoT phát hiện", actor: "Công ty Cơ khí A (tạo thủ công)", time: "22/09/2026 08:10", state: "done", note: "SME báo sự cố kèm ảnh tại hiện trường." },
      { step: 2, title: "QA Stride duyệt", actor: "Đội QA Stride", time: "22/09/2026 08:22", state: "done", note: "Duyệt sau 12 phút." },
      { step: 3, title: "EPC nhận việc", actor: "Nhà thầu EPC", time: "22/09/2026 08:55", state: "done", note: "Xác nhận sau 45 phút. Vệ sinh tấm pin xong sau 19 giờ 40 phút." },
      { step: 4, title: "SME nghiệm thu", actor: "Công ty Cơ khí A", time: "23/09/2026 09:00", state: "done", note: "Nghiệm thu, sản lượng trở lại bình thường." },
    ],
  },
  {
    id: "TK-202608-0415",
    title: "Hỏng cầu dao DC làm dừng hệ thống",
    description: "Cầu dao DC bị hỏng, hệ thống dừng phát điện. EPC khắc phục vượt hạn 48 giờ.",
    source: "IoT",
    detectedAt: "12/08/2026 07:30",
    status: "Completed",
    epcName: "Công ty TNHH Điện Mặt Trời Sài Gòn",
    responseTime: "1 giờ 50 phút (SLA < 2h)",
    resolveTime: "53 giờ 20 phút (SLA < 48h)",
    slaStatus: "Fail",
    timeline: [
      { step: 1, title: "IoT phát hiện", actor: "Hệ thống IoT Stride", time: "12/08/2026 07:30", state: "done", note: "Hệ thống dừng phát điện, tự mở ticket." },
      { step: 2, title: "QA Stride duyệt", actor: "Đội QA Stride", time: "12/08/2026 07:44", state: "done", note: "Duyệt sau 14 phút." },
      { step: 3, title: "EPC nhận việc", actor: "Nhà thầu EPC", time: "12/08/2026 09:20", state: "done", note: "Xác nhận sau 1 giờ 50 phút. Khắc phục xong sau 53 giờ 20 phút (vượt SLA 48h)." },
      { step: 4, title: "SME nghiệm thu", actor: "Công ty Cơ khí A", time: "14/08/2026 14:00", state: "done", note: "Nghiệm thu. Ticket được ghi nhận vi phạm SLA." },
    ],
  },
];

// Danh sách loại sự cố cho form tạo ticket thủ công
export const ticketIssueTypes: string[] = [
  "Mất kết nối / không có dữ liệu",
  "Sản lượng giảm bất thường",
  "Biến tần báo lỗi",
  "Hư hỏng vật lý (tấm pin, cáp, cầu dao)",
  "Khác",
];

// ---------------------------------------------------------------------
// 5. MÔ-ĐUN SLA & DÒNG TIỀN (Dev B dùng)
// ---------------------------------------------------------------------

// Số tiền tính bằng VNĐ. Hiển thị: n.toLocaleString("vi-VN") + " đ"
export const financeData = {
  period: "Tháng 10/2026",
  savingsAmount: 43_500_000,
  installmentAmount: 28_500_000,
  nextDueDate: "10/11/2026",
  defaultScenario: "pass" as "pass" | "fail",
};

// Đồng hồ đếm ngược SLA 48 giờ (đếm từ remainingSeconds, không phụ thuộc giờ máy)
export const slaCountdownData = {
  ticketId: "TK-202611-0057",
  ticketTitle: "Sản lượng sụt giảm hơn 15% trong 3 ngày liên tiếp",
  epcName: "Công ty Cổ phần Năng Lượng Xanh EPC",
  openedAt: "09/11/2026 09:00",
  totalHours: 48,
  remainingSeconds: 17 * 3600 + 42 * 60, // còn 17 giờ 42 phút
  responseSlaHours: 2,
  responseActualMinutes: 52,
};

// Quỹ Bảo lãnh Bảo hành (giả định: giữ lại 5% thanh toán EPC trong 12 tháng)
export interface GuaranteeScenario {
  id: "pass" | "fail";
  status: "Pass" | "Fail";
  title: string;
  description: string;
  relatedTicketId: string;
  epcName: string;
  compensation: number; // VNĐ
  installmentAfter: number; // VNĐ
  conditions: { text: string; met: boolean }[];
}

export const guaranteeFundInfo = {
  retentionRate: 5, // %
  retentionMonths: 12,
  balance: 60_000_000, // VNĐ (số dư quỹ của EPC, giả định)
};

export const guaranteeScenarios: GuaranteeScenario[] = [
  {
    id: "pass",
    status: "Pass",
    title: "Đạt SLA - Không trừ tiền",
    description: "EPC đạt cam kết vận hành, khách hàng thanh toán kỳ trả góp bình thường.",
    relatedTicketId: "TK-202610-0842",
    epcName: "Công ty Cổ phần Năng Lượng Xanh EPC",
    compensation: 0,
    installmentAfter: 28_500_000,
    conditions: [
      { text: "EPC khắc phục trong 48 giờ (thực tế 6 giờ 15 phút)", met: false },
      { text: "Sản lượng tháng thấp hơn 90% cam kết", met: false },
      { text: "Nguyên nhân thuộc phạm vi bảo hành của EPC", met: true },
    ],
  },
  {
    id: "fail",
    status: "Fail",
    title: "Sự cố quá 48h - Trích Quỹ bảo lãnh",
    description: "Trích Quỹ bảo lãnh bù 1.500.000 VNĐ vào kỳ trả góp kế tiếp của khách hàng.",
    relatedTicketId: "TK-202608-0415",
    epcName: "Công ty TNHH Điện Mặt Trời Sài Gòn",
    compensation: 1_500_000,
    installmentAfter: 27_000_000,
    conditions: [
      { text: "EPC vượt 48 giờ khắc phục (thực tế 53 giờ 20 phút)", met: true },
      { text: "Sản lượng tháng thấp hơn 90% cam kết", met: true },
      { text: "Nguyên nhân thuộc phạm vi bảo hành của EPC", met: true },
    ],
  },
];