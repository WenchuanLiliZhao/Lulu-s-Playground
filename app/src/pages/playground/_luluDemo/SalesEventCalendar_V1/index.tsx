import { useState, useMemo } from 'react'
import AppLayout from '../../../../components/ui/AppLayout'
import { Calendar, Label, Dropdown, Checkbox } from '../../../../components/ui'
import type { PageProps } from '../../../_page-types'
import {
  events2025,
  holidays,
  convertEventsToTimeRanges,
  convertHolidaysToTimeRanges,
} from '../HellenSalesEventTrend_V1/data/eventData'
import { useCalendarHighlight, highlightStyles, useEventFilter } from './features'
import styles from './styles.module.scss'

type EventStatus = 'In progress' | 'Last' | 'Incoming'

const SalesEventCalendar_V1 = () => {
  const [currentYear] = useState(2025)
  
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

    const uniqueEvents = getUniqueEvents(filteredEvents)
    return uniqueEvents.map(event => ({
      name: event.name,
      backgroundColor: event.backgroundColor,
      backgroundOpacity: event.backgroundOpacity,
      color: event.color,
      money: event.money || 0,
      status: getEventStatus(event.interval),
      interval: event.interval,
    }))
  }, [filteredEvents])

  return (
    <div className={styles.container}>
      {/* Main Section - Calendar and Lists */}
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
                    <th>Money</th>
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
                        {event.money.toLocaleString()}
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
          />
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

