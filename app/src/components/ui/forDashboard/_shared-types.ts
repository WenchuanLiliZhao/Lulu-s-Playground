/**
 * Shared types for all dashboard components
 * These types ensure consistency across MetricWidget, ProgressBarChart, MiniTrendChart, and TrendChart
 */

export type DashboardSizeType = 'small' | 'medium' | 'large'
export type DashboardColorType = 'primary' | 'secondary' | 'active' | 'success' | 'warning' | 'error'

/**
 * Props for dashboard header (title, icon, summary)
 */
export interface DashboardHeaderProps {
  /**
   * Whether to show the header section
   * @default false
   */
  showHeader?: boolean
  
  /**
   * Material Symbol icon name
   */
  headerIcon?: string
  
  /**
   * Header title text
   */
  headerTitle?: string
  
  /**
   * Header summary/description text
   */
  headerSummary?: string
  
  /**
   * Title font size
   * @default 'medium'
   */
  headerTitleSize?: DashboardSizeType
  
  /**
   * Icon size
   * @default 'medium'
   */
  headerIconSize?: DashboardSizeType
  
  /**
   * Summary font size (if not provided, follows headerTitleSize)
   */
  headerSummarySize?: DashboardSizeType
  
  /**
   * Header text color
   * @default 'secondary'
   */
  headerColor?: DashboardColorType
}

/**
 * Props for dashboard alert light indicator
 */
export interface DashboardAlertLightProps {
  /**
   * Whether to show the alert light
   * @default false
   */
  showAlertLight?: boolean
  
  /**
   * Alert light color (CSS color value)
   * @default '#10b981'
   */
  alertLightColor?: string
}

/**
 * Props for dashboard card container
 */
export interface DashboardCardProps {
  /**
   * Optional className for the card container
   */
  className?: string
}

/**
 * Combined dashboard common props
 */
export type DashboardCommonProps = 
  & DashboardHeaderProps 
  & DashboardAlertLightProps 
  & DashboardCardProps

