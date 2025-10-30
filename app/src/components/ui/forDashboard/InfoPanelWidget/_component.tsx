import React from 'react'
import styles from './_styles.module.scss'
import { DashboardWidgetFrame } from '../DashboardWidgetFrame'
import type { DashboardCommonProps } from '../_shared-types'
import { DASHBOARD_DEFAULTS } from '../_shared-config'

export interface InfoItem {
  label: string
  value: string | React.ReactNode
  highlight?: boolean
  color?: string
  sublabel?: string
}

export interface InfoPanelWidgetProps extends DashboardCommonProps {
  /**
   * Icon name (Material Symbol) or emoji - for the info panel icon
   */
  icon?: string | React.ReactNode
  /**
   * Title of the info panel
   */
  title?: string
  /**
   * List of info items to display
   */
  items: InfoItem[]
  /**
   * Layout orientation
   * @default 'vertical'
   */
  layout?: 'vertical' | 'horizontal'
  /**
   * Compact mode for smaller displays
   * @default false
   */
  compact?: boolean
}

export const InfoPanelWidget = ({
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

  // InfoPanelWidget specific props
  icon,
  title,
  items,
  layout = 'vertical',
  compact = false,
}: InfoPanelWidgetProps) => {
  const layoutClassName = layout === 'horizontal' ? styles['layout-horizontal'] : ''
  const compactClassName = compact ? styles['compact'] : ''

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
      contentClassName={`${styles['info-content']} ${layoutClassName} ${compactClassName}`}
    >
      {/* Info Panel Header with icon and title */}
      {(icon || title) && (
        <div className={styles['info-header']}>
          {icon && (
            <span className={styles['info-icon']}>
              {typeof icon === 'string' && icon.startsWith('material') ? (
                <span className="material-symbols-outlined">{icon}</span>
              ) : (
                icon
              )}
            </span>
          )}
          {title && <h3 className={styles['info-title']}>{title}</h3>}
        </div>
      )}

      {/* Info Items List */}
      <div className={styles['info-body']}>
        {items.map((item, index) => {
          const itemClassName = `${styles['info-item']} ${item.highlight ? styles['item-highlight'] : ''}`
          const valueStyle = item.color ? { color: `var(--${item.color})` } : undefined

          return (
            <div key={index} className={itemClassName}>
              <div className={styles['item-content']}>
                <span className={styles['item-label']}>{item.label}</span>
                <span className={styles['item-value']} style={valueStyle}>
                  {item.value}
                </span>
              </div>
              {item.sublabel && (
                <span className={styles['item-sublabel']}>{item.sublabel}</span>
              )}
            </div>
          )
        })}
      </div>
    </DashboardWidgetFrame>
  )
}

