import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  type TooltipProps as RechartsTooltipProps,
} from 'recharts'
import styles from './_styles.module.scss'
import { COLUMN_CHART_DEFAULTS, DASHBOARD_DEFAULTS } from '../_shared-config'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import { useChartWidth } from '../_shared-hooks'
import type { 
  BaseChartDataPoint,
  DashboardCommonProps,
  ChartXAxisProps,
  ChartYAxisProps,
  ChartVisualProps,
} from '../_shared-chart-types'

/**
 * Data point for waterfall chart
 */
export interface WaterfallChartDataPoint extends BaseChartDataPoint {
  /** Incremental value (can be positive or negative) */
  value: number
  /** Optional color override (CSS color value) */
  color?: string
  /** Optional additional data for tooltip */
  [key: string]: string | number | Date | undefined
}

/**
 * Processed data point with cumulative calculations
 */
interface ProcessedWaterfallDataPoint extends WaterfallChartDataPoint {
  /** Starting position for stacking */
  start: number
  /** Absolute value for bar rendering */
  absValue: number
  /** Calculated color for the bar */
  calculatedColor: string
}

/**
 * Core props for WaterfallChart (without dashboard frame)
 */
export interface WaterfallChartCoreProps
  extends Omit<ChartXAxisProps, 'showXAxis'>,
    ChartYAxisProps,
    Omit<ChartVisualProps, 'showLegend' | 'showDots' | 'dotInterval'> {
  /**
   * Data for the chart
   */
  data: WaterfallChartDataPoint[]
  
  /**
   * Chart height in pixels
   * @default 300
   */
  height?: number
  
  /**
   * Default bar color for positive values
   * @default var(--wilderness-4)
   */
  positiveColor?: string
  
  /**
   * Default bar color for negative values
   * @default var(--hot-heat-4)
   */
  negativeColor?: string
  
  /**
   * Show value labels on bars
   * @default true
   */
  showLabels?: boolean
  
  /**
   * Label formatter function
   * @default (value) => `${value}`
   */
  labelFormatter?: (value: number) => string
  
  /**
   * Label font size in pixels
   * @default 11
   */
  labelFontSize?: number
  
  /**
   * Custom tooltip renderer
   */
  customTooltip?: React.ComponentType<RechartsTooltipProps<number, string>>
  
  /**
   * Optional className for the container
   */
  className?: string
  
  /**
   * Show X-axis
   * @default true
   */
  showXAxis?: boolean
  
  /**
   * Bar size (width) in pixels
   * @default undefined (auto-calculated)
   */
  barSize?: number
  
  /**
   * Gap between bars in the same category
   * @default 4
   */
  barGap?: number
  
  /**
   * Gap between bar categories (percentage or pixels)
   * @default '20%'
   */
  barCategoryGap?: string | number
  
  /**
   * Corner radius for bars [topLeft, topRight, bottomRight, bottomLeft]
   * @default [4, 4, 4, 4]
   */
  radius?: [number, number, number, number] | number
}

/**
 * Full WaterfallChart props with dashboard frame
 */
export interface WaterfallChartProps
  extends WaterfallChartCoreProps,
    DashboardCommonProps {
  /**
   * Chart title
   */
  title?: string
}

// Component-specific defaults
const COMPONENT_DEFAULTS = {
  positiveColor: 'var(--wilderness-4)',
  negativeColor: 'var(--hot-heat-4)',
  showLabels: true,
  labelFormatter: (value: number) => `${value > 0 ? '+' : ''}${value}`,
  labelFontSize: 11,
}

/**
 * Custom tooltip props type
 */
interface CustomTooltipProps extends RechartsTooltipProps<number, string> {
  payload?: Array<{
    payload: ProcessedWaterfallDataPoint
  }>
}

/**
 * Default tooltip component
 */
const DefaultTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null
  
  const data = payload[0]?.payload
  if (!data) return null
  
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipHeader}>{data.name}</div>
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>Value:</span>
          <span className={styles.tooltipValue}>{data.value > 0 ? '+' : ''}{data.value}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Custom label component for bars
 * Uses inline style for reliable fontSize rendering in SVG
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLabel = (props: any) => {
  const { x, y, width, value, height, formatter, fontSize = 11 } = props
  
  // Type guards
  if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number' || typeof height !== 'number') return null
  if (!value || value === 0) return null
  
  // Position label above or below bar depending on value sign
  const isPositive = value > 0
  const yPos = isPositive ? y - 8 : y + height + 16
  
  return (
    <text 
      x={x + width / 2} 
      y={yPos} 
      fill="var(--color-main)" 
      textAnchor="middle"
      style={{
        fontSize: `${fontSize}px`,
        fontFamily: 'var(--ff-sans)',
        fontWeight: 500,
      }}
    >
      {formatter ? formatter(value) : value}
    </text>
  )
}

/**
 * Process waterfall data with cumulative calculations
 */
const processWaterfallData = (
  data: WaterfallChartDataPoint[],
  positiveColor: string,
  negativeColor: string
): ProcessedWaterfallDataPoint[] => {
  let cumulative = 0
  
  return data.map((entry) => {
    const start = entry.value >= 0 ? cumulative : cumulative + entry.value
    cumulative += entry.value
    
    const color = entry.color || (entry.value >= 0 ? positiveColor : negativeColor)
    
    return {
      ...entry,
      start,
      absValue: Math.abs(entry.value),
      calculatedColor: color,
    }
  })
}

/**
 * WaterfallChartCore - Core chart component without DashboardWidgetFrame
 * Use this when you want to embed the chart in a custom container
 */
export const WaterfallChartCore = ({
  data,
  height = COLUMN_CHART_DEFAULTS.height,
  positiveColor = COMPONENT_DEFAULTS.positiveColor,
  negativeColor = COMPONENT_DEFAULTS.negativeColor,
  showLabels = COMPONENT_DEFAULTS.showLabels,
  labelFormatter = COMPONENT_DEFAULTS.labelFormatter,
  labelFontSize = COMPONENT_DEFAULTS.labelFontSize,
  customTooltip,
  className = '',
  // Visual props
  showGrid = COLUMN_CHART_DEFAULTS.showGrid,
  animationDuration = COLUMN_CHART_DEFAULTS.animationDuration,
  // X-axis props
  showXAxis = COLUMN_CHART_DEFAULTS.showXAxis,
  xAxisAngle = COLUMN_CHART_DEFAULTS.xAxisAngle,
  xAxisHeight = COLUMN_CHART_DEFAULTS.xAxisHeight,
  xAxisTickMargin = COLUMN_CHART_DEFAULTS.xAxisTickMargin,
  // Chart margins
  marginTop = COLUMN_CHART_DEFAULTS.marginTop,
  marginRight = COLUMN_CHART_DEFAULTS.marginRight,
  marginBottom = COLUMN_CHART_DEFAULTS.marginBottom,
  marginLeft = COLUMN_CHART_DEFAULTS.marginLeft,
  // Y-axis props
  showYAxis = COLUMN_CHART_DEFAULTS.showYAxis,
  yAxisWidth = COLUMN_CHART_DEFAULTS.yAxisWidth,
  yAxisOrientation = COLUMN_CHART_DEFAULTS.yAxisOrientation,
  yAxisTickFormatter,
  yAxisDomain,
  yAxisTickMargin = COLUMN_CHART_DEFAULTS.yAxisTickMargin,
  // Bar props
  barSize = COLUMN_CHART_DEFAULTS.barSize,
  barGap = COLUMN_CHART_DEFAULTS.barGap,
  barCategoryGap = COLUMN_CHART_DEFAULTS.barCategoryGap,
  radius = [4, 4, 4, 4],
}: WaterfallChartCoreProps) => {
  const { refCallback } = useChartWidth()
  
  // Process data with cumulative calculations
  const processedData = useMemo(() => {
    return processWaterfallData(data, positiveColor, negativeColor)
  }, [data, positiveColor, negativeColor])
  
  const TooltipComponent = customTooltip || DefaultTooltip
  
  return (
    <div ref={refCallback} className={`${styles.chartWrapper} ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={processedData}
          margin={{
            top: marginTop + (showLabels ? 20 : 0), // Extra space for labels above bars
            right: marginRight,
            left: marginLeft,
            bottom: marginBottom,
          }}
          barSize={barSize}
          barGap={barGap}
          barCategoryGap={barCategoryGap}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          {showXAxis && (
            <XAxis 
              dataKey="name"
              angle={xAxisAngle}
              textAnchor={xAxisAngle === 0 ? "middle" : xAxisAngle < 0 ? "end" : "start"}
              height={xAxisHeight}
              tickMargin={xAxisTickMargin}
              axisLine={{ strokeWidth: 1 }}
              tickLine={false}
            />
          )}
          {showYAxis && (
            <YAxis 
              width={yAxisWidth}
              orientation={yAxisOrientation}
              tickFormatter={yAxisTickFormatter}
              domain={yAxisDomain}
              tickMargin={yAxisTickMargin}
              axisLine={false}
              tickLine={false}
            />
          )}
          <Tooltip content={<TooltipComponent />} cursor={{ fill: 'var(--color-bg-sec-trans)', opacity: 0.5 }} />
          
          {/* Invisible bar to create the starting position */}
          <Bar 
            dataKey="start" 
            fill="transparent" 
            stackId="waterfall"
            animationDuration={0}
          />
          
          {/* Visible bar showing the actual value */}
          <Bar
            dataKey="absValue"
            stackId="waterfall"
            animationDuration={animationDuration}
            radius={radius}
          >
            {showLabels && (
              <LabelList 
                dataKey="value" 
                content={(props) => (
                  <CustomLabel {...props} formatter={labelFormatter} fontSize={labelFontSize} />
                )} 
              />
            )}
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.calculatedColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * WaterfallChart - Waterfall chart with DashboardWidgetFrame wrapper
 */
export const WaterfallChart = ({
  title,
  data,
  className = '',
  // Dashboard header props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_DEFAULTS.headerIconSize,
  headerSummarySize,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  // Dashboard alert light props
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  // All other props passed to WaterfallChartCore
  ...chartProps
}: WaterfallChartProps) => {
  return (
    <DashboardWidgetFrame
      showHeader={showHeader || !!title}
      headerIcon={headerIcon}
      headerTitle={headerTitle || title}
      headerSummary={headerSummary}
      headerTitleSize={headerTitleSize}
      headerIconSize={headerIconSize}
      headerSummarySize={headerSummarySize}
      headerColor={headerColor}
      showAlertLight={showAlertLight}
      alertLightColor={alertLightColor}
      className={className}
    >
      <WaterfallChartCore data={data} {...chartProps} />
    </DashboardWidgetFrame>
  )
}
