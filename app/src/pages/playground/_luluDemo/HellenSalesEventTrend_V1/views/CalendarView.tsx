import { useState, useMemo } from 'react'
import { Calendar, Label, Dropdown, Checkbox } from '../../../../../components/ui'
import {
  events2025,
  holidays,
  convertEventsToTimeRanges,
  convertHolidaysToTimeRanges,
  getEventDuration,
} from '../data/eventData'
import { useCalendarHighlight, highlightStyles, useEventFilter } from '../../SalesEventCalendar_V1/features'
import { fiscalYearConfig } from '../data'
import styles from './CalendarView.module.scss'

type EventStatus = 'In progress' | 'Past' | 'Incoming'

export const CalendarView = () => {
  const [currentYear] = useState(2025)
  const [useFiscalYear, setUseFiscalYear] = useState(false)
  
  // Use the event filter feature
  const {
    filterState,
    filteredEvents,
    isFilterActive,
    toggleChannel,
  } = useEventFilter(events2025)
  
  // Use the calendar highlight feature
  const {
    calendarWrapperRef,
    handleEventHover,
    handleHolidayHover,
    handleMouseLeave,
  } = useCalendarHighlight(currentYear)

  // Convert events and holidays to time ranges for calendar
  const timeRanges = useMemo(
    () => [
      ...convertEventsToTimeRanges(filteredEvents),
      ...convertHolidaysToTimeRanges(holidays),
    ],
    [filteredEvents]
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

      if (todayTime >= startTime && todayTime <= endTime) {
        return 'In progress'
      }

      if (endTime < todayTime) {
        return 'Past'
      }

      if (startTime > todayTime) {
        return 'Incoming'
      }

      return 'Past'
    }

    const uniqueEvents = getUniqueEvents(filteredEvents)
    return uniqueEvents.map(event => ({
      name: event.name,
      backgroundColor: event.backgroundColor,
      backgroundOpacity: event.backgroundOpacity,
      color: event.color,
      duration: getEventDuration(event),
      status: getEventStatus(event.interval),
      interval: event.interval,
    }))
  }, [filteredEvents])

  return (
    <div className={styles.container}>
      <section className={styles.mainSection}>
        <div className={styles.sidePanel}>
          <div className={styles.listSection}>
            <div className={styles.listHeader}>
              <h3 className={styles.listTitle}>All Events ({eventsWithStatus.length})</h3>
              <Dropdown 
                trigger="Channel Filter" 
                isActive={isFilterActive}
              >
                <div className={styles.filterOptions}>
                  <Checkbox
                    label="Retail Events"
                    checked={filterState.retail}
                    onChange={() => toggleChannel('Retail')}
                  />
                  <Checkbox
                    label="EC Events"
                    checked={filterState.ec}
                    onChange={() => toggleChannel('EC')}
                  />
                </div>
              </Dropdown>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.eventsTable}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsWithStatus.map((event, index) => (
                    <tr 
                      key={index}
                      onMouseEnter={() => handleEventHover(event.interval)}
                      onMouseLeave={handleMouseLeave}
                      className={highlightStyles.eventRow}
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
                        {event.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.listSection}>
            <div className={styles.listHeader}>
              <h3 className={styles.listTitle}>Holidays ({holidays.length})</h3>
            </div>
            <div className={styles.eventLabels}>
              {holidays.map((holiday, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleHolidayHover(holiday.date)}
                  onMouseLeave={handleMouseLeave}
                  className={highlightStyles.holidayLabelWrapper}
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

        <div className={styles.calendarWrapper} ref={calendarWrapperRef}>
          <Calendar
            initialYear={currentYear}
            timeRanges={timeRanges}
            headerMode={["switch", 1, 2]}
            fiscalYearConfig={fiscalYearConfig}
            useFiscalYear={useFiscalYear}
            onFiscalYearChange={(isFiscal) => setUseFiscalYear(isFiscal)}
          />
        </div>
      </section>
    </div>
  )
}

