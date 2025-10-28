/**
 * Shared configuration for all dashboard components
 */

import { getCssVar } from '../../../styles/color-use'
import type { DashboardSizeType, DashboardColorType } from './_shared-types'

/**
 * Default values for dashboard components
 */
export const DASHBOARD_DEFAULTS = {
  headerTitleSize: 'medium' as DashboardSizeType,
  headerIconSize: 'medium' as DashboardSizeType,
  headerColor: 'secondary' as DashboardColorType,
  showAlertLight: false,
  alertLightColor: '#10b981',
  showHeader: false,
}

/**
 * Size configuration for dashboard elements
 */
export const DASHBOARD_SIZE_CONFIG: Record<DashboardSizeType, {
  title: string
  icon: string
  summary: string
}> = {
  small: {
    title: '14px',
    icon: '14px',
    summary: '12px',
  },
  medium: {
    title: '18px',
    icon: '18px',
    summary: '14px',
  },
  large: {
    title: '24px',
    icon: '24px',
    summary: '16px',
  },
}

/**
 * Color configuration for dashboard elements
 */
export const DASHBOARD_COLOR_CONFIG: Record<DashboardColorType, string> = {
  primary: getCssVar('colorMain'),
  secondary: getCssVar('colorSec'),
  active: getCssVar('colorSemanticActive'),
  success: getCssVar('colorSemanticSuccess'),
  warning: getCssVar('colorSemanticWarning'),
  error: getCssVar('colorSemanticError'),
}

/**
 * Shared chart configuration defaults
 * These values provide sensible defaults for chart components
 */
export const CHART_DEFAULTS = {
  // Visual
  showLegend: true,
  
  // X-axis
  showXAxis: true,
  xAxisInterval: 'auto' as number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | 'auto',
  
  // Y-axis
  yAxisOrientation: 'left' as 'left' | 'right',
  yAxisTickMargin: 8,
  
  // Date filter
  enableDateFilter: false,
  initialStartDate: null,
  initialEndDate: null,
}

/**
 * TrendChart specific defaults (full-size chart)
 * Optimized for larger displays with more detail
 */
export const TREND_CHART_DEFAULTS = {
  ...CHART_DEFAULTS,
  // Visual
  showGrid: true,
  animationDuration: 1500,
  showDots: true,
  
  // X-axis
  xAxisAngle: 0,
  xAxisHeight: 40,
  xAxisTickMargin: 8,
  minXAxisSpacing: 50,
  maxTickCount: 25,
  estimatedChartWidth: 800, // Deprecated
  
  // Chart margins
  marginTop: 5,
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 8,
  
  
  // Y-axis
  showYAxis: true,
  yAxisWidth: 60,
}

/**
 * MiniTrendChart specific defaults (compact chart for dashboards)
 * Optimized for smaller displays with minimal clutter
 */
export const MINI_TREND_CHART_DEFAULTS = {
  ...CHART_DEFAULTS,
  // Visual
  showGrid: false,
  animationDuration: 1000,
  showDots: false,
  height: 180,
  
  // X-axis
  xAxisAngle: 0,
  xAxisHeight: 24,
  xAxisTickMargin: 5,
  minXAxisSpacing: 45,
  maxTickCount: 20,
  estimatedChartWidth: 400, // Deprecated
  
  // Chart margins
  marginTop: 5,
  marginRight: 5,
  marginBottom: 0,
  marginLeft: 5,
  
  // Y-axis
  showYAxis: false, // Compact view - hide by default
  yAxisWidth: 40,
  yAxisTickMargin: 5,
}

