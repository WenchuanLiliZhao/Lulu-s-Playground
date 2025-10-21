import type { TimeRange } from '../../../../components/ui/Calendar'

export interface EventData {
  name: string
  interval: [Date, Date]
  color: string
  backgroundColor: string
  channel?: 'Retail' | 'EC'
}

export const events2025: EventData[] = [
  // January
  { name: 'FY24 EC FF', interval: [new Date(2025, 0, 5), new Date(2025, 0, 5)], color: '#8B0000', backgroundColor: '#FFE4E1', channel: 'EC' },
  { name: 'FY24 Retail FF', interval: [new Date(2025, 0, 13), new Date(2025, 0, 19)], color: '#4B0082', backgroundColor: '#E6E6FA', channel: 'Retail' },
  { name: 'FY24 EC CNY', interval: [new Date(2025, 0, 20), new Date(2025, 0, 26)], color: '#00008B', backgroundColor: '#E0E6FF', channel: 'EC' },
  { name: 'FY24 Retail CNY', interval: [new Date(2025, 0, 27), new Date(2025, 0, 31)], color: '#8B4513', backgroundColor: '#FFE4B5', channel: 'Retail' },
  
  // February
  { name: 'FY24 Retail CNY', interval: [new Date(2025, 1, 1), new Date(2025, 1, 2)], color: '#8B4513', backgroundColor: '#FFE4B5', channel: 'Retail' },
  { name: 'FY24 EC CNY', interval: [new Date(2025, 1, 3), new Date(2025, 1, 9)], color: '#00008B', backgroundColor: '#E0E6FF', channel: 'EC' },
  { name: 'FY25 EC IWD', interval: [new Date(2025, 1, 23), new Date(2025, 1, 28)], color: '#FFD700', backgroundColor: '#FFFACD', channel: 'EC' },
  
  // March
  { name: 'FY25 EC IWD', interval: [new Date(2025, 2, 2), new Date(2025, 2, 2)], color: '#FFD700', backgroundColor: '#FFFACD', channel: 'EC' },
  
  // April
  
  // May
  { name: 'FY25 EC 618', interval: [new Date(2025, 4, 12), new Date(2025, 4, 21)], color: '#228B22', backgroundColor: '#F0FFF0', channel: 'EC' },
  { name: 'FY25 Retail SML', interval: [new Date(2025, 4, 26), new Date(2025, 4, 31)], color: '#FFD700', backgroundColor: '#FFFACD', channel: 'Retail' },
  
  // June
  { name: 'FY25 Retail SML', interval: [new Date(2025, 5, 1), new Date(2025, 5, 1)], color: '#FFD700', backgroundColor: '#FFFACD', channel: 'Retail' },
  { name: 'FY25 EC 618', interval: [new Date(2025, 5, 16), new Date(2025, 5, 22)], color: '#228B22', backgroundColor: '#F0FFF0', channel: 'EC' },
  
  // July
  
  // August
  
  // September
  { name: 'FY25 EC SBD', interval: [new Date(2025, 8, 15), new Date(2025, 8, 22)], color: '#8B4789', backgroundColor: '#F3E5F5', channel: 'EC' },
  { name: 'FY25 Retail Autumn', interval: [new Date(2025, 8, 23), new Date(2025, 8, 30)], color: '#D2691E', backgroundColor: '#FFF8DC', channel: 'Retail' },
  
  // October
  { name: 'FY25 EC SML', interval: [new Date(2025, 9, 1), new Date(2025, 9, 5)], color: '#FF6347', backgroundColor: '#FFE4E1', channel: 'EC' },
  { name: 'FY25 Retail FF', interval: [new Date(2025, 9, 10), new Date(2025, 9, 20)], color: '#CD853F', backgroundColor: '#FFEFD5', channel: 'Retail' },
  { name: 'FY26 EC Pre-D11', interval: [new Date(2025, 9, 25), new Date(2025, 9, 31)], color: '#1E90FF', backgroundColor: '#E6F3FF', channel: 'EC' },
  
  // November
  { name: 'FY26 EC Pre-D11', interval: [new Date(2025, 10, 1), new Date(2025, 10, 5)], color: '#1E90FF', backgroundColor: '#E6F3FF', channel: 'EC' },
  { name: 'FY26 Retail BF', interval: [new Date(2025, 10, 20), new Date(2025, 10, 30)], color: '#2F4F4F', backgroundColor: '#E8F4F8', channel: 'Retail' },
  
  // December
  { name: 'FY25 EC D11', interval: [new Date(2025, 11, 1), new Date(2025, 11, 1)], color: '#4169E1', backgroundColor: '#E6F0FF', channel: 'EC' },
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

