import { useState, useMemo } from 'react'
import AppLayout from '../../../../components/ui/AppLayout'
import { Calendar } from '../../../../components/ui'
import type { PageProps } from '../../../_page-types'
import { EventLabel } from './components'
import {
  events2025,
  holidays,
  convertEventsToTimeRanges,
} from './data/eventData'
import { COLOR_SCALES } from '../../../../styles/color-chart'
import styles from './styles.module.scss'

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

  return (
    <div className={styles.container}>
      {/* Main Section - Calendar and Lists */}
      <section className={styles.mainSection}>
        <div className={styles.calendarWrapper}>
          <Calendar
            initialYear={currentYear}
            timeRanges={timeRanges}
          />
        </div>

        <div className={styles.sidePanel}>
          <div className={styles.listSection}>
            <h3 className={styles.listTitle}>All Events</h3>
            <div className={styles.eventLabels}>
              {getUniqueEvents(events2025).map((event, index) => (
                <EventLabel
                  key={index}
                  name={event.name}
                  backgroundColor={event.backgroundColor}
                  color={event.color}
                  fullWidth={true}
                />
              ))}
            </div>
          </div>

          <div className={styles.listSection}>
            <h3 className={styles.listTitle}>Holiday</h3>
            <div className={styles.eventLabels}>
              {holidays.map((holiday, index) => (
                <EventLabel
                  key={index}
                  name={holiday.name}
                  backgroundColor={COLOR_SCALES.zest.colors[2]}
                  color="#ffffff"
                />
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
    <AppLayout isTesting={true} viewportMode={["scaled-from", 1772, 1145]}>
      <SalesEventCalendar_V1 />
    </AppLayout>
  ),
}

export default SalesEventCalendarPage_V1

