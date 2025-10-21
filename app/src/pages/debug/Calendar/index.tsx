import { useState } from 'react'
import { Calendar, type TimeRange, responsiveness } from '../../../components/ui/Calendar'
import AppLayout from '../../../components/ui/AppLayout'
import type { PageProps } from '../../_page-types'
import styles from './styles.module.scss'
import { COLOR_SCALES } from '../../../styles/color-chart'

const CalendarDebug = () => {
  const currentYear = new Date().getFullYear()
  const [containerWidth, setContainerWidth] = useState(100)
  const [showTimeRanges, setShowTimeRanges] = useState(false)
  const [headerMode, setHeaderMode] = useState<"default" | "switch">("default")
  const [switchRangeStart, setSwitchRangeStart] = useState(2)
  const [switchRangeEnd, setSwitchRangeEnd] = useState(2)

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

        <div className={styles.controlGroup}>
          <label htmlFor="headerMode">Header Mode</label>
          <select
            id="headerMode"
            value={headerMode}
            onChange={(e) => setHeaderMode(e.target.value as "default" | "switch")}
          >
            <option value="default">Default (Arrow Buttons)</option>
            <option value="switch">Switch (Year Range)</option>
          </select>
        </div>

        {headerMode === "switch" && (
          <>
            <div className={styles.controlGroup}>
              <label htmlFor="switchRangeStart">
                Years Before Current: {switchRangeStart}
              </label>
              <input
                id="switchRangeStart"
                type="range"
                min="0"
                max="10"
                value={switchRangeStart}
                onChange={(e) => setSwitchRangeStart(Number(e.target.value))}
              />
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="switchRangeEnd">
                Years After Current: {switchRangeEnd}
              </label>
              <input
                id="switchRangeEnd"
                type="range"
                min="0"
                max="10"
                value={switchRangeEnd}
                onChange={(e) => setSwitchRangeEnd(Number(e.target.value))}
              />
            </div>
          </>
        )}

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
            headerMode={
              headerMode === "switch" 
                ? ["switch", switchRangeStart, switchRangeEnd] 
                : "default"
            }
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
          <li><strong>Year navigation:</strong> Use arrow buttons to navigate between years (default mode)</li>
          <li><strong>Year switch mode:</strong> Display a year range selector with customizable range</li>
          <li><strong>Today button:</strong> Quickly return to the current year (available in both modes)</li>
          <li><strong>Time ranges:</strong> Highlight specific date ranges with custom colors</li>
        </ul>
        
        {headerMode === "switch" && (
          <div className={styles.timeRangeInfo}>
            <h3>Current Header Mode: Switch</h3>
            <p>
              Showing years from <strong>{currentYear - switchRangeStart}</strong> to{' '}
              <strong>{currentYear + switchRangeEnd}</strong>
            </p>
            <p>
              The active year is highlighted with the semantic active color. Click any year to switch to that year's calendar.
            </p>
          </div>
        )}

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

