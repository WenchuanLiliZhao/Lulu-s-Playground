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
import { TREND_CHART_DEFAULTS } from '../_shared-config'
import { DateFilter } from '../../DateFilter'
import { getCssVar } from '../../../../styles/color-use'
import { useChartWidth, calculateXAxisInterval } from '../_shared-hooks'
import type { 
  BaseChartDataPoint, 
  BaseChartLine, 
  BaseChartProps 
} from '../_shared-chart-types'

export type TrendChartDataPoint = BaseChartDataPoint

export type TrendChartLine = BaseChartLine

export interface TrendChartProps extends Omit<BaseChartProps<TrendChartDataPoint>, 'data' | 'lines'> {
  /**
   * Data for the chart
   */
  data: TrendChartDataPoint[]
  /**
   * Lines to display
   */
  lines: TrendChartLine[]
  // All other props are inherited from BaseChartProps
}

export const TrendChart = ({
  title,
  data,
  lines,
  className = '',
  // Visual props
  showGrid = TREND_CHART_DEFAULTS.showGrid,
  showLegend = TREND_CHART_DEFAULTS.showLegend,
  legendPosition = TREND_CHART_DEFAULTS.legendPosition,
  animationDuration = TREND_CHART_DEFAULTS.animationDuration,
  showDots = TREND_CHART_DEFAULTS.showDots,
  dotInterval,
  // X-axis props
  showXAxis = TREND_CHART_DEFAULTS.showXAxis,
  xAxisInterval = TREND_CHART_DEFAULTS.xAxisInterval,
  targetTickCount,
  minXAxisSpacing = TREND_CHART_DEFAULTS.minXAxisSpacing,
  maxTickCount = TREND_CHART_DEFAULTS.maxTickCount,
  xAxisAngle = TREND_CHART_DEFAULTS.xAxisAngle,
  xAxisHeight = TREND_CHART_DEFAULTS.xAxisHeight,
  xAxisTickMargin = TREND_CHART_DEFAULTS.xAxisTickMargin,
  estimatedChartWidth = TREND_CHART_DEFAULTS.estimatedChartWidth,
  // Chart margins
  marginTop = TREND_CHART_DEFAULTS.marginTop,
  marginRight = TREND_CHART_DEFAULTS.marginRight,
  marginBottom = TREND_CHART_DEFAULTS.marginBottom,
  marginLeft = TREND_CHART_DEFAULTS.marginLeft,
  // Y-axis props
  showYAxis = TREND_CHART_DEFAULTS.showYAxis,
  yAxisWidth = TREND_CHART_DEFAULTS.yAxisWidth,
  yAxisOrientation = TREND_CHART_DEFAULTS.yAxisOrientation,
  yAxisTickFormatter,
  yAxisDomain,
  yAxisTickMargin = TREND_CHART_DEFAULTS.yAxisTickMargin,
  // Date filter props
  enableDateFilter = TREND_CHART_DEFAULTS.enableDateFilter,
  getDateFromDataPoint,
  initialStartDate = TREND_CHART_DEFAULTS.initialStartDate,
  initialEndDate = TREND_CHART_DEFAULTS.initialEndDate,
}: TrendChartProps) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)
  
  // Get actual chart width for responsive tick calculation
  const { width: chartWidth, refCallback } = useChartWidth()

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

  // Determine effective x-axis interval using responsive calculation
  const effectiveXAxisInterval = useMemo(() => {
    return calculateXAxisInterval(
      filteredData.length,
      chartWidth || estimatedChartWidth, // Use actual width, fallback to estimated
      xAxisInterval,
      targetTickCount,
      minXAxisSpacing,
      maxTickCount
    )
  }, [
    filteredData.length,
    chartWidth,
    estimatedChartWidth,
    xAxisInterval,
    targetTickCount,
    minXAxisSpacing,
    maxTickCount,
  ])

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
        fill={getCssVar('colorBgMain')}
        stroke={stroke}
        strokeWidth={strokeWidth || 2}
      />
    )
  }

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

      <div ref={refCallback} className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{
              top: marginTop,
              right: showLegend && legendPosition === 'right' ? 0 : marginRight,
              left: showLegend && legendPosition === 'left' ? 0 : marginLeft,
              bottom: marginBottom,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" verticalFill={[]} />}
            {showXAxis && (
              <XAxis 
                dataKey="name" 
                interval={effectiveXAxisInterval}
                angle={xAxisAngle}
                textAnchor="end"
                height={xAxisHeight}
                tickMargin={xAxisTickMargin}
              />
            )}
            {showYAxis && (
              <YAxis 
                width={yAxisWidth}
                orientation={yAxisOrientation}
                tickFormatter={yAxisTickFormatter}
                domain={yAxisDomain}
                tickMargin={yAxisTickMargin}
              />
            )}
            <Tooltip />
            {showLegend && (() => {
              const isVertical = legendPosition === 'left' || legendPosition === 'right'
              const verticalAlign = isVertical ? 'middle' : legendPosition
              const align = legendPosition === 'left' ? 'left' : legendPosition === 'right' ? 'right' : 'center'
              const layout = isVertical ? 'vertical' : 'horizontal'
              
              let wrapperStyle = {}
              if (legendPosition === 'left') {
                wrapperStyle = { paddingLeft: '0px', paddingRight: '16px' }
              } else if (legendPosition === 'right') {
                wrapperStyle = { paddingLeft: '24px', paddingRight: '0px' }
              }
              
              return (
                <Legend 
                  verticalAlign={verticalAlign}
                  align={align}
                  layout={layout}
                  height={isVertical ? undefined : 36}
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

