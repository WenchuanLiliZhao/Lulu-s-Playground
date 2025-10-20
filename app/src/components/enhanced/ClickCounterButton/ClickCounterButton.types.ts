import type { ButtonHTMLAttributes } from 'react'

export interface ClickCounterButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Label for console logging
   */
  label?: string
  /**
   * Callback function called after click count updates
   */
  onCountChange?: (count: number) => void
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline'
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Full width button
   */
  fullWidth?: boolean
}

