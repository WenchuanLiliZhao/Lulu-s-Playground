import type { TimeRange } from '../../../../../components/ui/Calendar'
import { COLOR_SCALES } from '../../../../../styles/color-chart'

export interface EventData {
  name: string
  interval: [Date, Date]
  color: string
  backgroundColor: string
  channel?: 'Retail' | 'EC'
}

export const events2025: EventData[] = [
  // January
  { name: 'FY24 EC FF', interval: [new Date(2025, 0, 5), new Date(2025, 0, 5)], color: '#ffffff', backgroundColor: COLOR_SCALES.sequoia.colors[2], channel: 'EC' }, // Sequoia-2 (Deep Rose)
  { name: 'FY24 Retail FF', interval: [new Date(2025, 0, 13), new Date(2025, 0, 19)], color: '#ffffff', backgroundColor: COLOR_SCALES.purple.colors[5], channel: 'Retail' }, // Purple-5 (Premium Purple)
  { name: 'FY24 EC CNY', interval: [new Date(2025, 0, 20), new Date(2025, 0, 26)], color: '#ffffff', backgroundColor: COLOR_SCALES.indigo.colors[4], channel: 'EC' }, // Indigo-4 (Primary Action)
  { name: 'FY24 Retail CNY', interval: [new Date(2025, 0, 27), new Date(2025, 0, 31)], color: '#ffffff', backgroundColor: COLOR_SCALES.orange.colors[5], channel: 'Retail' }, // Orange-5 (Warm Orange)
  
  // February
  { name: 'FY24 Retail CNY', interval: [new Date(2025, 1, 1), new Date(2025, 1, 2)], color: '#ffffff', backgroundColor: COLOR_SCALES.orange.colors[5], channel: 'Retail' }, // Orange-5 (Warm Orange)
  { name: 'FY24 EC CNY', interval: [new Date(2025, 1, 3), new Date(2025, 1, 9)], color: '#ffffff', backgroundColor: COLOR_SCALES.indigo.colors[4], channel: 'EC' }, // Indigo-4 (Primary Action)
  { name: 'FY25 EC IWD', interval: [new Date(2025, 1, 23), new Date(2025, 1, 28)], color: '#ffffff', backgroundColor: COLOR_SCALES.pinkOrganza.colors[4], channel: 'EC' }, // Pink Organza-4 (Special Offer)
  
  // March
  { name: 'FY25 EC IWD', interval: [new Date(2025, 2, 2), new Date(2025, 2, 2)], color: '#ffffff', backgroundColor: COLOR_SCALES.pinkOrganza.colors[4], channel: 'EC' }, // Pink Organza-4 (Special Offer)
  
  // April
  
  // May
  { name: 'FY25 EC 618', interval: [new Date(2025, 4, 12), new Date(2025, 4, 21)], color: '#ffffff', backgroundColor: COLOR_SCALES.wilderness.colors[3], channel: 'EC' }, // Wilderness-3 (Success State)
  { name: 'FY25 Retail SML', interval: [new Date(2025, 4, 26), new Date(2025, 4, 31)], color: '#ffffff', backgroundColor: COLOR_SCALES.zest.colors[2], channel: 'Retail' }, // Zest-2 (Highlight)
  
  // June
  { name: 'FY25 Retail SML', interval: [new Date(2025, 5, 1), new Date(2025, 5, 1)], color: '#ffffff', backgroundColor: COLOR_SCALES.zest.colors[2], channel: 'Retail' }, // Zest-2 (Highlight)
  { name: 'FY25 EC 618', interval: [new Date(2025, 5, 16), new Date(2025, 5, 22)], color: '#ffffff', backgroundColor: COLOR_SCALES.wilderness.colors[3], channel: 'EC' }, // Wilderness-3 (Success State)
  
  // July
  
  // August
  
  // September
  { name: 'FY25 EC SBD', interval: [new Date(2025, 8, 15), new Date(2025, 8, 22)], color: '#ffffff', backgroundColor: COLOR_SCALES.rosewood.colors[5], channel: 'EC' }, // Rosewood-5 (Pink Accent)
  { name: 'FY25 Retail Autumn', interval: [new Date(2025, 8, 23), new Date(2025, 8, 30)], color: '#ffffff', backgroundColor: COLOR_SCALES.riverstone.colors[3], channel: 'Retail' }, // Riverstone-3 (Stone Gray)
  
  // October
  { name: 'FY25 EC SML', interval: [new Date(2025, 9, 1), new Date(2025, 9, 5)], color: '#ffffff', backgroundColor: COLOR_SCALES.orange.colors[5], channel: 'EC' }, // Orange-5 (Warm Orange)
  { name: 'FY25 Retail FF', interval: [new Date(2025, 9, 10), new Date(2025, 9, 20)], color: '#ffffff', backgroundColor: COLOR_SCALES.riverstone.colors[3], channel: 'Retail' }, // Riverstone-3 (Stone Gray)
  { name: 'FY26 EC Pre-D11', interval: [new Date(2025, 9, 25), new Date(2025, 9, 31)], color: '#ffffff', backgroundColor: COLOR_SCALES.daydream.colors[3], channel: 'EC' }, // Daydream-3 (Info Message)
  
  // November
  { name: 'FY26 EC Pre-D11', interval: [new Date(2025, 10, 1), new Date(2025, 10, 5)], color: '#ffffff', backgroundColor: COLOR_SCALES.daydream.colors[3], channel: 'EC' }, // Daydream-3 (Info Message)
  { name: 'FY26 Retail BF', interval: [new Date(2025, 10, 20), new Date(2025, 10, 30)], color: '#ffffff', backgroundColor: COLOR_SCALES.wilderness.colors[2], channel: 'Retail' }, // Wilderness-2 (Active Status)
  
  // December
  { name: 'FY25 EC D11', interval: [new Date(2025, 11, 1), new Date(2025, 11, 1)], color: '#ffffff', backgroundColor: COLOR_SCALES.indigo.colors[4], channel: 'EC' }, // Indigo-4 (Primary Action)
]

export const holidays = [
  { name: "New Year's Day", date: new Date(2025, 0, 1) },
  { name: "Chinese New Year", date: new Date(2025, 0, 29) },
  { name: "Tomb-Sweeping Day", date: new Date(2025, 3, 4) },
  { name: "International Workers' Day", date: new Date(2025, 4, 1) },
  { name: "Dragon Boat Festival", date: new Date(2025, 5, 31) },
  { name: "National Day", date: new Date(2025, 9, 1) },
  { name: "Mid-Autumn Festival", date: new Date(2025, 9, 6) },
]

export const convertEventsToTimeRanges = (events: EventData[]): TimeRange[] => {
  return events.map(event => ({
    interval: event.interval,
    color: event.color,
    backgroundColor: event.backgroundColor,
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

