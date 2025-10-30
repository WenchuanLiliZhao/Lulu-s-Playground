/**
 * Shared React components for dashboard elements
 * These components provide consistent header, alert light, and card rendering
 */

import { useMemo, type ReactNode } from 'react'
import type { DashboardSizeType, DashboardColorType } from './_shared-types'
import { DASHBOARD_SIZE_CONFIG, DASHBOARD_COLOR_CONFIG, DASHBOARD_DEFAULTS } from './_shared-config'

// ===== Dashboard Header Component =====

export interface DashboardHeaderElementProps {
  icon?: string
  title?: string | ReactNode
  summary?: string
  titleSize?: DashboardSizeType
  iconSize?: DashboardSizeType
  summarySize?: DashboardSizeType
  color?: DashboardColorType
  className?: string
  topClassName?: string
  iconClassName?: string
  titleClassName?: string
  summaryClassName?: string
}

export const DashboardHeaderElement = ({
  icon,
  title,
  summary,
  titleSize = DASHBOARD_DEFAULTS.headerTitleSize,
  iconSize = DASHBOARD_DEFAULTS.headerIconSize,
  summarySize,
  color = DASHBOARD_DEFAULTS.headerColor,
  className = '',
  topClassName = '',
  iconClassName = '',
  titleClassName = '',
  summaryClassName = '',
}: DashboardHeaderElementProps) => {
  const iconStyle = useMemo(
    () => ({
      fontSize: DASHBOARD_SIZE_CONFIG[iconSize].icon,
      color: DASHBOARD_COLOR_CONFIG[color],
    }),
    [iconSize, color]
  )

  const titleStyle = useMemo(
    () => ({
      fontSize: DASHBOARD_SIZE_CONFIG[titleSize].title,
      color: DASHBOARD_COLOR_CONFIG[color],
    }),
    [titleSize, color]
  )

  const summaryStyle = useMemo(
    () => ({
      fontSize: DASHBOARD_SIZE_CONFIG[summarySize ?? titleSize].summary,
    }),
    [summarySize, titleSize]
  )

  if (!icon && !title && !summary) {
    return null
  }

  return (
    <div className={className}>
      {(icon || title) && (
        <div className={topClassName}>
          {icon && (
            <span className={iconClassName} style={iconStyle}>
              <span className="material-symbols-outlined">{icon}</span>
            </span>
          )}
          {title && (
            <h3 className={titleClassName} style={titleStyle}>
              {title}
            </h3>
          )}
        </div>
      )}
      {summary && (
        <p className={summaryClassName} style={summaryStyle}>
          {summary}
        </p>
      )}
    </div>
  )
}

// ===== Dashboard Alert Light Component =====

export interface DashboardAlertLightElementProps {
  color?: string
  className?: string
}

export const DashboardAlertLightElement = ({
  color = DASHBOARD_DEFAULTS.alertLightColor,
  className = '',
}: DashboardAlertLightElementProps) => {
  const style = useMemo(
    () => ({
      backgroundColor: color,
      color: color, // For box-shadow currentColor
    }),
    [color]
  )

  return <div className={className} style={style} />
}

// ===== Dashboard Card Container Component =====

export interface DashboardCardElementProps {
  children: ReactNode
  className?: string
}

export const DashboardCardElement = ({
  children,
  className = '',
}: DashboardCardElementProps) => {
  return <div className={className}>{children}</div>
}

