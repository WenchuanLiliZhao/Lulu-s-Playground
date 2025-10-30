import { useState, useEffect } from 'react'
import styles from './_styles.module.scss'

export interface SwitchProps {
  /**
   * Options for the switch
   * Can be either 2 options [string, string] or multiple options string[]
   */
  options: [string, string] | string[]
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
    onChange?.(index, options[index])
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`${styles.option} ${currentSelected === index ? styles.active : ''}`}
          onClick={() => handleSwitch(index)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

