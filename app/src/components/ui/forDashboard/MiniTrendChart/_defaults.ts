/**
 * Default values for MiniTrendChart component props
 */
export const MINI_TREND_CHART_DEFAULTS = {
  showGrid: false,
  showLegend: true,
  legendPosition: 'top' as 'top' | 'bottom' | 'left' | 'right',
  animationDuration: 1000,
  xAxisInterval: 'auto' as number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | 'auto',
  xAxisAngle: 0,
  xAxisHeight: 40,
  marginBottom: -16,
  xAxisTickMargin: 5,
  minXAxisSpacing: 8,
  estimatedChartWidth: 400,
  height: 180,
  showDots: false,
  showYAxis: false,
  showXAxis: true,
}

