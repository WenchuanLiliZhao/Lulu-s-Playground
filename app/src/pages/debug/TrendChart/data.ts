import type { TrendChartDataPoint, TrendChartLine } from '../../../components/ui/forDashboard/TrendChart'
import { COLOR_SCALES } from '../../../styles/color-chart'

// Generate sample data for the chart
export const generateTrendData = (months = 12): TrendChartDataPoint[] => {
  const data: TrendChartDataPoint[] = []
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - months + 1)

  for (let i = 0; i < months; i++) {
    const currentDate = new Date(startDate)
    currentDate.setMonth(startDate.getMonth() + i)

    const month = currentDate.toLocaleString('default', { month: 'short' })
    const revenue = Math.floor(Math.random() * 5000) + 10000
    const users = Math.floor(Math.random() * 1000) + 2000
    const orders = Math.floor(Math.random() * 500) + 800

    data.push({
      name: month,
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

