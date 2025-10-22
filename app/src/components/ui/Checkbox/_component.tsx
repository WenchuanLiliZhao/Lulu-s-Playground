import { Icon } from '../Icon/index'
import styles from './_styles.module.scss'

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean
  /**
   * Callback when checkbox state changes
   */
  onChange?: (checked: boolean) => void
  /**
   * Label text for the checkbox
   */
  label?: string
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Optional className
   */
  className?: string
}

export const Checkbox = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
}: CheckboxProps) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      if (onChange) {
        onChange(!checked)
      }
    }
  }

  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={`${checked}`}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
        {checked && <Icon icon="check" className={styles.checkIcon} />}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}


