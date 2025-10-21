import { useState } from 'react'
import styles from './_styles.module.scss'

export interface SwitchProps {
  /**
   * Options for the switch
   */
  options: [string, string]
  /**
   * Initial selected index (0 or 1)
   * @default 0
   */
  initialSelected?: 0 | 1
  /**
   * Callback when selection changes
   */
  onChange?: (selectedIndex: 0 | 1, selectedValue: string) => void
  /**
   * Optional className
   */
  className?: string
}

export const Switch = ({
  options,
  initialSelected = 0,
  onChange,
  className = '',
}: SwitchProps) => {
  const [selected, setSelected] = useState<0 | 1>(initialSelected)

  const handleSwitch = (index: 0 | 1) => {
    setSelected(index)
    onChange?.(index, options[index])
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        className={`${styles.option} ${selected === 0 ? styles.active : ''}`}
        onClick={() => handleSwitch(0)}
      >
        {options[0]}
      </button>
      <button
        className={`${styles.option} ${selected === 1 ? styles.active : ''}`}
        onClick={() => handleSwitch(1)}
      >
        {options[1]}
      </button>
    </div>
  )
}

