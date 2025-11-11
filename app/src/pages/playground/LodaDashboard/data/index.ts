import type { MiniTrendChartDataPoint, MiniTrendChartLine } from "../../../../components/ui/forDashboard/MiniTrendChart";
import type { ProgressBarItem } from "../../../../components/ui/forDashboard/ProgressBarChart";

// ============================================
// BUSINESS METRICS DATA (Left Column)
// ============================================

export const businessMetricsData = [
  {
    icon: "trending_up",
    title: "Revenue",
    value: "$2.4M",
    statusText: "+15.2% vs last week",
    statusColor: "success" as const,
  },
  {
    icon: "shopping_cart",
    title: "Orders",
    value: "12,458",
    statusText: "+8.5% vs last week",
    statusColor: "success" as const,
  },
  {
    icon: "groups",
    title: "Active Users",
    value: "8,924",
    statusText: "+12.3% vs last week",
    statusColor: "success" as const,
  },
  {
    icon: "attach_money",
    title: "Conversion Rate",
    value: "3.8%",
    statusText: "-0.3% vs last week",
    statusColor: "warning" as const,
  },
  {
    icon: "schedule",
    title: "Avg Session",
    value: "4m 32s",
    statusText: "+18s vs last week",
    statusColor: "success" as const,
  },
  {
    icon: "local_shipping",
    title: "Fulfillment",
    value: "96.2%",
    statusText: "On-time delivery",
    statusColor: "success" as const,
  },
];

// ============================================
// USER JOURNEY DATA (Left Column)
// ============================================

export const userJourneyData: ProgressBarItem[] = [
  {
    id: "1",
    label: "Landing Page",
    value: 99.8,
    status: "healthy",
    infoText: "45ms",
  },
  {
    id: "2",
    label: "Product Browse",
    value: 95.2,
    status: "healthy",
    infoText: "78ms",
  },
  {
    id: "3",
    label: "Add to Cart",
    value: 87.5,
    status: "warning",
    infoText: "120ms",
  },
  {
    id: "4",
    label: "Checkout Initiated",
    value: 78.3,
    status: "warning",
    infoText: "156ms",
  },
  {
    id: "5",
    label: "Payment Info",
    value: 65.8,
    status: "critical",
    infoText: "234ms",
  },
  {
    id: "6",
    label: "Purchase Complete",
    value: 58.2,
    status: "critical",
    infoText: "189ms",
  },
];

// ============================================
// PATHWAY VISUALIZATION DATA (Middle Column)
// ============================================

export const pathwayNodes = [
  {
    id: "user-request",
    position: [0, 0, 0] as [number, number, number],
    label: "User Request",
    icon: "person",
    color: "#3b82f6",
  },
  {
    id: "load-balancer",
    position: [4, 0, 0] as [number, number, number],
    label: "Load Balancer",
    icon: "balance",
    color: "#8b5cf6",
  },
  {
    id: "api-gateway",
    position: [8, 0, 0] as [number, number, number],
    label: "API Gateway",
    icon: "api",
    color: "#06b6d4",
  },
  {
    id: "service-a",
    position: [12, 0, -3] as [number, number, number],
    label: "Service A",
    icon: "cloud",
    color: "#10b981",
  },
  {
    id: "service-b",
    position: [12, 0, 0] as [number, number, number],
    label: "Service B",
    icon: "dns",
    color: "#f59e0b",
  },
  {
    id: "service-c",
    position: [12, 0, 3] as [number, number, number],
    label: "Service C",
    icon: "storage",
    color: "#ec4899",
  },
  {
    id: "database",
    position: [16, 0, 0] as [number, number, number],
    label: "Database",
    icon: "database",
    color: "#ef4444",
  },
];

export const pathwayConnections = [
  { from: "user-request", to: "load-balancer", color: "#3b82f6" },
  { from: "load-balancer", to: "api-gateway", color: "#8b5cf6" },
  { from: "api-gateway", to: "service-a", color: "#10b981" },
  { from: "api-gateway", to: "service-b", color: "#f59e0b" },
  { from: "api-gateway", to: "service-c", color: "#ec4899" },
  { from: "service-a", to: "database", color: "#10b981" },
  { from: "service-b", to: "database", color: "#f59e0b" },
  { from: "service-c", to: "database", color: "#ec4899" },
];

// Calculate the center point of all pathway nodes for optimal camera positioning
export const calculatePathwayCenter = (): [number, number, number] => {
  if (pathwayNodes.length === 0) return [0, 0, 0];
  
  const sum = pathwayNodes.reduce(
    (acc, node) => {
      return [
        acc[0] + node.position[0],
        acc[1] + node.position[1],
        acc[2] + node.position[2],
      ];
    },
    [0, 0, 0]
  );
  
  return [
    sum[0] / pathwayNodes.length,
    sum[1] / pathwayNodes.length,
    sum[2] / pathwayNodes.length,
  ];
};

export const pathwayViewCenter = calculatePathwayCenter();

// ============================================
// APP PERFORMANCE METRICS (Middle Column)
// ============================================

export const appPerformanceMetrics = [
  {
    icon: "speed",
    title: "Avg Response Time",
    value: "142ms",
    statusText: "-18ms vs last hour",
    statusColor: "success" as const,
  },
  {
    icon: "memory",
    title: "Memory Usage",
    value: "68.2%",
    statusText: "Normal range",
    statusColor: "success" as const,
  },
  {
    icon: "error",
    title: "Error Rate",
    value: "0.08%",
    statusText: "Within threshold",
    statusColor: "success" as const,
  },
  {
    icon: "settings_ethernet",
    title: "Throughput",
    value: "1.2K/s",
    statusText: "Requests per second",
    statusColor: "success" as const,
  },
];

// ============================================
// SECURITY MINI TREND CHARTS (Right Column)
// ============================================

const generateSecurityData = (prefix: string): MiniTrendChartDataPoint[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${prefix}-${i}`,
    name: `${i * 3}m`,
    threats: Math.floor(Math.random() * 50 + 10),
  }));
};

export const securityTrendData1 = generateSecurityData("firewall");
export const securityTrendData2 = generateSecurityData("ddos");
export const securityTrendData3 = generateSecurityData("intrusion");
export const securityTrendData4 = generateSecurityData("waf");

export const securityLines: MiniTrendChartLine[] = [
  {
    dataKey: "threats",
    name: "Threats",
    color: "#ef4444",
    strokeWidth: 2,
  },
];

// ============================================
// NETWORK TREND CHART & METRICS (Right Column)
// ============================================

export const networkTrendData: MiniTrendChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  id: `network-${i}`,
  name: `${i * 2}m`,
  inbound: Math.floor(Math.random() * 300 + 400),
  outbound: Math.floor(Math.random() * 200 + 300),
}));

export const networkTrendLines: MiniTrendChartLine[] = [
  {
    dataKey: "inbound",
    name: "Inbound (Mbps)",
    color: "#10b981",
    strokeWidth: 2,
  },
  {
    dataKey: "outbound",
    name: "Outbound (Mbps)",
    color: "#3b82f6",
    strokeWidth: 2,
  },
];

export const networkMetrics = [
  {
    icon: "download",
    title: "Peak Inbound",
    value: "850 Mbps",
    statusText: "Max bandwidth",
    statusColor: "success" as const,
  },
  {
    icon: "upload",
    title: "Peak Outbound",
    value: "620 Mbps",
    statusText: "Max bandwidth",
    statusColor: "success" as const,
  },
];

