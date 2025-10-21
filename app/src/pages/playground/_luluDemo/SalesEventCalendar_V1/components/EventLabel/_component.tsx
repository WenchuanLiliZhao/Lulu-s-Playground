import styles from './_styles.module.scss'

export interface EventLabelProps {
  name: string
  backgroundColor: string
  color: string
  className?: string
  fullWidth?: boolean
}

export const EventLabel = ({
  name,
  backgroundColor,
  color,
  className = '',
  fullWidth = false,
}: EventLabelProps) => {
  return (
    <div
      className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      style={{ backgroundColor, color }}
    >
      {name}
    </div>
  )
}

