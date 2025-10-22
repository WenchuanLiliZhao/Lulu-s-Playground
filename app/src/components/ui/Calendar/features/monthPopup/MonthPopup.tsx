import { useEffect, useRef, useState } from 'react'
import styles from './_styles.module.scss'
import type { TimeRange } from '../../_component'

interface MonthPopupProps {
  month: number
  year: number
  timeRanges?: TimeRange[]
  sourceElement: HTMLElement | null
  onClose: () => void
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

interface DayCell {
  day: number
  isCurrentMonth: boolean
}

const getMonthData = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { month, year, firstDay, daysInMonth }
}

const getDateRanges = (date: Date, timeRanges?: TimeRange[]): TimeRange[] => {
  if (!timeRanges || timeRanges.length === 0) return []

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

export const MonthPopup = ({ 
  month, 
  year, 
  timeRanges, 
  sourceElement,
  onClose 
}: MonthPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [animationOrigin, setAnimationOrigin] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (sourceElement && popupRef.current) {
      const sourceRect = sourceElement.getBoundingClientRect()
      const containerRect = sourceElement.closest('[class*="container"]')?.getBoundingClientRect()
      
      if (containerRect) {
        setAnimationOrigin({
          x: sourceRect.left + sourceRect.width / 2 - containerRect.left,
          y: sourceRect.top + sourceRect.height / 2 - containerRect.top,
        })
      }
    }
    
    // Trigger animation
    const timer = setTimeout(() => setIsAnimating(false), 50)
    return () => clearTimeout(timer)
  }, [sourceElement])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

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

  // Add days from next month to fill the grid
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
    <div className={styles.overlay}>
      <div
        ref={popupRef}
        className={`${styles.popup} ${isAnimating ? styles.popupEnter : styles.popupEnterActive}`}
        style={{
          '--origin-x': `${animationOrigin.x}px`,
          '--origin-y': `${animationOrigin.y}px`,
        } as React.CSSProperties}
      >
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>
            {MONTH_NAMES[month]} {year}
          </h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close popup"
          >
            ✕
          </button>
        </div>

        <div className={styles.popupContent}>
          <div className={styles.dayNames}>
            {DAY_NAMES.map((day) => (
              <div key={day} className={styles.dayName}>
                {day}
              </div>
            ))}
          </div>
          <div className={styles.days}>
            {days.map((dayCell, index) => {
              let actualMonth: number
              let actualYear: number

              if (!dayCell.isCurrentMonth) {
                if (index < monthData.firstDay) {
                  actualMonth = prevMonth
                  actualYear = prevYear
                } else {
                  actualMonth = month === 11 ? 0 : month + 1
                  actualYear = month === 11 ? year + 1 : year
                }
              } else {
                actualMonth = month
                actualYear = year
              }

              const cellDate = new Date(actualYear, actualMonth, dayCell.day)
              const matchingRanges = dayCell.isCurrentMonth 
                ? getDateRanges(cellDate, timeRanges)
                : []

              const isToday = isTodayInThisMonth &&
                dayCell.isCurrentMonth &&
                dayCell.day === currentDay

              const rangesWithNames = matchingRanges.filter(range => range.name)
              const showTooltip = hoveredDay === index && rangesWithNames.length > 0

              return (
                <div
                  key={index}
                  className={`${styles.day} ${
                    !dayCell.isCurrentMonth ? styles.otherMonth : ''
                  } ${isToday ? styles.today : ''}`}
                  onMouseEnter={() => setHoveredDay(index)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
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
                      const rangeWithColor = matchingRanges.find(range => range.color);
                      return rangeWithColor?.color ? { color: rangeWithColor.color } : undefined;
                    })()}
                  >
                    {dayCell.day}
                  </span>
                  {isToday && <span className={styles.todayDot}></span>}
                  
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
      </div>
    </div>
  )
}

