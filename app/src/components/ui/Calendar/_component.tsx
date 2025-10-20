import { useState, useEffect, useRef } from 'react'
import styles from './_styles.module.scss'


// 


export interface TimeRange {
  /**
   * The date range [start, end] (inclusive)
   */
  interval: [Date, Date]
  /**
   * Color of the day text
   */
  color: string
  /**
   * Background color of the day cell
   */
  backgroundColor: string
}

export interface CalendarProps {
  /**
   * Year to display
   * @default current year
   */
  year?: number
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
 * Check if a date falls within any of the time ranges and return the styling
 */
const getDateRangeStyle = (
  date: Date,
  timeRanges?: TimeRange[]
): { color?: string; backgroundColor?: string } | null => {
  if (!timeRanges || timeRanges.length === 0) return null

  // Normalize the date to midnight for comparison
  const normalizedDate = new Date(date)
  normalizedDate.setHours(0, 0, 0, 0)

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
      return {
        color: range.color,
        backgroundColor: range.backgroundColor,
      }
    }
  }

  return null
}

interface DayCell {
  day: number
  isCurrentMonth: boolean
}

const MonthCalendar = ({
  month,
  year,
  timeRanges,
}: {
  month: number
  year: number
  timeRanges?: TimeRange[]
}) => {
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

  return (
    <div className={styles.month}>
      <div className={styles.monthHeader}>{MONTH_NAMES[month]}</div>
      <div className={styles.dayNames}>
        {DAY_NAMES.map((day) => (
          <div key={day} className={styles.dayName}>
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
          const rangeStyle = getDateRangeStyle(cellDate, timeRanges)

          return (
            <div
              key={index}
              className={`${styles.day} ${
                !dayCell.isCurrentMonth ? styles.otherMonth : ''
              } ${
                isTodayInThisMonth &&
                dayCell.isCurrentMonth &&
                dayCell.day === currentDay
                  ? styles.today
                  : ''
              }`}
              style={
                rangeStyle
                  ? {
                      color: rangeStyle.color,
                      backgroundColor: rangeStyle.backgroundColor,
                    }
                  : undefined
              }
            >
              {dayCell.day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Calendar = ({
  year = new Date().getFullYear(),
  className = '',
  breakpoint = 600,
  timeRanges = [],
}: CalendarProps) => {
  const [isCompact, setIsCompact] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        setIsCompact(width < breakpoint)
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [breakpoint])

  const months = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${
        isCompact ? styles.compact : styles.desktop
      } ${className}`}
    >
      <div className={styles.yearHeader}>{year}</div>
      <div className={styles.grid}>
        {months.map((month) => (
          <MonthCalendar
            key={month}
            month={month}
            year={year}
            timeRanges={timeRanges}
          />
        ))}
      </div>
    </div>
  )
}

