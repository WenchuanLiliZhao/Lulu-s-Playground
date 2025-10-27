import { MetricWidget } from '../../../components/ui/forDashboard/MetricWidget'
import { ProgressBarChart, type ProgressBarItem } from '../../../components/ui/forDashboard/ProgressBarChart'
import { MiniTrendChart, type MiniTrendChartLine } from '../../../components/ui/forDashboard/MiniTrendChart'
import AppLayout from '../../../components/ui/AppLayout'
import type { PageProps } from '../../_page-types'
import styles from './styles.module.scss'

// Sample data for MetricWidget sparklines
const generateSparklineData = (count: number, trend: 'up' | 'down' | 'mixed') => {
  const data: number[] = []
  let value = Math.random() * 50 + 50

  for (let i = 0; i < count; i++) {
    if (trend === 'up') {
      value += Math.random() * 10
    } else if (trend === 'down') {
      value -= Math.random() * 8
    } else {
      value += (Math.random() - 0.5) * 15
    }
    data.push(Math.max(0, value))
  }

  return data
}

// Sample data for ProgressBarChart
const userJourneyData: ProgressBarItem[] = [
  { id: '1', label: 'Untitled Term', value: 99.9, status: 'healthy', infoText: '80ms' },
  { id: '2', label: 'Initiate Checkout', value: 99.7, status: 'healthy', infoText: '80ms' },
  { id: '3', label: 'Verify Payment', value: 92.5, status: 'warning', infoText: '80ms' },
  { id: '4', label: 'Apply Discount Code', value: 92.0, status: 'warning', infoText: '80ms' },
  { id: '5', label: 'Purchase', value: 68.5, status: 'critical', infoText: '80ms' },
  { id: '6', label: 'Complete', value: 59.1, status: 'critical', infoText: '80ms' },
]

const appServiceData: ProgressBarItem[] = [
  { id: '1', label: 'Discovery', value: 99.9, status: 'healthy', infoText: '80ms' },
  { id: '2', label: 'Interest', value: 99.7, status: 'healthy', infoText: '80ms' },
  { id: '3', label: 'Consideration', value: 92.5, status: 'warning', infoText: '80ms' },
  { id: '4', label: 'Untitled Term', value: 92.0, status: 'warning', infoText: '80ms' },
  { id: '5', label: 'Purchase', value: 59.1, status: 'critical', infoText: '80ms' },
]

// Sample data for MiniTrendChart
const generateTrendData = (count: number): number[] => {
  const data: number[] = []
  for (let i = 0; i < count; i++) {
    data.push(Math.random() * 40 + 10 + Math.sin(i / 5) * 20)
  }
  return data
}

const ddosData: MiniTrendChartLine[] = [
  {
    id: 'attack',
    name: 'Attack Traffic (Gbps)',
    data: generateTrendData(50),
    color: '#ef4444',
    strokeWidth: 2,
  },
  {
    id: 'clean',
    name: 'Clean Traffic (Gbps)',
    data: generateTrendData(50).map(v => v * 0.5),
    color: '#10b981',
    strokeWidth: 2,
  },
]

const wafData: MiniTrendChartLine[] = [
  {
    id: 'blocks',
    name: 'Blocks per minute',
    data: generateTrendData(40),
    color: '#ef4444',
    strokeWidth: 2,
  },
]

const highRiskAccountsData: MiniTrendChartLine[] = [
  {
    id: 'accounts',
    name: 'Accounts',
    data: generateTrendData(30),
    color: '#f59e0b',
    strokeWidth: 2,
  },
]

const highRiskTransactionsData: MiniTrendChartLine[] = [
  {
    id: 'transactions',
    name: 'Transactions',
    data: generateTrendData(30),
    color: '#f59e0b',
    strokeWidth: 2,
  },
]

const DashboardWidgetsDebug = () => {
  return (
    <div className={styles.container}>
      <div className={styles.debugHeader}>
        <h1>Dashboard Widgets Debug</h1>
        <p className={styles.description}>
          Testing all dashboard widget components in various sizes and configurations
        </p>
      </div>

      {/* Section: MetricWidget */}
      <section className={styles.section}>
        <h2>MetricWidget - Small Metric Cards</h2>
        <p className={styles.sectionDesc}>
          Displays key metrics with optional sparklines, change indicators, and status badges
        </p>

        <h3 className={styles.sectionSubtitle}>Standard Size (280px × 160px)</h3>
        <div className={styles.gridMetrics}>
          <MetricWidget
            icon="payments"
            title="Real-time GMV"
            value="$2,013.5 M"
            changeText="+28.4% vs last hour"
            changeType="positive"
            sparklineData={generateSparklineData(20, 'up')}
            sparklineColor="#10b981"
          />

          <MetricWidget
            icon="shopping_cart"
            title="Real-time Total Orders"
            value="1.25 M"
            changeText="28.4% vs last hour"
            changeType="negative"
            sparklineData={generateSparklineData(20, 'down')}
            sparklineColor="#ef4444"
          />

          <MetricWidget
            icon="task_alt"
            title="Overall Payment Success Rate"
            value="75.2 %"
            changeText="Success: 1,249,000"
            changeType="neutral"
            sparklineData={generateSparklineData(20, 'mixed')}
            sparklineColor="#3b82f6"
          />

          <MetricWidget
            icon="groups"
            title="Real-time GMV"
            value="8,520"
            statusText="Watching"
            statusColor="warning"
            sparklineData={generateSparklineData(20, 'up')}
            sparklineColor="#f59e0b"
          />

          <MetricWidget
            icon="person"
            title="Real-time Online Users"
            value="3.1 M"
            changeText="+28.4% vs yesterday same time"
            changeType="positive"
            sparklineData={generateSparklineData(20, 'up')}
            sparklineColor="#3b82f6"
          />

          <MetricWidget
            icon="shopping_bag"
            title="Cart Additions / min"
            value="$2,013.5 M"
            changeText="+28.4% vs last hour"
            changeType="positive"
            sparklineData={generateSparklineData(20, 'up')}
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
            sparklineData={generateSparklineData(15, 'up')}
            sparklineColor="#10b981"
          />

          <MetricWidget
            title="Orders"
            value="1.25M"
            changeText="-12.3%"
            changeType="negative"
            sparklineData={generateSparklineData(15, 'down')}
            sparklineColor="#ef4444"
          />

          <MetricWidget
            title="Success Rate"
            value="75.2%"
            statusText="OK"
            statusColor="success"
            sparklineData={generateSparklineData(15, 'mixed')}
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

        <h3 className={styles.sectionSubtitle}>Standard Size (400px × 240px)</h3>
        <div className={styles.gridTrendStandard}>
          <MiniTrendChart
            showAlertLight={false}
            title="DDOS Attack Traffic"
            subtitle="Mitigation: Active"
            lines={ddosData}
            height={180}
            showGrid={true}
            showLegend={true}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="WAF Blocks / min"
            lines={wafData}
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
            lines={highRiskAccountsData}
            height={140}
            showGrid={false}
            showLegend={false}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="High-Risk Login Attempts"
            subtitle="42 Transactions"
            lines={highRiskTransactionsData}
            height={140}
            showGrid={false}
            showLegend={false}
          />

          <MiniTrendChart
            showAlertLight={false}
            title="API Latency"
            subtitle="p95: 234ms"
            lines={[
              {
                id: 'latency',
                name: 'Latency',
                data: generateTrendData(25),
                color: '#8b5cf6',
                strokeWidth: 2,
              },
            ]}
            height={140}
            showGrid={false}
            showLegend={false}
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
              sparklineData={generateSparklineData(20, 'up')}
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
              sparklineData={generateSparklineData(20, 'down')}
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
              sparklineData={generateSparklineData(20, 'mixed')}
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
              sparklineData={generateSparklineData(20, 'up')}
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
              sparklineData={generateSparklineData(20, 'up')}
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
              sparklineData={generateSparklineData(20, 'up')}
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
              lines={ddosData}
              height={180}
              showGrid={true}
              showLegend={true}
            />

            <MiniTrendChart
              showAlertLight={true}
              alertLightColor="#ef4444"
              title="WAF Blocks / min"
              subtitle="1,250"
              lines={wafData}
              height={180}
              showGrid={true}
              showLegend={false}
            />

            <MiniTrendChart
              showAlertLight={true}
              alertLightColor="#f59e0b"
              title="High-Risk Login Attempts"
              subtitle="85 Accounts"
              lines={highRiskAccountsData}
              height={180}
              showGrid={false}
              showLegend={false}
            />

            <MiniTrendChart
              showAlertLight={true}
              alertLightColor="#f59e0b"
              title="High-Risk Login Attempts"
              subtitle="42 Transactions"
              lines={highRiskTransactionsData}
              height={180}
              showGrid={false}
              showLegend={false}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

const DashboardWidgetsDebugPage: PageProps = {
  title: 'Dashboard Widgets Debug',
  slug: 'debug-dashboard-widgets',
  content: (
    <AppLayout isTesting={true}>
      <DashboardWidgetsDebug />
    </AppLayout>
  ),
}

export default DashboardWidgetsDebugPage

