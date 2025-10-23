import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import styles from './_styles.module.scss'

export interface TrendChartDataPoint {
  /**
   * Unique identifier for the data point (used internally for key)
   */
  id: string
  /**
   * Display label for X-axis
   */
  name: string
  [key: string]: string | number
}

export interface TrendChartLine {
  dataKey: string
  name: string
  color: string
  strokeWidth?: number
}

export interface TrendChartProps {
  /**
   * Chart title
   */
  title?: string
  /**
   * Data for the chart
   */
  data: TrendChartDataPoint[]
  /**
   * Lines to display
   */
  lines: TrendChartLine[]
  /**
   * Show grid
   * @default true
   */
  showGrid?: boolean
  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean
  /**
   * Animation duration in ms
   * @default 1500
   */
  animationDuration?: number
  /**
   * Optional className
   */
  className?: string
}

export const TrendChart = ({
  title,
  data,
  lines,
  showGrid = true,
  showLegend = true,
  animationDuration = 1500,
  className = '',
}: TrendChartProps) => {
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis 
              dataKey="id" 
              tickFormatter={(value) => {
                const point = data.find(d => d.id === value)
                return point?.name || value
              }}
            />
            <YAxis width={60} orientation="left" />
            <Tooltip 
              labelFormatter={(value) => {
                const point = data.find(d => d.id === value)
                return point?.name || value
              }}
            />
            {showLegend && <Legend verticalAlign="top" height={36} />}
            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth ?? 2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                animationDuration={animationDuration}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

