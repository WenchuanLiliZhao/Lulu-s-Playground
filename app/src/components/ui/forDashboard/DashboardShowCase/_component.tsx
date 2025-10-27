import { useMemo, type ReactNode } from 'react'
import styles from './_styles.module.scss'
import {
  DASHBOARD_SHOWCASE_DEFAULTS,
  SIZE_CONFIG,
  COLOR_CONFIG,
  type SizeType,
  type ColorType,
} from './_defaults'

export interface DashboardShowCaseProps {
  /**
   * Child components (charts, data components, etc.)
   */
  children?: ReactNode

  /**
   * Optional className for custom styling
   */
  className?: string

  // ===== Header Configuration =====
  /**
   * Whether to show the header
   * @default false (header is optional)
   */
  showHeader?: boolean

  /**
   * Material Icon name (e.g., 'dashboard', 'analytics', 'insights')
   * See: https://fonts.google.com/icons
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
   * Title and icon font size
   * @default 'medium'
   */
  headerTitleSize?: SizeType

  /**
   * Icon size
   * @default 'medium'
   */
  headerIconSize?: SizeType

  /**
   * Summary font size
   * @default 'medium'
   */
  headerSummarySize?: SizeType

  /**
   * Header text color (title and icon)
   * @default 'secondary'
   */
  headerColor?: ColorType

  // ===== Alert Light Configuration =====
  /**
   * Whether to show the alert light indicator
   * @default true
   */
  showAlertLight?: boolean

  /**
   * Alert light color (any valid CSS color value)
   * @default '#10b981' (green)
   */
  alertLightColor?: string
}

export const DashboardShowCase = ({
  children,
  className = '',
  showHeader = false,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_SHOWCASE_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_SHOWCASE_DEFAULTS.headerIconSize,
  headerSummarySize = DASHBOARD_SHOWCASE_DEFAULTS.headerSummarySize,
  headerColor = DASHBOARD_SHOWCASE_DEFAULTS.headerColor,
  showAlertLight = DASHBOARD_SHOWCASE_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_SHOWCASE_DEFAULTS.alertLightColor,
}: DashboardShowCaseProps) => {
  // Build container class names
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(' ')

  // Compute header styles
  const headerTitleStyle = useMemo(
    () => ({
      fontSize: SIZE_CONFIG[headerTitleSize].title,
      color: COLOR_CONFIG[headerColor],
    }),
    [headerTitleSize, headerColor]
  )

  const headerIconStyle = useMemo(
    () => ({
      fontSize: SIZE_CONFIG[headerIconSize].icon,
      color: COLOR_CONFIG[headerColor],
    }),
    [headerIconSize, headerColor]
  )

  const headerSummaryStyle = useMemo(
    () => ({
      fontSize: SIZE_CONFIG[headerSummarySize].summary,
    }),
    [headerSummarySize]
  )

  const alertLightStyle = useMemo(
    () => ({
      backgroundColor: alertLightColor,
      color: alertLightColor, // For box-shadow currentColor
    }),
    [alertLightColor]
  )

  // Determine if header should be rendered
  const shouldShowHeader = showHeader && (headerIcon || headerTitle || headerSummary)

  return (
    <div className={containerClasses}>
      {/* Alert Light Indicator */}
      {showAlertLight && (
        <div className={styles['alert-light']} style={alertLightStyle} />
      )}

      {/* Header Section */}
      {shouldShowHeader && (
        <div className={styles.header}>
          {(headerIcon || headerTitle) && (
            <div className={styles['header-top']}>
              {headerIcon && (
                <span className={styles['header-icon']} style={headerIconStyle}>
                  <span className="material-symbols-outlined">
                    {headerIcon}
                  </span>
                </span>
              )}
              {headerTitle && (
                <h3 className={styles['header-title']} style={headerTitleStyle}>
                  {headerTitle}
                </h3>
              )}
            </div>
          )}
          {headerSummary && (
            <p className={styles['header-summary']} style={headerSummaryStyle}>
              {headerSummary}
            </p>
          )}
        </div>
      )}

      {/* Children Area */}
      <div className={styles['children-area']}>{children}</div>
    </div>
  )
}

