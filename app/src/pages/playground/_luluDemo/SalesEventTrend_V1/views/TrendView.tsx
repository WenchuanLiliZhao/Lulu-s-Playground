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
import { calcGridSpace } from './gridSpaceUtils'
import styles from './TrendView.module.scss'

export interface TrendViewProps {
  zoomLevel: ZoomLevel
}

export const TrendView = ({ zoomLevel }: TrendViewProps) => {
  // Helper function to extract date from data point
  const getDateFromDataPoint = (dataPoint: TrendChartDataPoint): Date => {
    return dataPoint.date as Date
  }

  // Global default date range (independent of zoom level)
  // This ensures user's time interval selection persists across zoom level changes
  const defaultStartDate = useMemo(() => new Date(2025, 0, 1), []) // Jan 1, 2023
  const defaultEndDate = useMemo(() => new Date(2025, 11, 31), []) // Dec 31, 2025

  // Aggregate data based on zoom level
  const salesData = useMemo(
    () => aggregateDataByZoomLevel(dailySalesData, zoomLevel),
    [zoomLevel]
  )

  const userGrowthData = useMemo(
    () => aggregateDataByZoomLevel(dailyUserGrowthData, zoomLevel),
    [zoomLevel]
  )

  // Calculate appropriate x-axis interval based on data density
  // Typical chart width is ~800px for this layout
  const calculatedInterval = useMemo(() => {
    return calcGridSpace(salesData.length, 800)
  }, [salesData.length])

  // Adjust X-axis display based on zoom level
  const xAxisConfig = useMemo(() => {
    switch (zoomLevel) {
      case 'day':
        // Use calculated interval for day view to handle variable data density
        return { 
          interval: calculatedInterval, 
          angle: -45, 
          height: 60, 
          showDots: false 
        }
      case 'week':
        return { 
          interval: calculatedInterval, 
          angle: -45, 
          height: 70, 
          showDots: true 
        }
      case 'month':
        return { 
          interval: calculatedInterval, 
          angle: -45, 
          height: 60, 
          showDots: true 
        }
      case 'quarter':
        return { 
          interval: 0, // Quarters are few enough to show all
          angle: 0, 
          height: 50, 
          showDots: true 
        }
      case 'year':
        return { 
          interval: 0, // Only 3 years, show all
          angle: 0, 
          height: 50, 
          showDots: true 
        }
      default:
        return { 
          interval: calculatedInterval, 
          angle: -45, 
          height: 60, 
          showDots: true 
        }
    }
  }, [zoomLevel, calculatedInterval])

  // Generate chart title suffix based on zoom level
  const zoomLevelLabel = useMemo(() => {
    return zoomLevel.charAt(0).toUpperCase() + zoomLevel.slice(1)
  }, [zoomLevel])
  
  return (
    <div className={styles.container}>
      <div className={styles.chartsGrid}>
        {/* Chart 1: Sales Performance */}
        <div className={styles.chartContainer}>
          <TrendChart
            key={`sales-${zoomLevel}`}
            title={`Sales Performance (${zoomLevelLabel} View)`}
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
            key={`user-growth-${zoomLevel}`}
            title={`User Growth & Engagement (${zoomLevelLabel} View)`}
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

