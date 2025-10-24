import type { TrendChartDataPoint } from '../../../../../components/ui/forDashboard/TrendChart'

/**
 * Raw daily sales data for 2024
 * This serves as the base data for all zoom levels
 */
export const dailySalesData: TrendChartDataPoint[] = generateDailySalesData()

/**
 * Generates daily sales data for the entire year 2024
 */
function generateDailySalesData(): TrendChartDataPoint[] {
  const data: TrendChartDataPoint[] = []
  const startDate = new Date(2024, 0, 1) // Jan 1, 2024
  const endDate = new Date(2024, 11, 31) // Dec 31, 2024
  
  // Base values with seasonal trends
  let baseRevenue = 400
  let baseOrders = 28
  let baseAvgOrderValue = 145
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth()
    const dayOfWeek = d.getDay()
    const dayOfMonth = d.getDate()
    
    // Seasonal multiplier (higher in Q4, lower in Q1)
    const seasonalMultiplier = 1 + (month / 12) * 0.5
    
    // Weekend boost (Saturday and Sunday)
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1.0
    
    // Monthly pattern (peaks mid-month and end of month)
    const monthlyPattern = 1 + Math.sin((dayOfMonth / 30) * Math.PI) * 0.15
    
    // Add some randomness
    const randomFactor = 0.85 + Math.random() * 0.3
    
    const totalMultiplier = seasonalMultiplier * weekendMultiplier * monthlyPattern * randomFactor
    
    const revenue = Math.round(baseRevenue * totalMultiplier)
    const orders = Math.round(baseOrders * totalMultiplier)
    const avgOrderValue = Math.round((revenue / orders) * 100) / 100
    
    data.push({
      id: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      name: `${d.getMonth() + 1}/${d.getDate()}`,
      date: new Date(d),
      revenue,
      orders,
      avgOrderValue,
    })
  }
  
  return data
}

/**
 * Raw daily user growth data for 2024
 */
export const dailyUserGrowthData: TrendChartDataPoint[] = generateDailyUserGrowthData()

/**
 * Generates daily user growth data for the entire year 2024
 */
function generateDailyUserGrowthData(): TrendChartDataPoint[] {
  const data: TrendChartDataPoint[] = []
  const startDate = new Date(2024, 0, 1)
  const endDate = new Date(2024, 11, 31)
  
  let cumulativeUsers = 2000
  let baseNewSignups = 15
  let baseRetention = 78
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth()
    const dayOfWeek = d.getDay()
    
    // Growth trend throughout the year
    const growthMultiplier = 1 + (month / 12) * 0.8
    
    // Weekday pattern (more signups on Mon-Wed)
    const weekdayMultiplier = (dayOfWeek >= 1 && dayOfWeek <= 3) ? 1.2 : 0.9
    
    const randomFactor = 0.7 + Math.random() * 0.6
    
    const newSignups = Math.round(baseNewSignups * growthMultiplier * weekdayMultiplier * randomFactor)
    cumulativeUsers += newSignups * 0.9 // Net growth (accounting for churn)
    
    const retention = Math.min(90, baseRetention + (month / 12) * 8 + (Math.random() - 0.5) * 2)
    
    data.push({
      id: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      name: `${d.getMonth() + 1}/${d.getDate()}`,
      date: new Date(d),
      activeUsers: Math.round(cumulativeUsers),
      newSignups,
      retention: Math.round(retention * 10) / 10,
    })
  }
  
  return data
}

