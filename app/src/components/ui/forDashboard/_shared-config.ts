/**
 * Shared configuration for all dashboard components
 */

import { getCssVar } from '../../../styles/color-use'
import type { DashboardSizeType, DashboardColorType } from './_shared-types'

/**
 * Default values for dashboard components
 */
export const DASHBOARD_DEFAULTS = {
  headerTitleSize: 'medium' as DashboardSizeType,
  headerIconSize: 'medium' as DashboardSizeType,
  headerColor: 'secondary' as DashboardColorType,
  showAlertLight: false,
  alertLightColor: '#10b981',
  showHeader: false,
}

/**
 * Size configuration for dashboard elements
 */
export const DASHBOARD_SIZE_CONFIG: Record<DashboardSizeType, {
  title: string
  icon: string
  summary: string
}> = {
  small: {
    title: '14px',
    icon: '14px',
    summary: '12px',
  },
  medium: {
    title: '18px',
    icon: '18px',
    summary: '14px',
  },
  large: {
    title: '24px',
    icon: '24px',
    summary: '16px',
  },
}

/**
 * Color configuration for dashboard elements
 */
export const DASHBOARD_COLOR_CONFIG: Record<DashboardColorType, string> = {
  primary: getCssVar('colorMain'),
  secondary: getCssVar('colorSec'),
  active: getCssVar('colorSemanticActive'),
  success: getCssVar('colorSemanticSuccess'),
  warning: getCssVar('colorSemanticWarning'),
  error: getCssVar('colorSemanticError'),
}

