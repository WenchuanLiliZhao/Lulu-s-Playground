import { useState } from 'react'
import { TrendChart, TREND_CHART_DEFAULTS } from '../../../components/ui/forDashboard/TrendChart'
import AppLayout from '../../../components/ui/AppLayout'
import type { PageProps } from '../../_page-types'
import { generateTrendData, chartLines } from './data'
import styles from './styles.module.scss'

const TrendChartDebug = () => {
  const [dataPoints, setDataPoints] = useState(12)
  const [showGrid, setShowGrid] = useState(TREND_CHART_DEFAULTS.showGrid)
  const [showLegend, setShowLegend] = useState(TREND_CHART_DEFAULTS.showLegend)
  const [animationDuration, setAnimationDuration] = useState(TREND_CHART_DEFAULTS.animationDuration)
  const [xAxisInterval, setXAxisInterval] = useState(TREND_CHART_DEFAULTS.xAxisInterval)
  const [xAxisAngle, setXAxisAngle] = useState(TREND_CHART_DEFAULTS.xAxisAngle)
  const [xAxisHeight, setXAxisHeight] = useState(TREND_CHART_DEFAULTS.xAxisHeight)
  const [marginBottom, setMarginBottom] = useState(TREND_CHART_DEFAULTS.marginBottom)
  const [xAxisTickMargin, setXAxisTickMargin] = useState(TREND_CHART_DEFAULTS.xAxisTickMargin)
  const [containerHeight, setContainerHeight] = useState(500)

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

      <div className={styles.chartContainer} style={{ height: `${containerHeight}px` }}>
        <TrendChart
          title="Revenue & User Growth"
          data={data}
          lines={chartLines}
          showGrid={showGrid}
          showLegend={showLegend}
          animationDuration={animationDuration}
          xAxisInterval={xAxisInterval}
          xAxisAngle={xAxisAngle}
          xAxisHeight={xAxisHeight}
          marginBottom={marginBottom}
          xAxisTickMargin={xAxisTickMargin}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="containerHeight">
            Container Height <code>(containerHeight)</code>: {containerHeight}px
          </label>
          <input
            id="containerHeight"
            type="range"
            min="200"
            max="800"
            step="50"
            value={containerHeight}
            onChange={(e) => setContainerHeight(Number(e.target.value))}
          />
          <span className={styles.hint}>
            🎯 Test component's height responsiveness
          </span>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="dataPoints">
            Data Points <code>(data)</code>: {dataPoints} months
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
            Animation Duration <code>(animationDuration)</code>: {animationDuration}ms
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
            {' '}Show Grid <code>(showGrid)</code>
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
            {' '}Show Legend <code>(showLegend)</code>
          </label>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="xAxisInterval">
            X-Axis Tick Interval <code>(xAxisInterval)</code>: {xAxisInterval === 0 ? 'Show All' : `Skip ${xAxisInterval}`}
          </label>
          <input
            id="xAxisInterval"
            type="range"
            min="0"
            max="5"
            step="1"
            value={typeof xAxisInterval === 'number' ? xAxisInterval : 0}
            onChange={(e) => setXAxisInterval(Number(e.target.value))}
          />
          <span className={styles.hint}>
            0 = show all ticks/grid lines, higher = skip more
          </span>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="xAxisAngle">
            X-Axis Label Angle <code>(xAxisAngle)</code>: {xAxisAngle}°
          </label>
          <input
            id="xAxisAngle"
            type="range"
            min="-90"
            max="0"
            step="15"
            value={xAxisAngle}
            onChange={(e) => setXAxisAngle(Number(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="xAxisHeight">
            X-Axis Height <code>(xAxisHeight)</code>: {xAxisHeight}px
          </label>
          <input
            id="xAxisHeight"
            type="range"
            min="20"
            max="120"
            step="5"
            value={xAxisHeight}
            onChange={(e) => setXAxisHeight(Number(e.target.value))}
          />
          <span className={styles.hint}>
            ⚡ Key control: Vertical space reserved for X-axis
          </span>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="xAxisTickMargin">
            X-Axis Tick Margin <code>(xAxisTickMargin)</code>: {xAxisTickMargin}px
          </label>
          <input
            id="xAxisTickMargin"
            type="range"
            min="-20"
            max="30"
            step="2"
            value={xAxisTickMargin}
            onChange={(e) => setXAxisTickMargin(Number(e.target.value))}
          />
          <span className={styles.hint}>
            Distance from axis line to labels
          </span>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="marginBottom">
            Chart Margin Bottom <code>(marginBottom)</code>: {marginBottom}px
          </label>
          <input
            id="marginBottom"
            type="range"
            min="-150"
            max="50"
            step="5"
            value={marginBottom}
            onChange={(e) => setMarginBottom(Number(e.target.value))}
          />
          <span className={styles.hint}>
            Internal chart spacing to X-axis area
          </span>
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
          <li>
            <strong>X-axis customization:</strong> Control tick interval (show all
            or skip), label angle, and axis height
          </li>
        </ul>

        <h3>X-Axis Controls</h3>
        <p>
          The debug page includes controls for X-axis behavior:
        </p>
        <ul>
          <li>
            <strong>Tick Interval:</strong> 0 = show all grid lines and labels,
            higher values = skip more ticks (useful for dense data)
          </li>
          <li>
            <strong>Label Angle:</strong> Rotate labels from 0° (horizontal) to
            -90° (vertical) to prevent overlapping
          </li>
          <li>
            <strong>Axis Height:</strong> Adjust vertical space for rotated labels
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
  id: string,        // Unique identifier (e.g., "2024-01")
  name: string,      // X-axis label (e.g., month name)
  [key: string]: number | string  // Data values
}`}
          </code>
        </pre>
        <p>
          <strong>Note:</strong> The <code>id</code> field ensures each data
          point is uniquely identified, preventing tooltip issues when multiple
          data points share the same display name (e.g., "Jul 2024" and "Jul 2025").
        </p>
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

