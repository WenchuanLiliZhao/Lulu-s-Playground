import { useMemo } from 'react'
import { TrendChart, type TrendChartDataPoint } from 'lululemon-ui'
import type { ZoomLevel } from '../components/Navigation'
import {
  dailySalesData,
  dailyUserGrowthData,
  aggregateDataByZoomLevel,
  salesLines,
  userGrowthLines,
} from '../data'
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

  // Adjust X-axis display based on zoom level
  const xAxisConfig = useMemo(() => {
    switch (zoomLevel) {
      case 'day':
        return { 
          angle: -45, 
          height: 60, 
          showDots: false 
        }
      case 'week':
        return { 
          angle: -45, 
          height: 70, 
          showDots: true 
        }
      case 'month':
        return { 
          angle: -45, 
          height: 60, 
          showDots: true 
        }
      case 'quarter':
        return { 
          angle: 0, 
          height: 50, 
          showDots: true 
        }
      case 'year':
        return { 
          angle: 0, 
          height: 50, 
          showDots: true 
        }
      default:
        return { 
          angle: -45, 
          height: 60, 
          showDots: true 
        }
    }
  }, [zoomLevel])

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
            showDots={xAxisConfig.showDots}
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
            showDots={xAxisConfig.showDots}
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

