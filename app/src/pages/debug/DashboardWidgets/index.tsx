import { MetricWidget } from "../../../components/ui/forDashboard/MetricWidget";
import {
  ProgressBarChart,
  type ProgressBarItem,
} from "../../../components/ui/forDashboard/ProgressBarChart";
import {
  MiniTrendChart,
  type MiniTrendChartLine,
  type MiniTrendChartDataPoint,
} from "../../../components/ui/forDashboard/MiniTrendChart";
import { TableWidget } from "../../../components/ui/forDashboard";
import type { TableColumn } from "../../../components/ui/Table";
import AppLayout from "../../../components/ui/AppLayout";
import type { PageProps } from "../../_page-types";
import styles from "./styles.module.scss";
import { COLOR_SCALES } from "../../../styles/color-chart";
import TrendChart from "../../../components/ui/forDashboard/TrendChart";

// Sample data for TrendChart
const sampleChartData = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Feb", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 2000, users: 9800 },
  { name: "Apr", revenue: 2780, users: 3908 },
  { name: "May", revenue: 1890, users: 4800 },
  { name: "Jun", revenue: 2390, users: 3800 },
];

const sampleChartLines = [
  {
    dataKey: "revenue",
    name: "Revenue",
    color: COLOR_SCALES.hotHeat.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: "users",
    name: "Users",
    color: COLOR_SCALES.cyan.colors[4],
    strokeWidth: 2,
  },
];

// Sample data for MetricWidget sparklines
const generateSparklineData = (
  count: number,
  trend: "up" | "down" | "mixed"
) => {
  const data: number[] = [];
  let value = Math.random() * 50 + 50;

  for (let i = 0; i < count; i++) {
    if (trend === "up") {
      value += Math.random() * 10;
    } else if (trend === "down") {
      value -= Math.random() * 8;
    } else {
      value += (Math.random() - 0.5) * 15;
    }
    data.push(Math.max(0, value));
  }

  return data;
};

// Sample data for ProgressBarChart
const userJourneyData: ProgressBarItem[] = [
  {
    id: "1",
    label: "Untitled Term",
    value: 99.9,
    status: "healthy",
    infoText: "80ms",
  },
  {
    id: "2",
    label: "Initiate Checkout",
    value: 99.7,
    status: "healthy",
    infoText: "80ms",
  },
  {
    id: "3",
    label: "Verify Payment",
    value: 92.5,
    status: "warning",
    infoText: "80ms",
  },
  {
    id: "4",
    label: "Apply Discount Code",
    value: 92.0,
    status: "warning",
    infoText: "80ms",
  },
  {
    id: "5",
    label: "Purchase",
    value: 68.5,
    status: "critical",
    infoText: "80ms",
  },
  {
    id: "6",
    label: "Complete",
    value: 59.1,
    status: "critical",
    infoText: "80ms",
  },
];

const appServiceData: ProgressBarItem[] = [
  {
    id: "1",
    label: "Discovery",
    value: 99.9,
    status: "healthy",
    infoText: "80ms",
  },
  {
    id: "2",
    label: "Interest",
    value: 99.7,
    status: "healthy",
    infoText: "80ms",
  },
  {
    id: "3",
    label: "Consideration",
    value: 92.5,
    status: "warning",
    infoText: "80ms",
  },
  {
    id: "4",
    label: "Untitled Term",
    value: 92.0,
    status: "warning",
    infoText: "80ms",
  },
  {
    id: "5",
    label: "Purchase",
    value: 59.1,
    status: "critical",
    infoText: "80ms",
  },
];

// Sample data for MiniTrendChart
const generateTrendDataPoints = (
  count: number,
  keys: string[],
  prefix: string = "data"
): MiniTrendChartDataPoint[] => {
  const data: MiniTrendChartDataPoint[] = [];
  for (let i = 0; i < count; i++) {
    const point: MiniTrendChartDataPoint = {
      id: `${prefix}-${i}`,
      name: `${i}m`,
    };
    keys.forEach((key) => {
      point[key] = Math.random() * 40 + 10 + Math.sin(i / 5) * 20;
    });
    data.push(point);
  }
  return data;
};

// DDOS Attack Traffic data
const ddosDataPoints = generateTrendDataPoints(
  50,
  ["attack", "clean"],
  "ddos"
).map((point) => ({
  ...point,
  clean: (point.clean as number) * 0.5,
}));

const ddosLines: MiniTrendChartLine[] = [
  {
    dataKey: "attack",
    name: "Attack Traffic (Gbps)",
    color: "#ef4444",
    strokeWidth: 2,
  },
  {
    dataKey: "clean",
    name: "Clean Traffic (Gbps)",
    color: "#10b981",
    strokeWidth: 2,
  },
];

// WAF Blocks data
const wafDataPoints = generateTrendDataPoints(40, ["blocks"], "waf");
const wafLines: MiniTrendChartLine[] = [
  {
    dataKey: "blocks",
    name: "Blocks per minute",
    color: "#ef4444",
    strokeWidth: 2,
  },
];

// High-Risk Accounts data
const highRiskAccountsDataPoints = generateTrendDataPoints(
  30,
  ["accounts"],
  "accounts"
);
const highRiskAccountsLines: MiniTrendChartLine[] = [
  {
    dataKey: "accounts",
    name: "Accounts",
    color: "#f59e0b",
    strokeWidth: 2,
  },
];

// High-Risk Transactions data
const highRiskTransactionsDataPoints = generateTrendDataPoints(
  30,
  ["transactions"],
  "transactions"
);
const highRiskTransactionsLines: MiniTrendChartLine[] = [
  {
    dataKey: "transactions",
    name: "Transactions",
    color: "#f59e0b",
    strokeWidth: 2,
  },
];

// API Latency data
const apiLatencyDataPoints = generateTrendDataPoints(
  25,
  ["latency"],
  "latency"
);
const apiLatencyLines: MiniTrendChartLine[] = [
  {
    dataKey: "latency",
    name: "Latency",
    color: "#8b5cf6",
    strokeWidth: 2,
  },
];

// Revenue data for Y-axis demo
const revenueDataPoints: MiniTrendChartDataPoint[] = [
  { name: "Jan", revenue: 45000, orders: 234 },
  { name: "Feb", revenue: 52000, orders: 289 },
  { name: "Mar", revenue: 48000, orders: 267 },
  { name: "Apr", revenue: 61000, orders: 312 },
  { name: "May", revenue: 58000, orders: 295 },
  { name: "Jun", revenue: 67000, orders: 341 },
  { name: "Jul", revenue: 73000, orders: 378 },
  { name: "Aug", revenue: 69000, orders: 356 },
  { name: "Sep", revenue: 76000, orders: 392 },
  { name: "Oct", revenue: 82000, orders: 415 },
  { name: "Nov", revenue: 79000, orders: 398 },
  { name: "Dec", revenue: 91000, orders: 456 },
];

const revenueLines: MiniTrendChartLine[] = [
  {
    dataKey: "revenue",
    name: "Revenue",
    color: "#3b82f6",
    strokeWidth: 2,
  },
];

// Performance data for Y-axis demo
const performanceDataPoints: MiniTrendChartDataPoint[] = Array.from(
  { length: 20 },
  (_, i) => ({
    name: `${i}m`,
    score: Math.min(100, Math.max(0, 75 + Math.random() * 20 - 10)),
  })
);

const performanceLines: MiniTrendChartLine[] = [
  {
    dataKey: "score",
    name: "Performance Score",
    color: "#10b981",
    strokeWidth: 2,
  },
];

// Large numbers data for Y-axis demo
const trafficDataPoints: MiniTrendChartDataPoint[] = Array.from(
  { length: 15 },
  (_, i) => ({
    name: `${i}h`,
    visitors: Math.floor(Math.random() * 500000 + 1000000),
  })
);

const trafficLines: MiniTrendChartLine[] = [
  {
    dataKey: "visitors",
    name: "Visitors",
    color: "#f59e0b",
    strokeWidth: 2,
  },
];

// Sample data for TableWidget
interface PerformanceMetric {
  id: string;
  service: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  requests: number;
}

const performanceMetrics: PerformanceMetric[] = [
  {
    id: '1',
    service: 'API Gateway',
    status: 'healthy',
    uptime: 99.99,
    responseTime: 45,
    requests: 1250000,
  },
  {
    id: '2',
    service: 'Authentication Service',
    status: 'healthy',
    uptime: 99.95,
    responseTime: 78,
    requests: 890000,
  },
  {
    id: '3',
    service: 'Payment Processing',
    status: 'warning',
    uptime: 98.5,
    responseTime: 234,
    requests: 450000,
  },
  {
    id: '4',
    service: 'Database Cluster',
    status: 'critical',
    uptime: 95.2,
    responseTime: 567,
    requests: 2100000,
  },
  {
    id: '5',
    service: 'CDN',
    status: 'healthy',
    uptime: 99.99,
    responseTime: 12,
    requests: 5600000,
  },
];

interface SalesMetric {
  id: string;
  region: string;
  revenue: number;
  orders: number;
  conversionRate: number;
}

const salesMetrics: SalesMetric[] = [
  { id: '1', region: 'North America', revenue: 2450000, orders: 12340, conversionRate: 3.8 },
  { id: '2', region: 'Europe', revenue: 1890000, orders: 9850, conversionRate: 3.2 },
  { id: '3', region: 'Asia Pacific', revenue: 3120000, orders: 15670, conversionRate: 4.1 },
  { id: '4', region: 'Latin America', revenue: 780000, orders: 4200, conversionRate: 2.9 },
  { id: '5', region: 'Middle East', revenue: 560000, orders: 2890, conversionRate: 2.6 },
];

const performanceColumns: TableColumn<PerformanceMetric>[] = [
  {
    key: 'service',
    header: 'Service',
    render: (row: PerformanceMetric) => row.service,
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row: PerformanceMetric) => (
      <span style={{
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: 
          row.status === 'healthy' ? 'rgba(16, 185, 129, 0.15)' :
          row.status === 'warning' ? 'rgba(251, 191, 36, 0.15)' :
          'rgba(239, 68, 68, 0.15)',
        color:
          row.status === 'healthy' ? '#10b981' :
          row.status === 'warning' ? '#f59e0b' :
          '#ef4444',
      }}>
        {row.status.toUpperCase()}
      </span>
    ),
    width: '120px',
    align: 'center',
    sortable: true,
  },
  {
    key: 'uptime',
    header: 'Uptime',
    render: (row: PerformanceMetric) => `${row.uptime}%`,
    width: '100px',
    align: 'center',
    sortable: true,
  },
  {
    key: 'responseTime',
    header: 'Avg Response',
    render: (row: PerformanceMetric) => `${row.responseTime}ms`,
    width: '120px',
    align: 'center',
    sortable: true,
  },
  {
    key: 'requests',
    header: 'Total Requests',
    render: (row: PerformanceMetric) => row.requests.toLocaleString(),
    width: '140px',
    align: 'right',
    sortable: true,
  },
];

const salesColumns: TableColumn<SalesMetric>[] = [
  {
    key: 'region',
    header: 'Region',
    render: (row: SalesMetric) => row.region,
    sortable: true,
  },
  {
    key: 'revenue',
    header: 'Revenue',
    render: (row: SalesMetric) => `$${(row.revenue / 1000).toFixed(0)}K`,
    width: '120px',
    align: 'right',
    sortable: true,
  },
  {
    key: 'orders',
    header: 'Orders',
    render: (row: SalesMetric) => row.orders.toLocaleString(),
    width: '100px',
    align: 'center',
    sortable: true,
  },
  {
    key: 'conversionRate',
    header: 'Conv. Rate',
    render: (row: SalesMetric) => `${row.conversionRate}%`,
    width: '110px',
    align: 'center',
    sortable: true,
  },
];

const DashboardWidgetsDebug = () => {
  return (
    <div className={styles.container}>
      <div className={styles.debugHeader}>
        <h1>Dashboard Widgets Debug</h1>
        <p className={styles.description}>
          Testing all dashboard widget components in various sizes and
          configurations
        </p>
      </div>

      {/* Section: TrendChart */}
      <section className={styles.section}>
        <h2>TrendChart - Full-size Trend Visualization</h2>
        <p className={styles.sectionDesc}>
          Line chart component for displaying trends with header and alert light support
        </p>

        <h3 className={styles.sectionSubtitle}>With Header & Alert Light</h3>
        <div style={{ height: '600px', marginBottom: '24px' }}>
          <TrendChart
            showHeader={true}
            headerIcon="trending_up"
            headerTitle="Revenue & User Growth"
            headerSummary="Last 6 months overview"
            headerTitleSize="medium"
            headerIconSize="medium"
            headerColor="secondary"
            showAlertLight={true}
            alertLightColor="#10b981"
            data={sampleChartData}
            lines={sampleChartLines}
            showGrid={true}
            showLegend={true}
          />
        </div>
      </section>

      {/* Section: MetricWidget */}
      <section className={styles.section}>
        <h2>MetricWidget - Small Metric Cards</h2>
        <p className={styles.sectionDesc}>
          Displays key metrics with optional sparklines, change indicators, and
          status badges
        </p>

        <h3 className={styles.sectionSubtitle}>
          Standard Size (280px × 160px)
        </h3>
        <div className={styles.gridMetrics}>
          <MetricWidget
            icon="payments"
            title="Real-time GMV"
            value="$2,013.5 M"
            changeText="+28.4% vs last hour"
            changeType="positive"
            sparklineData={generateSparklineData(20, "up")}
            sparklineColor="#10b981"
          />

          <MetricWidget
            icon="shopping_cart"
            title="Real-time Total Orders"
            value="1.25 M"
            changeText="28.4% vs last hour"
            changeType="negative"
            sparklineData={generateSparklineData(20, "down")}
            sparklineColor="#ef4444"
          />

          <MetricWidget
            icon="task_alt"
            title="Overall Payment Success Rate"
            value="75.2 %"
            changeText="Success: 1,249,000"
            changeType="neutral"
            sparklineData={generateSparklineData(20, "mixed")}
            sparklineColor="#3b82f6"
          />

          <MetricWidget
            icon="groups"
            title="Real-time GMV"
            value="8,520"
            statusText="Watching"
            statusColor="warning"
            sparklineData={generateSparklineData(20, "up")}
            sparklineColor="#f59e0b"
          />

          <MetricWidget
            icon="person"
            title="Real-time Online Users"
            value="3.1 M"
            changeText="+28.4% vs yesterday same time"
            changeType="positive"
            sparklineData={generateSparklineData(20, "up")}
            sparklineColor="#3b82f6"
          />

          <MetricWidget
            icon="shopping_bag"
            title="Cart Additions / min"
            value="$2,013.5 M"
            changeText="+28.4% vs last hour"
            changeType="positive"
            sparklineData={generateSparklineData(20, "up")}
            sparklineColor="#10b981"
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Compact Size (220px × 140px)</h3>
        <div className={styles.gridMetricsCompact}>
          <MetricWidget
            title="Revenue"
            value="$2.01M"
            changeText="+28.4%"
            changeType="positive"
            sparklineData={generateSparklineData(15, "up")}
            sparklineColor="#10b981"
          />

          <MetricWidget
            title="Orders"
            value="1.25M"
            changeText="-12.3%"
            changeType="negative"
            sparklineData={generateSparklineData(15, "down")}
            sparklineColor="#ef4444"
          />

          <MetricWidget
            title="Success Rate"
            value="75.2%"
            statusText="OK"
            statusColor="success"
            sparklineData={generateSparklineData(15, "mixed")}
            sparklineColor="#3b82f6"
          />
        </div>
      </section>

      {/* Section: ProgressBarChart */}
      <section className={styles.section}>
        <h2>ProgressBarChart - Journey & Performance</h2>
        <p className={styles.sectionDesc}>
          Horizontal bar charts showing progress with health status indicators
        </p>

        <h3 className={styles.sectionSubtitle}>Full Width</h3>
        <div className={styles.gridProgressFull}>
          <ProgressBarChart
            showHeader={true}
            headerIcon="route"
            headerTitle="User Journey"
            headerTitleSize="medium"
            headerIconSize="medium"
            headerColor="secondary"
            showAlertLight={false}
            items={userJourneyData}
            showPercentage={true}
            showInfo={true}
          />

          <ProgressBarChart
            showHeader={true}
            headerIcon="speed"
            headerTitle="Application & Service Performance"
            headerSummary="A set-sized universe within which all ZF axioms hold."
            headerTitleSize="small"
            headerIconSize="small"
            headerColor="secondary"
            showAlertLight={false}
            items={appServiceData}
            showPercentage={true}
            showInfo={true}
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Half Width</h3>
        <div className={styles.gridProgressHalf}>
          <ProgressBarChart
            showHeader={true}
            headerIcon="route"
            headerTitle="User Journey"
            headerTitleSize="small"
            headerIconSize="small"
            headerColor="secondary"
            showAlertLight={false}
            items={userJourneyData}
            showPercentage={true}
            showInfo={false}
          />

          <ProgressBarChart
            showHeader={true}
            headerIcon="speed"
            headerTitle="Service Performance"
            headerTitleSize="small"
            headerIconSize="small"
            headerColor="secondary"
            showAlertLight={false}
            items={appServiceData}
            showPercentage={true}
            showInfo={false}
          />
        </div>
      </section>

      {/* Section: MiniTrendChart */}
      <section className={styles.section}>
        <h2>MiniTrendChart - Compact Trend Visualization</h2>
        <p className={styles.sectionDesc}>
          Compact line charts for monitoring trends with minimal space
        </p>

        <h3 className={styles.sectionSubtitle}>
          Standard Size (400px × 240px)
        </h3>
        <div className={styles.gridTrendStandard}>
          <MiniTrendChart
            showAlertLight={false}
            title="DDOS Attack Traffic"
            subtitle="Mitigation: Active"
            data={ddosDataPoints}
            lines={ddosLines}
            height={180}
            showGrid={true}
            showLegend={true}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="WAF Blocks / min"
            data={wafDataPoints}
            lines={wafLines}
            height={180}
            showGrid={true}
            showLegend={false}
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Compact Size (300px × 200px)</h3>
        <div className={styles.gridTrendCompact}>
          <MiniTrendChart
            showAlertLight={false}
            title="High-Risk Login Attempts"
            subtitle="85 Accounts"
            data={highRiskAccountsDataPoints}
            lines={highRiskAccountsLines}
            height={140}
            showGrid={false}
            showLegend={false}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="High-Risk Login Attempts"
            subtitle="42 Transactions"
            data={highRiskTransactionsDataPoints}
            lines={highRiskTransactionsLines}
            height={140}
            showGrid={false}
            showLegend={false}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="API Latency"
            subtitle="p95: 234ms"
            data={apiLatencyDataPoints}
            lines={apiLatencyLines}
            height={140}
            showGrid={false}
            showLegend={false}
          />
        </div>
      </section>

      {/* Section: NEW - Y-Axis Enhancement Demo */}
      <section className={styles.section}>
        <h2>🎉 NEW: Y-Axis Enhancement</h2>
        <p className={styles.sectionDesc}>
          MiniTrendChart now supports customizable Y-axis with formatting
          options
        </p>

        <h3 className={styles.sectionSubtitle}>Before vs After Comparison</h3>
        <div className={styles.gridTrendStandard}>
          <MiniTrendChart
            showAlertLight={false}
            title="❌ Before: No Y-Axis"
            subtitle="Default behavior (showYAxis: false)"
            data={revenueDataPoints}
            lines={revenueLines}
            height={200}
            showGrid={true}
            showYAxis={false}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="✅ After: With Y-Axis"
            subtitle="New feature (showYAxis: true)"
            data={revenueDataPoints}
            lines={revenueLines}
            height={200}
            showGrid={true}
            showYAxis={true}
            yAxisWidth={50}
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Y-Axis Formatting Options</h3>
        <div className={styles.gridTrendStandard}>
          <MiniTrendChart
            showAlertLight={false}
            title="Currency Format"
            subtitle="yAxisTickFormatter for $"
            data={revenueDataPoints}
            lines={revenueLines}
            height={200}
            showGrid={true}
            showYAxis={true}
            yAxisWidth={60}
            yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="Percentage Format"
            subtitle="yAxisDomain + formatter"
            data={performanceDataPoints}
            lines={performanceLines}
            height={200}
            showGrid={true}
            showYAxis={true}
            yAxisWidth={50}
            yAxisDomain={[0, 100]}
            yAxisTickFormatter={(value) => `${value.toFixed(0)}%`}
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Large Number Formatting</h3>
        <div className={styles.gridTrendCompact}>
          <MiniTrendChart
            showAlertLight={false}
            title="Traffic (K/M format)"
            subtitle="Auto K/M suffixes"
            data={trafficDataPoints}
            lines={trafficLines}
            height={160}
            showGrid={true}
            showYAxis={true}
            yAxisWidth={50}
            yAxisTickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            }}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="Custom Y-Axis Width"
            subtitle="yAxisWidth: 55px"
            data={revenueDataPoints}
            lines={revenueLines}
            height={160}
            showGrid={true}
            showYAxis={true}
            yAxisWidth={55}
            yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="Right-Aligned Y-Axis"
            subtitle="yAxisOrientation: right"
            data={performanceDataPoints}
            lines={performanceLines}
            height={160}
            showGrid={true}
            showYAxis={true}
            yAxisOrientation="right"
            yAxisWidth={50}
            yAxisTickFormatter={(value) => `${value.toFixed(0)}%`}
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Dashboard Widget Style</h3>
        <div className={styles.gridTrendCompact}>
          <MiniTrendChart
            showHeader={true}
            headerIcon="attach_money"
            headerTitle="Monthly Revenue"
            headerSummary="Last 12 months"
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={true}
            alertLightColor="#10b981"
            data={revenueDataPoints}
            lines={revenueLines}
            height={180}
            showGrid={true}
            showDots={true}
            showYAxis={true}
            yAxisWidth={55}
            yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />

          <MiniTrendChart
            showHeader={true}
            headerIcon="speed"
            headerTitle="Performance Score"
            headerSummary="Real-time monitoring"
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={true}
            alertLightColor="#3b82f6"
            data={performanceDataPoints}
            lines={performanceLines}
            height={180}
            showGrid={false}
            showYAxis={true}
            yAxisWidth={45}
            yAxisDomain={[0, 100]}
            yAxisTickFormatter={(value) => `${value.toFixed(0)}%`}
          />

          <MiniTrendChart
            showHeader={true}
            headerIcon="trending_up"
            headerTitle="Daily Traffic"
            headerSummary="Unique visitors"
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={true}
            alertLightColor="#f59e0b"
            data={trafficDataPoints}
            lines={trafficLines}
            height={180}
            showGrid={true}
            showYAxis={true}
            yAxisWidth={50}
            yAxisTickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            }}
          />
        </div>
      </section>

      {/* Section: Full Dashboard Layout */}
      <section className={styles.section}>
        <h2>Complete Dashboard Layout Example</h2>
        <p className={styles.sectionDesc}>
          Simulated dashboard with all widgets arranged as in the wireframe
        </p>

        <div className={styles.dashboardLayout}>
          {/* Top row: Metric widgets */}
          <div className={styles.metricsRow}>
            <MetricWidget
              showAlertLight={true}
              alertLightColor="#10b981"
              icon="payments"
              title="Real-time GMV"
              value="$2,013.5 M"
              changeText="+28.4% vs last hour"
              changeType="positive"
              sparklineData={generateSparklineData(20, "up")}
              sparklineColor="#10b981"
            />

            <MetricWidget
              showAlertLight={true}
              alertLightColor="#ef4444"
              icon="shopping_cart"
              title="Real-time Total Orders"
              value="1.25 M"
              changeText="28.4% vs last hour"
              changeType="negative"
              sparklineData={generateSparklineData(20, "down")}
              sparklineColor="#ef4444"
            />

            <MetricWidget
              showAlertLight={true}
              alertLightColor="#10b981"
              icon="task_alt"
              title="Overall Payment Success Rate"
              value="75.2 %"
              changeText="Success: 1,249,000"
              changeType="neutral"
              sparklineData={generateSparklineData(20, "mixed")}
              sparklineColor="#3b82f6"
            />

            <MetricWidget
              showAlertLight={true}
              alertLightColor="#f59e0b"
              icon="groups"
              title="Real-time GMV"
              value="8,520"
              statusText="Watching"
              statusColor="warning"
              sparklineData={generateSparklineData(20, "up")}
              sparklineColor="#f59e0b"
            />

            <MetricWidget
              showAlertLight={true}
              alertLightColor="#10b981"
              icon="person"
              title="Real-time Online Users"
              value="3.1 M"
              changeText="+28.4% vs yesterday same time"
              changeType="positive"
              sparklineData={generateSparklineData(20, "up")}
              sparklineColor="#3b82f6"
            />

            <MetricWidget
              showAlertLight={true}
              alertLightColor="#10b981"
              icon="shopping_bag"
              title="Cart Additions / min"
              value="$2,013.5 M"
              changeText="+28.4% vs last hour"
              changeType="positive"
              sparklineData={generateSparklineData(20, "up")}
              sparklineColor="#10b981"
            />
          </div>

          {/* Second row: Journey charts */}
          <div className={styles.journeyRow}>
            <ProgressBarChart
              showHeader={true}
              headerIcon="route"
              headerTitle="User Journey"
              headerSummary="A set-sized universe within which all ZF axioms hold."
              headerTitleSize="small"
              headerIconSize="small"
              headerColor="secondary"
              showAlertLight={true}
              alertLightColor="#ef4444"
              items={userJourneyData}
              showPercentage={true}
              showInfo={true}
            />

            <ProgressBarChart
              showHeader={true}
              headerIcon="speed"
              headerTitle="Application & Service Performance"
              headerSummary="A set-sized universe within which all ZF axioms hold."
              headerTitleSize="small"
              headerIconSize="small"
              headerColor="secondary"
              showAlertLight={true}
              alertLightColor="#f59e0b"
              items={appServiceData}
              showPercentage={true}
              showInfo={true}
            />
          </div>

          {/* Third row: Trend charts */}
          <div className={styles.trendsRow}>
            <MiniTrendChart
              showAlertLight={true}
              alertLightColor="#ef4444"
              title="DDOS Attack Traffic"
              subtitle="Mitigation: Active"
              data={ddosDataPoints}
              lines={ddosLines}
              height={180}
              showGrid={true}
              showLegend={true}
            />

            <MiniTrendChart
              showAlertLight={true}
              alertLightColor="#ef4444"
              title="WAF Blocks / min"
              subtitle="1,250"
              data={wafDataPoints}
              lines={wafLines}
              height={180}
              showGrid={true}
              showLegend={false}
            />

            <MiniTrendChart
              showAlertLight={true}
              alertLightColor="#f59e0b"
              title="High-Risk Login Attempts"
              subtitle="85 Accounts"
              data={highRiskAccountsDataPoints}
              lines={highRiskAccountsLines}
              height={180}
              showGrid={false}
              showLegend={false}
            />

            <MiniTrendChart
              showAlertLight={true}
              alertLightColor="#f59e0b"
              title="High-Risk Login Attempts"
              subtitle="42 Transactions"
              data={highRiskTransactionsDataPoints}
              lines={highRiskTransactionsLines}
              height={180}
              showGrid={false}
              showLegend={false}
            />
          </div>
        </div>
      </section>

      {/* Section: TableWidget */}
      <section className={styles.section}>
        <h2>TableWidget - Dashboard Tables</h2>
        <p className={styles.sectionDesc}>
          Table component wrapped in DashboardWidgetFrame for displaying tabular data in dashboards
        </p>

        <h3 className={styles.sectionSubtitle}>Full Width Tables</h3>
        <div className={styles.gridTableFull}>
          <TableWidget
            showHeader={true}
            headerIcon="monitor_heart"
            headerTitle="System Performance Metrics"
            headerSummary="Real-time monitoring of all services"
            headerTitleSize="small"
            headerIconSize="small"
            headerColor="secondary"
            showAlertLight={true}
            alertLightColor="#ef4444"
            columns={performanceColumns}
            data={performanceMetrics}
            enableSorting
            initialSortColumn="uptime"
            initialSortDirection="asc"
            striped
            hoverable
            size="small"
            rowKey={(row) => row.id}
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Half Width Tables</h3>
        <div className={styles.gridTableHalf}>
          <TableWidget
            showHeader={true}
            headerIcon="trending_up"
            headerTitle="Sales by Region"
            headerSummary="Last 30 days performance"
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={true}
            alertLightColor="#10b981"
            columns={salesColumns}
            data={salesMetrics}
            enableSorting
            initialSortColumn="revenue"
            initialSortDirection="desc"
            striped
            hoverable
            size="small"
            rowKey={(row) => row.id}
          />

          <TableWidget
            showHeader={true}
            headerIcon="leaderboard"
            headerTitle="Top Performers"
            headerSummary="Highest conversion rates"
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={true}
            alertLightColor="#3b82f6"
            columns={salesColumns}
            data={salesMetrics.slice(0, 3)}
            striped
            hoverable
            size="small"
            rowKey={(row) => row.id}
          />
        </div>

        <h3 className={styles.sectionSubtitle}>Different States</h3>
        <div className={styles.gridTableHalf}>
          <TableWidget
            showHeader={true}
            headerIcon="hourglass_empty"
            headerTitle="Loading State"
            headerSummary="Fetching data..."
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={true}
            alertLightColor="#f59e0b"
            columns={performanceColumns}
            data={[]}
            loading={true}
          />

          <TableWidget
            showHeader={true}
            headerIcon="inbox"
            headerTitle="Empty State"
            headerSummary="No data available"
            headerTitleSize="small"
            headerIconSize="small"
            showAlertLight={false}
            columns={performanceColumns}
            data={[]}
            emptyText="No performance metrics found. All services may be offline."
          />
        </div>
      </section>
    </div>
  );
};

const DashboardWidgetsDebugPage: PageProps = {
  title: "Dashboard Widgets Debug",
  slug: "debug-dashboard-widgets",
  content: (
    <AppLayout isTesting={true}>
      <DashboardWidgetsDebug />
    </AppLayout>
  ),
};

export default DashboardWidgetsDebugPage;
