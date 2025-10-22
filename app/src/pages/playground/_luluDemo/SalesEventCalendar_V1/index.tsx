import { useState, useMemo } from 'react'
import AppLayout from '../../../../components/ui/AppLayout'
import { Calendar, Label } from '../../../../components/ui'
import type { PageProps } from '../../../_page-types'
import {
  events2025,
  holidays,
  convertEventsToTimeRanges,
} from './data/eventData'
import { COLOR_SCALES } from '../../../../styles/color-chart'
import styles from './styles.module.scss'

type EventStatus = 'In progress' | 'Last' | 'Incoming'

const SalesEventCalendar_V1 = () => {
  const [currentYear] = useState(2025)

  // Convert events to time ranges for calendar
  const timeRanges = useMemo(
    () => convertEventsToTimeRanges(events2025),
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
      color: event.color,
      money: event.money || 0,
      status: getEventStatus(event.interval),
    }))
  }, [])

  return (
    <div className={styles.container}>
      {/* Main Section - Calendar and Lists */}
      <section className={styles.mainSection}>
        <div className={styles.calendarWrapper}>
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
                    <tr key={index}>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[`status${event.status.replace(' ', '')}`]}`}>
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <Label
                          backgroundColor={event.backgroundColor}
                          color={event.color}
                          backgroundOpacity={0.32}
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
                <Label
                  key={index}
                  backgroundColor={COLOR_SCALES.zest.colors[2]}
                  color="#ffffff"
                  backgroundOpacity={1}
                >
                  {holiday.name}
                </Label>
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

