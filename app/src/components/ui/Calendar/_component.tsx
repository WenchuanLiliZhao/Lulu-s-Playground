import { useState, useEffect, useRef } from 'react'
import styles from './_styles.module.scss'
import { responsiveness, type repsonsivenessProps } from './_config'
import { MonthPopup, useMonthPopup } from './features'
import { IconButton } from '../IconButton'
import { Switch } from '../Switch'


export interface TimeRange {
  /**
   * The date range [start, end] (inclusive)
   */
  interval: [Date, Date]
  /**
   * Color of the day text
   * If not provided, uses the theme's default text color (var(--color-main))
   * When provided, this color will override the default with higher specificity
   */
  color?: string
  /**
   * Background color of the day cell
   */
  backgroundColor: string
  /**
   * Opacity of the background color
   * @default 1
   */
  backgroundOpacity?: number
  /**
   * Name of the time range (displayed in tooltip on hover)
   */
  name?: string
}

export interface FiscalYearConfig {
  /**
   * The month when fiscal year starts (0-11, where 0 is January)
   */
  startMonth: number
  /**
   * The day of the month when fiscal year starts (1-31)
   */
  startDay: number
}

export interface CalendarProps {
  /**
   * Initial year to display
   * @default current year
   */
  initialYear?: number
  /**
   * Callback when active year changes
   */
  onYearChange?: (year: number) => void
  /**
   * Optional className
   */
  className?: string
  /**
   * Breakpoint width for switching layout (in pixels)
   * @default 600
   */
  breakpoint?: number
  /**
   * Array of time ranges with custom colors
   */
  timeRanges?: TimeRange[]
  /**
   * Header mode for year selection
   * - "default": arrow buttons with year display
   * - ["switch", x, y]: year switch from (current year - x) to (current year + y)
   * @default "default"
   */
  headerMode?: "default" | ["switch", number, number]
  /**
   * Fiscal year configuration
   * When provided, enables fiscal year mode
   */
  fiscalYearConfig?: FiscalYearConfig
  /**
   * Whether to use fiscal year mode
   * @default false
   */
  useFiscalYear?: boolean
  /**
   * Callback when fiscal year mode changes
   */
  onFiscalYearChange?: (useFiscalYear: boolean) => void
}

interface MonthData {
  month: number
  year: number
  firstDay: number // 0-6 (Sunday-Saturday)
  daysInMonth: number
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getMonthData = (month: number, year: number): MonthData => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { month, year, firstDay, daysInMonth }
}

/**
 * Get all time ranges that contain the given date
 */
const getDateRanges = (
  date: Date,
  timeRanges?: TimeRange[]
): TimeRange[] => {
  if (!timeRanges || timeRanges.length === 0) return []

  // Normalize the date to midnight for comparison
  const normalizedDate = new Date(date)
  normalizedDate.setHours(0, 0, 0, 0)

  const matchingRanges: TimeRange[] = []

  for (const range of timeRanges) {
    const [start, end] = range.interval
    const normalizedStart = new Date(start)
    normalizedStart.setHours(0, 0, 0, 0)
    const normalizedEnd = new Date(end)
    normalizedEnd.setHours(0, 0, 0, 0)

    if (
      normalizedDate >= normalizedStart &&
      normalizedDate <= normalizedEnd
    ) {
      matchingRanges.push(range)
    }
  }

  return matchingRanges
}

interface DayCell {
  day: number
  isCurrentMonth: boolean
}

const MonthCalendar = ({
  month,
  year,
  timeRanges,
  responsiveConfig,
  onExpandClick,
}: {
  month: number
  year: number
  timeRanges?: TimeRange[]
  responsiveConfig: repsonsivenessProps
  onExpandClick?: (month: number, year: number, element: HTMLElement) => void
}) => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const monthRef = useRef<HTMLDivElement>(null)
  const monthData = getMonthData(month, year)
  const days: DayCell[] = []

  // Get previous month's data
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()

  // Add days from previous month
  for (let i = 0; i < monthData.firstDay; i++) {
    days.push({
      day: daysInPrevMonth - monthData.firstDay + i + 1,
      isCurrentMonth: false,
    })
  }

  // Add all days of current month
  for (let i = 1; i <= monthData.daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
    })
  }

  // Add days from next month to fill the grid (usually 6 rows × 7 days = 42 cells)
  const remainingCells = 42 - days.length
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
    })
  }

  const today = new Date()
  const isTodayInThisMonth =
    today.getMonth() === month && today.getFullYear() === year
  const currentDay = today.getDate()

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onExpandClick && monthRef.current) {
      onExpandClick(month, year, monthRef.current)
    }
  }

  return (
    <div 
      ref={monthRef}
      className={styles.month}
    >
      <div className={styles.monthHeader}>
        <span 
          className={styles.monthName}
          style={{ fontSize: `${responsiveConfig.monthFontSize}px` }}
        >
          {MONTH_NAMES[month]}
        </span>
        {onExpandClick && (
          <IconButton
            icon="open_in_full"
            // size="small"
            variant="outline"
            className={styles.expandButton}
            onClick={handleExpandClick}
            aria-label={`Expand ${MONTH_NAMES[month]}`}
          />
        )}
      </div>
      <div className={styles.dayNames}>
        {DAY_NAMES.map((day) => (
          <div 
            key={day} 
            className={styles.dayName}
            style={{ fontSize: `${responsiveConfig.weekFontSize}px` }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {days.map((dayCell, index) => {
          // Calculate the actual date for this cell
          let actualMonth: number
          let actualYear: number

          if (!dayCell.isCurrentMonth) {
            if (index < monthData.firstDay) {
              // Day from previous month
              actualMonth = prevMonth
              actualYear = prevYear
            } else {
              // Day from next month
              actualMonth = month === 11 ? 0 : month + 1
              actualYear = month === 11 ? year + 1 : year
            }
          } else {
            actualMonth = month
            actualYear = year
          }

          const cellDate = new Date(actualYear, actualMonth, dayCell.day)
          // Only apply range styles to dates in the current month
          const matchingRanges = dayCell.isCurrentMonth 
            ? getDateRanges(cellDate, timeRanges)
            : []

          const isToday = isTodayInThisMonth &&
            dayCell.isCurrentMonth &&
            dayCell.day === currentDay

          // Get ranges with names for tooltip
          const rangesWithNames = matchingRanges.filter(range => range.name)

          const showTooltip = hoveredDay === index && rangesWithNames.length > 0

          return (
            <div
              key={index}
              className={`${styles.day} ${
                !dayCell.isCurrentMonth ? styles.otherMonth : ''
              } ${
                isToday
                  ? styles.today
                  : ''
              }`}
              style={{
                fontSize: `${responsiveConfig.cellFontSize}px`,
              }}
              onMouseEnter={() => setHoveredDay(index)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {/* Render background layers for each matching time range */}
              {matchingRanges.map((range, rangeIndex) => (
                <div
                  key={rangeIndex}
                  className={styles.rangeBackground}
                  style={{
                    backgroundColor: range.backgroundColor,
                    opacity: range.backgroundOpacity ?? 1,
                  }}
                />
              ))}
              <span 
                className={styles.dayNumber}
                style={(() => {
                  // Find the first range with an explicit color
                  const rangeWithColor = matchingRanges.find(range => range.color);
                  return rangeWithColor?.color ? { color: rangeWithColor.color } : undefined;
                })()}
              >
                {dayCell.day}
              </span>
              {isToday && <span className={styles.todayMarker}></span>}
              
              {/* Tooltip */}
              {showTooltip && (
                <div className={styles.tooltip}>
                  {rangesWithNames.map((range, i) => (
                    <div key={i} className={styles.tooltipItem}>
                      <span 
                        className={styles.tooltipDot}
                        style={{
                          backgroundColor: range.backgroundColor,
                          opacity: range.backgroundOpacity ?? 1,
                        }}
                      />
                      <span className={styles.tooltipText}>{range.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Calendar = ({
  initialYear = new Date().getFullYear(),
  onYearChange,
  className = '',
  breakpoint = 600,
  timeRanges = [],
  headerMode = "default",
  fiscalYearConfig,
  useFiscalYear = false,
  onFiscalYearChange,
}: CalendarProps) => {
  const [year, setYear] = useState(initialYear)
  const [isCompact, setIsCompact] = useState(false)
  const [currentResponsiveConfig, setCurrentResponsiveConfig] = useState<repsonsivenessProps>(responsiveness[0])
  const containerRef = useRef<HTMLDivElement>(null)
  const { popupState, openPopup, closePopup } = useMonthPopup()
  
  const currentYear = new Date().getFullYear()
  
  const handlePreviousYear = () => setYear(year - 1)
  const handleNextYear = () => setYear(year + 1)
  const handleToday = () => setYear(currentYear)
  const handleYearChange = (newYear: number) => setYear(newYear)

  // Calculate year options for switch mode
  const yearOptions = headerMode !== "default" 
    ? Array.from(
        { length: headerMode[2] + headerMode[1] + 1 }, 
        (_, i) => currentYear - headerMode[1] + i
      )
    : []

  // Generate months array based on fiscal year mode
  // For fiscal year, months start from fiscalYearConfig.startMonth
  const months = useFiscalYear && fiscalYearConfig
    ? Array.from({ length: 12 }, (_, i) => {
        const month = (fiscalYearConfig.startMonth + i) % 12
        return { month, year: month < fiscalYearConfig.startMonth ? year + 1 : year }
      })
    : Array.from({ length: 12 }, (_, i) => ({ month: i, year }))

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        setIsCompact(width < breakpoint)
        
        // Find the appropriate responsive config
        let config = responsiveness[0]
        for (let i = responsiveness.length - 1; i >= 0; i--) {
          if (width >= responsiveness[i].breakpoint) {
            config = responsiveness[i]
            break
          }
        }
        setCurrentResponsiveConfig(config)
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [breakpoint])

  useEffect(() => {
    if (onYearChange) {
      onYearChange(year)
    }
  }, [year, onYearChange])

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${
        isCompact ? styles.compact : styles.desktop
      } ${className}`}
    >
      <div className={styles.headerWrapper}>
        {headerMode === "default" ? (
          // Default mode: arrow buttons with year display
          <>
            <div className={styles.yearControls}>
              <button 
                className={styles.yearButton}
                onClick={handlePreviousYear}
                aria-label="Previous year"
              >
                ←
              </button>
              <div 
                className={styles.yearHeader}
                style={{ fontSize: `${currentResponsiveConfig.yearFontSize}px` }}
              >
                {year}
              </div>
              <button 
                className={styles.yearButton}
                onClick={handleNextYear}
                aria-label="Next year"
              >
                →
              </button>
            </div>
            <button 
              className={styles.todayButton}
              onClick={handleToday}
              disabled={year === currentYear}
            >
              Today
            </button>
          </>
        ) : (
          // Switch mode: year selection with fiscal year toggle
          <>
            <Switch
              options={yearOptions.map(String)}
              selectedIndex={yearOptions.indexOf(year)}
              onChange={(index) => handleYearChange(yearOptions[index])}
              className={styles.yearSwitch}
            />
            {fiscalYearConfig && onFiscalYearChange && (
              <Switch
                options={['Calendar Year', 'Fiscal Year']}
                initialSelected={useFiscalYear ? 1 : 0}
                onChange={(index) => onFiscalYearChange(index === 1)}
                className={styles.fiscalYearSwitch}
              />
            )}
          </>
        )}
      </div>
      <div 
        className={styles.grid}
        style={{
          gap: `${currentResponsiveConfig.gap}px`,
          gridTemplateColumns: `repeat(${currentResponsiveConfig.monthColCount}, 1fr)`,
        }}
      >
        {months.map((monthData, index) => (
          <MonthCalendar
            key={`${monthData.year}-${monthData.month}-${index}`}
            month={monthData.month}
            year={monthData.year}
            timeRanges={timeRanges}
            responsiveConfig={currentResponsiveConfig}
            onExpandClick={openPopup}
          />
        ))}
      </div>

      {popupState.isOpen && popupState.month !== null && popupState.year !== null && (
        <MonthPopup
          month={popupState.month}
          year={popupState.year}
          timeRanges={timeRanges}
          sourceElement={popupState.sourceElement}
          onClose={closePopup}
        />
      )}
    </div>
  )
}

