import AppLayout from '../../../../components/ui/AppLayout'
import { TrendChart, type TrendChartDataPoint } from '../../../../components/ui/forDashboard/TrendChart'
import type { PageProps } from '../../../_page-types'
import {
  quarterlySalesData,
  quarterlySalesLines,
  userGrowthData,
  userGrowthLines,
} from './data/chartData'
import styles from './styles.module.scss'

const TrendChartDemo_V1 = () => {
  // Helper function to extract date from data point
  const getDateFromDataPoint = (dataPoint: TrendChartDataPoint): Date => {
    return dataPoint.date as Date
  }

  // Default date range: March 1, 2024 to September 30, 2024
  const defaultStartDate = new Date(2024, 2, 1) // March 1, 2024
  const defaultEndDate = new Date(2024, 8, 30)   // September 30, 2024

  return (
    <div className={styles.container}>
      <div className={styles.chartsGrid}>
        {/* Chart 1: Quarterly Sales Performance */}
        <div className={styles.chartContainer}>
          <TrendChart
            title="2024 Sales Performance"
            data={quarterlySalesData}
            lines={quarterlySalesLines}
            showGrid={true}
            showLegend={true}
            animationDuration={1500}
            xAxisInterval={0}
            xAxisAngle={-45}
            xAxisHeight={60}
            enableDateFilter={true}
            getDateFromDataPoint={getDateFromDataPoint}
            initialStartDate={defaultStartDate}
            initialEndDate={defaultEndDate}
          />
        </div>

        {/* Chart 2: User Growth & Engagement */}
        <div className={styles.chartContainer}>
          <TrendChart
            title="2024 User Growth & Engagement"
            data={userGrowthData}
            lines={userGrowthLines}
            showGrid={true}
            showLegend={true}
            animationDuration={1500}
            xAxisInterval={0}
            xAxisAngle={-45}
            xAxisHeight={60}
            enableDateFilter={true}
            getDateFromDataPoint={getDateFromDataPoint}
            initialStartDate={defaultStartDate}
            initialEndDate={defaultEndDate}
          />
        </div>
      </div>
    </div>
  )
}

const TrendChartDemoPage_V1: PageProps = {
  title: 'TrendChart Demo V1',
  slug: 'trend-chart-demo-v1',
  content: (
    <AppLayout isTesting={true} viewportMode={["scaled-from", 1920, 1080]}>
      <TrendChartDemo_V1 />
    </AppLayout>
  ),
}

export default TrendChartDemoPage_V1

