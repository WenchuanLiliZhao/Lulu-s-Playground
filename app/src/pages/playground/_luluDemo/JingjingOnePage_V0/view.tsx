import { useEffect, useRef, useState } from "react";
import { WeatherWidget } from "../../../../components/ui/WeatherWidget";
import { Card } from "../../../../components/ui/Card";
import { MetricWidget } from "../../../../components/ui/forDashboard/MetricWidget";
import { SwitchableDataWidget } from "../../../../components/ui/forDashboard/SwitchableDataWidget";
import { TextWidget } from "../../../../components/ui/forDashboard/TextWidget";
import { Switch } from "../../../../components/ui/Switch";
import { TrendChart } from "../../../../components/ui/forDashboard/TrendChart";
import { FloatingActionButton } from "../../../../components/ui/FloatingActionButton";
import { ChatDialog } from "../../../../components/ui/ChatDialog";
import { TextInput } from "../../../../components/ui/TextInput";
import { Button } from "../../../../components/ui/Button";
import type { TableColumn } from "../../../../components/ui/Table";
import { IconButton } from "../../../../components/ui/IconButton";
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
import { Popup } from "../../../../components/ui/Popup";

// ============================================
// MOCK DATA - EXTRACTED TO data.ts
// ============================================

type OpportunityId =
  | "comingUp"
  | "guestBuyingOtherStores"
  | "guestTryingOn"
  | "wecomRecommendations";

const opportunityTagLabels: Record<OpportunityId, string> = {
  comingUp: "New Drop",
  guestBuyingOtherStores: "Replen",
  guestTryingOn: "Replen",
  wecomRecommendations: "New Drop",
};

const ProductTag = ({ label }: { label: string }) => (
  <div className={styles.productTag}>{label}</div>
);

export const JingjingOnePageV0View = () => {
  const [hotSellerMode, setHotSellerMode] = useState(0); // 0: XStore, 1: Omni
  const [openOpportunity, setOpenOpportunity] = useState<OpportunityId | null>(
    null
  );
  const [isWeatherPopupOpen, setIsWeatherPopupOpen] = useState(false);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const iconButtonRefs = useRef<
    Partial<Record<OpportunityId, HTMLButtonElement | null>>
  >({});

  const {
    newDrop: showComingUp,
    guestBuyingOtherStores: showGuestBuyingOtherStores,
    guestTryingOn: showGuestTryingOn,
    wecomRecommendations: showWecomRecommendations,
  } = contentDisplayBooleans;

  useEffect(() => {
    if (!openOpportunity) return;

    const visibilityMap: Record<OpportunityId, boolean> = {
      comingUp: showComingUp,
      guestBuyingOtherStores: showGuestBuyingOtherStores,
      guestTryingOn: showGuestTryingOn,
      wecomRecommendations: showWecomRecommendations,
    };

    if (!visibilityMap[openOpportunity]) {
      setOpenOpportunity(null);
    }
  }, [
    openOpportunity,
    showComingUp,
    showGuestBuyingOtherStores,
    showGuestTryingOn,
    showWecomRecommendations,
  ]);

  const handleToggleOpportunityInfo = (id: OpportunityId) => {
    setOpenOpportunity((current) => (current === id ? null : id));
  };

  // Helper function to get display style
  const getDisplayStyle = (isVisible: boolean) => {
    return isVisible ? {} : { display: "none" };
  };

  const getRandomPercentage = () => {
    return Math.floor(Math.random() * 21) + 10;
  };

  // ============================================
  // RENDER HELPERS
  // ============================================

  // TODO: Phase 4 - Extract to NavigationBar component
  // - Accept props: { storeName, date, dayOfWeek, weather }
  // - Uses WeatherWidget component (already done in Phase 1)
  const renderNavigation = () => (
    <div
      className={styles.navigation}
      style={getDisplayStyle(contentDisplayBooleans.navigation)}
    >
      <div className={styles.navLeft}>
        <img
          src="/logo/BlackWhite.svg"
          alt="Lululemon"
          className={styles.logo}
        />
        <span className={styles.storeName}>{mockNavigationData.storeName}</span>
      </div>
      <div className={styles.navMiddle}>
        <Switch
          options={["USD", "CNY"]}
          initialSelected={0}
          className={styles.navSwitch}
        />
        <Switch
          options={["EN", "ZH"]}
          initialSelected={0}
          className={styles.navSwitch}
        />
      </div>
      <div
        className={styles.navRight}
        onClick={() => setIsWeatherPopupOpen(true)}
        style={{ cursor: "pointer" }}
      >
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
        alertLightColor="var(--color-semantic-success)"
      >
        <div className={styles.performanceSnapshot}>
          <MetricWidget
            icon="dashboard"
            title="Yesterday"
            value={mockDashboardData.performanceSnapshot.yesterday.value}
            statusText={
              mockDashboardData.performanceSnapshot.yesterday.subtitle
            }
            statusColor="success"
            // sparklineData={mockDashboardData.performanceSnapshot.yesterday.sparklineData}
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
                  mockDashboardData.performanceSnapshot.yesterday.breakdown
                    .omni,
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
            // sparklineData={mockDashboardData.performanceSnapshot.todayTarget.sparklineData}
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
            sparklineData={
              mockDashboardData.performanceSnapshot.wtd.sparklineData
            }
            breakdown={[
              {
                label: "XStore",
                value:
                  mockDashboardData.performanceSnapshot.wtd.breakdown.xstore,
              },
              {
                label: "Omni",
                value: mockDashboardData.performanceSnapshot.wtd.breakdown.omni,
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
      <div
        className={styles.metricsRow}
        style={getDisplayStyle(contentDisplayBooleans.metricsRow)}
      >
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
          // sparklineData={mockDashboardData.metrics.transaction.sparklineData}
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
      <div
        className={styles.todayTargetDetail}
        style={getDisplayStyle(contentDisplayBooleans.todayTargetDetail)}
      >
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
              { label: "Table", value: "table", icon: "table_chart" },
              { label: "Chart", value: "chart", icon: "monitoring" },
            ]}
          />
        </div>
      </div>
    );
  };

  const renderMorningTargetDetail = () => {
    return (
      <>
        <div
          className={styles.targetWidgetsContainer}
          style={getDisplayStyle(contentDisplayBooleans.morningTargetDetail)}
        >
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
          height: "400px",
          minHeight: "400px",
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

      {/* Weather Forecast using TrendChart - MOVED TO POPUP */}

      {/* Sales Summary Widget at the end of dashboard widgets */}
      {renderSalesSummaryWidget()}
    </div>
  );

  // Render Weather Forecast Popup
  const renderWeatherForecastPopup = () => (
    <Popup
      isOpen={isWeatherPopupOpen}
      onClose={() => setIsWeatherPopupOpen(false)}
      variant="modal"
      className={styles.weatherPopup}
    >
      <div
        style={{
          height: "400px",
          minHeight: "400px",
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
    </Popup>
  );

  // TODO: Phase 6 - Extract to TipCard component
  // Removed: renderTipCard function (no longer needed as mockTipsData is empty)

  // Render Sales Summary Block using TextWidget
  const renderSalesSummaryWidget = () => (
    <div style={getDisplayStyle(contentDisplayBooleans.salesSummary)}>
      <TextWidget
        text={mockSalesSummaryData.summary}
        showHeader={true}
        headerTitle="📊 Sales Summary"
        headerColor="primary"
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
              <h3 className={styles.tipCardHeader}>
                🔥 Top Seller & Cross-Selling
              </h3>
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
                      <span className={styles.hotSellersMetricSeparator}>
                        •
                      </span>
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
                      <div className={styles.linkedSalesLabel}>
                        Cross Selling
                      </div>
                      <div className={styles.linkedSalesImages}>
                        {product.linkedSales.map((linkedProduct) => (
                          <div
                            key={linkedProduct.id}
                            className={styles.linkedSalesItem}
                          >
                            <div
                              className={styles.linkedSalesImageWrapper}
                              title={linkedProduct.name}
                            >
                              <img
                                src={linkedProduct.image}
                                alt={linkedProduct.name}
                                className={styles.linkedSalesImage}
                              />
                            </div>
                            <div className={styles.percentageLabel}>
                              {getRandomPercentage()}%
                            </div>
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
    id: OpportunityId,
    title: string,
    data: { introduction: string; products: ProductCard[] },
    variant: "success" | "info" | "warning" | "danger" | "default",
    isVisible: boolean
  ) => (
    <div style={getDisplayStyle(isVisible)}>
      <Card
        header={
          <div className={styles.tipCardHeaderRow}>
            <h3 className={styles.tipCardHeader}>{title}</h3>
            <IconButton
              icon="help"
              aria-label="Show opportunity tip"
              variant="ghost"
              size="small"
              ref={(node) => {
                iconButtonRefs.current[id] = node;
                if (!node && openOpportunity === id) {
                  setOpenOpportunity(null);
                }
              }}
              onClick={() => handleToggleOpportunityInfo(id)}
            />
            <Popup
              isOpen={openOpportunity === id}
              anchorEl={iconButtonRefs.current[id] ?? undefined}
              onClose={() => setOpenOpportunity(null)}
              placement="bottom-end"
              className={styles.opportunityTipPopup}
            >
              <p className={styles.opportunityTipText}>{data.introduction}</p>
            </Popup>
          </div>
        }
        body={
          <div className={styles.singleOpportunityContainer}>
            <div className={styles.productScrollContainer}>
              {data.products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImageImg}
                    />
                    <ProductTag label={opportunityTagLabels[id]} />
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.productCategory}>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </div>
                    <div className={styles.productName}>{product.name}</div>
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
      {/* 1. Hot Sellers */}
      {renderHotSellersBlock()}
      {/* 2. Product Opportunities */}
      {renderOpportunityBlock(
        "comingUp",
        "🎉 Coming Up",
        mockNewDropData,
        "default",
        showComingUp
      )}
      {renderOpportunityBlock(
        "guestBuyingOtherStores",
        "💡 Guest are buying those items in other stores",
        mockGuestBuyingOtherStoresData,
        "success",
        showGuestBuyingOtherStores
      )}
      {renderOpportunityBlock(
        "guestTryingOn",
        "💡 Guest are trying on those items in our store",
        mockGuestTryingOnData,
        "info",
        showGuestTryingOn
      )}
      {renderOpportunityBlock(
        "wecomRecommendations",
        "💬 Wecom Recommendations",
        mockWecomRecommendationsData,
        "warning",
        showWecomRecommendations
      )}
      {/* Removed: Critical Out-of-Stock (High Demand) and Overstock Opportunities */}
    </div>
  );

  // ============================================
  // CHAT BOT
  // ============================================
  const handlePresetQuestion = (question: string) => {
    setChatMessage(question);
    // Here you would typically send the message to your AI backend
    // alert(`Preset question: ${question}`);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    // Here you would typically send the message to your AI backend
    alert(`Sending message: ${chatMessage}`);
    setChatMessage("");
  };

  const renderChatDialog = () => (
    <ChatDialog
      isOpen={isChatDialogOpen}
      onClose={() => setIsChatDialogOpen(false)}
      title="AI Assistant"
      subtitle="How can I help you today?"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => handlePresetQuestion("I want to give feedback")}
            style={{ width: "100%", justifyContent: "flex-start" }}
          >
            💬 I want to give feedback
          </Button>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => handlePresetQuestion("I have a question")}
            style={{ width: "100%", justifyContent: "flex-start" }}
          >
            💡 I have a question
          </Button>
        </div>
        <div
          style={{
            padding: "12px",
            backgroundColor: "var(--color-bg-sec)",
            borderRadius: "8px",
            fontSize: "13px",
            color: "var(--color-sec)",
            lineHeight: "1.5",
          }}
        >
          Or type your message below to get started!
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <TextInput
            placeholder="Type your message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            style={{ flex: 1 }}
          />
          <Button
            variant="primary"
            size="medium"
            onClick={handleSendMessage}
            disabled={!chatMessage.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </ChatDialog>
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
      {renderWeatherForecastPopup()}
      <div style={getDisplayStyle(contentDisplayBooleans.floatingActionButton)}>
        <FloatingActionButton
          icon="smart_toy"
          onClick={() => setIsChatDialogOpen(!isChatDialogOpen)}
          tooltip="AI Assistant"
        />
      </div>
      {renderChatDialog()}
    </div>
  );
};

export default JingjingOnePageV0View;
