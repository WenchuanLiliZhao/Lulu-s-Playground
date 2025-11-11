import AppLayout from "../../../components/ui/AppLayout";
import type { PageProps } from "../../_page-types";
import { MetricWidget } from "../../../components/ui/forDashboard/MetricWidget";
import { MiniTrendChart } from "../../../components/ui/forDashboard/MiniTrendChart";
import { PathwayVisualization3D } from "../../../components/ui/forDashboard/PathwayVisualization3D";
import { ProgressBarChart } from "../../../components/ui/forDashboard/ProgressBarChart";
import {
  businessMetricsData,
  userJourneyData,
  pathwayNodes,
  pathwayConnections,
  pathwayViewCenter,
  appPerformanceMetrics,
  securityTrendData1,
  securityTrendData2,
  securityTrendData3,
  securityTrendData4,
  securityLines,
  networkTrendData,
  networkTrendLines,
  networkMetrics,
} from "./data";
import styles from "./styles.module.scss";

const LodaDashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      {/* Three Column Grid Layout */}
      <div className={styles.gridContainer}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          {/* Business Metrics Section */}
          <div className={styles.metricsGrid}>
            {businessMetricsData.map((metric, index) => (
              <MetricWidget
                key={index}
                icon={metric.icon}
                title={metric.title}
                value={metric.value}
                statusText={metric.statusText}
                statusColor={metric.statusColor}
                centered={true}
              />
            ))}
          </div>

          {/* User Journey */}
          <div className={styles.userJourney}>
            <ProgressBarChart
              showHeader={true}
              headerIcon="route"
              headerTitle="User Journey"
              headerSummary="Conversion funnel performance"
              headerTitleSize="small"
              headerIconSize="small"
              headerColor="secondary"
              showAlertLight={true}
              alertLightColor="#ef4444"
              items={userJourneyData}
              showPercentage={true}
              showInfo={true}
            />
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className={styles.middleColumn}>
          {/* Dashboard Title */}
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Loda Dashboard</h1>
            <p className={styles.dashboardSubtitle}>
              Real-time Performance & Security Overview
            </p>
          </div>

          {/* Pathway Visualization 3D */}
          <div className={styles.pathwaySection}>
            <PathwayVisualization3D
              nodes={pathwayNodes}
              connections={pathwayConnections}
              showHeader={true}
              headerIcon="route"
              headerTitle="System Workflow"
              headerColor="primary"
              viewCenter={pathwayViewCenter}
              gridSize={20}
              cameraDistance={18}
              autoRotate={true}
              autoRotateSpeed={0.15}
              flagHeight={2.5}
              showGrid={true}
            />
          </div>

          {/* App Performance Metrics */}
          <div className={styles.appPerformance}>
            <h3 className={styles.sectionTitle}>App Performance</h3>
            <div className={styles.performanceGrid}>
              {appPerformanceMetrics.map((metric, index) => (
                <MetricWidget
                  key={index}
                  icon={metric.icon}
                  title={metric.title}
                  value={metric.value}
                  statusText={metric.statusText}
                  statusColor={metric.statusColor}
                  centered={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          {/* Security Mini Trend Charts */}
          <div className={styles.securitySection}>
            <h3 className={styles.sectionTitle}>Security Monitoring</h3>
            <div className={styles.securityGrid}>
              <MiniTrendChart
                title="Firewall Blocks"
                subtitle="Last hour"
                data={securityTrendData1}
                lines={securityLines}
                height={140}
                showGrid={false}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
              />
              <MiniTrendChart
                title="DDoS Attacks"
                subtitle="Mitigated"
                data={securityTrendData2}
                lines={securityLines}
                height={140}
                showGrid={false}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
              />
              <MiniTrendChart
                title="Intrusion Attempts"
                subtitle="Blocked"
                data={securityTrendData3}
                lines={securityLines}
                height={140}
                showGrid={false}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
              />
              <MiniTrendChart
                title="WAF Events"
                subtitle="Filtered"
                data={securityTrendData4}
                lines={securityLines}
                height={140}
                showGrid={false}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
              />
            </div>
          </div>

          {/* Network Trend Charts and Metrics */}
          <div className={styles.networkSection}>
            <MiniTrendChart
              showHeader={true}
              headerIcon="network_check"
              headerTitle="Network Traffic"
              headerSummary="Real-time monitoring"
              headerColor="primary"
              data={networkTrendData}
              lines={networkTrendLines}
              height={240}
              showGrid={true}
              showLegend={true}
              showXAxis={true}
              showYAxis={true}
            />
            <div className={styles.networkMetrics}>
              {networkMetrics.map((metric, index) => (
                <MetricWidget
                  key={index}
                  icon={metric.icon}
                  title={metric.title}
                  value={metric.value}
                  statusText={metric.statusText}
                  statusColor={metric.statusColor}
                  centered={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LodaDashboard: PageProps = {
  title: "Loda Dashboard",
  slug: "loda-dashboard",
  content: (
    <AppLayout
      isTesting={true}
      viewportMode={["scaled-from", 1920, 1080]}
      enableFrame={true}
      rulerSizes={[64, 64, 64, 64]}
      frameBackground="var(--color-bg-sec)"
    >
      <LodaDashboardPage />
    </AppLayout>
  ),
};

export default LodaDashboard;

