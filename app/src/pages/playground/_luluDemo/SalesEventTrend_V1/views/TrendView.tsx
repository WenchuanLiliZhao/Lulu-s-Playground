import { useMemo } from 'react'
import { TrendChart, type TrendChartDataPoint } from '../../../../../components/ui/forDashboard/TrendChart'
import type { ZoomLevel } from '../components/Navigation'
import {
  dailySalesData,
  dailyUserGrowthData,
  aggregateDataByZoomLevel,
  salesLines,
  userGrowthLines,
} from '../data'
import styles from './TrendView.module.scss'

/**
 * X-axis interval for day view (show every nth label)
 * Adjust this value to control label density in day zoom level
 */
const DAY_VIEW_X_AXIS_INTERVAL = 7
export interface TrendViewProps {
  zoomLevel: ZoomLevel
}

export const TrendView = ({ zoomLevel }: TrendViewProps) => {
  // Helper function to extract date from data point
  const getDateFromDataPoint = (dataPoint: TrendChartDataPoint): Date => {
    return dataPoint.date as Date
  }

  // Aggregate data based on zoom level
  const salesData = useMemo(
    () => aggregateDataByZoomLevel(dailySalesData, zoomLevel),
    [zoomLevel]
  )

  const userGrowthData = useMemo(
    () => aggregateDataByZoomLevel(dailyUserGrowthData, zoomLevel),
    [zoomLevel]
  )

  // Adjust date range based on zoom level for better visualization
  const { defaultStartDate, defaultEndDate } = useMemo(() => {
    switch (zoomLevel) {
      case 'day':
        // Show last 2 months for day view
        return {
          defaultStartDate: new Date(2024, 9, 1), // Oct 1
          defaultEndDate: new Date(2024, 10, 30),  // Nov 30
        }
      case 'week':
        // Show Q3 and Q4 for week view
        return {
          defaultStartDate: new Date(2024, 6, 1),  // Jul 1
          defaultEndDate: new Date(2024, 11, 31),  // Dec 31
        }
      case 'month':
        // Show March to September for month view
        return {
          defaultStartDate: new Date(2024, 2, 1),  // Mar 1
          defaultEndDate: new Date(2024, 8, 30),   // Sep 30
        }
      case 'quarter':
      case 'year':
        // Show full year for quarter and year views
        return {
          defaultStartDate: new Date(2024, 0, 1),  // Jan 1
          defaultEndDate: new Date(2024, 11, 31),  // Dec 31
        }
      default:
        return {
          defaultStartDate: new Date(2024, 2, 1),
          defaultEndDate: new Date(2024, 8, 30),
        }
    }
  }, [zoomLevel])

  // Adjust X-axis display based on zoom level
  const xAxisConfig = useMemo(() => {
    switch (zoomLevel) {
      case 'day':
        return { interval: DAY_VIEW_X_AXIS_INTERVAL, angle: -45, height: 60, showDots: false }
      case 'week':
        return { interval: 0, angle: -45, height: 70, showDots: true }
      case 'month':
        return { interval: 0, angle: -45, height: 60, showDots: true }
      case 'quarter':
      case 'year':
        return { interval: 0, angle: 0, height: 50, showDots: true }
      default:
        return { interval: 0, angle: -45, height: 60, showDots: true }
    }
  }, [zoomLevel])
  
  return (
    <div className={styles.container}>
      <div className={styles.chartsGrid}>
        {/* Chart 1: Sales Performance */}
        <div className={styles.chartContainer}>
          <TrendChart
            title={`2024 Sales Performance (${zoomLevel.charAt(0).toUpperCase() + zoomLevel.slice(1)} View)`}
            data={salesData}
            lines={salesLines}
            showGrid={true}
            showLegend={true}
            showDots={xAxisConfig.showDots}
            animationDuration={1500}
            xAxisInterval={xAxisConfig.interval}
            xAxisAngle={xAxisConfig.angle}
            xAxisHeight={xAxisConfig.height}
            enableDateFilter={true}
            getDateFromDataPoint={getDateFromDataPoint}
            initialStartDate={defaultStartDate}
            initialEndDate={defaultEndDate}
          />
        </div>

        {/* Chart 2: User Growth & Engagement */}
        <div className={styles.chartContainer}>
          <TrendChart
            title={`2024 User Growth & Engagement (${zoomLevel.charAt(0).toUpperCase() + zoomLevel.slice(1)} View)`}
            data={userGrowthData}
            lines={userGrowthLines}
            showGrid={true}
            showLegend={true}
            showDots={xAxisConfig.showDots}
            animationDuration={1500}
            xAxisInterval={xAxisConfig.interval}
            xAxisAngle={xAxisConfig.angle}
            xAxisHeight={xAxisConfig.height}
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

