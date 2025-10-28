import { useState, useCallback, useEffect } from 'react'

/**
 * Hook to track the width of a chart container element
 * Uses ResizeObserver for responsive width detection
 * 
 * @returns Object containing:
 *  - width: Current width of the observed element (0 if not mounted)
 *  - refCallback: Callback ref to attach to the element you want to observe
 * 
 * @example
 * const { width, refCallback } = useChartWidth()
 * 
 * return (
 *   <div ref={refCallback}>
 *     Width: {width}px
 *   </div>
 * )
 */
export const useChartWidth = () => {
  const [width, setWidth] = useState<number>(0)
  const [ref, setRef] = useState<HTMLElement | null>(null)
  
  const refCallback = useCallback((node: HTMLElement | null) => {
    setRef(node)
  }, [])
  
  useEffect(() => {
    if (!ref) return
    
    // Immediately get width once to avoid initial flash
    const initialWidth = ref.getBoundingClientRect().width
    setWidth(initialWidth)
    
    // Use ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver((entries) => {
      // Use requestAnimationFrame for debouncing
      requestAnimationFrame(() => {
        const entry = entries[0]
        if (entry) {
          setWidth(entry.contentRect.width)
        }
      })
    })
    
    resizeObserver.observe(ref)
    
    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])
  
  return { width, refCallback }
}

/**
 * Calculate the effective x-axis interval based on data length and constraints
 * 
 * @param dataLength - Number of data points
 * @param chartWidth - Actual width of the chart in pixels (0 if unknown)
 * @param xAxisInterval - Explicitly specified interval or 'auto'
 * @param targetTickCount - Desired number of ticks to display
 * @param minXAxisSpacing - Minimum spacing between ticks in pixels
 * @param maxTickCount - Maximum number of ticks allowed
 * @returns The calculated interval value or interval mode string
 */
export const calculateXAxisInterval = (
  dataLength: number,
  chartWidth: number,
  xAxisInterval: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | 'auto' | undefined,
  targetTickCount?: number,
  minXAxisSpacing: number = 45,
  maxTickCount: number = 20
): number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' => {
  // 1. If explicitly specified interval (not 'auto'), use it directly
  if (xAxisInterval !== undefined && xAxisInterval !== 'auto') {
    return xAxisInterval
  }
  
  // 2. If target tick count is specified, calculate interval from that
  if (targetTickCount !== undefined && targetTickCount > 0) {
    if (dataLength <= targetTickCount) return 0
    return Math.ceil(dataLength / targetTickCount) - 1
  }
  
  // 3. If we have actual chart width, calculate based on minimum spacing
  if (chartWidth > 0 && dataLength > 1) {
    const spacePerPoint = chartWidth / (dataLength - 1)
    
    // If space is sufficient, show all points
    if (spacePerPoint >= minXAxisSpacing) {
      return 0
    }
    
    // Calculate how many points to skip to meet minimum spacing
    const interval = Math.ceil(minXAxisSpacing / spacePerPoint) - 1
    
    // Apply maxTickCount constraint
    const actualTickCount = Math.floor(dataLength / (interval + 1))
    if (actualTickCount > maxTickCount) {
      return Math.ceil(dataLength / maxTickCount) - 1
    }
    
    return Math.max(1, interval)
  }
  
  // 4. Fallback: Use reasonable defaults when width is unknown (e.g., SSR, initial render)
  // Assume medium-sized chart (~500px), aim for 10-12 ticks
  const fallbackTickCount = Math.min(12, Math.max(6, Math.floor(dataLength / 3)))
  if (dataLength <= fallbackTickCount) return 0
  return Math.ceil(dataLength / fallbackTickCount) - 1
}

