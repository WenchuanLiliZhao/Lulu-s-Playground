import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import styles from './_styles.module.scss'
import { Icon } from '../Icon'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Material icon name
   */
  icon: string
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button variant
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'ghost' | 'outline'
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

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = 'medium',
      variant = 'default',
      disabled = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const classNames = [
      styles.iconButton,
      styles[size],
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classNames} disabled={disabled} {...rest}>
        <Icon icon={icon} />
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

