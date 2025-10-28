import { type ReactNode } from 'react'
import styles from './_styles.module.scss'
import {
  DashboardHeaderElement,
  DashboardAlertLightElement,
} from '../_shared-elements'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'

export interface DashboardWidgetFrameProps extends DashboardCommonProps {
  /**
   * Main content of the widget
   */
  children: ReactNode

  /**
   * Optional content to render before the dashboard header
   * Use case: Custom banners, alerts
   */
  renderBeforeHeader?: () => ReactNode

  /**
   * Optional content to render after the dashboard header
   * Use case: Date filters, action buttons
   */
  renderAfterHeader?: () => ReactNode

  /**
   * Optional content to render at the bottom of the widget
   * Use case: Legends, footers, summaries
   */
  renderFooter?: () => ReactNode

  /**
   * Additional className for the content wrapper
   * Use case: Custom spacing, styling for specific widgets
   */
  contentClassName?: string

  /**
   * Loading state
   * @default false
   */
  loading?: boolean

  /**
   * Error state
   */
  error?: Error | null
}

export const DashboardWidgetFrame = ({
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

  // Frame-specific props
  children,
  renderBeforeHeader,
  renderAfterHeader,
  renderFooter,
  contentClassName = '',
  loading = false,
  error = null,
}: DashboardWidgetFrameProps) => {
  const containerClasses = [styles['frame-container'], className]
    .filter(Boolean)
    .join(' ')

  const contentClasses = [styles['frame-content'], contentClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {/* Alert Light Indicator */}
      {showAlertLight && (
        <DashboardAlertLightElement
          color={alertLightColor}
          className={styles['alert-light']}
        />
      )}

      {/* Before Header Slot */}
      {renderBeforeHeader && renderBeforeHeader()}

      {/* Dashboard Header */}
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
          topClassName={styles['dashboard-header-top']}
          iconClassName={styles['dashboard-header-icon']}
          titleClassName={styles['dashboard-header-title']}
          summaryClassName={styles['dashboard-header-summary']}
        />
      )}

      {/* After Header Slot */}
      {renderAfterHeader && renderAfterHeader()}

      {/* Loading State */}
      {loading && (
        <div className={styles['loading-state']}>
          <div className={styles['loading-spinner']} />
          <p className={styles['loading-text']}>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles['error-state']}>
          <span className="material-symbols-outlined">error</span>
          <p className={styles['error-text']}>{error.message}</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && <div className={contentClasses}>{children}</div>}

      {/* Footer Slot */}
      {renderFooter && renderFooter()}
    </div>
  )
}

