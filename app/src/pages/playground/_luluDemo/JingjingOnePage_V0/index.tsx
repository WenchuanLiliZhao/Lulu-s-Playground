import AppLayout from "../../../../components/ui/AppLayout";
import type { PageProps } from "../../../_page-types";
import { RichText, type RichTextContent } from "../../../../components/ui/RichText";
import { WeatherWidget } from "../../../../components/ui/WeatherWidget";
import { Card } from "../../../../components/ui/Card";
import { MetricWidget } from "../../../../components/ui/forDashboard/MetricWidget";
import { TableWidget } from "../../../../components/ui/forDashboard/TableWidget";
import { InfoPanelWidget } from "../../../../components/ui/forDashboard/InfoPanelWidget";
import type { TableColumn } from "../../../../components/ui/Table";
import {
  mockTargetTableData,
  type TargetTableRow,
  mockNavigationData,
  mockDashboardData,
  mockTipsData,
  mockSalesSummaryData,
  mockHotSellersData,
  mockCrossSellingData,
  mockProductOpportunitiesData,
  mockStockoutWecomData,
} from "./data";
import styles from "./styles.module.scss";
import { DashboardWidgetFrame } from "../../../../components/ui/forDashboard/DashboardWidgetFrame";

// ============================================
// MOCK DATA - EXTRACTED TO data.ts
// ============================================

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
          breakdown={[
            { label: "XStore", value: mockDashboardData.performanceSnapshot.yesterday.breakdown.xstore },
            { label: "Omini", value: mockDashboardData.performanceSnapshot.yesterday.breakdown.omini }
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
          breakdown={[
            { label: "XStore", value: mockDashboardData.performanceSnapshot.todayTarget.breakdown.xstore },
            { label: "Omini", value: mockDashboardData.performanceSnapshot.todayTarget.breakdown.omini }
          ]}
          // statusColor="var(--color-semantic-success)"
        />
      </div>
    </DashboardWidgetFrame>
  );

  // TODO: Phase 5 - Extract to MetricsRow component
  // - Accept props: MetricsRowData
  // NOW USING: MetricWidget with sparkline support
  const renderMetricsRow = () => {
    // Map status to MetricWidget's statusColor
    const mapStatusColor = (
      status: "success" | "info" | "danger"
    ): "success" | "warning" | "error" | "neutral" => {
      if (status === "success") return "success";
      if (status === "danger") return "error";
      return "neutral";
    };

    return (
      <div className={styles.metricsRow}>
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
          statusColor={mapStatusColor(mockDashboardData.metrics.transaction.status)}
          centered={true}
        />
        <MetricWidget
          icon="trending_up"
          title={mockDashboardData.metrics.cr.label}
          value={mockDashboardData.metrics.cr.value}
          statusText={mockDashboardData.metrics.cr.statusLabel}
          statusColor={mapStatusColor(mockDashboardData.metrics.cr.status)}
          centered={true}
        />
      </div>
    );
  };

  // TODO: Phase 5 - Extract to PeakHoursPanel and CategoryMixPanel components
  // - Uses InfoPanelWidget component (already done in Phase 1)
  const renderInfoPanels = () => (
    <div className={styles.infoPanelsRow}>
      <InfoPanelWidget
        icon="🕐"
        title="Peak Hours"
        items={[
          {
            label: "Best CR",
            value: `${mockDashboardData.peakHours.bestCR.time} (${mockDashboardData.peakHours.bestCR.rate})`,
            highlight: true,
          },
          {
            label: "Low CR",
            value: `${mockDashboardData.peakHours.lowCR.time} (${mockDashboardData.peakHours.lowCR.rate})`,
          },
          { label: "Rush", value: mockDashboardData.peakHours.rush },
        ]}
      />
      <InfoPanelWidget
        icon="🛍️"
        title="Category Mix"
        items={[
          {
            label: "Men's",
            value: `${mockDashboardData.categoryMix.mens.percentage} ${mockDashboardData.categoryMix.mens.trend}`,
          },
          {
            label: "Women's",
            value: mockDashboardData.categoryMix.womens.percentage,
          },
          {
            label: "Traffic",
            value: `${mockDashboardData.categoryMix.traffic.count} (+${mockDashboardData.categoryMix.traffic.change})`,
          },
        ]}
      />
    </div>
  );

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
        key: "sales",
        header: "Sales",
        render: (row) => `$${row.sales.toLocaleString()}`,
        width: "120px",
        align: "right",
      },
      {
        key: "target",
        header: "Target",
        render: (row) => `$${row.target.toLocaleString()}`,
        width: "120px",
        align: "right",
      },
      {
        key: "progress",
        header: "Progress",
        render: (row) => {
          const progressStyle = {
            color:
              row.status === "success"
                ? "var(--color-semantic-success)"
                : row.status === "warning"
                ? "var(--color-semantic-warning)"
                : "var(--color-semantic-error)",
            fontWeight: "bold" as const,
          };
          return <span style={progressStyle}>{row.progress}%</span>;
        },
        width: "100px",
        align: "center",
      },
    ];

    return (
      <div className={styles.todayTargetDetail}>
        {/* Main Target Table - Full Width */}
        <div className={styles.targetChartContainer}>
          <TableWidget
            columns={columns}
            data={mockTargetTableData}
            showHeader={true}
            // headerIcon="schedule"
            headerTitle={
              <div className={styles.targetDetailHeader}>
                <h2 className={styles.targetDetailTitle}>Today's Target</h2>
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
            striped={true}
            hoverable={true}
            bordered={true}
            size="medium"
            rowKey={(row) => row.id}
          />
        </div>
      </div>
    );
  };

  const renderMorningTargetDetail = () => {
    return (
      <>
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
      {renderInfoPanels()}
      {renderTodayTargetDetail()}
      {renderMorningTargetDetail()}
    </div>
  );

  // TODO: Phase 6 - Extract to TipCard component
  // - Accept props: TipCard
  // - Category determines border color from design system
  // TODO: Phase 6 - Extract to BlockRenderer system
  // - Dispatches to ParagraphBlock, ProductCardBlock, ListBlock
  const renderTipCard = (tip: (typeof mockTipsData)[0]) => {
    const variant: "default" | "info" | "warning" | "danger" =
      (tip as { variant?: "default" | "info" | "warning" | "danger" }).variant ?? "default";

    return (
      <Card
        key={tip.id}
        header={<h3 className={styles.tipCardHeader}>{tip.label}</h3>}
        body={
          <div className={styles.tipCardBody}>
            {"body" in tip && tip.body ? (
              <RichText content={tip.body as RichTextContent[]} />
            ) : "items" in tip && tip.items ? (
              <div className={styles.inventoryList}>
                {tip.items.map((item, idx) => (
                  <div key={idx} className={styles.inventoryItem}>
                    <span className={styles.inventoryProduct}>
                      {item.product}
                    </span>
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

  // Render Sales Summary Block
  const renderSalesSummaryBlock = () => (
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
  );

  // Render Hot Sellers Block
  const renderHotSellersBlock = () => (
    <Card
      header={<h3 className={styles.tipCardHeader}>🔥 Hot Sellers</h3>}
      body={
        <div className={styles.hotSellersList}>
          {mockHotSellersData.map((product, index) => (
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
                <div className={styles.hotSellersName}>{product.productName}</div>
                <div className={styles.hotSellersMetrics}>
                  <span className={styles.hotSellersMetricItem}>
                    <span className={styles.hotSellersMetricLabel}>Sold:</span>
                    <span className={styles.hotSellersMetricValue}>{product.unitsSold}</span>
                  </span>
                  <span className={styles.hotSellersMetricSeparator}>•</span>
                  <span className={styles.hotSellersMetricItem}>
                    <span className={styles.hotSellersMetricLabel}>Stock:</span>
                    <span className={styles.hotSellersMetricValue}>{product.inventory}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      variant="default"
      borderPosition="left"
      className={styles.tipCard}
    />
  );

  // Render Cross Selling Opportunities Block
  const renderCrossSellingBlock = () => (
    <Card
      header={<h3 className={styles.tipCardHeader}>🎨 Cross Selling Opportunities</h3>}
      body={
        <div className={styles.recommendationSetsContainer}>
          {mockCrossSellingData.map((set) => (
            <div key={set.id} className={styles.recommendationSet}>
              <h4 className={styles.setTitle}>{set.title}</h4>
              <p className={styles.setDescription}>{set.description}</p>
              <div className={styles.productScrollContainer}>
                {set.products.map((product) => (
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
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </div>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productColor}>{product.color}</div>
                      <div className={styles.productPrice}>{product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
      variant="info"
      borderPosition="left"
      className={styles.tipCard}
    />
  );

  // Render Product Opportunities Block
  const renderProductOpportunitiesBlock = () => (
    <Card
      header={<h3 className={styles.tipCardHeader}>💡 Product Opportunities</h3>}
      body={
        <div className={styles.singleOpportunityContainer}>
          <p className={styles.opportunityIntro}>
            {mockProductOpportunitiesData.introduction}
          </p>
          <div className={styles.productScrollContainer}>
            {mockProductOpportunitiesData.products.map((product) => (
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
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
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
      variant="success"
      borderPosition="left"
      className={styles.tipCard}
    />
  );

  // Render Stockout but Wecom Opportunities Block
  const renderStockoutWecomBlock = () => (
    <Card
      header={<h3 className={styles.tipCardHeader}>💬 Stockout but Wecom Opportunities</h3>}
      body={
        <div className={styles.singleOpportunityContainer}>
          <p className={styles.opportunityIntro}>
            {mockStockoutWecomData.introduction}
          </p>
          <div className={styles.productScrollContainer}>
            {mockStockoutWecomData.products.map((product) => (
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
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
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
      variant="warning"
      borderPosition="left"
      className={styles.tipCard}
    />
  );

  // TODO: Phase 4 - Extract to TipsSection component
  const renderTips = () => (
    <div className={styles.tipsSection}>
      <h2 className={styles.tipsSectionTitle}>Actionable Tips</h2>
      {/* 1. Sales Summary */}
      {renderSalesSummaryBlock()}
      {/* 2. Hot Sellers */}
      {renderHotSellersBlock()}
      {/* 3. Cross Selling Opportunities */}
      {renderCrossSellingBlock()}
      {/* 4. Product Opportunities */}
      {renderProductOpportunitiesBlock()}
      {/* 5. Stockout but Wecom Opportunities */}
      {renderStockoutWecomBlock()}
      {/* 6. Critical Out-of-Stock (High Demand) */}
      {/* 7. Overstock Opportunities */}
      {mockTipsData.map((tip) => renderTipCard(tip))}
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
  title: "JingJing One Page V0",
  slug: "jingjing-one-page-v0",
  content: (
    <AppLayout isTesting={true} viewportMode={"default"}>
      <JingjingOnePageV0 />
    </AppLayout>
  ),
};

export default JingjingOnePage_V0;
