import { forwardRef, useRef, useCallback } from 'react'
import { Button } from '../../ui/Button'
import { ClickCounter } from '../../utils'
import type { ClickCounterButtonProps } from './ClickCounterButton.types'

/**
 * Enhanced button component that tracks and logs click counts to console
 */
const ClickCounterButton = forwardRef<
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
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

ClickCounterButton.displayName = 'ClickCounterButton'

export default ClickCounterButton

