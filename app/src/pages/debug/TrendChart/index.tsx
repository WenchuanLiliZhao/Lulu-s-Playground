import { useState } from 'react'
import { TrendChart } from '../../../components/ui/forDashboard/TrendChart'
import AppLayout from '../../../components/ui/AppLayout'
import type { PageProps } from '../../_page-types'
import { generateTrendData, chartLines } from './data'
import styles from './styles.module.scss'

const TrendChartDebug = () => {
  const [dataPoints, setDataPoints] = useState(12)
  const [showGrid, setShowGrid] = useState(true)
  const [showLegend, setShowLegend] = useState(true)
  const [animationDuration, setAnimationDuration] = useState(1500)

  const data = generateTrendData(dataPoints)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>TrendChart Component Debug</h1>
        <p className={styles.description}>
          Line chart component for displaying trends and analytics data with
          responsive design
        </p>
        <p className={styles.path}>
          Path: src/components/ui/forDashboard/TrendChart
        </p>
      </div>

      <div className={styles.chartContainer}>
        <TrendChart
          title="Revenue & User Growth"
          data={data}
          lines={chartLines}
          showGrid={showGrid}
          showLegend={showLegend}
          animationDuration={animationDuration}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="dataPoints">
            Data Points: {dataPoints} months
          </label>
          <input
            id="dataPoints"
            type="range"
            min="6"
            max="24"
            value={dataPoints}
            onChange={(e) => setDataPoints(Number(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="animationDuration">
            Animation Duration: {animationDuration}ms
          </label>
          <input
            id="animationDuration"
            type="range"
            min="0"
            max="3000"
            step="100"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(Number(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="showGrid">
            <input
              id="showGrid"
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            {' '}Show Grid
          </label>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="showLegend">
            <input
              id="showLegend"
              type="checkbox"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
            />
            {' '}Show Legend
          </label>
        </div>

        <div className={styles.info}>
          <p>
            <strong>Tip:</strong> The chart uses the design system's color
            variables and automatically adapts to light/dark theme changes.
          </p>
        </div>
      </div>

      

      <section className={styles.usage}>
        <h2>Component Features</h2>
        <ul>
          <li>
            <strong>Configurable styling:</strong> Font sizes and chart padding
            can be adjusted via SCSS variables
          </li>
          <li>
            <strong>Theme support:</strong> Automatically adapts to light/dark
            themes using design system colors
          </li>
          <li>
            <strong>Responsive:</strong> Uses ResponsiveContainer from Recharts
            for fluid sizing
          </li>
          <li>
            <strong>Multiple lines:</strong> Support for multiple data series
            with custom colors
          </li>
          <li>
            <strong>Interactive tooltips:</strong> Hover over data points to see
            detailed information
          </li>
          <li>
            <strong>Smooth animations:</strong> Configurable animation duration
            for data transitions
          </li>
          <li>
            <strong>Grid and legend:</strong> Optional grid lines and legend
            display
          </li>
        </ul>

        <h3>SCSS Configuration</h3>
        <p>
          The following SCSS variables at the top of{' '}
          <code>_styles.module.scss</code> can be adjusted for UI customization:
        </p>
        <ul>
          <li>
            <code>$x-axis-label-font-size</code>: Font size for X-axis labels
            (default: 12px)
          </li>
          <li>
            <code>$y-axis-label-font-size</code>: Font size for Y-axis labels
            (default: 12px)
          </li>
          <li>
            <code>$chart-title-font-size</code>: Font size for chart title
            (default: 18px)
          </li>
          <li>
            <code>$chart-padding</code>: Padding around the chart (default:
            24px)
          </li>
        </ul>

        <h3>Data Structure</h3>
        <p>
          Sample data is generated in <code>data.ts</code> using the{' '}
          <code>generateTrendData</code> function. The data structure is:
        </p>
        <pre>
          <code>
{`{
  name: string,      // X-axis label (e.g., month name)
  [key: string]: number | string  // Data values
}`}
          </code>
        </pre>
      </section>
    </div>
  )
}

const TrendChartDebugPage: PageProps = {
  title: 'TrendChart Debug',
  slug: 'debug-trend-chart',
  content: (
    <AppLayout isTesting={true}>
      <TrendChartDebug />
    </AppLayout>
  ),
}

export default TrendChartDebugPage

