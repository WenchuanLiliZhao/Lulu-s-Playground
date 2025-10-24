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
  /**
   * Positioning strategy for the calendar dropdown:
   * - `true`: Position relative to the nearest scrollable parent container (recommended for complex layouts)
   * - `false`: Position relative to the viewport/screen
   * @default true
   */
  useContainerBounds?: boolean
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

/**
 * Position utilities for dropdown positioning
 */

interface BoundingBox {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

interface PositionConfig {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
}

/**
 * Get viewport bounds
 */
const getViewportBounds = (): BoundingBox => ({
  top: 0,
  left: 0,
  right: window.innerWidth,
  bottom: window.innerHeight,
  width: window.innerWidth,
  height: window.innerHeight,
})

/**
 * Find the nearest scrollable ancestor or return viewport bounds
 * @param element - The element to start searching from
 * @returns The bounds of the scrollable container or viewport
 */
const getScrollableContainer = (element: HTMLElement | null): BoundingBox => {
  if (!element) {
    return getViewportBounds()
  }

  let current = element.parentElement
  
  while (current) {
    const style = window.getComputedStyle(current)
    const overflow = style.overflow + style.overflowY + style.overflowX
    
    // Check if element is scrollable
    if (/(auto|scroll)/.test(overflow)) {
      const rect = current.getBoundingClientRect()
      return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      }
    }
    
    current = current.parentElement
  }
  
  // If no scrollable container found, return viewport bounds
  return getViewportBounds()
}

/**
 * Calculate optimal dropdown position based on available space
 * @param triggerRect - Bounding rect of the trigger element
 * @param dropdownRect - Bounding rect of the dropdown element
 * @param bounds - Bounds to calculate position within (container or viewport)
 * @returns Optimal position configuration
 */
const calculateDropdownPosition = (
  triggerRect: DOMRect,
  dropdownRect: DOMRect,
  bounds: BoundingBox
): PositionConfig => {
  // Calculate vertical position relative to bounds
  const spaceBelow = bounds.bottom - triggerRect.bottom
  const spaceAbove = triggerRect.top - bounds.top
  const dropdownHeight = dropdownRect.height || 400 // fallback height
  
  const vertical = spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove
    ? 'bottom'
    : 'top'

  // Calculate horizontal position relative to bounds
  const spaceRight = bounds.right - triggerRect.left
  const spaceLeft = triggerRect.right - bounds.left
  const dropdownWidth = dropdownRect.width || 320 // fallback width
  
  const horizontal = spaceRight >= dropdownWidth || spaceRight >= spaceLeft
    ? 'left'
    : 'right'

  return { vertical, horizontal }
}

export const DatePicker = ({
  value = null,
  onChange,
  placeholder = 'Select date...',
  formatDate = defaultFormatDate,
  className = '',
  size = 'default',
  disabled = false,
  useContainerBounds = true,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(
    value ? value.getMonth() : new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState(
    value ? value.getFullYear() : new Date().getFullYear()
  )
  const [position, setPosition] = useState<PositionConfig>({ 
    vertical: 'bottom', 
    horizontal: 'left' 
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Calculate optimal position for calendar dropdown
  useEffect(() => {
    if (isOpen && containerRef.current && calendarRef.current) {
      const triggerRect = containerRef.current.getBoundingClientRect()
      const dropdownRect = calendarRef.current.getBoundingClientRect()
      
      // Get bounds - either from scrollable container or viewport
      const bounds = useContainerBounds
        ? getScrollableContainer(containerRef.current)
        : getViewportBounds()

      // Calculate optimal position
      const optimalPosition = calculateDropdownPosition(triggerRect, dropdownRect, bounds)
      setPosition(optimalPosition)
    }
  }, [isOpen, useContainerBounds])

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
        <div 
          ref={calendarRef}
          className={`${styles.calendar} ${styles[`vertical-${position.vertical}`]} ${styles[`horizontal-${position.horizontal}`]}`}
        >
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

