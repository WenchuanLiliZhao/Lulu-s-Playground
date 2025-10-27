/**
 * =====================================================
 * DESIGN CONFIGURATION PARAMETERS
 * =====================================================
 * Adjust these values to fine-tune the component's appearance
 */

import { getCssVar } from "../../../../styles/color-use"

/**
 * Default values for DashboardShowCase component props
 */
export const DASHBOARD_SHOWCASE_DEFAULTS = {
  // Header configuration
  headerTitleSize: 'medium' as const,
  headerIconSize: 'medium' as const,
  // Note: headerSummarySize removed - now automatically follows headerTitleSize
  headerColor: 'primary' as const,
  
  // Alert light configuration
  alertLightColor: '#10b981', // Default green color
  showAlertLight: true,
} as const

/**
 * Size mapping for text elements
 */
export const SIZE_CONFIG = {
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
} as const

/**
 * Color mapping for header elements
 */
export const COLOR_CONFIG = {
  primary: getCssVar("colorMain"),
  secondary: getCssVar("colorSec"),
  active: getCssVar("colorSemanticActive"),
  success: getCssVar("colorSemanticSuccess"),
  warning: getCssVar("colorSemanticWarning"),
  error: getCssVar("colorSemanticError"),
} as const

export type SizeType = keyof typeof SIZE_CONFIG
export type ColorType = keyof typeof COLOR_CONFIG

