import { useState } from 'react'
import { Calendar, type TimeRange } from '../../../components/ui/Calendar'
import AppLayout from '../../../components/ui/AppLayout'
import type { PageProps } from '../../_page-types'
import styles from './styles.module.scss'
import { COLOR_SCALES } from '../../../styles/colors'

const CalendarDebug = () => {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const [containerWidth, setContainerWidth] = useState(100)
  const [breakpoint, setBreakpoint] = useState(600)
  const [showTimeRanges, setShowTimeRanges] = useState(false)

  // Example time ranges for demonstration
  const exampleTimeRanges: TimeRange[] = [
    {
      interval: [new Date(year, 0, 1), new Date(year, 0, 7)],
      color: "white", // Light color for text
      backgroundColor: COLOR_SCALES.wilderness.colors[4], // Green
    },
    {
      interval: [new Date(year, 1, 14), new Date(year, 1, 14)],
      color: "white", // Light color for text
      backgroundColor: COLOR_SCALES.rosewood.colors[4], // Pink/Rose
    },
    {
      interval: [new Date(year, 6, 1), new Date(year, 6, 31)],
      color: "white", // Light color for text
      backgroundColor: COLOR_SCALES.orange.colors[4], // Orange
    },
    {
      interval: [new Date(year, 11, 24), new Date(year, 11, 31)],
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
          <label htmlFor="year">Year:</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="1900"
            max="2100"
          />
        </div>

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
          <label htmlFor="breakpoint">Breakpoint: {breakpoint}px</label>
          <input
            id="breakpoint"
            type="range"
            min="300"
            max="1000"
            step="50"
            value={breakpoint}
            onChange={(e) => setBreakpoint(Number(e.target.value))}
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

        <div className={styles.info}>
          <p>
            <strong>Current Layout:</strong>{' '}
            {containerWidth < 60 ? '3x4 Grid (Compact/Mobile)' : '4x3 Grid (Desktop)'}
          </p>
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
            year={year}
            breakpoint={breakpoint}
            timeRanges={showTimeRanges ? exampleTimeRanges : undefined}
          />
        </div>
      </div>

      <section className={styles.usage}>
        <h2>Component Features</h2>
        <ul>
          <li><strong>Self-aware responsive design:</strong> Uses ResizeObserver instead of @media queries</li>
          <li><strong>Desktop layout:</strong> 4 columns × 3 rows (like macOS Calendar)</li>
          <li><strong>Mobile layout:</strong> 3 columns × 4 rows (like iOS Calendar)</li>
          <li><strong>Configurable breakpoint:</strong> Customize when to switch layouts</li>
          <li><strong>Today highlight:</strong> Current day is highlighted in red</li>
          <li><strong>Year selection:</strong> View any year from 1900 to 2100</li>
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

