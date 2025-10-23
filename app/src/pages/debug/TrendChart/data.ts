import type { TrendChartDataPoint, TrendChartLine } from '../../../components/ui/forDashboard/TrendChart'
import { COLOR_SCALES } from '../../../styles/color-chart'

// Generate sample data for the chart
export const generateTrendData = (months = 12): TrendChartDataPoint[] => {
  const data: TrendChartDataPoint[] = []
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - months + 1)

  // Check if data spans multiple years
  const endDate = new Date(startDate)
  endDate.setMonth(startDate.getMonth() + months - 1)
  const spansMultipleYears = startDate.getFullYear() !== endDate.getFullYear()

  for (let i = 0; i < months; i++) {
    const currentDate = new Date(startDate)
    currentDate.setMonth(startDate.getMonth() + i)

    const month = currentDate.toLocaleString('default', { month: 'short' })
    const year = currentDate.getFullYear()
    
    // Create unique ID using timestamp or index with date
    const id = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
    
    // Include year in name if data spans multiple years or if months > 12
    const name = spansMultipleYears || months > 12 
      ? `${month} ${year}` 
      : month

    const revenue = Math.floor(Math.random() * 5000) + 10000
    const users = Math.floor(Math.random() * 1000) + 2000
    const orders = Math.floor(Math.random() * 500) + 800

    data.push({
      id,
      name,
      revenue,
      users,
      orders,
    })
  }

  return data
}

// Define chart lines configuration
export const chartLines: TrendChartLine[] = [
  {
    dataKey: 'revenue',
    name: 'Revenue ($)',
    color: COLOR_SCALES.indigo.colors[5],
    strokeWidth: 2,
  },
  {
    dataKey: 'users',
    name: 'Users',
    color: COLOR_SCALES.wilderness.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: 'orders',
    name: 'Orders',
    color: COLOR_SCALES.amber.colors[4],
    strokeWidth: 2,
  },
]

// Sample data for immediate use
export const sampleData = generateTrendData(12)

