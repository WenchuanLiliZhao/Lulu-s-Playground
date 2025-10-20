import { forwardRef, useRef, useCallback } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { Button } from '../../ui/Button'
import { ClickCounter } from '../../utils'

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
  /**
   * Optional className
   */
  className?: string
}

/**
 * Enhanced button component that tracks and logs click counts to console
 */
export const ClickCounterButton = forwardRef<
  HTMLButtonElement,
  ClickCounterButtonProps
>(
  (
    {
      children,
      label = 'ClickCounterButton',
      onCountChange,
      onClick,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const counterRef = useRef<ClickCounter>(new ClickCounter(label))

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        // Use the utility function to increment and log
        const newCount = counterRef.current.increment()

        // Call the optional callback
        if (onCountChange) {
          onCountChange(newCount)
        }

        // Call the original onClick if provided
        if (onClick) {
          onClick(event)
        }
      },
      [onClick, onCountChange]
    )

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

ClickCounterButton.displayName = 'ClickCounterButton'

