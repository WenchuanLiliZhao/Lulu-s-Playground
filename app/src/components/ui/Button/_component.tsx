import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './_styles.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline'
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean
  /**
   * Optional className
   */
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classNames} disabled={disabled} {...rest}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

