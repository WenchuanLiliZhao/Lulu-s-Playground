import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for highlighting date ranges in a calendar component
 * when hovering over related events or holidays
 */
export const useCalendarHighlight = (currentYear: number) => {
  const [hoveredDateRange, setHoveredDateRange] = useState<[Date, Date] | null>(null)
  const calendarWrapperRef = useRef<HTMLDivElement>(null)

  // Effect to highlight date ranges in calendar when hovering
  useEffect(() => {
    const calendarWrapper = calendarWrapperRef.current
    if (!calendarWrapper || !hoveredDateRange) return

    const [startDate, endDate] = hoveredDateRange
    const startTime = new Date(startDate).setHours(0, 0, 0, 0)
    const endTime = new Date(endDate).setHours(0, 0, 0, 0)

    console.log('Highlighting dates from', new Date(startTime), 'to', new Date(endTime))

    // Find all day cells in the calendar
    // Try multiple selectors to find the correct one
    let dayCells = calendarWrapper.querySelectorAll('[class*="_day_"]')
    console.log('Found day cells with [class*="_day_"]:', dayCells.length)
    
    // If that doesn't work, try finding by the actual structure
    if (dayCells.length === 0) {
      dayCells = calendarWrapper.querySelectorAll('[class*="day"]')
      console.log('Found day cells with [class*="day"]:', dayCells.length)
    }
    
    let highlightedCount = 0
    dayCells.forEach((dayCell) => {
      // Get the month container
      let monthContainer = dayCell.closest('[class*="_month_"]')
      if (!monthContainer) {
        monthContainer = dayCell.closest('[class*="month"]')
      }
      if (!monthContainer) return

      // Get month name from header
      let monthNameElement = monthContainer.querySelector('[class*="_monthName_"]')
      if (!monthNameElement) {
        monthNameElement = monthContainer.querySelector('[class*="monthName"]')
      }
      if (!monthNameElement) return

      const monthName = monthNameElement.textContent
      if (!monthName) return

      const monthIndex = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].indexOf(monthName)

      if (monthIndex === -1) return

      // Get day number from the cell
      let dayNumber = dayCell.querySelector('[class*="_dayNumber_"]')
      if (!dayNumber) {
        dayNumber = dayCell.querySelector('[class*="dayNumber"]')
      }
      if (!dayNumber || !dayNumber.textContent) return

      const day = parseInt(dayNumber.textContent)
      if (isNaN(day)) return

      // Check if this cell is in "other month" (grayed out)
      const isOtherMonth = dayCell.className.includes('otherMonth')
      if (isOtherMonth) return

      // Create date for this cell
      const cellDate = new Date(currentYear, monthIndex, day).setHours(0, 0, 0, 0)

      // Check if this date is in the hovered range
      if (cellDate >= startTime && cellDate <= endTime) {
        dayCell.classList.add('highlightedDate')
        highlightedCount++
      }
    })

    console.log('Highlighted', highlightedCount, 'dates')

    // Cleanup function to remove highlights
    return () => {
      if (calendarWrapper) {
        let dayCells = calendarWrapper.querySelectorAll('[class*="_day_"]')
        if (dayCells.length === 0) {
          dayCells = calendarWrapper.querySelectorAll('[class*="day"]')
        }
        dayCells.forEach((dayCell) => {
          dayCell.classList.remove('highlightedDate')
        })
      }
    }
  }, [hoveredDateRange, currentYear])

  // Event handlers for hover
  const handleEventHover = (interval: [Date, Date]) => {
    console.log('Event hovered:', interval)
    setHoveredDateRange(interval)
  }

  const handleHolidayHover = (date: Date) => {
    console.log('Holiday hovered:', date)
    setHoveredDateRange([date, date])
  }

  const handleMouseLeave = () => {
    console.log('Mouse left')
    setHoveredDateRange(null)
  }

  return {
    calendarWrapperRef,
    handleEventHover,
    handleHolidayHover,
    handleMouseLeave,
  }
}

