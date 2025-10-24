import { useState, useEffect, useRef } from 'react'
import styles from './_styles.module.scss'
import { Icon } from '../Icon'

export interface DatePickerProps {
  /**
   * Selected date value
   */
  value?: Date | null
  /**
   * Callback when date is selected
   */
  onChange?: (date: Date | null) => void
  /**
   * Placeholder text
   * @default "Select date..."
   */
  placeholder?: string
  /**
   * Date format function
   * @default formats as "MMM DD, YYYY"
   */
  formatDate?: (date: Date) => string
  /**
   * Optional className
   */
  className?: string
  /**
   * Size variant
   * @default "default"
   */
  size?: 'small' | 'default'
  /**
   * Disabled state
   */
  disabled?: boolean
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

const defaultFormatDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

interface MonthData {
  month: number
  year: number
  firstDay: number
  daysInMonth: number
}

interface DayCell {
  day: number
  isCurrentMonth: boolean
}

const getMonthData = (month: number, year: number): MonthData => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { month, year, firstDay, daysInMonth }
}

export const DatePicker = ({
  value = null,
  onChange,
  placeholder = 'Select date...',
  formatDate = defaultFormatDate,
  className = '',
  size = 'default',
  disabled = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(
    value ? value.getMonth() : new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState(
    value ? value.getFullYear() : new Date().getFullYear()
  )
  const containerRef = useRef<HTMLDivElement>(null)

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day)
    onChange?.(selectedDate)
    setIsOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(null)
  }

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    onChange?.(today)
    setIsOpen(false)
  }

  const monthData = getMonthData(currentMonth, currentYear)
  const days: DayCell[] = []

  // Get previous month's data
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
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
    today.getMonth() === currentMonth && today.getFullYear() === currentYear
  const currentDay = today.getDate()

  const isSelectedDate = (day: number): boolean => {
    if (!value) return false
    return (
      value.getDate() === day &&
      value.getMonth() === currentMonth &&
      value.getFullYear() === currentYear
    )
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${styles[`size-${size}`]} ${
        disabled ? styles.disabled : ''
      } ${className}`}
    >
      <div
        className={`${styles.input} ${isOpen ? styles.open : ''}`}
        onClick={handleInputClick}
      >
        <Icon icon="calendar_today" className={styles.icon} />
        <span className={value ? styles.value : styles.placeholder}>
          {value ? formatDate(value) : placeholder}
        </span>
        {value && !disabled && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear date"
          >
            <Icon icon="close" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button
              className={styles.navButton}
              onClick={handlePreviousMonth}
              aria-label="Previous month"
            >
              <Icon icon="chevron_left" />
            </button>
            <span className={styles.monthYear}>
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              className={styles.navButton}
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <Icon icon="chevron_right" />
            </button>
          </div>

          <div className={styles.dayNames}>
            {DAY_NAMES.map((day) => (
              <div key={day} className={styles.dayName}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((dayCell, index) => {
              const isToday =
                isTodayInThisMonth &&
                dayCell.isCurrentMonth &&
                dayCell.day === currentDay
              const isSelected = dayCell.isCurrentMonth && isSelectedDate(dayCell.day)

              return (
                <button
                  key={index}
                  className={`${styles.day} ${
                    !dayCell.isCurrentMonth ? styles.otherMonth : ''
                  } ${isToday ? styles.today : ''} ${
                    isSelected ? styles.selected : ''
                  }`}
                  onClick={() =>
                    dayCell.isCurrentMonth && handleDateSelect(dayCell.day)
                  }
                  disabled={!dayCell.isCurrentMonth}
                >
                  {dayCell.day}
                </button>
              )
            })}
          </div>

          <div className={styles.calendarFooter}>
            <button className={styles.todayButton} onClick={handleToday}>
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

