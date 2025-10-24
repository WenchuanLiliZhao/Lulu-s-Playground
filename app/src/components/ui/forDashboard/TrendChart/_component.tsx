import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import styles from './_styles.module.scss'
import { TREND_CHART_DEFAULTS } from './_defaults'
import { DatePicker } from '../../DatePicker'

export interface TrendChartDataPoint {
  name: string
  id?: string
  date?: Date
  [key: string]: string | number | Date | undefined
}

export interface TrendChartLine {
  dataKey: string
  name: string
  color: string
  strokeWidth?: number
}

export interface TrendChartProps {
  /**
   * Chart title
   */
  title?: string
  /**
   * Data for the chart
   */
  data: TrendChartDataPoint[]
  /**
   * Lines to display
   */
  lines: TrendChartLine[]
  /**
   * Show grid
   * @default true
   */
  showGrid?: boolean
  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean
  /**
   * Animation duration in ms
   * @default 1500
   */
  animationDuration?: number
  /**
   * X-axis tick interval (0 = show all, 'preserveStartEnd' = auto with start/end, number = skip)
   * @default 0
   */
  xAxisInterval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd'
  /**
   * X-axis label angle in degrees
   * @default -45
   */
  xAxisAngle?: number
  /**
   * X-axis height to accommodate rotated labels
   * @default 80
   */
  xAxisHeight?: number
  /**
   * Chart margin bottom (distance from X-axis labels to SVG bottom)
   * @default 0
   */
  marginBottom?: number
  /**
   * X-axis tick margin (distance from axis line to labels)
   * @default 8
   */
  xAxisTickMargin?: number
  /**
   * Optional className
   */
  className?: string
  /**
   * Enable date range filtering
   * @default false
   */
  enableDateFilter?: boolean
  /**
   * Function to extract date from data point (required if enableDateFilter is true)
   */
  getDateFromDataPoint?: (dataPoint: TrendChartDataPoint) => Date
  /**
   * Initial start date for date filter
   */
  initialStartDate?: Date | null
  /**
   * Initial end date for date filter
   */
  initialEndDate?: Date | null
}

export const TrendChart = ({
  title,
  data,
  lines,
  showGrid = TREND_CHART_DEFAULTS.showGrid,
  showLegend = TREND_CHART_DEFAULTS.showLegend,
  animationDuration = TREND_CHART_DEFAULTS.animationDuration,
  xAxisInterval = TREND_CHART_DEFAULTS.xAxisInterval,
  xAxisAngle = TREND_CHART_DEFAULTS.xAxisAngle,
  xAxisHeight = TREND_CHART_DEFAULTS.xAxisHeight,
  marginBottom = TREND_CHART_DEFAULTS.marginBottom,
  xAxisTickMargin = TREND_CHART_DEFAULTS.xAxisTickMargin,
  className = '',
  enableDateFilter = false,
  getDateFromDataPoint,
  initialStartDate = null,
  initialEndDate = null,
}: TrendChartProps) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)

  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(' ')

  // Filter data based on selected date range
  const filteredData = useMemo(() => {
    if (!enableDateFilter || !getDateFromDataPoint) {
      return data
    }

    if (!startDate && !endDate) {
      return data
    }

    return data.filter((dataPoint) => {
      const pointDate = getDateFromDataPoint(dataPoint)
      
      if (startDate && endDate) {
        return pointDate >= startDate && pointDate <= endDate
      } else if (startDate) {
        return pointDate >= startDate
      } else if (endDate) {
        return pointDate <= endDate
      }
      
      return true
    })
  }, [data, startDate, endDate, enableDateFilter, getDateFromDataPoint])

  return (
    <div className={containerClasses}>
      <div className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
        
        {enableDateFilter && (
          <div className={styles.dateFilters}>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              placeholder="Start date"
              size="small"
            />
            <span className={styles.dateSeparator}>to</span>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              placeholder="End date"
              size="small"
            />
          </div>
        )}
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: marginBottom,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" verticalFill={[]} />}
            <XAxis 
              dataKey="name" 
              interval={xAxisInterval}
              angle={xAxisAngle}
              textAnchor="end"
              height={xAxisHeight}
              tickMargin={xAxisTickMargin}
            />
            <YAxis width={60} orientation="left" />
            <Tooltip />
            {showLegend && <Legend verticalAlign="top" height={36} />}
            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth ?? 2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                animationDuration={animationDuration}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

