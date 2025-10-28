/**
 * Default values for TrendChart component props
 */
export const TREND_CHART_DEFAULTS = {
  showGrid: true,
  showLegend: true,
  legendPosition: 'top' as 'top' | 'bottom' | 'left' | 'right',
  animationDuration: 1500,
  xAxisInterval: 0,
  xAxisAngle: -45,
  xAxisHeight: 80,
  marginBottom: -20,
  xAxisTickMargin: 8,
  minXAxisSpacing: 50, // Increased from 12 to 50 for better readability with angled labels
  maxTickCount: 25, // Maximum number of ticks to prevent over-crowding
  estimatedChartWidth: 800, // Deprecated: kept for backward compatibility
}

