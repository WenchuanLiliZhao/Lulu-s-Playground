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
  type TooltipProps as RechartsTooltipProps,
} from 'recharts'
import styles from './_styles.module.scss'
import { COLUMN_CHART_DEFAULTS, DASHBOARD_DEFAULTS } from '../_shared-config'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import { getCssVar } from '../../../../styles/color-use'
import { useChartWidth } from '../_shared-hooks'
import { Icon } from '../../Icon'
import type { 
  BaseChartDataPoint,
  DashboardCommonProps,
  ChartXAxisProps,
  ChartYAxisProps,
  ChartVisualProps,
} from '../_shared-chart-types'

// Recharts TooltipProps is acting strange, creating a custom one
// that reflects the props that are actually passed.
interface CustomTooltipProps extends RechartsTooltipProps<number, string> {
  payload?: {
    payload: ColumnChartDataPoint
  }[]
}

/**
 * Data point for column chart with weather-specific features
 */
export interface ColumnChartDataPoint extends BaseChartDataPoint {
  /** Value to display as bar height */
  value: number
  /** Optional color override (CSS color value) */
  color?: string
  /** Optional icon name (Material Symbol) */
  icon?: string
  /** Optional additional data for tooltip */
  [key: string]: string | number | Date | undefined
}

/**
 * Configuration for color mapping based on value
 */
export interface ColorMapping {
  /** Threshold value */
  threshold: number
  /** Color to use when value <= threshold */
  color: string
}

/**
 * Core props for ColumnChart (without dashboard frame)
 */
export interface ColumnChartCoreProps
  extends Omit<ChartXAxisProps, 'showXAxis'>,
    ChartYAxisProps,
    Omit<ChartVisualProps, 'showLegend' | 'showDots' | 'dotInterval'> {
  /**
   * Data for the chart
   */
  data: ColumnChartDataPoint[]
  
  /**
   * Chart height in pixels
   * @default 300
   */
  height?: number
  
  /**
   * Default bar color if not specified in data
   * @default var(--indigo-4)
   */
  defaultBarColor?: string
  
  /**
   * Color mappings based on value ranges
   * Applied in order, last matching mapping wins
   */
  colorMappings?: ColorMapping[]
  
  /**
   * Show icons on top of bars
   * @default false
   */
  showIcons?: boolean
  
  /**
   * Icon size in pixels
   * @default 20
   */
  iconSize?: number
  
  /**
   * Custom tooltip renderer
   */
  customTooltip?: React.ComponentType<RechartsTooltipProps<number, string>>
  
  /**
   * Optional className for the container
   */
  className?: string
  
  /**
   * Data key for the value field
   * @default 'value'
   */
  dataKey?: string
  
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
   * @default [4, 4, 0, 0]
   */
  radius?: [number, number, number, number] | number
}

/**
 * Full ColumnChart props with dashboard frame
 */
export interface ColumnChartProps
  extends ColumnChartCoreProps,
    DashboardCommonProps {
  /**
   * Chart title
   */
  title?: string
}

// Component-specific defaults
const COMPONENT_DEFAULTS = {
  defaultBarColor: getCssVar("colorMain"),
  showIcons: false,
  iconSize: 22,
  dataKey: 'value',
}

/**
 * Get bar color based on value and color mappings
 */
const getBarColor = (
  dataPoint: ColumnChartDataPoint,
  defaultColor: string,
  colorMappings?: ColorMapping[]
): string => {
  // If data point has explicit color, use it
  if (dataPoint.color) {
    return dataPoint.color
  }
  
  // Apply color mappings
  if (colorMappings && colorMappings.length > 0) {
    for (const mapping of colorMappings) {
      if (dataPoint.value <= mapping.threshold) {
        return mapping.color
      }
    }
  }
  
  return defaultColor
}

/**
 * Custom tick component for the X-axis that renders an icon below the label.
 */
const CustomizedXAxisTick = (props: {
  x?: number
  y?: number
  payload?: { value: string; index: number }
  data: ColumnChartDataPoint[]
  iconSize: number
}) => {
  const { x, y, payload, data, iconSize } = props

  if (!payload || typeof payload.index === 'undefined') {
    return null
  }

  const dataPoint = data[payload.index]
  if (!dataPoint) {
    return null
  }

  const { name, icon } = dataPoint

  // Using foreignObject to allow for HTML rendering (divs for line breaks) within SVG
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-50} y={0} width={100} height={60}>
        <div className={styles.customTick}>
          <div className={styles.tickLabel}>{name}</div>
          {icon && (
            <div className={styles.tickIcon}>
              <Icon
                icon={icon}
                style={{ fontSize: `${iconSize}px`, lineHeight: 1 }}
              />
            </div>
          )}
        </div>
      </foreignObject>
    </g>
  )
}

/**
 * Default tooltip component
 */
const DefaultTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null
  
  const data = payload[0].payload
  
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipHeader}>{data.name}</div>
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>Temperature:</span>
          <span className={styles.tooltipValue}>{data.value}°C</span>
        </div>
        {data.icon && (
          <div className={styles.tooltipRow}>
            <span className={styles.tooltipLabel}>Condition:</span>
            <span className={styles.tooltipValue}>{data.icon}</span>
          </div>
        )}
        {data.humidity !== undefined && (
          <div className={styles.tooltipRow}>
            <span className={styles.tooltipLabel}>Humidity:</span>
            <span className={styles.tooltipValue}>{String(data.humidity)}%</span>
          </div>
        )}
        {data.wind !== undefined && (
          <div className={styles.tooltipRow}>
            <span className={styles.tooltipLabel}>Wind:</span>
            <span className={styles.tooltipValue}>{String(data.wind)} km/h</span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * ColumnChartCore - Core chart component without DashboardWidgetFrame
 * Use this when you want to embed the chart in a custom container
 */
export const ColumnChartCore = ({
  data,
  height = COLUMN_CHART_DEFAULTS.height,
  defaultBarColor = COMPONENT_DEFAULTS.defaultBarColor,
  colorMappings,
  showIcons = COMPONENT_DEFAULTS.showIcons,
  iconSize = COMPONENT_DEFAULTS.iconSize,
  customTooltip,
  className = '',
  dataKey = COMPONENT_DEFAULTS.dataKey,
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
  radius = COLUMN_CHART_DEFAULTS.radius,
}: ColumnChartCoreProps) => {
  const { refCallback } = useChartWidth()
  
  // Adjust X-axis height if icons are shown
  const finalXAxisHeight = useMemo(() => {
    return showIcons ? Math.max(xAxisHeight, 60) : xAxisHeight
  }, [showIcons, xAxisHeight])
  
  // Calculate colors for each bar
  const dataWithColors = useMemo(() => {
    return data.map(point => ({
      ...point,
      calculatedColor: getBarColor(point, defaultBarColor, colorMappings),
    }))
  }, [data, defaultBarColor, colorMappings])
  
  const TooltipComponent = customTooltip || DefaultTooltip
  
  return (
    <div ref={refCallback} className={`${styles.chartWrapper} ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={dataWithColors}
          margin={{
            top: marginTop,
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
              height={finalXAxisHeight}
              tickMargin={xAxisTickMargin}
              axisLine={{ strokeWidth: 1 }}
              tickLine={false}
              tick={
                showIcons ? (
                  <CustomizedXAxisTick data={data} iconSize={iconSize} />
                ) : (
                  true
                )
              }
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
          <Bar
            dataKey={dataKey}
            animationDuration={animationDuration}
            radius={radius}
          >
            {dataWithColors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.calculatedColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * ColumnChart - Column chart with DashboardWidgetFrame wrapper
 */
export const ColumnChart = ({
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
  // All other props passed to ColumnChartCore
  ...chartProps
}: ColumnChartProps) => {
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
      <ColumnChartCore data={data} {...chartProps} />
    </DashboardWidgetFrame>
  )
}

