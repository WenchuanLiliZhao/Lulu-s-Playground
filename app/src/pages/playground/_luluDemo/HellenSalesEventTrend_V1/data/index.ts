export { dailySalesData, dailyUserGrowthData } from './salesData'
export { aggregateDataByZoomLevel, getDateRangeForZoomLevel } from './dataAggregation'
export { salesLines, userGrowthLines } from './lineConfigs'
export { fiscalYearConfig, getFiscalYear, getFiscalYearStartDate, getFiscalYearEndDate } from './fiscalYearConfig'
export type { FiscalYearConfig } from './fiscalYearConfig'

// Export generated events (from data.md)
export { generatedEvents, retailEvents as generatedRetailEvents, ecEvents as generatedEcEvents } from './generatedEventData'

// Re-export event utilities and types
export { 
  holidays,
  convertEventsToTimeRanges,
  convertHolidaysToTimeRanges,
  getEventDuration,
  getEventsInMonth,
  getEventsByChannel,
} from './eventData'
export type { EventData, HolidayData } from './eventData'

