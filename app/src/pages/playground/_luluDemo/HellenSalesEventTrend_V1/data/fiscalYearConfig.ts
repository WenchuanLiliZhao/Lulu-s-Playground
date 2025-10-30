/**
 * Fiscal Year Configuration
 * Defines the starting date for fiscal year calculations
 */

export interface FiscalYearConfig {
  /**
   * The month when fiscal year starts (0-11, where 0 is January)
   */
  startMonth: number
  /**
   * The day of the month when fiscal year starts (1-31)
   */
  startDay: number
}

/**
 * Default fiscal year configuration
 * Fiscal year starts on February 1st
 */
export const fiscalYearConfig: FiscalYearConfig = {
  startMonth: 1, // February (0-indexed)
  startDay: 1,
}

/**
 * Get the fiscal year for a given date
 * @param date - The date to check
 * @param config - Fiscal year configuration (defaults to Feb 1)
 * @returns The fiscal year number
 */
export const getFiscalYear = (date: Date, config: FiscalYearConfig = fiscalYearConfig): number => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  
  // If date is before fiscal year start, it belongs to previous fiscal year
  if (month < config.startMonth || (month === config.startMonth && day < config.startDay)) {
    return year - 1
  }
  
  return year
}

/**
 * Get the start date of a fiscal year
 * @param fiscalYear - The fiscal year number
 * @param config - Fiscal year configuration (defaults to Feb 1)
 * @returns The start date of the fiscal year
 */
export const getFiscalYearStartDate = (
  fiscalYear: number,
  config: FiscalYearConfig = fiscalYearConfig
): Date => {
  return new Date(fiscalYear, config.startMonth, config.startDay)
}

/**
 * Get the end date of a fiscal year
 * @param fiscalYear - The fiscal year number
 * @param config - Fiscal year configuration (defaults to Feb 1)
 * @returns The end date of the fiscal year (one day before next fiscal year starts)
 */
export const getFiscalYearEndDate = (
  fiscalYear: number,
  config: FiscalYearConfig = fiscalYearConfig
): Date => {
  const nextYearStart = getFiscalYearStartDate(fiscalYear + 1, config)
  const endDate = new Date(nextYearStart)
  endDate.setDate(endDate.getDate() - 1)
  return endDate
}

