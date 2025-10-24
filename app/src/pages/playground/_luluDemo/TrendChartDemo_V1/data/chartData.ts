import type { TrendChartDataPoint, TrendChartLine } from '../../../../../components/ui/forDashboard/TrendChart'
import { COLOR_SCALES } from '../../../../../styles/color-chart'

// ============================================================================
// Chart 1: Quarterly Sales Performance (2024)
// ============================================================================

export const quarterlySalesData: TrendChartDataPoint[] = [
  {
    id: '2024-01',
    name: 'Jan',
    date: new Date(2024, 0, 15), // Mid-month date
    revenue: 12500,
    orders: 850,
    avgOrderValue: 147,
  },
  {
    id: '2024-02',
    name: 'Feb',
    date: new Date(2024, 1, 15),
    revenue: 13200,
    orders: 920,
    avgOrderValue: 143,
  },
  {
    id: '2024-03',
    name: 'Mar',
    date: new Date(2024, 2, 15),
    revenue: 14800,
    orders: 1050,
    avgOrderValue: 141,
  },
  {
    id: '2024-04',
    name: 'Apr',
    date: new Date(2024, 3, 15),
    revenue: 13900,
    orders: 980,
    avgOrderValue: 142,
  },
  {
    id: '2024-05',
    name: 'May',
    date: new Date(2024, 4, 15),
    revenue: 15600,
    orders: 1100,
    avgOrderValue: 142,
  },
  {
    id: '2024-06',
    name: 'Jun',
    date: new Date(2024, 5, 15),
    revenue: 16200,
    orders: 1180,
    avgOrderValue: 137,
  },
  {
    id: '2024-07',
    name: 'Jul',
    date: new Date(2024, 6, 15),
    revenue: 14500,
    orders: 1020,
    avgOrderValue: 142,
  },
  {
    id: '2024-08',
    name: 'Aug',
    date: new Date(2024, 7, 15),
    revenue: 15800,
    orders: 1110,
    avgOrderValue: 142,
  },
  {
    id: '2024-09',
    name: 'Sep',
    date: new Date(2024, 8, 15),
    revenue: 17200,
    orders: 1240,
    avgOrderValue: 139,
  },
  {
    id: '2024-10',
    name: 'Oct',
    date: new Date(2024, 9, 15),
    revenue: 18500,
    orders: 1320,
    avgOrderValue: 140,
  },
  {
    id: '2024-11',
    name: 'Nov',
    date: new Date(2024, 10, 15),
    revenue: 19800,
    orders: 1450,
    avgOrderValue: 137,
  },
  {
    id: '2024-12',
    name: 'Dec',
    date: new Date(2024, 11, 15),
    revenue: 21500,
    orders: 1580,
    avgOrderValue: 136,
  },
]

export const quarterlySalesLines: TrendChartLine[] = [
  {
    dataKey: 'revenue',
    name: 'Revenue ($)',
    color: COLOR_SCALES.indigo.colors[5],
    strokeWidth: 2,
  },
  {
    dataKey: 'orders',
    name: 'Orders',
    color: COLOR_SCALES.wilderness.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: 'avgOrderValue',
    name: 'Avg Order Value ($)',
    color: COLOR_SCALES.amber.colors[4],
    strokeWidth: 2,
  },
]

// ============================================================================
// Chart 2: User Growth & Engagement Metrics (2024)
// ============================================================================

export const userGrowthData: TrendChartDataPoint[] = [
  {
    id: '2024-01',
    name: 'Jan',
    date: new Date(2024, 0, 15),
    activeUsers: 2400,
    newSignups: 320,
    retention: 78,
  },
  {
    id: '2024-02',
    name: 'Feb',
    date: new Date(2024, 1, 15),
    activeUsers: 2650,
    newSignups: 380,
    retention: 79,
  },
  {
    id: '2024-03',
    name: 'Mar',
    date: new Date(2024, 2, 15),
    activeUsers: 2920,
    newSignups: 420,
    retention: 81,
  },
  {
    id: '2024-04',
    name: 'Apr',
    date: new Date(2024, 3, 15),
    activeUsers: 3180,
    newSignups: 450,
    retention: 80,
  },
  {
    id: '2024-05',
    name: 'May',
    date: new Date(2024, 4, 15),
    activeUsers: 3500,
    newSignups: 480,
    retention: 82,
  },
  {
    id: '2024-06',
    name: 'Jun',
    date: new Date(2024, 5, 15),
    activeUsers: 3820,
    newSignups: 510,
    retention: 83,
  },
  {
    id: '2024-07',
    name: 'Jul',
    date: new Date(2024, 6, 15),
    activeUsers: 4050,
    newSignups: 490,
    retention: 81,
  },
  {
    id: '2024-08',
    name: 'Aug',
    date: new Date(2024, 7, 15),
    activeUsers: 4300,
    newSignups: 530,
    retention: 82,
  },
  {
    id: '2024-09',
    name: 'Sep',
    date: new Date(2024, 8, 15),
    activeUsers: 4620,
    newSignups: 570,
    retention: 84,
  },
  {
    id: '2024-10',
    name: 'Oct',
    date: new Date(2024, 9, 15),
    activeUsers: 4980,
    newSignups: 620,
    retention: 85,
  },
  {
    id: '2024-11',
    name: 'Nov',
    date: new Date(2024, 10, 15),
    activeUsers: 5350,
    newSignups: 680,
    retention: 86,
  },
  {
    id: '2024-12',
    name: 'Dec',
    date: new Date(2024, 11, 15),
    activeUsers: 5800,
    newSignups: 750,
    retention: 87,
  },
]

export const userGrowthLines: TrendChartLine[] = [
  {
    dataKey: 'activeUsers',
    name: 'Active Users',
    color: COLOR_SCALES.hotHeat.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: 'newSignups',
    name: 'New Signups',
    color: COLOR_SCALES.indigo.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: 'retention',
    name: 'Retention Rate (%)',
    color: COLOR_SCALES.wilderness.colors[5],
    strokeWidth: 2,
  },
]

