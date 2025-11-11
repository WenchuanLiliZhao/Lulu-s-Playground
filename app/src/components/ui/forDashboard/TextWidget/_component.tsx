import styles from './_styles.module.scss'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'
import type { ReactNode } from 'react'

export interface TextWidgetProps extends DashboardCommonProps {
  /**
   * The text content to display
   */
  text: ReactNode
  /**
   * Whether to center align the text (default: false)
   */
  centered?: boolean
}

export const TextWidget = ({
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
  
  // TextWidget specific props
  text,
  centered = false,
}: TextWidgetProps) => {
  return (
    <DashboardWidgetFrame
      showHeader={showHeader}
      headerIcon={headerIcon}
      headerTitle={headerTitle}
      headerSummary={headerSummary}
      headerTitleSize={headerTitleSize}
      headerIconSize={headerIconSize}
      headerSummarySize={headerSummarySize}
      headerColor={headerColor}
      showAlertLight={showAlertLight}
      alertLightColor={alertLightColor}
      className={className}
      contentClassName={`${styles['text-content']} ${centered ? styles['text-content-centered'] : ''}`}
    >
      <div className={styles['text-body']}>
        {text}
      </div>
    </DashboardWidgetFrame>
  )
}

