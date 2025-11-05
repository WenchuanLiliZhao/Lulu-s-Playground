/**
 * Shared types and interfaces for chart components (TrendChart, MiniTrendChart)
 * This ensures consistency and reusability across all chart-based dashboard widgets
 */

// Re-export dashboard types for convenience
export type { DashboardCommonProps, DashboardHeaderProps, DashboardAlertLightProps, DashboardSizeType, DashboardColorType } from './_shared-types'

/**
 * Base data point structure for all charts
 */
export interface BaseChartDataPoint {
  /** Display name for the data point (used on X-axis) */
  name: string
  /** Optional unique identifier */
  id?: string
  /** Optional date value for filtering */
  date?: Date
  /** Allow any additional numeric or string values */
  [key: string]: string | number | Date | undefined
}

/**
 * Line configuration for line charts
 */
export interface BaseChartLine {
  /** Key to access data in the data point */
  dataKey: string
  /** Display name for the line */
  name: string
  /** Line color (CSS color value) */
  color: string
  /** Line stroke width */
  strokeWidth?: number
  /** Line dash style (e.g., "5 5") */
  strokeDasharray?: string
}

/**
 * X-axis configuration props
 */
export interface ChartXAxisProps {
  /**
   * Show X-axis
   * @default true
   */
  showXAxis?: boolean
  
  /**
   * X-axis tick interval
   * - number: skip interval (0 = show all, 1 = show every other, etc.)
   * - 'preserveStart': ensure first tick is shown
   * - 'preserveEnd': ensure last tick is shown
   * - 'preserveStartEnd': ensure both first and last ticks are shown
   * - 'auto': calculate based on chart width and minXAxisSpacing
   * @default 'auto'
   */
  xAxisInterval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | 'auto'
  
  /**
   * Target number of ticks to display on x-axis (when xAxisInterval is 'auto')
   * Takes priority over minXAxisSpacing when specified
   * @default undefined
   */
  targetTickCount?: number
  
  /**
   * Minimum spacing between x-axis ticks in pixels (used when xAxisInterval is 'auto')
   * @default varies by component
   */
  minXAxisSpacing?: number
  
  /**
   * Maximum number of ticks allowed on x-axis (prevents over-crowding)
   * @default varies by component
   */
  maxTickCount?: number
  
  /**
   * X-axis label angle in degrees
   * @default varies by component
   */
  xAxisAngle?: number
  
  /**
   * X-axis height to accommodate rotated labels
   * @default varies by component
   */
  xAxisHeight?: number
  
  /**
   * Chart margin top (distance from top edge to chart area)
   * @default varies by component
   */
  marginTop?: number
  
  /**
   * Chart margin right (distance from chart area to right edge)
   * @default varies by component
   */
  marginRight?: number
  
  /**
   * Chart margin bottom (distance from X-axis labels to SVG bottom)
   * @default varies by component
   */
  marginBottom?: number
  
  /**
   * Chart margin left (distance from left edge to chart area)
   * @default varies by component
   */
  marginLeft?: number
  
  /**
   * X-axis tick margin (distance from axis line to labels)
   * @default varies by component
   */
  xAxisTickMargin?: number
  
  /**
   * Estimated chart width in pixels for automatic interval calculation
   * @deprecated Use automatic width detection instead. This prop is kept for backward compatibility.
   * @default varies by component
   */
  estimatedChartWidth?: number
}

/**
 * Y-axis configuration props
 */
export interface ChartYAxisProps {
  /**
   * Show Y-axis
   * @default varies by component
   */
  showYAxis?: boolean
  
  /**
   * Y-axis width in pixels
   * @default varies by component
   */
  yAxisWidth?: number
  
  /**
   * Y-axis position
   * @default 'left'
   */
  yAxisOrientation?: 'left' | 'right'
  
  /**
   * Y-axis tick formatter function
   * @default undefined
   */
  yAxisTickFormatter?: (value: number) => string
  
  /**
   * Y-axis domain (range)
   * @default undefined (auto-calculated by Recharts)
   */
  yAxisDomain?: [number | 'auto' | 'dataMin', number | 'auto' | 'dataMax']
  
  /**
   * Y-axis tick margin (distance from axis line to labels)
   * @default varies by component
   */
  yAxisTickMargin?: number
}

/**
 * Chart visual configuration props
 */
export interface ChartVisualProps {
  /**
   * Show grid lines
   * @default varies by component
   */
  showGrid?: boolean
  
  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean
  
  /**
   * Animation duration in milliseconds
   * @default varies by component
   */
  animationDuration?: number
  
  /**
   * Whether to show dots on the line chart
   * @default varies by component
   */
  showDots?: boolean
  
  /**
   * Dot display interval (0 = show all dots, number = show every nth dot)
   * If not provided, defaults to xAxisInterval to keep dots and labels in sync
   * Only applies when showDots is true
   * @default undefined (uses xAxisInterval)
   */
  dotInterval?: number
}

/**
 * Date filtering configuration props
 */
export interface ChartDateFilterProps<T extends BaseChartDataPoint = BaseChartDataPoint> {
  /**
   * Enable date range filtering
   * @default false
   */
  enableDateFilter?: boolean
  
  /**
   * Function to extract date from data point (required if enableDateFilter is true)
   */
  getDateFromDataPoint?: (dataPoint: T) => Date
  
  /**
   * Initial start date for date filter
   */
  initialStartDate?: Date | null
  
  /**
   * Initial end date for date filter
   */
  initialEndDate?: Date | null
}

/**
 * Combined base chart props
 * All line chart components should extend this interface
 */
export interface BaseChartProps<T extends BaseChartDataPoint = BaseChartDataPoint>
  extends ChartXAxisProps,
    ChartYAxisProps,
    ChartVisualProps,
    ChartDateFilterProps<T> {
  /**
   * Chart data
   */
  data: T[]
  
  /**
   * Lines to display
   */
  lines: BaseChartLine[]
  
  /**
   * Chart title
   */
  title?: string
  
  /**
   * Optional className for the container
   */
  className?: string
}

/**
 * Type guard to check if a value is a valid x-axis interval type
 */
export function isValidXAxisInterval(
  value: unknown
): value is number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | 'auto' {
  return (
    typeof value === 'number' ||
    value === 'preserveStart' ||
    value === 'preserveEnd' ||
    value === 'preserveStartEnd' ||
    value === 'auto'
  )
}

