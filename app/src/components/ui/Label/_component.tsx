import styles from './_styles.module.scss'

export interface LabelProps {
  /**
   * Text content to display in the label
   */
  children: React.ReactNode
  /**
   * Background color for the label
   */
  backgroundColor?: string
  /**
   * Text color for the label
   */
  color?: string
  /**
   * Opacity of the background (0-1)
   * @default 1
   */
  backgroundOpacity?: number
  /**
   * Additional CSS class name
   */
  className?: string
  /**
   * Full width mode
   * @default false
   */
  fullWidth?: boolean
}

export const Label = ({
  children,
  backgroundColor,
  color,
  backgroundOpacity = 1,
  className = '',
  fullWidth = false,
}: LabelProps) => {
  return (
    <div
      className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      style={{ color }}
    >
      <div
        className={styles.background}
        style={{
          backgroundColor,
          opacity: backgroundOpacity,
        }}
      />
      <span className={styles.content}>{children}</span>
    </div>
  )
}

