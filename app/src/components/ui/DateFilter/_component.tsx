import { DatePicker } from '../DatePicker'
import styles from './_styles.module.scss'

export interface DateFilterProps {
  /**
   * Start date value
   */
  startDate?: Date | null
  /**
   * End date value
   */
  endDate?: Date | null
  /**
   * Callback when start date changes
   */
  onStartDateChange?: (date: Date | null) => void
  /**
   * Callback when end date changes
   */
  onEndDateChange?: (date: Date | null) => void
  /**
   * Start date placeholder
   * @default "Start date"
   */
  startPlaceholder?: string
  /**
   * End date placeholder
   * @default "End date"
   */
  endPlaceholder?: string
  /**
   * Separator text between date pickers
   */
  separatorText?: string
  /**
   * Layout orientation
   * @default "horizontal"
   */
  layout?: 'horizontal' | 'vertical'
  /**
   * Size variant
   * @default "default"
   */
  size?: 'small' | 'default'
  /**
   * Optional className
   */
  className?: string
  /**
   * Disabled state
   */
  disabled?: boolean
}

export const DateFilter = ({
  startDate = null,
  endDate = null,
  onStartDateChange,
  onEndDateChange,
  startPlaceholder = 'Start date',
  endPlaceholder = 'End date',
  separatorText,
  layout = 'horizontal',
  size = 'default',
  className = '',
  disabled = false,
}: DateFilterProps) => {
  const containerClasses = [
    styles.container,
    styles[`size-${size}`],
    styles[`layout-${layout}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      <DatePicker
        value={startDate}
        onChange={onStartDateChange}
        placeholder={startPlaceholder}
        size={size}
        disabled={disabled}
      />
      {separatorText && <span className={styles.separator}>{separatorText}</span>}
      <DatePicker
        value={endDate}
        onChange={onEndDateChange}
        placeholder={endPlaceholder}
        size={size}
        disabled={disabled}
      />
    </div>
  )
}

