import { useState, useMemo, type Key } from 'react'
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
import { DateFilter } from '../../DateFilter'
import { getCssVar } from '../../../../styles/color-use'

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
   * Whether to show dots on the line chart
   * @default true
   */
  showDots?: boolean
  /**
   * Dot display interval (0 = show all dots, number = show every nth dot)
   * If not provided, defaults to xAxisInterval to keep dots and labels in sync
   * Only applies when showDots is true
   * @default undefined (uses xAxisInterval)
   */
  dotInterval?: number
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
  showDots = true,
  dotInterval,
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

  // Use dotInterval if provided, otherwise sync with xAxisInterval
  const effectiveDotInterval = dotInterval !== undefined 
    ? dotInterval 
    : (typeof xAxisInterval === 'number' ? xAxisInterval : 0)

  // Custom dot renderer that respects the interval and showDots setting
  const renderDot = (props: { cx?: number; cy?: number; stroke?: string; strokeWidth?: number; index?: number; key?: Key | null }) => {
    const { cx, cy, stroke, strokeWidth, index = 0, key } = props
    
    // If showDots is false, don't render any dots
    if (!showDots) {
      return <circle key={key} cx={cx} cy={cy} r={0} fill="none" stroke="none" />
    }
    
    // Only show dots at specified intervals
    if (effectiveDotInterval === 0 || index % (effectiveDotInterval + 1) === 0) {
      return (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={4}
          fill={getCssVar('colorBgMain')}
          stroke={stroke}
          strokeWidth={strokeWidth || 2}
        />
      )
    }
    
    // Return invisible dot to maintain structure
    return <circle key={key} cx={cx} cy={cy} r={0} fill="none" stroke="none" />
  }

  // Active dot renderer (always show on hover)
  const renderActiveDot = (props: { cx?: number; cy?: number; stroke?: string; strokeWidth?: number; key?: Key | null }) => {
    const { cx, cy, stroke, strokeWidth, key } = props
    return (
      <circle
        key={key}
        cx={cx}
        cy={cy}
        r={6}
        fill="#fff"
        stroke={stroke}
        strokeWidth={strokeWidth || 2}
      />
    )
  }

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
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            size="small"
          />
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
                dot={(props) => renderDot({ ...props, stroke: line.color, strokeWidth: line.strokeWidth ?? 2 })}
                activeDot={(props) => renderActiveDot({ ...props, stroke: line.color, strokeWidth: line.strokeWidth ?? 2 })}
                animationDuration={animationDuration}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

