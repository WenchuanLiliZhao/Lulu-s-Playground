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
import { MINI_TREND_CHART_DEFAULTS } from './_defaults'
import { DashboardHeaderElement, DashboardAlertLightElement } from '../_shared-elements'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'
import { DateFilter } from '../../DateFilter'
import { getCssVar } from '../../../../styles/color-use'

export interface MiniTrendChartDataPoint {
  name: string
  id?: string
  date?: Date
  [key: string]: string | number | Date | undefined
}

export interface MiniTrendChartLine {
  dataKey: string
  name: string
  color: string
  strokeWidth?: number
}

export interface MiniTrendChartProps extends DashboardCommonProps {
  /**
   * Chart title (internal header, used when showHeader is false)
   */
  title?: string
  /**
   * Subtitle/additional info (internal header, used when showHeader is false)
   */
  subtitle?: string
  /**
   * Data for the chart
   */
  data: MiniTrendChartDataPoint[]
  /**
   * Lines to display
   */
  lines: MiniTrendChartLine[]
  /**
   * Chart height
   * @default 180
   */
  height?: number
  /**
   * Show grid
   * @default false
   */
  showGrid?: boolean
  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean
  /**
   * Legend position
   * @default 'top'
   */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * Animation duration in ms
   * @default 1000
   */
  animationDuration?: number
  /**
   * X-axis tick interval (0 = show all, 'preserveStartEnd' = auto with start/end, number = skip)
   * If set to 'auto', will calculate based on minXAxisSpacing
   * @default 'auto'
   */
  xAxisInterval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | 'auto'
  /**
   * Minimum spacing between x-axis ticks in pixels (used when xAxisInterval is 'auto')
   * @default 8
   */
  minXAxisSpacing?: number
  /**
   * Estimated chart width in pixels for automatic interval calculation
   * @default 400
   */
  estimatedChartWidth?: number
  /**
   * Whether to show dots on the line chart
   * @default false
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
   * @default 0
   */
  xAxisAngle?: number
  /**
   * X-axis height to accommodate rotated labels
   * @default 40
   */
  xAxisHeight?: number
  /**
   * Chart margin bottom (distance from X-axis labels to SVG bottom)
   * @default 0
   */
  marginBottom?: number
  /**
   * X-axis tick margin (distance from axis line to labels)
   * @default 5
   */
  xAxisTickMargin?: number
  /**
   * Show Y-axis
   * @default false
   */
  showYAxis?: boolean
  /**
   * Show X-axis
   * @default true
   */
  showXAxis?: boolean
  /**
   * Enable date range filtering
   * @default false
   */
  enableDateFilter?: boolean
  /**
   * Function to extract date from data point (required if enableDateFilter is true)
   */
  getDateFromDataPoint?: (dataPoint: MiniTrendChartDataPoint) => Date
  /**
   * Initial start date for date filter
   */
  initialStartDate?: Date | null
  /**
   * Initial end date for date filter
   */
  initialEndDate?: Date | null
}

export const MiniTrendChart = ({
  // Dashboard common props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_DEFAULTS.headerIconSize,
  headerSummarySize,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  className = '',
  
  // MiniTrendChart specific props
  title,
  subtitle,
  data,
  lines,
  height = MINI_TREND_CHART_DEFAULTS.height,
  showGrid = MINI_TREND_CHART_DEFAULTS.showGrid,
  showLegend = MINI_TREND_CHART_DEFAULTS.showLegend,
  legendPosition = MINI_TREND_CHART_DEFAULTS.legendPosition,
  animationDuration = MINI_TREND_CHART_DEFAULTS.animationDuration,
  xAxisInterval = 'auto',
  minXAxisSpacing = MINI_TREND_CHART_DEFAULTS.minXAxisSpacing,
  estimatedChartWidth = MINI_TREND_CHART_DEFAULTS.estimatedChartWidth,
  showDots = MINI_TREND_CHART_DEFAULTS.showDots,
  dotInterval,
  xAxisAngle = MINI_TREND_CHART_DEFAULTS.xAxisAngle,
  xAxisHeight = MINI_TREND_CHART_DEFAULTS.xAxisHeight,
  marginBottom = MINI_TREND_CHART_DEFAULTS.marginBottom,
  xAxisTickMargin = MINI_TREND_CHART_DEFAULTS.xAxisTickMargin,
  showYAxis = MINI_TREND_CHART_DEFAULTS.showYAxis,
  showXAxis = MINI_TREND_CHART_DEFAULTS.showXAxis,
  enableDateFilter = false,
  getDateFromDataPoint,
  initialStartDate = null,
  initialEndDate = null,
}: MiniTrendChartProps) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)

  const containerClasses = [styles['card-container'], className]
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

  // Determine effective x-axis interval
  const effectiveXAxisInterval = useMemo(() => {
    if (xAxisInterval === 'auto') {
      const dataPointCount = filteredData.length
      if (dataPointCount <= 1) return 0
      
      // Calculate available space per data point if we show all
      const spacePerPoint = estimatedChartWidth / (dataPointCount - 1)
      
      // If space is sufficient, show all points
      if (spacePerPoint >= minXAxisSpacing) {
        return 0
      }
      
      // Calculate how many points we need to skip to meet minimum spacing
      const interval = Math.ceil(minXAxisSpacing / spacePerPoint) - 1
      
      return Math.max(1, interval)
    }
    return xAxisInterval
  }, [xAxisInterval, filteredData.length, minXAxisSpacing, estimatedChartWidth])

  // Use dotInterval if provided, otherwise sync with effectiveXAxisInterval
  const effectiveDotInterval = dotInterval !== undefined 
    ? dotInterval 
    : (typeof effectiveXAxisInterval === 'number' ? effectiveXAxisInterval : 0)

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
          r={3}
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
        r={5}
        fill={getCssVar('colorBgMain')}
        stroke={stroke}
        strokeWidth={strokeWidth || 2}
      />
    )
  }

  return (
    <div className={containerClasses}>
      {/* Alert Light */}
      {showAlertLight && (
        <DashboardAlertLightElement
          color={alertLightColor}
          className={styles['alert-light']}
        />
      )}
      
      {/* Dashboard Header */}
      {showHeader && (
        <DashboardHeaderElement
          icon={headerIcon}
          title={headerTitle}
          summary={headerSummary}
          titleSize={headerTitleSize}
          iconSize={headerIconSize}
          summarySize={headerSummarySize}
          color={headerColor}
          className={styles['dashboard-header']}
          topClassName={styles['dashboard-header-top']}
          iconClassName={styles['dashboard-header-icon']}
          titleClassName={styles['dashboard-header-title']}
          summaryClassName={styles['dashboard-header-summary']}
        />
      )}
      
      {/* Internal Header (alternative to dashboard header) */}
      {!showHeader && (
        <div className={styles.header}>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          
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
      )}

      <div className={styles.chartWrapper} style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{
              top: 5,
              right: showLegend && legendPosition === 'right' ? 0 : 10,
              left: showLegend && legendPosition === 'left' ? 0 : 0,
              bottom: marginBottom,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" verticalFill={[]} />}
            {showXAxis && (
              <XAxis 
                dataKey="name" 
                interval={effectiveXAxisInterval}
                angle={xAxisAngle}
                textAnchor={xAxisAngle === 0 ? "middle" : "end"}
                height={xAxisHeight}
                tickMargin={xAxisTickMargin}
              />
            )}
            {showYAxis && <YAxis width={40} orientation="left" />}
            <Tooltip />
            {showLegend && (() => {
              const isVertical = legendPosition === 'left' || legendPosition === 'right'
              const verticalAlign = isVertical ? 'middle' : legendPosition
              const align = legendPosition === 'left' ? 'left' : legendPosition === 'right' ? 'right' : 'center'
              const layout = isVertical ? 'vertical' : 'horizontal'
              
              let wrapperStyle = {}
              if (legendPosition === 'left') {
                wrapperStyle = { paddingLeft: '0px', paddingRight: '12px' }
              } else if (legendPosition === 'right') {
                wrapperStyle = { paddingLeft: '12px', paddingRight: '0px' }
              }
              
              return (
                <Legend 
                  verticalAlign={verticalAlign}
                  align={align}
                  layout={layout}
                  height={isVertical ? undefined : 30}
                  wrapperStyle={wrapperStyle}
                />
              )
            })()}
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
