import type { TrendChartLine } from '../../../../../components/ui/forDashboard/TrendChart'
import { COLOR_SCALES } from '../../../../../styles/color-chart'

/**
 * Line configurations for sales chart
 */
export const salesLines: TrendChartLine[] = [
  {
    dataKey: 'gmv',
    name: 'GMV ($)',
    color: COLOR_SCALES.indigo.colors[5],
    strokeWidth: 2,
  },
  {
    dataKey: 'transaction',
    name: 'Transaction',
    color: COLOR_SCALES.wilderness.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: 'netSales',
    name: 'NetSales ($)',
    color: COLOR_SCALES.amber.colors[4],
    strokeWidth: 2,
  },
]

/**
 * Line configurations for user growth chart
 */
export const userGrowthLines: TrendChartLine[] = [
  {
    dataKey: 'gmv',
    name: 'GMV ($)',
    color: COLOR_SCALES.hotHeat.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: 'transaction',
    name: 'Transaction',
    color: COLOR_SCALES.indigo.colors[4],
    strokeWidth: 2,
  },
  {
    dataKey: 'netSales',
    name: 'NetSales ($)',
    color: COLOR_SCALES.wilderness.colors[5],
    strokeWidth: 2,
  },
]

