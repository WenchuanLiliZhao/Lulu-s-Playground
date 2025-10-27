import styles from './_styles.module.scss'
import { DashboardHeaderElement, DashboardAlertLightElement } from '../_shared-elements'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'

export interface MetricWidgetProps extends DashboardCommonProps {
  /**
   * Icon name (Material Symbol) - for metric icon, NOT dashboard header icon
   */
  icon?: string
  /**
   * Metric title/label - this is the small title above the value
   */
  title: string
  /**
   * Main metric value
   */
  value: string
  /**
   * Change indicator text (e.g., "+28.4% vs last hour")
   */
  changeText?: string
  /**
   * Change direction: positive (green), negative (red), or neutral (gray)
   */
  changeType?: 'positive' | 'negative' | 'neutral'
  /**
   * Status text (e.g., "Watching")
   */
  statusText?: string
  /**
   * Status color
   */
  statusColor?: 'success' | 'warning' | 'error' | 'neutral'
  /**
   * Mini sparkline data for gradient chart in bottom right
   */
  sparklineData?: number[]
  /**
   * Sparkline color
   */
  sparklineColor?: string
}

export const MetricWidget = ({
  // Dashboard common props
  showHeader = DASHBOARD_DEFAULTS.showHeader,
  headerIcon,
  headerTitle,
  headerSummary,
  headerTitleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  headerIconSize = DASHBOARD_DEFAULTS.headerIconSize,
  headerSummarySize,
  headerColor = DASHBOARD_DEFAULTS.headerColor,
  showAlertLight = DASHBOARD_DEFAULTS.showAlertLight,
  alertLightColor = DASHBOARD_DEFAULTS.alertLightColor,
  className = '',
  
  // MetricWidget specific props
  icon,
  title,
  value,
  changeText,
  changeType = 'neutral',
  statusText,
  statusColor = 'neutral',
  sparklineData,
  sparklineColor = 'var(--color-semantic-active)',
}: MetricWidgetProps) => {
  const containerClasses = [styles['card-container'], className].filter(Boolean).join(' ')

  // Generate SVG path for sparkline
  const generateSparklinePath = () => {
    if (!sparklineData || sparklineData.length < 2) return ''

    const width = 120
    const height = 60
    const min = Math.min(...sparklineData)
    const max = Math.max(...sparklineData)
    const range = max - min || 1

    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return { x, y }
    })

    const path = points
      .map((point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`
        return `L ${point.x} ${point.y}`
      })
      .join(' ')

    return path
  }

  // Generate gradient path for sparkline fill
  const generateSparklineAreaPath = () => {
    if (!sparklineData || sparklineData.length < 2) return ''

    const width = 120
    const height = 60
    const min = Math.min(...sparklineData)
    const max = Math.max(...sparklineData)
    const range = max - min || 1

    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return { x, y }
    })

    // Build path that includes bottom area
    const path = [
      `M ${points[0].x} ${height}`, // Start at bottom left
      ...points.map((point) => `L ${point.x} ${point.y}`), // Draw line to each point
      `L ${points[points.length - 1].x} ${height}`, // Draw down to bottom right
      'Z', // Close path
    ].join(' ')

    return path
  }

  const changeTypeClassName = {
    positive: styles.positive,
    negative: styles.negative,
    neutral: styles.neutral,
  }[changeType]

  const statusColorClassName = {
    success: styles['status-success'],
    warning: styles['status-warning'],
    error: styles['status-error'],
    neutral: styles['status-neutral'],
  }[statusColor]

  return (
    <div className={containerClasses}>
      {/* Dashboard Alert Light */}
      {showAlertLight && (
        <DashboardAlertLightElement
          color={alertLightColor}
          className={styles['alert-light']}
        />
      )}
      
      {/* Dashboard Header (optional) */}
      {showHeader && (
        <DashboardHeaderElement
          icon={headerIcon}
          title={headerTitle}
          summary={headerSummary}
          titleSize={headerTitleSize}
          iconSize={headerIconSize}
          summarySize={headerSummarySize}
          color={headerColor}
          className={styles['dashboard-header']}
          iconClassName={styles['dashboard-header-icon']}
          titleClassName={styles['dashboard-header-title']}
          summaryClassName={styles['dashboard-header-summary']}
        />
      )}
      
      {/* Metric header with icon and title */}
      <div className={styles['metric-header']}>
        {icon && (
          <span className={`material-symbols-outlined ${styles['metric-icon']}`}>
            {icon}
          </span>
        )}
        <div className={styles['metric-title']}>{title}</div>
      </div>

      {/* Main metric value */}
      <div className={styles['metric-value']}>{value}</div>

      {/* Change indicator or status */}
      <div className={styles['metric-footer']}>
        {changeText && (
          <div className={`${styles['metric-change']} ${changeTypeClassName}`}>
            {changeType === 'positive' && (
              <span className="material-symbols-outlined">arrow_upward</span>
            )}
            {changeType === 'negative' && (
              <span className="material-symbols-outlined">arrow_downward</span>
            )}
            {changeText}
          </div>
        )}
        {statusText && (
          <div className={`${styles['metric-status']} ${statusColorClassName}`}>
            {statusText}
          </div>
        )}
      </div>

      {/* Sparkline in bottom right corner */}
      {sparklineData && sparklineData.length > 1 && (
        <div className={styles.sparkline}>
          <svg
            width="120"
            height="60"
            viewBox="0 0 120 60"
            preserveAspectRatio="none"
            className={styles['sparkline-svg']}
          >
            <defs>
              <linearGradient
                id={`gradient-${title.replace(/\s+/g, '-')}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={sparklineColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={sparklineColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area fill with gradient */}
            <path
              d={generateSparklineAreaPath()}
              fill={`url(#gradient-${title.replace(/\s+/g, '-')})`}
              stroke="none"
            />
            {/* Line on top */}
            <path
              d={generateSparklinePath()}
              fill="none"
              stroke={sparklineColor}
              strokeWidth="2"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

