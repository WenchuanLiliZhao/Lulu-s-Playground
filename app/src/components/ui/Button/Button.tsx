import { forwardRef } from 'react'
import type { ButtonProps } from './Button.types'
import styles from './Button.module.scss'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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

export default Button

