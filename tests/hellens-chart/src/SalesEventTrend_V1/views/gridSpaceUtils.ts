/**
 * Minimum spacing between x-axis data points in pixels
 */
const MIN_GRID_SPACE_PX = 4

/**
 * Calculate appropriate x-axis interval to ensure minimum spacing between data points
 * 
 * @param dataPointCount - Number of data points to display
 * @param chartWidth - Available chart width in pixels (default: 800px, typical chart width)
 * @returns The interval value (0 = show all, n = show every nth point)
 * 
 * @example
 * // With 100 data points and 800px width:
 * // spacePerPoint = 800 / 99 ≈ 8px
 * // Since 8px < 32px, we need interval = ceil(32/8) - 1 = 3
 * // This will show every 4th point (indices 0, 4, 8, 12, ...)
 * calcGridSpace(100, 800) // returns 3
 */
export function calcGridSpace(dataPointCount: number, chartWidth: number = 800): number {
  if (dataPointCount <= 1) return 0
  
  // Calculate available space per data point if we show all
  const spacePerPoint = chartWidth / (dataPointCount - 1)
  
  // If space is sufficient, show all points
  if (spacePerPoint >= MIN_GRID_SPACE_PX) {
    return 0
  }
  
  // Calculate how many points we need to skip to meet minimum spacing
  // interval = ceil(MIN_GRID_SPACE_PX / spacePerPoint) - 1
  const interval = Math.ceil(MIN_GRID_SPACE_PX / spacePerPoint) - 1
  
  return Math.max(1, interval)
}

