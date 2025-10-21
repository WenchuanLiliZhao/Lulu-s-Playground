import { useState } from 'react'
import { Calendar, type TimeRange, responsiveness } from '../../../components/ui/Calendar'
import AppLayout from '../../../components/ui/AppLayout'
import type { PageProps } from '../../_page-types'
import styles from './styles.module.scss'
import { COLOR_SCALES } from '../../../styles/colors'

const CalendarDebug = () => {
  const currentYear = new Date().getFullYear()
  const [containerWidth, setContainerWidth] = useState(100)
  const [showTimeRanges, setShowTimeRanges] = useState(false)

  // Example time ranges for demonstration (using current year)
  const exampleTimeRanges: TimeRange[] = [
    {
      interval: [new Date(currentYear, 0, 1), new Date(currentYear, 0, 7)],
      color: "white", // Light color for text
      backgroundColor: COLOR_SCALES.wilderness.colors[4], // Green
    },
    {
      interval: [new Date(currentYear, 1, 14), new Date(currentYear, 1, 14)],
      color: "white", // Light color for text
      backgroundColor: COLOR_SCALES.rosewood.colors[4], // Pink/Rose
    },
    {
      interval: [new Date(currentYear, 6, 1), new Date(currentYear, 6, 31)],
      color: "white", // Light color for text
      backgroundColor: COLOR_SCALES.orange.colors[4], // Orange
    },
    {
      interval: [new Date(currentYear, 11, 24), new Date(currentYear, 11, 31)],
      color: "white", // Light color for text
      backgroundColor: COLOR_SCALES.daydream.colors[4], // Blue
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Calendar Component Debug</h1>
        <p className={styles.description}>
          Full-year calendar component with responsive design based on container size
        </p>
        <p className={styles.path}>
          Path: src/components/ui/Calendar
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="containerWidth">
            Container Width: {containerWidth}%
          </label>
          <input
            id="containerWidth"
            type="range"
            min="20"
            max="100"
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="showTimeRanges">
            <input
              id="showTimeRanges"
              type="checkbox"
              checked={showTimeRanges}
              onChange={(e) => setShowTimeRanges(e.target.checked)}
            />
            {' '}Show Time Ranges Example
          </label>
        </div>

        <div className={styles.responsivenessDisplay}>
          <h3>Responsiveness Configuration</h3>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Breakpoint</th>
                  <th>Year Font</th>
                  <th>Month Font</th>
                  <th>Week Font</th>
                  <th>Cell Font</th>
                  <th>Gap</th>
                  <th>Columns</th>
                </tr>
              </thead>
              <tbody>
                {responsiveness.map((config, index) => (
                  <tr key={index}>
                    <td>{config.breakpoint}px+</td>
                    <td>{config.yearFontSize}px</td>
                    <td>{config.monthFontSize}px</td>
                    <td>{config.weekFontSize}px</td>
                    <td>{config.cellFontSize}px</td>
                    <td>{config.gap}px</td>
                    <td>{config.monthColCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.info}>
          <p>
            <strong>Tip:</strong> Adjust the container width slider to see the
            layout switch based on the component's own size, not the viewport.
            The component uses ResizeObserver for self-aware responsive design.
          </p>
        </div>
      </div>

      <div className={styles.calendarWrapper}>
        <div
          className={styles.resizableContainer}
          style={{ width: `${containerWidth}%` }}
        >
          <Calendar
            timeRanges={showTimeRanges ? exampleTimeRanges : undefined}
          />
        </div>
      </div>

      <section className={styles.usage}>
        <h2>Component Features</h2>
        <ul>
          <li><strong>Self-aware responsive design:</strong> Uses ResizeObserver instead of @media queries</li>
          <li><strong>Multiple breakpoints:</strong> Adapts font sizes, gaps, and columns based on container width</li>
          <li><strong>Dynamic column layouts:</strong> 2/3/4 columns depending on available space</li>
          <li><strong>Responsive typography:</strong> Font sizes scale automatically with container size</li>
          <li><strong>Today highlight:</strong> Current day is highlighted with a dot indicator</li>
          <li><strong>Year navigation:</strong> Use arrow buttons to navigate between years</li>
          <li><strong>Today button:</strong> Quickly return to the current year</li>
          <li><strong>Time ranges:</strong> Highlight specific date ranges with custom colors</li>
        </ul>
        
        {showTimeRanges && (
          <div className={styles.timeRangeInfo}>
            <h3>Active Time Ranges</h3>
            <ul>
              <li>Jan 1-7: Wilderness color (New Year week)</li>
              <li>Feb 14: Rosewood color (Valentine's Day)</li>
              <li>July 1-31: Orange color (Summer month)</li>
              <li>Dec 24-31: Daydream color (Holiday week)</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

const CalendarDebugPage: PageProps = {
  title: 'Calendar Debug',
  slug: 'debug-calendar',
  content: (
    <AppLayout isTesting={true}>
      <CalendarDebug />
    </AppLayout>
  ),
}

export default CalendarDebugPage

