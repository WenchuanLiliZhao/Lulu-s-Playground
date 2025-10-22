import { useState, useMemo, useEffect, useRef } from 'react'
import AppLayout from '../../../../components/ui/AppLayout'
import { Calendar, Label } from '../../../../components/ui'
import type { PageProps } from '../../../_page-types'
import {
  events2025,
  holidays,
  convertEventsToTimeRanges,
  convertHolidaysToTimeRanges,
  type HolidayData,
} from './data/eventData'
import styles from './styles.module.scss'

type EventStatus = 'In progress' | 'Last' | 'Incoming'

const SalesEventCalendar_V1 = () => {
  const [currentYear] = useState(2025)
  const [hoveredDateRange, setHoveredDateRange] = useState<[Date, Date] | null>(null)
  const calendarWrapperRef = useRef<HTMLDivElement>(null)

  // Convert events and holidays to time ranges for calendar
  const timeRanges = useMemo(
    () => [
      ...convertEventsToTimeRanges(events2025),
      ...convertHolidaysToTimeRanges(holidays),
    ],
    []
  )

  // Get unique events (avoid duplicates for display)
  const getUniqueEvents = (eventList: typeof events2025) => {
    const seen = new Set<string>()
    return eventList.filter(event => {
      if (seen.has(event.name)) return false
      seen.add(event.name)
      return true
    })
  }

  // Get events with status for table
  const eventsWithStatus = useMemo(() => {
    const today = new Date()
    
    // Determine event status based on date
    const getEventStatus = (interval: [Date, Date]): EventStatus => {
      const [startDate, endDate] = interval
      const todayTime = today.getTime()
      const startTime = startDate.getTime()
      const endTime = endDate.getTime()

      // In progress: Today is within this time range
      if (todayTime >= startTime && todayTime <= endTime) {
        return 'In progress'
      }

      // Last: Start or end date is before today (not including today)
      if (endTime < todayTime) {
        return 'Last'
      }

      // Incoming: Start or end date is after today (not including today)
      if (startTime > todayTime) {
        return 'Incoming'
      }

      return 'Last'
    }

    const uniqueEvents = getUniqueEvents(events2025)
    return uniqueEvents.map(event => ({
      name: event.name,
      backgroundColor: event.backgroundColor,
      backgroundOpacity: event.backgroundOpacity,
      color: event.color,
      money: event.money || 0,
      status: getEventStatus(event.interval),
      interval: event.interval,
    }))
  }, [])

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
      let monthHeader = monthContainer.querySelector('[class*="_monthHeader_"]')
      if (!monthHeader) {
        monthHeader = monthContainer.querySelector('[class*="monthHeader"]')
      }
      if (!monthHeader) return

      const monthName = monthHeader.textContent
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
  const handleEventHover = (event: typeof eventsWithStatus[0]) => {
    console.log('Event hovered:', event.name, event.interval)
    setHoveredDateRange(event.interval)
  }

  const handleHolidayHover = (holiday: HolidayData) => {
    console.log('Holiday hovered:', holiday.name, holiday.date)
    setHoveredDateRange([holiday.date, holiday.date])
  }

  const handleMouseLeave = () => {
    console.log('Mouse left')
    setHoveredDateRange(null)
  }

  return (
    <div className={styles.container}>
      {/* Main Section - Calendar and Lists */}
      <section className={styles.mainSection}>
        <div className={styles.calendarWrapper} ref={calendarWrapperRef}>
          <Calendar
            initialYear={currentYear}
            timeRanges={timeRanges}
            headerMode={["switch", 1, 2]}
          />
        </div>

        <div className={styles.sidePanel}>
          <div className={styles.listSection}>
            <h3 className={styles.listTitle}>All Events</h3>
            <div className={styles.tableContainer}>
              <table className={styles.eventsTable}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Money</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsWithStatus.map((event, index) => (
                    <tr 
                      key={index}
                      onMouseEnter={() => handleEventHover(event)}
                      onMouseLeave={handleMouseLeave}
                      className={styles.eventRow}
                    >
                      <td>
                        <span className={`${styles.statusBadge} ${styles[`status${event.status.replace(' ', '')}`]}`}>
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <Label
                          backgroundColor={event.backgroundColor}
                          color={event.color}
                          backgroundOpacity={event.backgroundOpacity}
                        >
                          {event.name}
                        </Label>
                      </td>
                      <td className={styles.moneyCell}>
                        {event.money.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.listSection}>
            <h3 className={styles.listTitle}>Holiday</h3>
            <div className={styles.eventLabels}>
              {holidays.map((holiday, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleHolidayHover(holiday)}
                  onMouseLeave={handleMouseLeave}
                  className={styles.holidayLabelWrapper}
                >
                  <Label
                    backgroundColor={holiday.backgroundColor}
                    color={holiday.color}
                    backgroundOpacity={holiday.backgroundOpacity}
                  >
                    {holiday.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const SalesEventCalendarPage_V1: PageProps = {
  title: 'Sales Event Calendar V1',
  slug: 'sales-event-calendar-v1',
  content: (
    <AppLayout isTesting={true} viewportMode={["scaled-from", 1920, 1080]}>
      <SalesEventCalendar_V1 />
    </AppLayout>
  ),
}

export default SalesEventCalendarPage_V1

