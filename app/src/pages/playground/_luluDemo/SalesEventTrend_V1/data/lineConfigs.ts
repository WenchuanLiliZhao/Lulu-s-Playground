import type { TrendChartLine } from '../../../../../components/ui/forDashboard/TrendChart'
import { COLOR_SCALES } from '../../../../../styles/color-chart'

/**
 * Line configurations for sales chart
 */
export const salesLines: TrendChartLine[] = [
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

/**
 * Line configurations for user growth chart
 */
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

