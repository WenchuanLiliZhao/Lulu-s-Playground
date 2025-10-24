import type { TrendChartDataPoint } from '../../../../../components/ui/forDashboard/TrendChart'
import type { ZoomLevel } from '../components/Navigation'

/**
 * Aggregates daily data into the specified zoom level
 */
export function aggregateDataByZoomLevel(
  dailyData: TrendChartDataPoint[],
  zoomLevel: ZoomLevel
): TrendChartDataPoint[] {
  switch (zoomLevel) {
    case 'day':
      return dailyData
    case 'week':
      return aggregateByWeek(dailyData)
    case 'month':
      return aggregateByMonth(dailyData)
    case 'quarter':
      return aggregateByQuarter(dailyData)
    case 'year':
      return aggregateByYear(dailyData)
    default:
      return dailyData
  }
}

/**
 * Aggregates data by week (starting Monday)
 */
function aggregateByWeek(data: TrendChartDataPoint[]): TrendChartDataPoint[] {
  const weeklyGroups = new Map<string, TrendChartDataPoint[]>()
  
  data.forEach((point) => {
    const date = point.date as Date
    const weekStart = getWeekStart(date)
    const weekKey = `${weekStart.getFullYear()}-W${getWeekNumber(weekStart)}`
    
    if (!weeklyGroups.has(weekKey)) {
      weeklyGroups.set(weekKey, [])
    }
    weeklyGroups.get(weekKey)!.push(point)
  })
  
  return Array.from(weeklyGroups.entries()).map(([key, points]) => {
    const weekStart = points[0].date as Date
    
    return {
      id: key,
      name: `${String(weekStart.getFullYear()).slice(-2)}/${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
      date: weekStart,
      ...aggregateMetrics(points),
    }
  })
}

/**
 * Aggregates data by month
 */
function aggregateByMonth(data: TrendChartDataPoint[]): TrendChartDataPoint[] {
  const monthlyGroups = new Map<string, TrendChartDataPoint[]>()
  
  data.forEach((point) => {
    const date = point.date as Date
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!monthlyGroups.has(monthKey)) {
      monthlyGroups.set(monthKey, [])
    }
    monthlyGroups.get(monthKey)!.push(point)
  })
  
  return Array.from(monthlyGroups.entries()).map(([key, points]) => {
    const date = points[0].date as Date
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return {
      id: key,
      name: `${String(date.getFullYear()).slice(-2)}/${monthNames[date.getMonth()]}`,
      date: new Date(date.getFullYear(), date.getMonth(), 15), // Mid-month
      ...aggregateMetrics(points),
    }
  })
}

/**
 * Aggregates data by quarter
 */
function aggregateByQuarter(data: TrendChartDataPoint[]): TrendChartDataPoint[] {
  const quarterlyGroups = new Map<string, TrendChartDataPoint[]>()
  
  data.forEach((point) => {
    const date = point.date as Date
    const quarter = Math.floor(date.getMonth() / 3) + 1
    const quarterKey = `${date.getFullYear()}-Q${quarter}`
    
    if (!quarterlyGroups.has(quarterKey)) {
      quarterlyGroups.set(quarterKey, [])
    }
    quarterlyGroups.get(quarterKey)!.push(point)
  })
  
  return Array.from(quarterlyGroups.entries()).map(([key, points]) => {
    const date = points[0].date as Date
    const quarter = Math.floor(date.getMonth() / 3) + 1
    const quarterStartMonth = (quarter - 1) * 3
    
    return {
      id: key,
      // name: `${String(date.getFullYear()).slice(-2)}-Q${quarter}`, // '23/Q1', '24/Q2', etc.
      name: key,
      date: new Date(date.getFullYear(), quarterStartMonth + 1, 15), // Mid-quarter month
      ...aggregateMetrics(points),
    }
  })
}

/**
 * Aggregates data by year
 */
function aggregateByYear(data: TrendChartDataPoint[]): TrendChartDataPoint[] {
  const yearlyGroups = new Map<string, TrendChartDataPoint[]>()
  
  data.forEach((point) => {
    const date = point.date as Date
    const yearKey = `${date.getFullYear()}`
    
    if (!yearlyGroups.has(yearKey)) {
      yearlyGroups.set(yearKey, [])
    }
    yearlyGroups.get(yearKey)!.push(point)
  })
  
  return Array.from(yearlyGroups.entries()).map(([key, points]) => {
    return {
      id: key,
      // name: `${String(parseInt(key)).slice(-2)}`, // '23', '24', '25'
      name: key,
      date: new Date(parseInt(key), 6, 1), // Mid-year
      ...aggregateMetrics(points),
    }
  })
}

/**
 * Aggregates metrics from multiple data points
 */
function aggregateMetrics(points: TrendChartDataPoint[]): Record<string, number> {
  const result: Record<string, number> = {}
  const keys = Object.keys(points[0]).filter(
    (key) => !['id', 'name', 'date'].includes(key)
  )
  
  keys.forEach((key) => {
    const values = points.map((p) => p[key] as number).filter((v) => typeof v === 'number')
    
    if (values.length === 0) return
    
    // For GMV, NetSales, and Transaction, sum them up
    result[key] = Math.round(values.reduce((a, b) => a + b, 0))
  })
  
  return result
}

/**
 * Gets the start of the week (Monday) for a given date
 */
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  return new Date(d.setDate(diff))
}

/**
 * Gets the ISO week number for a date
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

/**
 * Gets appropriate date range based on zoom level
 */
export function getDateRangeForZoomLevel(
  baseStartDate: Date,
  baseEndDate: Date
): { startDate: Date; endDate: Date } {
  // For different zoom levels, we might want to show different default ranges
  // This can be customized based on UX requirements
  return {
    startDate: baseStartDate,
    endDate: baseEndDate,
  }
}

