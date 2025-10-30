// Today's Target Table Data
export interface TargetTableRow {
  id: string;
  time: string;
  sales: number;
  target: number;
  progress: number;
  status: 'success' | 'warning' | 'error';
}

export const mockTargetTableData: TargetTableRow[] = [
  { id: 'h10', time: '10:00 AM', sales: 1200, target: 1500, progress: 80, status: 'warning' },
  { id: 'h11', time: '11:00 AM', sales: 1850, target: 1800, progress: 103, status: 'success' },
  { id: 'h12', time: '12:00 PM', sales: 2400, target: 2200, progress: 109, status: 'success' },
];


// Navigation mock data
export interface NavigationData {
  storeName: string;
  date: string;
  dayOfWeek: string;
  weather: {
    condition: string;
    temperature: number;
  };
}

export const mockNavigationData: NavigationData = {
  storeName: "Vancouver - Robson Street",
  date: "Oct 29, 2025",
  dayOfWeek: "Wednesday",
  weather: {
    condition: "Sunny",
    temperature: 18,
  },
};

// Dashboard mock data
export const mockDashboardData = {
  performanceSnapshot: {
    yesterday: {
      value: "$24,580",
      subtitle: "103% of target",
    },
    todayTarget: {
      value: "$25,200",
      subtitle: "+2.5% vs yesterday",
    },
  },
  metrics: {
    upt: {
      label: "UPT",
      value: "2.3",
      status: "success" as const,
      statusLabel: "↑ Above",
      sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.3],
    },
    conversionRate: {
      label: "Conv. Rate",
      value: "68%",
      status: "info" as const,
      statusLabel: "On Track",
      sparklineData: [62, 64, 65, 67, 66, 68, 69, 68],
    },
    aur: {
      label: "AUR",
      value: "$105",
      status: "danger" as const,
      statusLabel: "↓ Below",
      sparklineData: [115, 112, 110, 108, 107, 105, 103, 105],
    },
  },
  peakHours: {
    bestCR: { time: "2-4PM", rate: "78%" },
    lowCR: { time: "10-12PM", rate: "52%" },
    rush: "5-7PM",
  },
  categoryMix: {
    mens: { percentage: "58%", trend: "↑5%" },
    womens: { percentage: "42%" },
    traffic: { count: 342, change: 12 },
  },
  todayTargetDetail: {
    total: "$25,200",
    currentProgress: "$18,500",
    morning: "$11,340",
    evening: "$13,860",
    sparklineData: {
      morning: [8200, 8800, 9500, 10200, 10800, 11100, 11340],
      evening: [9800, 10400, 11000, 11600, 12300, 13100, 13860],
    },
    // Today's hourly sales data (10 AM - 6 PM so far)
    trendData: [
      { id: "h10", name: "10 AM", sales: 1200 },
      { id: "h11", name: "11 AM", sales: 1850 },
      { id: "h12", name: "12 PM", sales: 2400 },
      { id: "h13", name: "1 PM", sales: 2100 },
      { id: "h14", name: "2 PM", sales: 2800 },
      { id: "h15", name: "3 PM", sales: 3200 },
      { id: "h16", name: "4 PM", sales: 2900 },
      { id: "h17", name: "5 PM", sales: 3500 },
      { id: "h18", name: "6 PM", sales: 2550 },
    ],
  },
} as const;

// Tips mock data
export const mockTipsData = [
  {
    id: "sales-001",
    category: "sales",
    label: "Sales Tips",
    body: [
      { text: "Your " },
      { text: "UPT", styles: { bold: true } },
      { text: " has " },
      { text: "decreased", styles: { highlight: true, color: "red" } },
      { text: " by " },
      { text: "15%", styles: { bold: true, highlight: true, color: "red" } },
      { text: " compared to last week. " },
      { text: "Suggestion:", styles: { bold: true } },
      { text: " Focus on cross-selling accessories with main products." },
    ],
  },
  {
    id: "labour-001",
    category: "labour",
    label: "Labour Tips",
    body: [
      { text: "Due to expected " },
      { text: "high traffic", styles: { bold: true, color: "orange" } },
      { text: " between " },
      { text: "3-4 PM", styles: { bold: true } },
      { text: " today, ensure adequate staffing during this period." },
    ],
  },
  {
    id: "vm-001",
    category: "vm",
    label: "VM Tips",
    body: [
      { text: "The following products need " },
      { text: "immediate attention", styles: { bold: true, color: "orange" } },
      { text: " for visual merchandising display updates." },
    ],
  },
  {
    id: "season-001",
    category: "season",
    label: "Season/Weather Tips",
    body: [
      { text: "Cold weather expected this week. Ensure " },
      { text: "winter jacket displays", styles: { bold: true } },
      { text: " are prominent. Spring collection launch in " },
      { text: "2 days", styles: { bold: true, color: "green" } },
      { text: "." },
    ],
  },
  {
    id: "out-of-stock-001",
    category: "danger" as const,
    label: "🔴 Critical Out-of-Stock (High Demand)",
    items: [
      { product: "Slim Fit Chino - Navy (32x32)", detail: "Reorder!" },
      { product: "Oxford Shirt - White (M)", detail: "2 days lead" },
      { product: "Leather Sneakers - White (9.5)", detail: "Popular size" },
    ],
  },
  {
    id: "overstock-001",
    category: "warning" as const,
    label: "🟡 Overstock Opportunities",
    items: [
      { product: "Winter Jacket - Black (XL)", detail: "18 pcs" },
      { product: "Wool Scarf - Grey", detail: "25 pcs" },
      { product: "Flannel Shirt - Red (S)", detail: "12 pcs" },
    ],
  },
];

