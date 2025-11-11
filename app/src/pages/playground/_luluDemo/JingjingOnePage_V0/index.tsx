import { useState } from "react";
import AppLayout from "../../../../components/ui/AppLayout";
import type { PageProps } from "../../../_page-types";
import { WeatherWidget } from "../../../../components/ui/WeatherWidget";
import { Card } from "../../../../components/ui/Card";
import { MetricWidget } from "../../../../components/ui/forDashboard/MetricWidget";
import { SwitchableDataWidget } from "../../../../components/ui/forDashboard/SwitchableDataWidget";
import { Switch } from "../../../../components/ui/Switch";
import { TrendChart } from "../../../../components/ui/forDashboard/TrendChart";
import { FloatingActionButton } from "../../../../components/ui/FloatingActionButton";
import type { TableColumn } from "../../../../components/ui/Table";
import {
  mockTargetTableData,
  type TargetTableRow,
  mockNavigationData,
  mockDashboardData,
  mockSalesSummaryData,
  mockHotSellersData,
  mockGuestBuyingOtherStoresData,
  mockGuestTryingOnData,
  mockWecomRecommendationsData,
  mockNewDropData,
  mockWeeklyRhythmChartData,
  mockWeatherForecastChartData,
} from "./data";
import type { ProductCard } from "./data";
import styles from "./styles.module.scss";
import { DashboardWidgetFrame } from "../../../../components/ui/forDashboard/DashboardWidgetFrame";
import { contentDisplayBooleans } from "./display";

// ============================================
// MOCK DATA - EXTRACTED TO data.ts
// ============================================

// eslint-disable-next-line react-refresh/only-export-components
const JingjingOnePageV0 = () => {
  const [hotSellerMode, setHotSellerMode] = useState(0); // 0: XStore, 1: Omni
  
  // Helper function to get display style
  const getDisplayStyle = (isVisible: boolean) => {
    return isVisible ? {} : { display: "none" };
  };
  
  // ============================================
  // RENDER HELPERS
  // ============================================

  // TODO: Phase 4 - Extract to NavigationBar component
  // - Accept props: { storeName, date, dayOfWeek, weather }
  // - Uses WeatherWidget component (already done in Phase 1)
  const renderNavigation = () => (
    <div className={styles.navigation} style={getDisplayStyle(contentDisplayBooleans.navigation)}>
      <div className={styles.navLeft}>
        <img
          src="/logo/BlackWhite.svg"
          alt="Lululemon"
          className={styles.logo}
        />
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

  const renderPerformanceSnapshotA = () => (
    <div style={getDisplayStyle(contentDisplayBooleans.performanceSnapshot)}>
      <DashboardWidgetFrame
        showHeader={true}
        headerTitle="🎯 Performance Snapshot"
        // headerIcon="dashboard"
        headerColor="primary"
        showAlertLight={true}
        alertLightColor="var(--color-semantic-success)"
      >
      <div className={styles.performanceSnapshot}>
        <MetricWidget
          icon="dashboard"
          title="Yesterday"
          value={mockDashboardData.performanceSnapshot.yesterday.value}
          statusText={mockDashboardData.performanceSnapshot.yesterday.subtitle}
          statusColor="success"
          sparklineData={mockDashboardData.performanceSnapshot.yesterday.sparklineData}
          breakdown={[
            {
              label: "XStore",
              value:
                mockDashboardData.performanceSnapshot.yesterday.breakdown
                  .xstore,
            },
            {
              label: "Omni",
              value:
                mockDashboardData.performanceSnapshot.yesterday.breakdown.omni,
            },
          ]}
          // statusColor="var(--color-semantic-success)"
        />
        <MetricWidget
          icon="dashboard"
          title="Today"
          value={mockDashboardData.performanceSnapshot.todayTarget.value}
          statusText={
            mockDashboardData.performanceSnapshot.todayTarget.subtitle
          }
          statusColor="warning"
          sparklineData={mockDashboardData.performanceSnapshot.todayTarget.sparklineData}
          breakdown={[
            {
              label: "XStore",
              value:
                mockDashboardData.performanceSnapshot.todayTarget.breakdown
                  .xstore,
            },
            {
              label: "Omni",
              value:
                mockDashboardData.performanceSnapshot.todayTarget.breakdown
                  .omni,
            },
          ]}
          // statusColor="var(--color-semantic-success)"
        />
        <MetricWidget
          icon="calendar_today"
          title="WTD"
          value={mockDashboardData.performanceSnapshot.wtd.value}
          statusText={mockDashboardData.performanceSnapshot.wtd.subtitle}
          statusColor="success"
          sparklineData={mockDashboardData.performanceSnapshot.wtd.sparklineData}
          breakdown={[
            {
              label: "XStore",
              value:
                mockDashboardData.performanceSnapshot.wtd.breakdown.xstore,
            },
            {
              label: "Omni",
              value:
                mockDashboardData.performanceSnapshot.wtd.breakdown.omni,
            },
          ]}
        />
      </div>
    </DashboardWidgetFrame>
    </div>
  );

  // TODO: Phase 5 - Extract to MetricsRow component
  // - Accept props: MetricsRowData
  // NOW USING: MetricWidget with sparkline support
  const renderMetricsRow = () => {
    // Map status to MetricWidget's statusColor
    const mapStatusColor = (
      status: "success" | "info" | "danger" | "warning"
    ): "success" | "warning" | "error" | "neutral" => {
      if (status === "success") return "success";
      if (status === "danger") return "error";
      if (status === "warning") return "warning";
      return "neutral";
    };

    return (
      <div className={styles.metricsRow} style={getDisplayStyle(contentDisplayBooleans.metricsRow)}>
        <MetricWidget
          icon="receipt_long"
          title={mockDashboardData.metrics.txn.label}
          value={mockDashboardData.metrics.txn.value}
          statusText={mockDashboardData.metrics.txn.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.txn.status)}
          centered={true}
        />
        <MetricWidget
          icon="shopping_bag"
          title={mockDashboardData.metrics.upt.label}
          value={mockDashboardData.metrics.upt.value}
          statusText={mockDashboardData.metrics.upt.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.upt.status)}
          centered={true}
        />
        <MetricWidget
          icon="payments"
          title={mockDashboardData.metrics.aur.label}
          value={mockDashboardData.metrics.aur.value}
          statusText={mockDashboardData.metrics.aur.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.aur.status)}
          centered={true}
        />
        <MetricWidget
          icon="point_of_sale"
          title={mockDashboardData.metrics.transaction.label}
          value={mockDashboardData.metrics.transaction.value}
          statusText={mockDashboardData.metrics.transaction.statusLabel}
          statusColor={mapStatusColor(
            mockDashboardData.metrics.transaction.status
          )}
          sparklineData={mockDashboardData.metrics.transaction.sparklineData}
          centered={true}
        />
        <MetricWidget
          icon="trending_up"
          title={mockDashboardData.metrics.cr.label}
          value={mockDashboardData.metrics.cr.value}
          statusText={mockDashboardData.metrics.cr.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.cr.status)}
          sparklineData={mockDashboardData.metrics.cr.sparklineData}
          centered={true}
        />
      </div>
    );
  };

  // TODO: Phase 5 - Extract to TodayTargetDetail component
  // - Accept props: TodayTargetDetail
  // - Style must use var(--wilderness-4) and var(--wilderness-5)
  // NOW USING: TableWidget for hourly sales breakdown
  const renderTodayTargetDetail = () => {
    // Define table columns
    const columns: TableColumn<TargetTableRow>[] = [
      {
        key: "time",
        header: "Time",
        render: (row) => row.time,
        width: "120px",
        align: "left",
      },
      {
        key: "netSales",
        header: "Net Sales",
        render: (row) => `¥${row.netSales.achieve.toLocaleString()}`,
        width: "120px",
        align: "left",
      },
      {
        key: "plan",
        header: "Hourly Fcst",
        render: (row) => `¥${row.plan.achieve.toLocaleString()}`,
        width: "120px",
        align: "left",
      },
      {
        key: "progress",
        header: "to Plan%",
        render: (row) => {
          const totalAchieve = row.netSales.achieve + row.plan.achieve;
          const totalGoal = row.netSales.goal + row.plan.goal;
          const progress =
            totalGoal > 0 ? Math.round((totalAchieve / totalGoal) * 100) : 0;

          const progressStyle = {
            color:
              row.status === "success"
                ? "var(--color-semantic-success)"
                : row.status === "warning"
                ? "var(--color-semantic-warning)"
                : "var(--color-semantic-error)",
            fontWeight: "bold" as const,
          };
          return <span style={progressStyle}>{progress}%</span>;
        },
        width: "100px",
        align: "left",
      },
    ];

    return (
      <div className={styles.todayTargetDetail} style={getDisplayStyle(contentDisplayBooleans.todayTargetDetail)}>
        {/* Main Target Widget - Switchable between Table and Chart */}
        <div className={styles.targetChartContainer}>
          <SwitchableDataWidget
            widgetId="today-target-detail"
            showHeader={true}
            headerTitle={
              <div className={styles.targetDetailHeader}>
                <h2 className={styles.targetDetailTitle}>Today's Plan</h2>
                <p className={styles.targetDetailSubtitle}>
                  {mockDashboardData.todayTargetDetail.currentProgress}{" "}
                  <span className={styles.targetDetailSubtitleSeparator}>
                    /
                  </span>{" "}
                  {mockDashboardData.todayTargetDetail.total}
                </p>
              </div>
            }
            headerColor="primary"
            initialMode="table"
            tableConfig={{
              columns,
              data: mockTargetTableData,
              striped: true,
              hoverable: true,
              bordered: true,
              size: "medium",
              rowKey: (row) => row.id,
            }}
            chartConfig={{
              multiSeries: mockDashboardData.todayTargetDetail.chartMultiSeries,
              height: 300,
              showGrid: true,
              showLegend: true,
              showXAxis: true,
              showYAxis: true,
            }}
            onModeChange={(mode) => {
              console.log(`Today's Plan view switched to: ${mode}`);
            }}
          toggleOptions={[
            { label: 'Table', value: 'table', icon: 'table_chart' },
            { label: 'Chart', value: 'chart', icon: 'monitoring' },
          ]}
          />
        </div>
      </div>
    );
  };

  const renderMorningTargetDetail = () => {
    return (
      <>
        <div className={styles.targetWidgetsContainer} style={getDisplayStyle(contentDisplayBooleans.morningTargetDetail)}>
          <MetricWidget
            icon="wb_twilight"
            title="Morning Plan"
            value={mockDashboardData.todayTargetDetail.morning.plan}
            statusText={`Actual: ${mockDashboardData.todayTargetDetail.morning.actual} • to Plan: ${mockDashboardData.todayTargetDetail.morning.toPlanPercent}`}
            statusColor="neutral"
            // sparklineData={mockDashboardData.todayTargetDetail.sparklineData.morning}
          />
          <MetricWidget
            icon="nights_stay"
            title="Evening Plan"
            value={mockDashboardData.todayTargetDetail.evening.plan}
            statusText={`Actual: ${mockDashboardData.todayTargetDetail.evening.actual} • to Plan: ${mockDashboardData.todayTargetDetail.evening.toPlanPercent}`}
            statusColor="neutral"
          />
        </div>
      </>
    );
  };

  // TODO: Phase 4 - Extract to DashboardSection component
  const renderDashboard = () => (
    <div className={styles.dashboardSection}>
      {renderPerformanceSnapshotA()}
      {renderMetricsRow()}
      {renderTodayTargetDetail()}
      {renderMorningTargetDetail()}
      
      {/* Weekly Rhythm using TrendChart */}
      <div 
        style={{
          ...getDisplayStyle(contentDisplayBooleans.weeklyRhythm),
          height: '400px',
          minHeight: '400px',
        }}
      >
        <TrendChart
          title="Weekly Rhythm"
          showHeader={true}
          headerIcon="calendar_month"
          headerColor="primary"
          multiSeries={mockWeeklyRhythmChartData}
          showGrid={true}
          showLegend={false}
          yAxisTickFormatter={(value) => `${value}%`}
          barSize={40}
        />
      </div>
      
      {/* Weather Forecast using TrendChart */}
      <div 
        style={{
          ...getDisplayStyle(contentDisplayBooleans.weatherForecast),
          height: '400px',
          minHeight: '400px',
        }}
      >
        <TrendChart
          title="10-Day Weather Forecast"
          showHeader={true}
          headerIcon="wb_sunny"
          headerColor="primary"
          multiSeries={mockWeatherForecastChartData}
          showGrid={true}
          showLegend={false}
          yAxisTickFormatter={(value) => `${value}°C`}
        />
      </div>
    </div>
  );

  // TODO: Phase 6 - Extract to TipCard component
  // Removed: renderTipCard function (no longer needed as mockTipsData is empty)

  // Render Sales Summary Block
  const renderSalesSummaryBlock = () => (
    <div style={getDisplayStyle(contentDisplayBooleans.salesSummary)}>
      <Card
        header={<h3 className={styles.tipCardHeader}>📊 Sales Summary</h3>}
        body={
          <div className={styles.salesSummaryBody}>
            <p className={styles.salesSummaryText}>
              {mockSalesSummaryData.summary}
            </p>
          </div>
        }
        variant="default"
        borderPosition="left"
        className={styles.tipCard}
      />
    </div>
  );

  // Render Hot Sellers Block
  const renderHotSellersBlock = () => {
    const dataToRender =
      hotSellerMode === 0 ? mockHotSellersData.xstore : mockHotSellersData.omni;

    return (
      <div style={getDisplayStyle(contentDisplayBooleans.hotSellers)}>
        <Card
          header={
            <div className={styles.hotSellersHeader}>
              <h3 className={styles.tipCardHeader}>🔥 Top Seller & Cross-Selling</h3>
              <Switch
                options={["XStore", "Omni"]}
                selectedIndex={hotSellerMode}
                onChange={(index) => setHotSellerMode(index)}
              />
            </div>
          }
          body={
            <div className={styles.hotSellersList}>
              {dataToRender.map((product, index) => (
                <div key={product.id} className={styles.hotSellersItem}>
                  <div className={styles.hotSellersRank}>#{index + 1}</div>
                  <div className={styles.hotSellersImage}>
                    <img
                      src={product.image}
                      alt={product.productName}
                      className={styles.hotSellersImageImg}
                    />
                  </div>
                  <div className={styles.hotSellersInfo}>
                    <div className={styles.hotSellersName}>
                      {product.productName}
                    </div>
                    <div className={styles.hotSellersMetrics}>
                      <span className={styles.hotSellersMetricItem}>
                        <span className={styles.hotSellersMetricLabel}>
                          Sold:
                        </span>
                        <span className={styles.hotSellersMetricValue}>
                          {product.unitsSold}
                        </span>
                      </span>
                      <span className={styles.hotSellersMetricSeparator}>•</span>
                      <span className={styles.hotSellersMetricItem}>
                        <span className={styles.hotSellersMetricLabel}>
                          On Hand:
                        </span>
                        <span className={styles.hotSellersMetricValue}>
                          {product.inventory}
                        </span>
                      </span>
                    </div>
                  </div>
                  {product.linkedSales && product.linkedSales.length > 0 && (
                    <div className={styles.linkedSalesContainer}>
                      <div className={styles.linkedSalesLabel}>Cross Selling</div>
                      <div className={styles.linkedSalesImages}>
                        {product.linkedSales.map((linkedProduct) => (
                          <div 
                            key={linkedProduct.id} 
                            className={styles.linkedSalesImageWrapper}
                            title={linkedProduct.name}
                          >
                            <img
                              src={linkedProduct.image}
                              alt={linkedProduct.name}
                              className={styles.linkedSalesImage}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          }
          variant="default"
          borderPosition="left"
          className={styles.tipCard}
        />
      </div>
    );
  };

  // Generic block renderer for product opportunities
  const renderOpportunityBlock = (
    title: string,
    data: { introduction: string; products: ProductCard[] },
    variant: "success" | "info" | "warning" | "danger" | "default",
    isVisible: boolean
  ) => (
    <div style={getDisplayStyle(isVisible)}>
      <Card
        header={<h3 className={styles.tipCardHeader}>{title}</h3>}
        body={
          <div className={styles.singleOpportunityContainer}>
            <p className={styles.opportunityIntro}>{data.introduction}</p>
            <div className={styles.productScrollContainer}>
              {data.products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImageImg}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.productCategory}>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </div>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productColor}>{product.color}</div>
                    <div className={styles.productPrice}>{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        variant={variant}
        borderPosition="left"
        className={styles.tipCard}
      />
    </div>
  );

  // TODO: Phase 4 - Extract to TipsSection component
  const renderTips = () => (
    <div className={styles.tipsSection}>
      <h2 className={styles.tipsSectionTitle}>Tips</h2>
      {/* 1. Sales Summary */}
      {renderSalesSummaryBlock()}
      {/* 2. Hot Sellers */}
      {renderHotSellersBlock()}
      {/* 3. Product Opportunities */}
      {renderOpportunityBlock(
        "🎉 Coming Up",
        mockNewDropData,
        "default",
        contentDisplayBooleans.newDrop
      )}
      {renderOpportunityBlock(
        "💡 Guest are buying those items in other stores",
        mockGuestBuyingOtherStoresData,
        "success",
        contentDisplayBooleans.guestBuyingOtherStores
      )}
      {renderOpportunityBlock(
        "💡 Guest are trying on those items in our store",
        mockGuestTryingOnData,
        "info",
        contentDisplayBooleans.guestTryingOn
      )}
      {renderOpportunityBlock(
        "💬 4. Wecom Recommendations",
        mockWecomRecommendationsData,
        "warning",
        contentDisplayBooleans.wecomRecommendations
      )}
      {/* Removed: Critical Out-of-Stock (High Demand) and Overstock Opportunities */}
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
      <div style={getDisplayStyle(contentDisplayBooleans.floatingActionButton)}>
        <FloatingActionButton
          icon="smart_toy"
          onClick={() => alert("AI assistant clicked!")}
          tooltip="AI Assistant"
        />
      </div>
    </div>
  );
};

const JingjingOnePage_V0: PageProps = {
  title: "JingJing One Page V0",
  slug: "tech-data-one-page-numbers-all-in-one",
  content: (
    <AppLayout 
      isTesting={true} 
      viewportMode={["scaled-from", 1800, 1200]}
      enableFrame={true}
      rulerSizes={[64, 64, 64, 64]}
      frameBackground="var(--color-abssy)"
    >
      <JingjingOnePageV0 />
    </AppLayout>
  ),
};

export default JingjingOnePage_V0;
