import { useState, useMemo } from 'react'
import AppLayout from '../../../components/ui/AppLayout'
import { Calendar, Switch } from '../../../components/ui'
import type { PageProps } from '../../_page-types'
import { EventLabel } from './components'
import {
  events2025,
  holidays,
  convertEventsToTimeRanges,
  getEventsInMonth,
  getEventsByChannel,
} from './data/eventData'
import styles from './styles.module.scss'

const SalesEventCalendar = () => {
  const [currentYear] = useState(2025)
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()

  // Get events by time period
  const currentMonthEvents = useMemo(
    () => getEventsInMonth(events2025, currentYear, currentMonth),
    [currentYear, currentMonth]
  )

  const nextMonthEvents = useMemo(
    () => getEventsInMonth(events2025, currentYear, currentMonth + 1),
    [currentYear, currentMonth]
  )

  const lastMonthEvents = useMemo(
    () => getEventsInMonth(events2025, currentYear, currentMonth - 1),
    [currentYear, currentMonth]
  )

  // Get event statistics
  const eventsByChannel = useMemo(
    () => getEventsByChannel(events2025),
    []
  )

  const totalEvents = events2025.length

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
      {/* Navigation */}
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <img
            src="/logo/BlackWhite.svg"
            alt="Lululemon Logo"
            className={styles.logo}
          />
          <h1 className={styles.title}>Sales Event Calendar</h1>
        </div>
        <Switch
          options={['Calendar', 'Trending']}
          initialSelected={0}
          onChange={(_index, value) => console.log('Switched to:', value)}
        />
      </header>

      {/* Top Section - Statistics */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Event No. On {currentYear}</div>
          <div className={styles.statValue}>{totalEvents}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Event No. By Channel</div>
          <div className={styles.channelStats}>
            <div className={styles.channelRow}>
              <span className={styles.channelLabel}>Retail</span>
              <span className={styles.channelLabel}>EC</span>
            </div>
            <div className={styles.channelBar}>
              <div
                className={styles.channelRetail}
                style={{
                  width: `${(eventsByChannel.retail / totalEvents) * 100}%`,
                }}
              >
                {eventsByChannel.retail}
              </div>
              <div
                className={styles.channelEC}
                style={{
                  width: `${(eventsByChannel.ec / totalEvents) * 100}%`,
                }}
              >
                {eventsByChannel.ec}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Event in Progress</div>
          <div className={styles.eventLabels}>
            {getUniqueEvents(currentMonthEvents).map((event, index) => (
              <EventLabel
                key={index}
                name={event.name}
                backgroundColor={event.backgroundColor}
                color={event.color}
              />
            ))}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Event Coming Soon</div>
          <div className={styles.eventLabels}>
            {getUniqueEvents(nextMonthEvents).map((event, index) => (
              <EventLabel
                key={index}
                name={event.name}
                backgroundColor={event.backgroundColor}
                color={event.color}
              />
            ))}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Last Event</div>
          <div className={styles.eventLabels}>
            {getUniqueEvents(lastMonthEvents).map((event, index) => (
              <EventLabel
                key={index}
                name={event.name}
                backgroundColor={event.backgroundColor}
                color={event.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Middle Section - Calendar and Lists */}
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
                  backgroundColor="#FFF8DC"
                  color="#D2691E"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const SalesEventCalendarPage: PageProps = {
  title: 'Sales Event Calendar',
  slug: 'sales-event-calendar',
  content: (
    <AppLayout isTesting={true}>
      <SalesEventCalendar />
    </AppLayout>
  ),
}

export default SalesEventCalendarPage

