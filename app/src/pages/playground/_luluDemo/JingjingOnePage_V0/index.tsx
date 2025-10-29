import AppLayout from '../../../../components/ui/AppLayout';
import type { PageProps } from '../../../_page-types';
import { RichText } from '../../../../components/ui/RichText';
import { WeatherWidget } from '../../../../components/ui/WeatherWidget';
import { InfoPanel } from '../../../../components/ui/InfoPanel';
import { Card } from '../../../../components/ui/Card';
import { MetricWidget } from '../../../../components/ui/forDashboard/MetricWidget';
import { MiniTrendChart } from '../../../../components/ui/forDashboard';
import type { MiniTrendChartLine } from '../../../../components/ui/forDashboard';
import styles from './styles.module.scss';

// ============================================
// MOCK DATA - PHASE 2 EXTRACTION
// TODO: Phase 2 - Move to data/types.ts
// TODO: Phase 2 - Move to data/navigationData.ts
// TODO: Phase 2 - Move to data/dashboardData.ts
// TODO: Phase 2 - Move to data/tipsData.ts
// ============================================

const mockNavigationData = {
  storeName: "Vancouver - Robson Street",
  date: "Oct 29, 2025",
  dayOfWeek: "Wednesday",
  weather: {
    condition: "Sunny",
    temperature: 18,
  }
};

const mockDashboardData = {
  performanceSnapshot: {
    yesterday: {
      value: "$24,580",
      subtitle: "103% of target"
    },
    todayTarget: {
      value: "$25,200",
      subtitle: "+2.5% vs yesterday"
    }
  },
  metrics: {
    upt: {
      label: "UPT",
      value: "2.3",
      status: "success" as const,
      statusLabel: "↑ Above",
      sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.3]
    },
    conversionRate: {
      label: "Conv. Rate",
      value: "68%",
      status: "info" as const,
      statusLabel: "On Track",
      sparklineData: [62, 64, 65, 67, 66, 68, 69, 68]
    },
    aur: {
      label: "AUR",
      value: "$105",
      status: "danger" as const,
      statusLabel: "↓ Below",
      sparklineData: [115, 112, 110, 108, 107, 105, 103, 105]
    }
  },
  peakHours: {
    bestCR: { time: "2-4PM", rate: "78%" },
    lowCR: { time: "10-12PM", rate: "52%" },
    rush: "5-7PM"
  },
  categoryMix: {
    mens: { percentage: "58%", trend: "↑5%" },
    womens: { percentage: "42%" },
    traffic: { count: 342, change: 12 }
  },
  todayTargetDetail: {
    total: "$25,200",
    currentProgress: "$18,500",
    morning: "$11,340",
    evening: "$13,860",
    sparklineData: {
      morning: [8200, 8800, 9500, 10200, 10800, 11100, 11340],
      evening: [9800, 10400, 11000, 11600, 12300, 13100, 13860]
    },
    // Today's hourly sales data (10 AM - 6 PM so far)
    trendData: [
      { id: 'h10', name: '10 AM', sales: 1200 },
      { id: 'h11', name: '11 AM', sales: 1850 },
      { id: 'h12', name: '12 PM', sales: 2400 },
      { id: 'h13', name: '1 PM', sales: 2100 },
      { id: 'h14', name: '2 PM', sales: 2800 },
      { id: 'h15', name: '3 PM', sales: 3200 },
      { id: 'h16', name: '4 PM', sales: 2900 },
      { id: 'h17', name: '5 PM', sales: 3500 },
      { id: 'h18', name: '6 PM', sales: 2550 },
    ]
  }
};

const mockTipsData = [
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
      { text: " Focus on cross-selling accessories with main products." }
    ]
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
      { text: " today, ensure adequate staffing during this period." }
    ]
  },
  {
    id: "vm-001",
    category: "vm",
    label: "VM Tips",
    body: [
      { text: "The following products need " },
      { text: "immediate attention", styles: { bold: true, color: "orange" } },
      { text: " for visual merchandising display updates." }
    ]
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
      { text: "." }
    ]
  },
  {
    id: "out-of-stock-001",
    category: "danger" as const,
    label: "🔴 Critical Out-of-Stock (High Demand)",
    items: [
      { product: "Slim Fit Chino - Navy (32x32)", detail: "Reorder!" },
      { product: "Oxford Shirt - White (M)", detail: "2 days lead" },
      { product: "Leather Sneakers - White (9.5)", detail: "Popular size" }
    ]
  },
  {
    id: "overstock-001",
    category: "warning" as const,
    label: "🟡 Overstock Opportunities",
    items: [
      { product: "Winter Jacket - Black (XL)", detail: "18 pcs" },
      { product: "Wool Scarf - Grey", detail: "25 pcs" },
      { product: "Flannel Shirt - Red (S)", detail: "12 pcs" }
    ]
  }
];

// eslint-disable-next-line react-refresh/only-export-components
const JingjingOnePageV0 = () => {
  // ============================================
  // RENDER HELPERS
  // ============================================

  // TODO: Phase 4 - Extract to NavigationBar component
  // - Accept props: { storeName, date, dayOfWeek, weather }
  // - Uses WeatherWidget component (already done in Phase 1)
  const renderNavigation = () => (
    <div className={styles.navigation}>
      <div className={styles.navLeft}>
        <img src="/logo/BlackNoText.svg" alt="Lululemon" className={styles.logo} />
        <span className={styles.storeName}>{mockNavigationData.storeName}</span>
      </div>
      <div className={styles.navRight}>
        <span className={styles.date}>{mockNavigationData.date}</span>
        <span className={styles.day}>{mockNavigationData.dayOfWeek}</span>
        <WeatherWidget
          condition={mockNavigationData.weather.condition}
          temperature={mockNavigationData.weather.temperature}
          size="medium"
        />
      </div>
    </div>
  );

  // TODO: Phase 5 - Extract to PerformanceSnapshot component
  // - Accept props: { yesterday: MetricValue, todayTarget: MetricValue }
  // - Style must use var(--daydream-5) and var(--daydream-6)
  const renderPerformanceSnapshot = () => (
    <div className={styles.performanceSnapshot}>
      <div className={styles.snapshotCard}>
        <div className={styles.snapshotLabel}>Yesterday's Performance</div>
        <div className={styles.snapshotValue}>{mockDashboardData.performanceSnapshot.yesterday.value}</div>
        <div className={styles.snapshotSubtitle}>{mockDashboardData.performanceSnapshot.yesterday.subtitle}</div>
      </div>
      <div className={styles.snapshotCard}>
        <div className={styles.snapshotLabel}>Today's Target</div>
        <div className={styles.snapshotValue}>{mockDashboardData.performanceSnapshot.todayTarget.value}</div>
        <div className={styles.snapshotSubtitle}>{mockDashboardData.performanceSnapshot.todayTarget.subtitle}</div>
      </div>
    </div>
  );

  // TODO: Phase 5 - Extract to MetricsRow component
  // - Accept props: MetricsRowData
  // NOW USING: MetricWidget with sparkline support
  const renderMetricsRow = () => {
    // Map status to MetricWidget's statusColor
    const mapStatusColor = (status: 'success' | 'info' | 'danger'): 'success' | 'warning' | 'error' | 'neutral' => {
      if (status === 'success') return 'success';
      if (status === 'danger') return 'error';
      return 'neutral';
    };

    return (
      <div className={styles.metricsRow}>
        <MetricWidget
          icon="shopping_bag"
          title={mockDashboardData.metrics.upt.label}
          value={mockDashboardData.metrics.upt.value}
          statusText={mockDashboardData.metrics.upt.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.upt.status)}
          sparklineData={mockDashboardData.metrics.upt.sparklineData}
          sparklineColor="var(--color-semantic-success)"
        />
        <MetricWidget
          icon="trending_up"
          title={mockDashboardData.metrics.conversionRate.label}
          value={mockDashboardData.metrics.conversionRate.value}
          statusText={mockDashboardData.metrics.conversionRate.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.conversionRate.status)}
          sparklineData={mockDashboardData.metrics.conversionRate.sparklineData}
          sparklineColor="var(--color-semantic-active)"
        />
        <MetricWidget
          icon="payments"
          title={mockDashboardData.metrics.aur.label}
          value={mockDashboardData.metrics.aur.value}
          statusText={mockDashboardData.metrics.aur.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.aur.status)}
          sparklineData={mockDashboardData.metrics.aur.sparklineData}
          sparklineColor="var(--color-semantic-error)"
        />
      </div>
    );
  };

  // TODO: Phase 5 - Extract to PeakHoursPanel and CategoryMixPanel components
  // - Uses InfoPanel component (already done in Phase 1)
  const renderInfoPanels = () => (
    <div className={styles.infoPanelsRow}>
      <InfoPanel
        icon="🕐"
        title="Peak Hours"
        items={[
          { label: "Best CR", value: `${mockDashboardData.peakHours.bestCR.time} (${mockDashboardData.peakHours.bestCR.rate})`, highlight: true },
          { label: "Low CR", value: `${mockDashboardData.peakHours.lowCR.time} (${mockDashboardData.peakHours.lowCR.rate})` },
          { label: "Rush", value: mockDashboardData.peakHours.rush }
        ]}
      />
      <InfoPanel
        icon="🛍️"
        title="Category Mix"
        items={[
          { label: "Men's", value: `${mockDashboardData.categoryMix.mens.percentage} ${mockDashboardData.categoryMix.mens.trend}` },
          { label: "Women's", value: mockDashboardData.categoryMix.womens.percentage },
          { label: "Traffic", value: `${mockDashboardData.categoryMix.traffic.count} (+${mockDashboardData.categoryMix.traffic.change})` }
        ]}
      />
    </div>
  );

  // TODO: Phase 5 - Extract to TodayTargetDetail component
  // - Accept props: TodayTargetDetail
  // - Style must use var(--wilderness-4) and var(--wilderness-5)
  // NOW USING: MiniTrendChart for hourly sales, MetricWidget for breakdown
  const renderTodayTargetDetail = () => {
    // Single line showing today's hourly sales
    const trendLines: MiniTrendChartLine[] = [
      {
        dataKey: 'sales',
        name: 'Hourly Sales',
        color: '#ef4444', // Red color
        strokeWidth: 3,
      },
    ];

    return (
      <div className={styles.todayTargetDetail}>
        {/* Main Target Chart - Full Width */}
        <div className={styles.targetChartContainer}>
          <MiniTrendChart
            data={mockDashboardData.todayTargetDetail.trendData}
            lines={trendLines}
            showGrid={true}
            showLegend={true}
            showYAxis={true}
            yAxisTickFormatter={(value: number) => `$${(value / 1000).toFixed(1)}k`}
            xAxisAngle={0}
            xAxisHeight={40}
            marginBottom={5}
            headerTitle={
              <div className={styles.targetDetailHeader}>
                <h2 className={styles.targetDetailTitle}>Today's Target</h2>
                <p className={styles.targetDetailSubtitle}>{mockDashboardData.todayTargetDetail.currentProgress} <span className={styles.targetDetailSubtitleSeparator}>/</span> {mockDashboardData.todayTargetDetail.total}</p>
              </div>
            }
            headerColor={"primary"}
            showHeader={true}
            className={styles.targetTrendChart}
          />
        </div>
        
        {/* Morning & Evening Targets - Side by Side */}
        <div className={styles.targetWidgetsContainer}>
          <MetricWidget
            icon="wb_twilight"
            title="Morning Target"
            value={mockDashboardData.todayTargetDetail.morning}
            statusText="45% of total"
            statusColor="neutral"
            // sparklineData={mockDashboardData.todayTargetDetail.sparklineData.morning}
          />
          <MetricWidget
            icon="nights_stay"
            title="Evening Target"
            value={mockDashboardData.todayTargetDetail.evening}
            statusText="55% of total"
            statusColor="neutral"
            // sparklineData={mockDashboardData.todayTargetDetail.sparklineData.evening}
            // sparklineColor="rgba(255, 255, 255, 0.6)"
          />
        </div>
      </div>
    );
  };

  // TODO: Phase 4 - Extract to DashboardSection component
  const renderDashboard = () => (
    <div className={styles.dashboardSection}>
      {renderPerformanceSnapshot()}
      {renderMetricsRow()}
      {renderInfoPanels()}
      {renderTodayTargetDetail()}
    </div>
  );

  // TODO: Phase 6 - Extract to TipCard component
  // - Accept props: TipCard
  // - Category determines border color from design system
  // TODO: Phase 6 - Extract to BlockRenderer system
  // - Dispatches to ParagraphBlock, ProductCardBlock, ListBlock
  const renderTipCard = (tip: typeof mockTipsData[0]) => {
    // Determine card variant based on category
    let variant: 'default' | 'info' | 'warning' | 'danger' = 'default';
    if (tip.category === 'danger') variant = 'danger';
    else if (tip.category === 'warning') variant = 'warning';
    else if (tip.category === 'sales' || tip.category === 'vm') variant = 'info';

    return (
      <Card
        key={tip.id}
        header={<h3 className={styles.tipCardHeader}>{tip.label}</h3>}
        body={
          <div className={styles.tipCardBody}>
            {'body' in tip && tip.body ? (
              <RichText content={tip.body} />
            ) : 'items' in tip && tip.items ? (
              <div className={styles.inventoryList}>
                {tip.items.map((item, idx) => (
                  <div key={idx} className={styles.inventoryItem}>
                    <span className={styles.inventoryProduct}>{item.product}</span>
                    <span className={styles.inventoryDetail}>
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        }
        variant={variant}
        borderPosition="left"
        className={styles.tipCard}
      />
    );
  };

  // TODO: Phase 4 - Extract to TipsSection component
  const renderTips = () => (
    <div className={styles.tipsSection}>
      <h2 className={styles.tipsSectionTitle}>Actionable Tips</h2>
      {mockTipsData.map(tip => renderTipCard(tip))}
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className={styles.page}>
      {renderNavigation()}
      <div className={styles.content}>
        {renderDashboard()}
        {renderTips()}
      </div>
    </div>
  );
};

const JingjingOnePage_V0: PageProps = {
  title: 'JingJing One Page V0',
  slug: 'jingjing-one-page-v0',
  content: (
    <AppLayout isTesting={false} viewportMode={"default"}>
      <JingjingOnePageV0 />
    </AppLayout>
  ),
};

export default JingjingOnePage_V0;

