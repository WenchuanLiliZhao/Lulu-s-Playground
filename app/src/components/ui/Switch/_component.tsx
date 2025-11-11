import { useState, useEffect } from 'react'
import { Button } from '../Button'
import styles from './_styles.module.scss'

export type SwitchOption =
  | string
  | {
      /**
       * Display label for the option
       */
      label: string
      /**
       * Optional value emitted in callbacks (defaults to label)
       */
      value?: string
      /**
       * Optional leading icon name from Material Symbols
       */
      icon?: string
    }

export interface SwitchProps {
  /**
   * Options for the switch
   * Can be strings or objects with label/icon/value metadata
   */
  options: [SwitchOption, SwitchOption] | SwitchOption[]
  /**
   * Initial selected index
   * @default 0
   */
  initialSelected?: number
  /**
   * Callback when selection changes
   */
  onChange?: (selectedIndex: number, selectedValue: string) => void
  /**
   * Optional className
   */
  className?: string
  /**
   * Controlled selected index (overrides internal state)
   */
  selectedIndex?: number
}

export const Switch = ({
  options,
  initialSelected = 0,
  onChange,
  className = '',
  selectedIndex: controlledSelectedIndex,
}: SwitchProps) => {
  const [selected, setSelected] = useState<number>(initialSelected)

  const normalizedOptions = (options as SwitchOption[]).map((option) =>
    typeof option === 'string'
      ? { label: option, value: option, icon: undefined }
      : {
          label: option.label,
          value: option.value ?? option.label,
          icon: option.icon,
        }
  )

  // Use controlled value if provided
  const currentSelected = controlledSelectedIndex !== undefined ? controlledSelectedIndex : selected

  // Update internal state when controlledSelectedIndex changes
  useEffect(() => {
    if (controlledSelectedIndex !== undefined) {
      setSelected(controlledSelectedIndex)
    }
  }, [controlledSelectedIndex])

  const handleSwitch = (index: number) => {
    if (controlledSelectedIndex === undefined) {
      setSelected(index)
    }
    onChange?.(index, normalizedOptions[index]?.value ?? '')
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {normalizedOptions.map((option, index) => (
        <Button
          key={index}
          className={`${styles.option} ${currentSelected === index ? styles.active : ''}`}
          variant="outline"
          type="button"
          icon={option.icon}
          onClick={() => handleSwitch(index)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

