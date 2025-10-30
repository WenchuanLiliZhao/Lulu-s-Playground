import type { TimeRange } from '../../../../../components/ui/Calendar'
import { COLOR_SCALES } from '../../../../../styles/color-chart'
import { getCssVar } from '../../../../../styles/color-use'

const retailColor = COLOR_SCALES.teal.colors[4]
const ecColor = COLOR_SCALES.indigo.colors[5]
const holidayColor = COLOR_SCALES.hotHeat.colors[4]
const holidayBackgroundOpacity = 0.16


export interface EventData {
  name: string
  interval: [Date, Date]
  color?: string
  backgroundColor: string
  backgroundOpacity?: number
  channel?: 'Retail' | 'EC'
  duration?: number
  link?: string
}

/**
 * Calculate event duration in days based on interval.
 * If duration is explicitly provided, return it; otherwise calculate from interval.
 * Duration includes both start and end dates.
 */
export const getEventDuration = (event: EventData): number => {
  if (event.duration !== undefined) {
    return event.duration
  }
  const [start, end] = event.interval
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end dates
  return diffDays
}



// Retail Events - Blue (Indigo)
export const retailEvents: EventData[] = [
  // January
  { name: 'FY24 Retail FF', interval: [new Date(2025, 0, 13), new Date(2025, 0, 19)], backgroundColor: retailColor, backgroundOpacity: 0.32, channel: 'Retail', link: 'https://example.com/events/fy24-retail-ff' },
  { name: 'FY24 Retail CNY', interval: [new Date(2025, 0, 27), new Date(2025, 1, 2)], backgroundColor: retailColor, backgroundOpacity: 0.32, channel: 'Retail', link: 'https://example.com/events/fy24-retail-cny' },

  // May
  { name: 'FY25 Retail SML', interval: [new Date(2025, 4, 26), new Date(2025, 5, 1)], backgroundColor: retailColor, backgroundOpacity: 0.32, channel: 'Retail', link: 'https://example.com/events/fy25-retail-sml' },

  // September
  { name: 'FY25 Retail Autumn', interval: [new Date(2025, 8, 23), new Date(2025, 8, 30)], backgroundColor: retailColor, backgroundOpacity: 0.32, channel: 'Retail', link: 'https://example.com/events/fy25-retail-autumn' },

  // October
  { name: 'FY25 Retail FF', interval: [new Date(2025, 9, 10), new Date(2025, 9, 24)], backgroundColor: retailColor, backgroundOpacity: 0.32, channel: 'Retail', link: 'https://example.com/events/fy25-retail-ff' },

  // November
  { name: 'FY26 Retail BF', interval: [new Date(2025, 10, 20), new Date(2025, 10, 30)], backgroundColor: retailColor, backgroundOpacity: 0.32, channel: 'Retail', link: 'https://example.com/events/fy26-retail-bf' },
]


// EC Events - Purple
export const ecEvents: EventData[] = [
  // January
  { name: 'FY24 EC FF', interval: [new Date(2025, 0, 5), new Date(2025, 0, 5)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy24-ec-ff' },
  { name: 'FY24 EC CNY', interval: [new Date(2025, 0, 20), new Date(2025, 1, 9)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy24-ec-cny' },

  // February
  { name: 'FY25 EC IWD', interval: [new Date(2025, 1, 23), new Date(2025, 2, 2)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy25-ec-iwd' },

  // May-June
  { name: 'FY25 EC 618', interval: [new Date(2025, 4, 12), new Date(2025, 5, 22)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy25-ec-618' },

  // September
  { name: 'FY25 EC SBD', interval: [new Date(2025, 8, 15), new Date(2025, 8, 22)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy25-ec-sbd' },

  // October
  { name: 'FY25 EC SML', interval: [new Date(2025, 9, 1), new Date(2025, 9, 5)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy25-ec-sml' },
  { name: 'FY26 EC Pre-D11', interval: [new Date(2025, 9, 20), new Date(2025, 10, 5)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy26-ec-pre-d11' },

  // December
  { name: 'FY25 EC D11', interval: [new Date(2025, 11, 1), new Date(2025, 11, 1)], backgroundColor: ecColor, backgroundOpacity: 0.32, channel: 'EC', link: 'https://example.com/events/fy25-ec-d11' },
]

// All Events (Retail + EC)
export const events2025: EventData[] = [...retailEvents, ...ecEvents]

// Holiday Data - Red (Sequoia)
export interface HolidayData {
  name: string
  date: Date
  color: string
  backgroundColor: string
  backgroundOpacity: number
}

export const holidays: HolidayData[] = [
  { name: "New Year's Day", date: new Date(2025, 0, 1), color: getCssVar("colorMain"), backgroundColor: holidayColor, backgroundOpacity: holidayBackgroundOpacity },
  { name: "Chinese New Year", date: new Date(2025, 0, 29), color: getCssVar("colorMain"), backgroundColor: holidayColor, backgroundOpacity: holidayBackgroundOpacity },
  { name: "Tomb-Sweeping Day", date: new Date(2025, 3, 4), color: getCssVar("colorMain"), backgroundColor: holidayColor, backgroundOpacity: holidayBackgroundOpacity },
  { name: "International Workers' Day", date: new Date(2025, 4, 1), color: getCssVar("colorMain"), backgroundColor: holidayColor, backgroundOpacity: holidayBackgroundOpacity },
  { name: "Dragon Boat Festival", date: new Date(2025, 5, 31), color: getCssVar("colorMain"), backgroundColor: holidayColor, backgroundOpacity: holidayBackgroundOpacity },
  { name: "National Day", date: new Date(2025, 9, 1), color: getCssVar("colorMain"), backgroundColor: holidayColor, backgroundOpacity: holidayBackgroundOpacity },
  { name: "Mid-Autumn Festival", date: new Date(2025, 9, 6), color: getCssVar("colorMain"), backgroundColor: holidayColor, backgroundOpacity: holidayBackgroundOpacity },
]

export const convertEventsToTimeRanges = (events: EventData[]): TimeRange[] => {
  return events.map(event => ({
    interval: event.interval,
    ...(event.color && { color: event.color }),
    backgroundColor: event.backgroundColor,
    ...(event.backgroundOpacity !== undefined && { backgroundOpacity: event.backgroundOpacity }),
    name: event.name,
  }))
}

export const convertHolidaysToTimeRanges = (holidays: HolidayData[]): TimeRange[] => {
  return holidays.map(holiday => ({
    interval: [holiday.date, holiday.date] as [Date, Date],
    color: holiday.color,
    backgroundColor: holiday.backgroundColor,
    backgroundOpacity: holiday.backgroundOpacity,
    name: holiday.name,
  }))
}

export const getEventsInMonth = (events: EventData[], year: number, month: number): EventData[] => {
  return events.filter(event => {
    const [start, end] = event.interval
    const startMonth = start.getFullYear() === year && start.getMonth() === month
    const endMonth = end.getFullYear() === year && end.getMonth() === month
    const spanning = start <= new Date(year, month + 1, 0) && end >= new Date(year, month, 1)
    return startMonth || endMonth || spanning
  })
}

export const getEventsByChannel = (events: EventData[]): { retail: number; ec: number } => {
  return events.reduce((acc, event) => {
    if (event.channel === 'Retail') acc.retail++
    if (event.channel === 'EC') acc.ec++
    return acc
  }, { retail: 0, ec: 0 })
}

