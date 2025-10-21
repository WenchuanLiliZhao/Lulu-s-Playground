import styles from './_styles.module.scss'

export interface EventLabelProps {
  name: string
  backgroundColor: string
  color: string
  className?: string
}

export const EventLabel = ({
  name,
  backgroundColor,
  color,
  className = '',
}: EventLabelProps) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ backgroundColor, color }}
    >
      {name}
    </div>
  )
}

