/**
 * =====================================================
 * DESIGN CONFIGURATION PARAMETERS
 * =====================================================
 * Adjust these values to fine-tune the component's appearance
 */

/**
 * Default values for DashboardShowCase component props
 */
export const DASHBOARD_SHOWCASE_DEFAULTS = {
  // Header configuration
  headerTitleSize: 'medium' as const,
  headerIconSize: 'medium' as const,
  headerSummarySize: 'medium' as const,
  headerColor: 'secondary' as const,
  
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
    icon: '18px',
    summary: '12px',
  },
  medium: {
    title: '18px',
    icon: '24px',
    summary: '14px',
  },
  large: {
    title: '24px',
    icon: '32px',
    summary: '16px',
  },
} as const

/**
 * Color mapping for header elements
 */
export const COLOR_CONFIG = {
  primary: 'var(--color-main)',
  secondary: 'var(--color-sec)',
  brand: 'var(--brand-color)',
  active: 'var(--color-semantic-active)',
  success: 'var(--color-semantic-success)',
  warning: 'var(--color-semantic-warning)',
  error: 'var(--color-semantic-error)',
} as const

export type SizeType = keyof typeof SIZE_CONFIG
export type ColorType = keyof typeof COLOR_CONFIG

