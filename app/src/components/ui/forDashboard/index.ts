// ===== Shared Dashboard Infrastructure =====
export type { 
  DashboardHeaderProps, 
  DashboardAlertLightProps, 
  DashboardCardProps, 
  DashboardCommonProps,
  DashboardSizeType,
  DashboardColorType
} from './_shared-types'

export type {
  BaseChartDataPoint,
  BaseChartLine,
  BaseChartProps,
  ChartXAxisProps,
  ChartYAxisProps,
  ChartVisualProps,
  ChartDateFilterProps
} from './_shared-chart-types'

export { 
  DASHBOARD_DEFAULTS, 
  DASHBOARD_SIZE_CONFIG, 
  DASHBOARD_COLOR_CONFIG,
  CHART_DEFAULTS,
  TREND_CHART_DEFAULTS,
  MINI_TREND_CHART_DEFAULTS,
  COLUMN_CHART_DEFAULTS
} from './_shared-config'

export { 
  DashboardCardElement, 
  DashboardHeaderElement, 
  DashboardAlertLightElement 
} from './_shared-elements'

export { 
  useChartWidth, 
  calculateXAxisInterval 
} from './_shared-hooks'

// ===== Dashboard Widget Frame =====
export { DashboardWidgetFrame } from './DashboardWidgetFrame'
export type { DashboardWidgetFrameProps } from './DashboardWidgetFrame'

// ===== Dashboard Components =====
export { TrendChart, TrendChartCore } from './TrendChart'
export type { TrendChartProps, TrendChartCoreProps, TrendChartDataPoint, TrendChartLine } from './TrendChart'

export { MiniTrendChart } from './MiniTrendChart'
export type { MiniTrendChartProps, MiniTrendChartLine, MiniTrendChartDataPoint } from './MiniTrendChart'

export { MetricWidget } from './MetricWidget'
export type { MetricWidgetProps } from './MetricWidget'

export { ProgressBarChart } from './ProgressBarChart'
export type { ProgressBarChartProps, ProgressBarItem } from './ProgressBarChart'

export { TableWidget } from './TableWidget'
export type { TableWidgetProps } from './TableWidget'

export { InfoPanelWidget } from './InfoPanelWidget'
export type { InfoPanelWidgetProps, InfoItem } from './InfoPanelWidget'

export { SwitchableDataWidget } from './SwitchableDataWidget'
export type { SwitchableDataWidgetProps, DataWidgetViewMode } from './SwitchableDataWidget'

export { ColumnChart, ColumnChartCore } from './ColumnChart'
export type { ColumnChartProps, ColumnChartCoreProps, ColumnChartDataPoint, ColorMapping } from './ColumnChart'

import { WaterfallChart } from "./WaterfallChart";

export {
    WaterfallChart,
}

export { PathwayVisualization3D } from './PathwayVisualization3D'
export type { PathwayVisualization3DProps, PathNode, PathConnection } from './PathwayVisualization3D'

