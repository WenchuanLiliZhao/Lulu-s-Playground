// ===== Shared Dashboard Infrastructure =====
export type { 
  DashboardHeaderProps, 
  DashboardAlertLightProps, 
  DashboardCardProps, 
  DashboardCommonProps,
  DashboardSizeType,
  DashboardColorType
} from './_shared-types'

export { 
  DASHBOARD_DEFAULTS, 
  DASHBOARD_SIZE_CONFIG, 
  DASHBOARD_COLOR_CONFIG 
} from './_shared-config'

export { 
  DashboardCardElement, 
  DashboardHeaderElement, 
  DashboardAlertLightElement 
} from './_shared-elements'

// ===== Dashboard Components =====
export { TrendChart } from './TrendChart'
export type { TrendChartProps, TrendChartDataPoint, TrendChartLine } from './TrendChart'

export { DashboardShowCase } from './DashboardShowCase'
export type { DashboardShowCaseProps } from './DashboardShowCase'
export { DASHBOARD_SHOWCASE_DEFAULTS } from './DashboardShowCase'

export { MetricWidget } from './MetricWidget'
export type { MetricWidgetProps } from './MetricWidget'

export { ProgressBarChart } from './ProgressBarChart'
export type { ProgressBarChartProps, ProgressBarItem } from './ProgressBarChart'

export { MiniTrendChart } from './MiniTrendChart'
export type { MiniTrendChartProps, MiniTrendChartLine } from './MiniTrendChart'

