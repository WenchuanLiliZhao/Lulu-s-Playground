
import { COLOR_SCALES, getCssVar, type TimeRange } from 'lululemon-ui'


export interface EventData {
  name: string
  interval: [Date, Date]
  color?: string
  backgroundColor: string
  backgroundOpacity?: number
  channel?: 'Retail' | 'EC'
  money?: number
}

// Retail Events - Blue (Indigo)
export const retailEvents: EventData[] = [
  // January
  { name: 'FY24 Retail FF', interval: [new Date(2025, 0, 13), new Date(2025, 0, 19)], backgroundColor: COLOR_SCALES.indigo.colors[4], backgroundOpacity: 0.32, channel: 'Retail', money: 280000 },
  { name: 'FY24 Retail CNY', interval: [new Date(2025, 0, 27), new Date(2025, 1, 2)], backgroundColor: COLOR_SCALES.indigo.colors[4], backgroundOpacity: 0.32, channel: 'Retail', money: 380000 },

  // May
  { name: 'FY25 Retail SML', interval: [new Date(2025, 4, 26), new Date(2025, 5, 1)], backgroundColor: COLOR_SCALES.indigo.colors[4], backgroundOpacity: 0.32, channel: 'Retail', money: 310000 },

  // September
  { name: 'FY25 Retail Autumn', interval: [new Date(2025, 8, 23), new Date(2025, 8, 30)], backgroundColor: COLOR_SCALES.indigo.colors[4], backgroundOpacity: 0.32, channel: 'Retail', money: 290000 },

  // October
  { name: 'FY25 Retail FF', interval: [new Date(2025, 9, 10), new Date(2025, 9, 24)], backgroundColor: COLOR_SCALES.indigo.colors[4], backgroundOpacity: 0.32, channel: 'Retail', money: 420000 },

  // November
  { name: 'FY26 Retail BF', interval: [new Date(2025, 10, 20), new Date(2025, 10, 30)], backgroundColor: COLOR_SCALES.indigo.colors[4], backgroundOpacity: 0.32, channel: 'Retail', money: 650000 },
]

// EC Events - Purple
export const ecEvents: EventData[] = [
  // January
  { name: 'FY24 EC FF', interval: [new Date(2025, 0, 5), new Date(2025, 0, 5)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 150000 },
  { name: 'FY24 EC CNY', interval: [new Date(2025, 0, 20), new Date(2025, 1, 9)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 450000 },

  // February
  { name: 'FY25 EC IWD', interval: [new Date(2025, 1, 23), new Date(2025, 2, 2)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 220000 },

  // May-June
  { name: 'FY25 EC 618', interval: [new Date(2025, 4, 12), new Date(2025, 5, 22)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 520000 },

  // September
  { name: 'FY25 EC SBD', interval: [new Date(2025, 8, 15), new Date(2025, 8, 22)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 340000 },

  // October
  { name: 'FY25 EC SML', interval: [new Date(2025, 9, 1), new Date(2025, 9, 5)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 380000 },
  { name: 'FY26 EC Pre-D11', interval: [new Date(2025, 9, 20), new Date(2025, 10, 5)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 480000 },

  // December
  { name: 'FY25 EC D11', interval: [new Date(2025, 11, 1), new Date(2025, 11, 1)], backgroundColor: COLOR_SCALES.purple.colors[5], backgroundOpacity: 0.32, channel: 'EC', money: 720000 },
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

const holidayColor = getCssVar("colorMain")
const holidayBackgroundOpacity = 0.16

export const holidays: HolidayData[] = [
  { name: "New Year's Day", date: new Date(2025, 0, 1), color: holidayColor, backgroundColor: COLOR_SCALES.hotHeat.colors[4], backgroundOpacity: holidayBackgroundOpacity },
  { name: "Chinese New Year", date: new Date(2025, 0, 29), color: holidayColor, backgroundColor: COLOR_SCALES.hotHeat.colors[4], backgroundOpacity: holidayBackgroundOpacity },
  { name: "Tomb-Sweeping Day", date: new Date(2025, 3, 4), color: holidayColor, backgroundColor: COLOR_SCALES.hotHeat.colors[4], backgroundOpacity: holidayBackgroundOpacity },
  { name: "International Workers' Day", date: new Date(2025, 4, 1), color: holidayColor, backgroundColor: COLOR_SCALES.hotHeat.colors[4], backgroundOpacity: holidayBackgroundOpacity },
  { name: "Dragon Boat Festival", date: new Date(2025, 5, 31), color: holidayColor, backgroundColor: COLOR_SCALES.hotHeat.colors[4], backgroundOpacity: holidayBackgroundOpacity },
  { name: "National Day", date: new Date(2025, 9, 1), color: holidayColor, backgroundColor: COLOR_SCALES.hotHeat.colors[4], backgroundOpacity: holidayBackgroundOpacity },
  { name: "Mid-Autumn Festival", date: new Date(2025, 9, 6), color: holidayColor, backgroundColor: COLOR_SCALES.hotHeat.colors[4], backgroundOpacity: holidayBackgroundOpacity },
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

